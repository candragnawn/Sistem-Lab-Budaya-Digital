<?php

namespace App\service;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ElsevierService
{
    protected string $baseUrl;
    protected ?string $apiKey;
    protected int $timeout = 30;

    public function __construct()
    {
        $this->baseUrl = 'https://api.elsevier.com/content';
        $this->apiKey = config('services.elsevier.key');
    }

    public function getAuthorProfile(string $scopusId): ?array
    {
        try {
            $response = $this->get("/author", ['author_id' => $scopusId]);
            if (!$response) return null;
            
            $author = $response['author-retrieval-response'][0] ?? null;
            if (!$author) return null;

            return [
                'scopus_id' => $scopusId,
                'name' => ($author['author-profile']['preferred-name']['given-name'] ?? '') . ' ' . ($author['author-profile']['preferred-name']['surname'] ?? ''),
                'affiliation' => $author['author-profile']['affiliation-current']['affiliation']['ip-doc']['afdispname'] ?? null,
                'h_index' => (int) ($author['h-index'] ?? 0),
                'document_count' => (int) ($author['coredata']['document-count'] ?? 0),
                'citation_count' => (int) ($author['coredata']['citation-count'] ?? 0),
            ];
        } catch (\Throwable $e) {
            Log::error("[ElsevierService] getAuthorProfile gagal: {$e->getMessage()}", ['scopus_id' => $scopusId]);
            return null;
        }
    }

    public function getPublications(string $scopusId, int $start = 0, int $count = 25): array
    {
        try {
            $response = $this->get("/search/scopus", [
                'query' => "AU-ID({$scopusId})",
                'start' => $start,
                'count' => $count,
                'sort' => '-pubyear'
            ]);
            
            if (!$response || !isset($response['search-results']['entry'])) return [];
            
            $entries = $response['search-results']['entry'];
            return array_map(function($item) {
                return [
                    'scopus_id' => $item['dc:identifier'] ?? null,
                    'title' => $item['dc:title'] ?? null,
                    'journal_name' => $item['prism:publicationName'] ?? null,
                    'issn' => $item['prism:issn'] ?? null,
                    'doi' => $item['prism:doi'] ?? null,
                    'year' => isset($item['prism:coverDate']) ? date('Y', strtotime($item['prism:coverDate'])) : null,
                    'type' => $item['subtypeDescription'] ?? 'Article',
                    'source' => 'Scopus',
                    'category' => 'Jurnal Internasional',
                    'url' => $item['prism:url'] ?? null,
                    'is_verified' => true,
                ];
            }, $entries);
        } catch (\Throwable $e) {
            Log::error("[ElsevierService] getPublications gagal: {$e->getMessage()}", ['scopus_id' => $scopusId]);
            return [];
        }
    }

    private function get(string $endpoint, array $params = []): ?array
    {
        if (!$this->apiKey) {
            Log::warning("[ElsevierService] API Key Elsevier tidak dikonfigurasi.");
            return null;
        }

        $headers = [
            'Accept' => 'application/json',
            'X-ELS-APIKey' => $this->apiKey
        ];

        $response = Http::withHeaders($headers)
            ->timeout($this->timeout)
            ->get($this->baseUrl . $endpoint, $params);

        if ($response->failed()) {
            Log::warning("[ElsevierService] HTTP {$response->status()} dari {$endpoint}", ['body' => $response->body()]);
            return null;
        }

        return $response->json();
    }
}
