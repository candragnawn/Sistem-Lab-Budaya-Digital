<?php

namespace App\service;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class SisterService
{
    protected string $baseUrl;
    protected ?string $username;
    protected ?string $password;
    protected ?string $idPengguna;
    protected int $timeout = 30;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.sister.url', 'https://sister-api.kemdikbud.go.id/ws-sandbox.php/1.0'), '/');
        $this->username = config('services.sister.username');
        $this->password = config('services.sister.password');
        $this->idPengguna = config('services.sister.id_pengguna');
    }

    /**
     * Cari ID SDM berdasarkan NIDN
     */
    public function getIdSdmByNidn(string $nidn): ?string
    {
        $response = $this->get("/referensi/sdm", ['nidn' => $nidn]);
        
        if (!empty($response) && is_array($response)) {
            $dosen = $response[0] ?? $response;
            return $dosen['id_sdm'] ?? null;
        }

        return null;
    }

    public function getProfile(string $idSdm): ?array
    {
        return $this->get("/dosen/profil", ['id_sdm' => $idSdm]);
    }

    public function getEmploymentHistory(string $idSdm): array
    {
        return $this->get("/dosen/riwayat-pekerjaan", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getEducation(string $idSdm): array
    {
        return $this->get("/dosen/riwayat-pendidikan", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getFunctionalPosition(string $idSdm): array
    {
        return $this->get("/dosen/jabatan-fungsional", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getStructuralPosition(string $idSdm): array
    {
        return $this->get("/dosen/jabatan-struktural", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getPlacement(string $idSdm): array
    {
        return $this->get("/dosen/penempatan", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getRank(string $idSdm): array
    {
        return $this->get("/dosen/kepangkatan", ['id_sdm' => $idSdm]) ?? [];
    }

    public function getTeaching(string $idSdm): array
    {
        return $this->get("/dosen/pengajaran", ['id_sdm' => $idSdm]) ?? [];
    }
    
    public function getAwards(string $idSdm): array
    {
        return $this->get("/dosen/penghargaan", ['id_sdm' => $idSdm]) ?? [];
    }

    private function getToken(): ?string
    {
        if (!$this->username || !$this->password || !$this->idPengguna) {
            Log::warning("[SisterService] Kredensial username/password/id_pengguna SISTER tidak lengkap di config.");
            return null;
        }

        // Cache token selama 55 menit (3300 detik)
        return Cache::remember('sister_api_token', 3300, function () { 
            try {
                $response = Http::timeout($this->timeout)->post($this->baseUrl . '/authorize', [
                    'username' => $this->username,
                    'password' => $this->password,
                    'id_pengguna' => $this->idPengguna
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    return $data['token'] ?? null;
                }

                Log::error("[SisterService] Gagal ambil token", ['status' => $response->status(), 'body' => $response->body()]);
            } catch (\Throwable $e) {
                Log::error("[SisterService] Error token: " . $e->getMessage());
            }
            return null;
        });
    }

    private function get(string $endpoint, array $params = []): ?array
    {
        $token = $this->getToken();
        
        if (!$token) {
            Log::warning("[SisterService] Tidak ada token aktif, membatalkan request ke {$endpoint}.");
            return [];
        }
        
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => "Bearer {$token}"
            ])->timeout($this->timeout)->get($this->baseUrl . $endpoint, $params);

            if ($response->failed()) {
                Log::warning("[SisterService] HTTP {$response->status()} dari {$endpoint}", ['params' => $params]);
                return []; 
            }

            $data = $response->json();
            return $data['data'] ?? $data;
        } catch (\Throwable $e) {
            Log::error("[SisterService] GET {$endpoint} gagal: " . $e->getMessage());
            return [];
        }
    }
}
