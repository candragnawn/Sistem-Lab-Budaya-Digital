<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;

class LecturerController extends Controller
{     
    public function index()
    {
        return response()->json(Lecturer::all());
    }

    public function show($id)
    {
        $lecturer = Lecturer::withCount([
            'publications as jurnal_count' => function ($query) {
                $query->where('type', 'Jurnal Ilmiah');
            },
            'publications as buku_count' => function ($query) {
                $query->where('type', 'Buku Referensi');
            },
            'publications as hki_count' => function ($query) {
                $query->where('type', 'HKI');
            },
            'publications as pengabdian_count' => function ($query) {
                $query->where('category', 'PENGABDIAN');
            }
        ])->with(['publications', 'digitalAssets', 'workContracts', 'education', 'ranks', 'positions', 'teachings'=> function ($query) {
            $query->orderBy('academic_year', 'desc')->orderBy('course_name', 'asc');
        }, 'Study'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'data' => $lecturer
        ]);
    }
}
