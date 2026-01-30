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
        Schema::create('sims', function (Blueprint $table) {
            $table->id();
            $table->string('simcode')->unique(); 
            $table->string('simnumero')->unique(); 
            $table->date('simdateactivation')->nullalble(); 
            $table->date('simdateremise')->nullable();
            $table->date('simdatesuspension')->nullable();
            $table->string('simmotifsuspension')->nullable(); 
            $table->enum('simperte', ["non", "oui"])->default("non");
            $table->string('simdeclarationperte')->nullable();
            $table->date('simdateretrait')->nullable();
            $table->string('simmotifretrait')->nullable(); 
            $table->timestamps(); 
            // Relation 1 à plusieurs : User 0..1 <===> 0..* Sim
            $table->unsignedBigInteger('user_id')->nullable(); 
            $table->foreign('user_id')->references('id')->on('users'); 
            // // Relation 1 à plusieurs : Demande 0..1 <===> 0..1 Sim
            // $table->unsignedBigInteger('demande_id'); 
            // $table->foreign('demande_id')->references('id')->on('demandes'); 
            // Relation 1 à plusieurs : Site 0..1 <===> 0..* Sim
            $table->unsignedBigInteger('site_id')->nullable(); 
            $table->foreign('site_id')->references('id')->on('sites'); 
            // Relation 1 à plusieurs : Sessionremise 0..1 <===> 0..* Sim
            $table->unsignedBigInteger('sessionremise_id')->nullable(); 
            $table->foreign('sessionremise_id')->references('id')->on('sessionremises'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sims');
    }
};
