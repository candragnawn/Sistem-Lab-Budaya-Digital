<?php require 'vendor/autoload.php'; \ = require_once 'bootstrap/app.php'; \ = \->make(Illuminate\Contracts\Console\Kernel::class); \->bootstrap(); \ = Illuminate\Http\Request::create('/api/publications', 'POST', ['title'=>'Test API','category'=>'PENELITIAN','type'=>'JURNAL','year'=>'2026','is_verified'=>true]); \->headers->set('Accept', 'application/json'); \ = \->handle(\); echo 'STATUS: ' . \->getStatusCode(); echo \
\nBODY:
\ . \->getContent(); 
