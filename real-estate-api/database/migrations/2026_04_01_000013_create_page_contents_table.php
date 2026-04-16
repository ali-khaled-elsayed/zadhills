<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_contents', function (Blueprint $table) {
            $table->id();
            $table->string('page_slug'); // home, about, contact, projects, etc.
            $table->string('section'); // hero, features, about, etc.
            $table->string('key'); // unique identifier for the content
            $table->text('content_en')->nullable();
            $table->text('content_ar')->nullable();
            $table->string('type')->default('text'); // text, html, image, json
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->json('meta')->nullable(); // additional data
            $table->timestamps();

            $table->index(['page_slug', 'section']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_contents');
    }
};
