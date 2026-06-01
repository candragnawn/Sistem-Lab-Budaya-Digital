<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\PelaksanaanPenelitian\Publication;
use App\Http\Requests\PelaksanaanPenelitian\StorePublicationRequest;
use App\Http\Requests\PelaksanaanPenelitian\UpdatePublicationRequest;
use App\Http\Resources\PelaksanaanPenelitian\PublicationResource;
use App\Models\PelaksanaanPenelitian\PublicationAuthor;

class PublicationController extends BaseCrudController
{
    protected $model = Publication::class;
    protected $resource = PublicationResource::class;
    protected $storeRequest = StorePublicationRequest::class;
    protected $updateRequest = UpdatePublicationRequest::class;
    protected $with = ['lecturer'];

    public function store (Request $request)
    {
        $lecturerId = $request->user()->lecturer_id;

        $validatedData = $request->validate(app($this->storeRequest)->rules());

        $validatedData['lecturer_id'] = $lecturerId;

        $newPublication = Publication::create($validatedData);

        PublicationAuthor::create([
            'lecturer_id' => $lecturerId,
            'publication_id' => $newPublication->id,
            'author_position' => $request->author_position,
        ]); 

        return $this->successResponse($newPublication, 201);
        
    }

    public function update(Request $request, $id)
    {
        $publikasi = $this->model::findorFail($id);

        $this->checkOwnership($request, $publikasi);

        $validated = $request->validate(app($this->updateRequest)->rules());
        $publikasi->update($validated);

        if ($request->has('author_position')){
            $author = PublicationAuthor::where('publication_id', $publikasi->id)->first();

            if($author){
                $author->author_position = $request->author_position;
                $author->save();
            }
        }
        $this->loadRelations($publikasi);
        return $this->successResponse($publikasi);
    }
}
