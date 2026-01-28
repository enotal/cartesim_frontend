<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDemandeRequest;
use App\Http\Requests\UpdateDemandeRequest;
use App\Models\Demande;
use App\Models\Site;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demandes = Demande::all(); 
        return view('demandes.demandes-index', compact('demandes')); 
    }

    /**
     * Display a listing of the new resources.
     */
    public function nouvelles_index()
    {
        $demandes = Demande::whereNull('sim_id')->get(); 
        return view('demandes.demandes-nouvelles-index', compact('demandes')); 
    }

    /**
     * Display a listing of the treated resources.
     */
    public function traitees_index()
    {
        $demandes = Demande::whereNotNull('sim_id')->get(); 
        return view('demandes.demandes-traitees-index', compact('demandes')); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDemandeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Demande $demande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Demande $demande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDemandeRequest $request, Demande $demande)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Demande $demande)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function guest_initier()
    {
        $filieres = []; 
        $niveaus = []; 
        $sites = Site::all();
        return view('demandes.demande-guest-initier', ['filieres' => $filieres, 'niveaus' => $niveaus, 'sites' => $sites]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function guest_initier_store(StoreDemandeRequest $request)
    {
        try {
            $demande = Demande::create([

            ]); 
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function guest_suivre(Request $request)
    {
        $search = $request->input('search'); 
        $demande = Demande::where('id', $search)->get(); 
        return view('demandes.demande-guest-suivre', compact('demande', 'search'));
    }
}
