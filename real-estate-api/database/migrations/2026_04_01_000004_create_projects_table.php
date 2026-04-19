<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->foreignId('area_id')->constrained()->cascadeOnDelete();
            $table->foreignId('developer_id')->constrained()->cascadeOnDelete();
            $table->string('title_en');
            $table->string('title_ar');
            $table->string('slug')->unique();
            $table->text('short_description_en')->nullable();
            $table->text('short_description_ar')->nullable();
            $table->text('full_description_en')->nullable();
            $table->text('full_description_ar')->nullable();
            $table->enum('project_type', ['residential', 'commercial', 'administrative', 'mixed', 'compound'])->default('residential');
            $table->enum('unit_type', ['apartment', 'villa', 'townhouse', 'twin_house', 'penthouse', 'studio', 'office', 'shop', 'warehouse'])->default('apartment');
            $table->decimal('price_from', 15, 2)->nullable();
            $table->decimal('price_to', 15, 2)->nullable();
            $table->integer('installment_years')->nullable();
            $table->decimal('down_payment', 5, 2)->nullable();
            $table->date('delivery_date')->nullable();
            $table->text('location_map')->nullable();
            $table->string('location_link')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['active', 'inactive', 'sold_out', 'coming_soon'])->default('active');
            $table->string('cover_image')->nullable();
            $table->json('amenities')->nullable();
            $table->integer('total_units')->nullable();
            $table->integer('available_units')->nullable();
            $table->decimal('area_from', 10, 2)->nullable();
            $table->decimal('area_to', 10, 2)->nullable();
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->json('gallery')->nullable();
            $table->json('floor_plans')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
