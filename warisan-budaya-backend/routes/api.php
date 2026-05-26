<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DigitalAssetController;
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
use App\Http\Controllers\Api\LecturerIdentityController;
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

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/me',[AuthController::class, 'me']);

    Route::apiResource('lecturers', LecturerController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('digital-assets', DigitalAssetController::class);
    Route::apiResource('publications', PublicationController::class);
    Route::apiResource('research', ResearchController::class);
    Route::apiResource('community-services', CommunityServiceController::class);
    Route::apiResource('jobs', JobController::class);
    Route::apiResource('speakers', SpeakerController::class);
    Route::apiResource('tests', TestController::class);
    Route::apiResource('functional-positions', FunctionalPositionController::class);
    Route::apiResource('awards', AwardController::class);
    Route::apiResource('welfares', WelfareController::class);
    Route::apiResource('allowances', AllowanceController::class);
    Route::apiResource('lecturer-educations', LecturerEducationController::class);
    Route::apiResource('lecturer-ranks', LecturerRankController::class);
    Route::apiResource('lecturer-studies', LecturerStudyController::class);
    Route::apiResource('hkis', HKIController::class);
    Route::apiResource('lecturer-employments', LecturerEmploymentController::class);
    Route::apiResource('lecturer-academics', LecturerAcademicController::class);
    Route::apiResource('lecturer-addresses', LecturerAddressController::class);
    Route::apiResource('lecturer-families', LecturerFamilyController::class);
    Route::apiResource('lecturer-identities', LecturerIdentityController::class);
    Route::apiResource('inpassings', InpassingController::class);
    Route::apiResource('placements', PlacementController::class);
    Route::apiResource('professor-emerituses', ProfessorEmeritusController::class);
    Route::apiResource('diklats', DiklatController::class);
    Route::apiResource('teachings', TeachingController::class);
    Route::apiResource('student-supervisions', StudentSupervisionController::class);
    Route::apiResource('student-examinations', StudentExaminationController::class);
    Route::apiResource('teaching-materials', TeachingMaterialController::class);
    Route::apiResource('student-developments', StudentDevelopmentController::class);
    Route::apiResource('visiting-scientists', VisitingScientistController::class);
    Route::apiResource('detaserings', DetaseringController::class);
    Route::apiResource('academic-orations', AcademicOrationController::class);
    Route::apiResource('lecturer-mentorings', LecturerMentoringController::class);
    Route::apiResource('additional-tasks', AdditionalTaskController::class);
    Route::apiResource('journal-managers', JournalManagerController::class);
    Route::apiResource('structural-positions', StructuralPositionController::class);
    Route::apiResource('professional-memberships', ProfessionalMembershipController::class);
    Route::apiResource('other-supporting-activities', OtherSupportingActivityController::class);
    Route::apiResource('scholarships', ScholarshipController::class);
});

Route::prefix('public')->group(function () {

    Route::get('/lecturers', [LecturerController::class, 'index']);
    Route::get('/lecturers/{id}', [LecturerController::class, 'show']);

});