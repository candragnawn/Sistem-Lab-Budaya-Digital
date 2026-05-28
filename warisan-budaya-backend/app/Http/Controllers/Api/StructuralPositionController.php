<?php

namespace App\Http\Controllers\Api;

class StructuralPositionController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPengabdian\StructuralPosition::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\StoreStructuralPositionRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\UpdateStructuralPositionRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPengabdian\\StructuralPositionResource";
}
