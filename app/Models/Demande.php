<?php

namespace App\Models;

use App\Models\Sim;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    /** @use HasFactory<\Database\Factories\DemandeFactory> */
    use HasFactory; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'dmddate', 
        'dmdcode', 
        'user_id', 
        'sessiondemande_id', 
        'site_id', 
        'sim_id',  
    ]; 


    /**
     * The relationships
     */

    // Relationship one-to-many : Demande 0..1 <===> 0..1 Sim
    public function sim()
    {
        return $this->belongsTo(Sim::class, 'sim_id', 'id'); 
    }
}
