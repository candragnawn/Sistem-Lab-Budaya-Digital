<?php

namespace App\Jobs;

use App\Models\Lecturer;
use App\service\SyncCoordinator;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncLecturerData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $lecturer;

    /**
     * Jumlah maksimum percobaan (retry) jika sinkronisasi gagal (misalnya karena Timeout Scopus).
     *
     * @var int
     */
    public $tries = 3;

    /**
     * Create a new job instance.
     */
    public function __construct(Lecturer $lecturer)
    {
        $this->lecturer = $lecturer;
    }

    /**
     * Execute the job.
     */
    public function handle(SyncCoordinator $syncCoordinator): void
    {
        Log::info("[SyncLecturerData Job] Memulai sinkronisasi latar belakang untuk Lecturer ID: {$this->lecturer->id}");
        
        try {
            $syncCoordinator->syncAll($this->lecturer);
            Log::info("[SyncLecturerData Job] Sinkronisasi berhasil untuk Lecturer ID: {$this->lecturer->id}");
        } catch (\Exception $e) {
            Log::error("[SyncLecturerData Job] Sinkronisasi gagal untuk Lecturer ID: {$this->lecturer->id}. Error: " . $e->getMessage());
            // Lemparkan kembali exception agar worker tahu job ini gagal dan bisa melakukan retry
            throw $e;
        }
    }
}
