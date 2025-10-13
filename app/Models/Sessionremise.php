<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessionremise extends Model
{
    /** @use HasFactory<\Database\Factories\SessionremiseFactory> */
    use HasFactory; 

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sercode', 
        'serdatedebut', 
        'serdatefin', 
        'sercommentaire',  
    ];
}
