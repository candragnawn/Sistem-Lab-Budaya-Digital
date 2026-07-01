<?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Api\AuthController;
    use App\Http\Controllers\Api\LecturerController;
    use App\Http\Controllers\Api\CategoryController;
    use App\Http\Controllers\Api\PublicationController;
    use App\Http\Controllers\Api\ResearchController;
    use App\Http\Controllers\Api\CommunityServiceController;
    use App\Http\Controllers\Api\JobController;
    use App\Http\Controllers\Api\SpeakerController;
    use App\Http\Controllers\Api\TestController;
    use App\Http\Controllers\Api\FunctionalPositionController;
    use App\Http\Controllers\Api\AwardController;
    use App\Http\Controllers\Api\WelfareController;
    use App\Http\Controllers\Api\AllowanceController;
    use App\Http\Controllers\Api\LecturerEducationController;
    use App\Http\Controllers\Api\LecturerRankController;
    use App\Http\Controllers\Api\LecturerStudyController;
    use App\Http\Controllers\Api\HKIController;
    use App\Http\Controllers\Api\LecturerEmploymentController;
    use App\Http\Controllers\Api\LecturerAcademicController;
    use App\Http\Controllers\Api\LecturerAddressController;
    use App\Http\Controllers\Api\LecturerFamilyController;
    use App\Http\Controllers\Api\InpassingController;
    use App\Http\Controllers\Api\PlacementController;
    use App\Http\Controllers\Api\ProfessorEmeritusController;
    use App\Http\Controllers\Api\DiklatController;
    use App\Http\Controllers\Api\TeachingController;
    use App\Http\Controllers\Api\StudentSupervisionController;
    use App\Http\Controllers\Api\StudentExaminationController;
    use App\Http\Controllers\Api\TeachingMaterialController;
    use App\Http\Controllers\Api\StudentDevelopmentController;
    use App\Http\Controllers\Api\VisitingScientistController;
    use App\Http\Controllers\Api\DetaseringController;
    use App\Http\Controllers\Api\AcademicOrationController;
    use App\Http\Controllers\Api\LecturerMentoringController;
    use App\Http\Controllers\Api\AdditionalTaskController;
    use App\Http\Controllers\Api\JournalManagerController;
    use App\Http\Controllers\Api\StructuralPositionController;
    use App\Http\Controllers\Api\ProfessionalMembershipController;
    use App\Http\Controllers\Api\OtherSupportingActivityController;
    use App\Http\Controllers\Api\ScholarshipController;
    use App\Http\Controllers\Api\IdentityController;
    use App\Http\Controllers\Api\CertificationController;
    use App\Http\Controllers\Api\PublicationAuthorController;
    use App\Http\Controllers\Api\LecturerStatController;
    use App\Http\Controllers\Api\OtherDataController;
    use App\Http\Controllers\Api\PositionController;
    use App\Http\Controllers\Api\RankController;
    use App\Http\Controllers\Api\WorkContractController;
    use App\Http\Controllers\Api\SourceSyncController;
    use App\Http\Controllers\Api\UserController;
    use App\Http\Controllers\Api\SyncController;
    use App\Http\Controllers\Api\CvGeneratorController;


    // Auth — throttle ketat untuk mencegah brute-force
    Route::middleware('throttle:5,1')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
    });

    Route::middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {

        // CV Generator
        Route::post('/cv/generate', [CvGeneratorController::class, 'generate']);

        // Auth
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::get('/me', [AuthController::class, 'me']);

        // Master
        Route::get('lecturers/trash', [LecturerController::class, 'trash']);
        Route::post('lecturers/{id}/restore', [LecturerController::class, 'restore']);
        Route::delete('lecturers/{id}/force-delete', [LecturerController::class, 'forceDelete']);
        Route::apiResource('lecturers', LecturerController::class);
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('users', UserController::class);

        // Profile
        Route::apiResource('identities', IdentityController::class);
        Route::apiResource('lecturer-addresses', LecturerAddressController::class);
        Route::apiResource('lecturer-families', LecturerFamilyController::class);
        Route::apiResource('lecturer-academics', LecturerAcademicController::class);
        Route::apiResource('lecturer-employments', LecturerEmploymentController::class);
        Route::apiResource('functional-positions', FunctionalPositionController::class);
        Route::apiResource('structural-positions', StructuralPositionController::class);
        Route::apiResource('positions', PositionController::class);
        Route::apiResource('ranks', RankController::class);
        Route::apiResource('work-contracts', WorkContractController::class);
        Route::apiResource('placements', PlacementController::class);
        Route::apiResource('inpassings', InpassingController::class);
        Route::apiResource('professor-emerituses', ProfessorEmeritusController::class);
        Route::apiResource('allowances', AllowanceController::class);
        Route::apiResource('welfares', WelfareController::class);
        Route::apiResource('scholarships', ScholarshipController::class);
        Route::apiResource('awards', AwardController::class);

        // Kualifikasi & Pendidikan
        Route::apiResource('lecturer-educations', LecturerEducationController::class);
        Route::apiResource('certifications', CertificationController::class);
        Route::apiResource('diklats', DiklatController::class);
        Route::apiResource('tests', TestController::class);

        // Pelaksanaan Pendidikan
        Route::get('teachings/trash', [TeachingController::class, 'trash']);
        Route::post('teachings/{id}/restore', [TeachingController::class, 'restore']);
        Route::delete('teachings/{id}/force-delete', [TeachingController::class, 'forceDelete']);
        Route::apiResource('teachings', TeachingController::class);
        Route::apiResource('teaching-materials', TeachingMaterialController::class);
        Route::apiResource('student-supervisions', StudentSupervisionController::class);
        Route::apiResource('student-examinations', StudentExaminationController::class);
        Route::apiResource('student-developments', StudentDevelopmentController::class);
        Route::apiResource('visiting-scientists', VisitingScientistController::class);
        Route::apiResource('detaserings', DetaseringController::class);
        Route::apiResource('academic-orations', AcademicOrationController::class);
        Route::apiResource('lecturer-mentorings', LecturerMentoringController::class);

        // Pelaksanaan Penelitian
        Route::get('research/trash', [ResearchController::class, 'trash']);
        Route::post('research/{id}/restore', [ResearchController::class, 'restore']);
        Route::delete('research/{id}/force-delete', [ResearchController::class, 'forceDelete']);
        Route::apiResource('research', ResearchController::class);

        Route::get('publications/trash', [PublicationController::class, 'trash']);
        Route::post('publications/{id}/restore', [PublicationController::class, 'restore']);
        Route::delete('publications/{id}/force-delete', [PublicationController::class, 'forceDelete']);
        Route::apiResource('publications', PublicationController::class);
        Route::apiResource('publication-authors', PublicationAuthorController::class);
        Route::apiResource('hkis', HKIController::class);

        // Pelaksanaan Pengabdian
        Route::apiResource('community-services', CommunityServiceController::class);

        // Penunjang
        Route::apiResource('jobs', JobController::class);
        Route::apiResource('speakers', SpeakerController::class);
        Route::apiResource('journal-managers', JournalManagerController::class);
        Route::apiResource('additional-tasks', AdditionalTaskController::class);
        Route::apiResource('professional-memberships', ProfessionalMembershipController::class);
        Route::apiResource('other-supporting-activities', OtherSupportingActivityController::class);

        // Lain-lain
        Route::apiResource('lecturer-stats', LecturerStatController::class);
        Route::apiResource('other-datas', OtherDataController::class);
        Route::post('/sync/{lecturerId}', [SyncController::class, 'syncAll']);


    });

    // Public
    Route::prefix('public')->name('public.')->group(function () {
    Route::apiResource('lecturers', LecturerController::class)->only(['index', 'show']);
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);

    // Profile
    Route::apiResource('identities', IdentityController::class)->only(['index', 'show']);
    Route::apiResource('lecturer-addresses', LecturerAddressController::class)->only(['index', 'show']);
    Route::apiResource('lecturer-families', LecturerFamilyController::class)->only(['index', 'show']);
    Route::apiResource('lecturer-academics', LecturerAcademicController::class)->only(['index', 'show']);
    Route::apiResource('lecturer-employments', LecturerEmploymentController::class)->only(['index', 'show']);
    Route::apiResource('functional-positions', FunctionalPositionController::class)->only(['index', 'show']);
    Route::apiResource('structural-positions', StructuralPositionController::class)->only(['index', 'show']);
    Route::apiResource('positions', PositionController::class)->only(['index', 'show']);
    Route::apiResource('ranks', RankController::class)->only(['index', 'show']);
    Route::apiResource('work-contracts', WorkContractController::class)->only(['index', 'show']);
    Route::apiResource('placements', PlacementController::class)->only(['index', 'show']);
    Route::apiResource('inpassings', InpassingController::class)->only(['index', 'show']);
    Route::apiResource('professor-emerituses', ProfessorEmeritusController::class)->only(['index', 'show']);
    Route::apiResource('allowances', AllowanceController::class)->only(['index', 'show']);
    Route::apiResource('welfares', WelfareController::class)->only(['index', 'show']);
    Route::apiResource('scholarships', ScholarshipController::class)->only(['index', 'show']);
    Route::apiResource('awards', AwardController::class)->only(['index', 'show']);

    // Kualifikasi & Pendidikan
    Route::apiResource('lecturer-educations', LecturerEducationController::class)->only(['index', 'show']);
    Route::apiResource('certifications', CertificationController::class)->only(['index', 'show']);
    Route::apiResource('diklats', DiklatController::class)->only(['index', 'show']);
    Route::apiResource('tests', TestController::class)->only(['index', 'show']);

    // Pelaksanaan Pendidikan
    Route::apiResource('teachings', TeachingController::class)->only(['index', 'show']);
    Route::apiResource('teaching-materials', TeachingMaterialController::class)->only(['index', 'show']);
    Route::apiResource('student-supervisions', StudentSupervisionController::class)->only(['index', 'show']);
    Route::apiResource('student-examinations', StudentExaminationController::class)->only(['index', 'show']);
    Route::apiResource('student-developments', StudentDevelopmentController::class)->only(['index', 'show']);
    Route::apiResource('visiting-scientists', VisitingScientistController::class)->only(['index', 'show']);
    Route::apiResource('detaserings', DetaseringController::class)->only(['index', 'show']);
    Route::apiResource('academic-orations', AcademicOrationController::class)->only(['index', 'show']);
    Route::apiResource('lecturer-mentorings', LecturerMentoringController::class)->only(['index', 'show']);

    // Pelaksanaan Penelitian
    Route::apiResource('research', ResearchController::class)->only(['index', 'show']);
    Route::apiResource('publications', PublicationController::class)->only(['index', 'show']);
    Route::apiResource('publication-authors', PublicationAuthorController::class)->only(['index', 'show']);
    Route::apiResource('hkis', HKIController::class)->only(['index', 'show']);

    // Pelaksanaan Pengabdian
    Route::apiResource('comunityservice', CommunityServiceController::class)->only(['index', 'show']);

    // Penunjang
    Route::apiResource('jobs', JobController::class)->only(['index', 'show']);
    Route::apiResource('speakers', SpeakerController::class)->only(['index', 'show']);
    Route::apiResource('journal-managers', JournalManagerController::class)->only(['index', 'show']);
    Route::apiResource('additional-tasks', AdditionalTaskController::class)->only(['index', 'show']);
    Route::apiResource('professional-memberships', ProfessionalMembershipController::class)->only(['index', 'show']);
    Route::apiResource('other-supporting-activities', OtherSupportingActivityController::class)->only(['index', 'show']);

    // Lain-lain
    Route::apiResource('lecturer-stats', LecturerStatController::class)->only(['index', 'show']);
    Route::apiResource('other-datas', OtherDataController::class)->only(['index', 'show']);
    });