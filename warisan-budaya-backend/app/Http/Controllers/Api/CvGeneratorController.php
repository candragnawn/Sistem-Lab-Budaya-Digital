<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\service\AiService;
use App\Models\Kualifikasi\LecturerEducation;

class CvGeneratorController extends Controller
{
    protected AiService $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
    }

    public function generate(Request $request)
    {
        $user = $request->user();
        if (!$user || !$user->lecturer) {
            return response()->json([
                'success' => false,
                'message' => 'Lecturer profile not found for this user.'
            ], 404);
        }

        $lecturer = $user->lecturer()->with([
            //'educations', // No direct relation on Lecturer model? wait let me check
            'research',
            'communityServices',
            'publications',
            'placements',
            'hki',
            'addresses'
        ])->first();

       
        $educations = LecturerEducation::where('lecturer_id', $lecturer->id)
                        ->orderBy('graduation_year', 'desc')
                        ->get();

        $lecturerData = $lecturer->toArray();
        $lecturerData['educations'] = $educations->toArray();

        
        $aiSummary = $this->aiService->generateCvSummary($lecturerData);

        return response()->json([
            'success' => true,
            'message' => 'CV data generated successfully.',
            'data' => [
                'ai_summary' => $aiSummary,
                'profile' => [
                    'name' => $lecturer->name,
                    'phone' => $lecturer->phone ?? '-',
                    'email' => $lecturer->email ?? '-',
                    'address' => $addresses->address ?? '-', // can fetch from addresses relation
                    'institution' => 'Universitas Udayana', // default
                    'faculty' => $lecturer->faculty ?? '-',
                    'major' => $lecturer->study_program ?? '-',
                ],
                'educations' => $educations->map(function($edu) {
                    return [
                        'title' => $edu->level . ' ' . $edu->study_program,
                        'organization' => $edu->university,
                        'period' => $edu->entry_year . ' - ' . ($edu->graduation_year ?? 'Sekarang'),
                    ];
                })->toArray(),
                'research' => $lecturer->research->map(function($r) {
                    return [
                        'title' => $r->title,
                        'period' => $r->implementation_year,
                        'organization' => $r->scientific_field,
                    ];
                })->toArray(),
                'publications' => $lecturer->publications->map(function($p) {
                    return [
                        'title' => $p->title,
                        'organization' => $p->journal_name ?? $p->type,
                        'period' => $p->year,
                    ];
                })->toArray(),
                'community_services' => $lecturer->communityServices->map(function($c) {
                    return [
                        'title' => $c->title,
                        'organization' => $c->scientific_field,
                        'period' => $c->implementation_year,
                    ];
                })->toArray(),
            ]
        ]);
    }
}
