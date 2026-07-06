<?php

namespace App\service;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiService
{
    protected string $apiKey;
    protected string $apiUrl;
    protected string $model;

    public function __construct()
    {
        //open router
        $this->apiKey = env('AI_API_KEY', '');
        $this->apiUrl = env('AI_BASE_URL', '');
        $this->model  = env('AI_MODEL', '');
    }

    public function generateCvSummary(array $lecturerData): string
    {
        if (empty($this->apiKey)) {
            Log::warning('AI API key is not set. Returning default summary.');
            return 'API Key AI belum disetting';
        }

        $prompt = $this->buildPrompt($lecturerData);

        try {
            Log::info("Sedang mengirim request ke AI API: " . $this->apiUrl . " menggunakan model: " . $this->model);
            
            $response = Http::withToken($this->apiKey)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($this->apiUrl, [
                    'model' => $this->model,
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => 'Kamu adalah seorang pakar HR dan penulis CV profesional. Jawablah langsung tanpa salam pembuka atau penutup.' //prompt tambahan buat sistem
                        ],
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 800,
                ]);

            if ($response->successful()) {
                Log::info("Berhasil menerima respons dari AI API.");
                $data = $response->json();
                
                if (isset($data['choices'][0]['message']['content'])) {
                    return trim($data['choices'][0]['message']['content']);
                }
            }
            
            Log::error('AI API Error: ' . $response->body());
            return 'Gagal men-generate deskripsi profesional. Silakan periksa log server.';

        } catch (\Exception $e) {
            Log::error('AI Service Exception: ' . $e->getMessage());
            return 'Terjadi kesalahan saat terhubung ke layanan AI.';
        }
    }

    protected function buildPrompt(array $data): string
    {
        $name = $data['name'] ?? 'Seorang Dosen';
        $bio = $data['bio'] ?? '';
        $faculty = $data['faculty'] ?? '';
        $major = $data['major'] ?? '';
        
        $totalPubs = count($data['publications'] ?? []);
        $totalResearch = count($data['researchs'] ?? []);
        
        return "Tugasmu adalah menuliskan paragraf 'Executive Summary' atau 'Professional Summary' untuk seorang dosen bernama {$name} yang mengajar di Fakultas {$faculty}, Program Studi {$major}.
        
Data tambahan yang bisa digunakan:
- Biografi singkat: {$bio}
- Total Publikasi Ilmiah: {$totalPubs} karya
- Total Penelitian: {$totalResearch} proyek

Tuliskan maksimal 3 paragraf singkat yang merangkum kualifikasi, keahlian, dan kontribusi akademis dosen ini. Gunakan gaya bahasa profesional, elegan, dan meyakinkan dalam Bahasa Indonesia. Jangan menambahkan kata pengantar/penutup, langsung berikan narasi summary-nya saja.";
    }
}
