<?php

namespace App\Service;

use Buglinjo\LaravelWebp\Facades\Webp;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageConverter
{
    public static function convertToWebp($imagePath, $directory = 'images', $quality = 70)
    {
        if (!$imagePath instanceof UploadedFile) {
            return $imagePath;
        }

        try {
            $filename = Str::uuid() . '.webp';
            $relativePath = $directory . '/' . $filename;
            $absolutePath = storage_path('app/public/' . $relativePath);
            
            $dir = dirname($absolutePath);
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }

            $success = Webp::make($imagePath)->save($absolutePath, $quality);

            if ($success) {
                return $relativePath;
            }

            throw new \Exception("Failed to convert image to WebP.");
        } catch (\Exception $exception) {
            $fallbackFilename = Str::uuid() . '.' . $imagePath->getClientOriginalExtension();
            return $imagePath->storeAs($directory, $fallbackFilename, 'public');
        }
    }
}