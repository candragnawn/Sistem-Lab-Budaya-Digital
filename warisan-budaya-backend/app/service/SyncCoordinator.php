<?php

namespace App\service;

use App\Models\Lecturer;
use Illuminate\Support\Facades\Log;

class SyncCoordinator
{
    protected SintaService $sintaService;
    protected SisterService $sisterService;
    protected ElsevierService $elsevierService;

    public function __construct(
        SintaService $sintaService,
        SisterService $sisterService,
        ElsevierService $elsevierService
    ) {
        $this->sintaService = $sintaService;
        $this->sisterService = $sisterService;
        $this->elsevierService = $elsevierService;
    }

    // public function syncFromSister(Lecturer $lecturer): void
    // {
    //     Log::info("[SyncCoordinator] Memulai sync SISTER untuk Lecturer ID: {$lecturer->id}");

    //     $nidn = $lecturer->nidn; 
    //     if (!$nidn) {
    //         Log::warning("[SyncCoordinator] NIDN kosong, skip sync SISTER untuk ID: {$lecturer->id}");
    //         return;
    //     }

    //     $idSdm = $lecturer->sister_id;
    //     if (!$idSdm) {
    //         $idSdm = $this->sisterService->getIdSdmByNidn($nidn);
    //         if (!$idSdm) {
    //             Log::warning("[SyncCoordinator] Gagal mendapatkan id_sdm dari SISTER untuk NIDN: {$nidn}");
    //             return;
    //         }
    //         $lecturer->update(['sister_id' => $idSdm]);
    //         Log::info("[SyncCoordinator] Berhasil menyimpan sister_id (id_sdm) untuk Lecturer ID: {$lecturer->id}");
    //     }
        
    //     $profileData = $this->sisterService->getProfile($idSdm);
    //     if ($profileData) {
    //         app(ProfileMapper::class)->mapProfile($lecturer, $profileData);
    //     }

    //     app(KualifikasiMapper::class)->mapEducation($lecturer, $this->sisterService->getEducation($idSdm));
    //     app(KualifikasiMapper::class)->mapEmployment($lecturer, $this->sisterService->getEmploymentHistory($idSdm));

    //     app(PendidikanMapper::class)->mapTeaching($lecturer, $this->sisterService->getTeaching($idSdm));

    //     app(ProfileMapper::class)->mapFunctionalPosition($lecturer, $this->sisterService->getFunctionalPosition($idSdm));
    //     app(PengabdianMapper::class)->mapStructuralPosition($lecturer, $this->sisterService->getStructuralPosition($idSdm));
        
    //     app(ProfileMapper::class)->mapPlacement($lecturer, $this->sisterService->getPlacement($idSdm));
    //     app(ProfileMapper::class)->mapRank($lecturer, $this->sisterService->getRank($idSdm));
        
    //     app(PenunjangMapper::class)->mapAward($lecturer, $this->sisterService->getAwards($idSdm));

    //     Log::info("[SyncCoordinator] Sync SISTER selesai untuk Lecturer ID: {$lecturer->id}");
    // }

    // public function syncFromSinta(Lecturer $lecturer): void
    // {
    //     Log::info("[SyncCoordinator] Memulai sync SINTA untuk Lecturer ID: {$lecturer->id}");

    //     $sintaId = $lecturer->sinta_id ?? null;
    //     if (!$sintaId) {
    //         Log::warning("[SyncCoordinator] SINTA ID tidak ditemukan untuk Lecturer ID: {$lecturer->id}");
    //         return;
    //     }

    //     $profile = $this->sintaService->getAuthorProfile($sintaId);
    //     if ($profile) {
    //         app(ResearchMapper::class)->mapLecturerStats($lecturer, $profile);
    //     }

    //     $publications = $this->sintaService->getAllPublications($sintaId);
    //     app(ResearchMapper::class)->mapPublications($lecturer, $publications);

    //     $research = $this->sintaService->getResearch($sintaId);
    //     app(ResearchMapper::class)->mapResearch($lecturer, $research);

    //     $communityService = $this->sintaService->getCommunityService($sintaId);
    //     app(PengabdianMapper::class)->mapCommunityService($lecturer, $communityService);

    //     Log::info("[SyncCoordinator] Sync SINTA selesai untuk Lecturer ID: {$lecturer->id}");
    // }

    public function syncFromElsevier(Lecturer $lecturer): void
    {
        Log::info("[SyncCoordinator] Memulai sync Elsevier/Scopus untuk Lecturer ID: {$lecturer->id}");

        $scopusId = $lecturer->scopus_id ?? null;
        if (!$scopusId) {
            Log::warning("[SyncCoordinator] Scopus ID tidak ditemukan untuk Lecturer ID: {$lecturer->id}");
            return;
        }

        $profile = $this->elsevierService->getAuthorProfile($scopusId);
        if ($profile) {
            app(ResearchMapper::class)->mapLecturerStats($lecturer, ['total_citations' => $profile['citation_count']]);
        }

        $publications = $this->elsevierService->getPublications($scopusId);
        app(ResearchMapper::class)->mapPublications($lecturer, $publications);

        Log::info("[SyncCoordinator] Sync Elsevier/Scopus selesai untuk Lecturer ID: {$lecturer->id}");
    }

    public function syncAll(Lecturer $lecturer): void
    {
        // $this->syncFromSister($lecturer);
        // $this->syncFromSinta($lecturer);
        $this->syncFromElsevier($lecturer);

        // Catat waktu sinkronisasi terakhir
        $lecturer->update(['last_synced_at' => now()]);
    }
}
