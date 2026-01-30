<?php

namespace App\Models;

use App\Models\Demande;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sim extends Model
{
    /** @use HasFactory<\Database\Factories\SimFactory> */
    use HasFactory; 

      /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'simcode',
        'simnumero', 
        'simdateactivation', 
        'simdateremise', 
        'simdatesuspension', 
        'simmotifsuspension', 
        'simperte', 
        'simdeclarationperte', 
        'simdateretrait', 
        'simmotifretrait', 
        'user_id', 
        // 'demande_id', 
        'site_id', 
        'sessionremise_id', 
    ];


    /**
     * The relationships
     */

    // Relationship one-to-many : Demande 0..1 <===> 0..1 Sim
    public function demandes()
    {
        return $this->hasMany(Demande::class, 'sim_id', 'id'); 
    }
}
