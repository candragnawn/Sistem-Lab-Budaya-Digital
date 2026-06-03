<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use App\service\SyncCoordinator;
use App\Http\Resources\Master\LecturerResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SyncController extends Controller
{
    protected SyncCoordinator $syncCoordinator;

    public function __construct(SyncCoordinator $syncCoordinator)
    {
        $this->syncCoordinator = $syncCoordinator;
    }

    /**
     * singkronisasi berdasarkan lecturer id (1 dosen)
     */
    public function syncAll(Request $request, $lecturerId)
    {
        $lecturer = Lecturer::find($lecturerId);

        if (!$lecturer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lecturer not found'
            ], 404);
        }

        try {
            // Memanggil ketiga API (SINTA, SISTER, Elsevier)
            $this->syncCoordinator->syncAll($lecturer);

            $lecturer->refresh();
            $lecturer->load([
                'stats', 
                'ranks', 
                'positions', 
                'workContracts', 
                'teachings', 
                'publications'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Sinkronisasi berhasil dijalankan untuk ' . $lecturer->name,
                'data' => new LecturerResource($lecturer)
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat sinkronisasi: ' . $e->getMessage()
            ], 500);
        }
    }
}
