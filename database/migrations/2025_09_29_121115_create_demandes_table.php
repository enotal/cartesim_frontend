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
        Schema::create('demandes', function (Blueprint $table) {
            $table->id();
            $table->date('dmddate'); 
            $table->char('dmdcode', 12)->unique(); 
            $table->timestamps();
            // Relation 1 à plusieurs : User 1..1 <===> 0..* Demande
            $table->unsignedBigInteger('user_id'); 
            $table->foreign('user_id')->references('id')->on('users'); 
            // Relation 1 à plusieurs : Sessiondemande 0..1 <===> 0..* Demande
            $table->unsignedBigInteger('sessiondemande_id'); 
            $table->foreign('sessiondemande_id')->references('id')->on('sessiondemandes'); 
            // Relation 1 à plusieurs : Site 1..1 <===> 0..* Demande
            $table->unsignedBigInteger('site_id'); 
            $table->foreign('site_id')->references('id')->on('sites'); 
            // Relation 1 à plusieurs : Demande 0..1 <===> 0..1 Sim
            $table->unsignedBigInteger('sim_id')->nullable(); 
            $table->foreign('sim_id')->references('id')->on('sims'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demandes');
    }
};
