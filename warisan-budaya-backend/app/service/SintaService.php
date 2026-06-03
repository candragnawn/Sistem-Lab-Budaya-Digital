<?php

namespace App\service;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SintaService
{
    protected string $baseUrl;
    protected ?string $apiKey;
    protected int $timeout = 30;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.sinta.url', 'http://sinta.kemdikbud.go.id'), '/');
        $this->apiKey  = config('services.sinta.key');
    }

    public function getAuthorProfile(string $sintaId): ?array
    {
        try {
            $response = $this->get('/author', ['id' => $sintaId]);
            if (!$response) return null;
            return $this->normalizeAuthorProfile($response);
        } catch (\Throwable $e) {
            Log::error("[SintaService] getAuthorProfile gagal: {$e->getMessage()}", ['sinta_id' => $sintaId]);
            return null;
        }
    }

    public function getAllPublications(string $sintaId): array
    {
        $publications = [];
        $page = 1;
        do {
            $result = $this->getPublications($sintaId, $page);
            if (empty($result['data'])) break;
            $publications = array_merge($publications, $result['data']);
            $hasNextPage = isset($result['meta']['current_page'], $result['meta']['last_page']) && 
                           $result['meta']['current_page'] < $result['meta']['last_page'];
            $page++;
        } while ($hasNextPage);
        return $publications;
    }

    public function getPublications(string $sintaId, int $page = 1): array
    {
        try {
            $response = $this->get('/author/portofolio', ['id' => $sintaId, 'type' => 'journal', 'page' => $page]);
            if (!$response) return ['data' => [], 'meta' => []];
            $data = array_map(fn ($item) => $this->normalizePublication($item), $response['data'] ?? $response);
            return ['data' => $data, 'meta' => $response['meta'] ?? []];
        } catch (\Throwable $e) {
            Log::error("[SintaService] getPublications gagal: {$e->getMessage()}", ['sinta_id' => $sintaId, 'page' => $page]);
            return ['data' => [], 'meta' => []];
        }
    }

    public function getResearch(string $sintaId): array
    {
        try {
            $response = $this->get('/author/portofolio', ['id' => $sintaId, 'type' => 'research', 'page' => 1]);
            if (!$response) return [];
            return array_map(fn ($item) => $this->normalizeResearch($item), $response['data'] ?? $response);
        } catch (\Throwable $e) {
            Log::error("[SintaService] getResearch gagal: {$e->getMessage()}", ['sinta_id' => $sintaId]);
            return [];
        }
    }

    public function getCommunityService(string $sintaId): array
    {
        try {
            $response = $this->get('/author/portofolio', ['id' => $sintaId, 'type' => 'service', 'page' => 1]);
            if (!$response) return [];
            return array_map(fn ($item) => $this->normalizeCommunityService($item), $response['data'] ?? $response);
        } catch (\Throwable $e) {
            Log::error("[SintaService] getCommunityService gagal: {$e->getMessage()}", ['sinta_id' => $sintaId]);
            return [];
        }
    }

    private function normalizeAuthorProfile(array $data): array
    {
        $author = $data['data'] ?? $data;
        return [
            'sinta_id'           => $author['id'] ?? $author['sinta_id'] ?? null,
            'name'               => $author['name'] ?? $author['author_name'] ?? null,
            'nidn'               => $author['nidn'] ?? null,
            'affiliation'        => $author['affiliation'] ?? $author['university'] ?? null,
            'department'         => $author['department'] ?? null,
            'score_3yr'          => (float) ($author['score3year'] ?? $author['score_3yr'] ?? 0),
            'score_overall'      => (float) ($author['scoreoverall'] ?? $author['score_overall'] ?? 0),
            'h_index_scopus'     => (int) ($author['scopus_hindex'] ?? $author['h_index_scopus'] ?? 0),
            'h_index_scholar'    => (int) ($author['scholar_hindex'] ?? $author['h_index_scholar'] ?? 0),
            'total_citations'    => (int) ($author['total_citations'] ?? 0),
            'total_documents'    => (int) ($author['total_documents'] ?? 0),
            'sinta_url'          => $author['url'] ?? "https://sinta.kemdikbud.go.id/authors/profile/{$author['id']}",
        ];
    }

    private function normalizePublication(array $item): array
    {
        return [
            'sinta_id'       => $item['sinta_id'] ?? null,
            'title'          => $item['title'] ?? $item['article_title'] ?? null,
            'journal_name'   => $item['journal'] ?? $item['source_title'] ?? $item['journal_name'] ?? null,
            'issn'           => $item['issn'] ?? null,
            'doi'            => $item['doi'] ?? null,
            'year'           => (string) ($item['year'] ?? $item['publish_year'] ?? date('Y')),
            'quartile'       => $item['quartile'] ?? $item['sjr_quartile'] ?? null,
            'category'       => $item['category'] ?? 'Jurnal',
            'type'           => $item['type'] ?? 'Article',
            'source'         => $item['source'] ?? 'SINTA',
            'url'            => $item['url'] ?? $item['link'] ?? null,
            'is_verified'    => true,
        ];
    }

    private function normalizeResearch(array $item): array
    {
        return [
            'title'               => $item['title'] ?? $item['research_title'] ?? null,
            'scientific_field'    => $item['field'] ?? $item['scientific_field'] ?? null,
            'implementation_year' => (string) ($item['year'] ?? $item['implementation_year'] ?? date('Y')),
            'duration'            => $item['duration'] ?? null,
        ];
    }

    private function normalizeCommunityService(array $item): array
    {
        return [
            'title'               => $item['title'] ?? null,
            'scientific_field'    => $item['field'] ?? null,
            'implementation_year' => (string) ($item['year'] ?? date('Y')),
            'duration'            => $item['duration'] ?? null,
        ];
    }

    private function get(string $endpoint, array $params = []): ?array
    {
        $headers = ['Accept' => 'application/json'];
        if ($this->apiKey) $headers['Authorization'] = "Bearer {$this->apiKey}";

        $response = Http::withHeaders($headers)->timeout($this->timeout)->get($this->baseUrl . $endpoint, $params);

        if ($response->failed()) {
            Log::warning("[SintaService] HTTP {$response->status()} dari {$endpoint}", ['params' => $params, 'body' => $response->body()]);
            return null;
        }

        return $response->json();
    }
}
