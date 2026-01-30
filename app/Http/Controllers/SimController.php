<?php

namespace App\Http\Controllers;

use App\Http\Controllers\FileController;
use App\Http\Requests\StoreSimRequest;
use App\Http\Requests\UpdateSimRequest;
use App\Models\Demande;
use App\Models\Sim;
use Illuminate\Http\Request;


class SimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { 
        $sims = Sim::orderBy('id', "DESC")->get(); 
        $action = ""; 
        $success = null;  
        return view('sims.sims-index', compact('sims'), ['action' => $action, 'success' => $success]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sim = new Sim;   // new empty object
        $action = "create"; // action create 
        $success = session('success') ? session('success') : null; 
        $nbrows = Sim::count(); 
        return view('sims.sims-create-edit', compact('sim'), ['action'=> $action, 'success' => $success, 'nbrows' => $nbrows]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSimRequest $request)
    { 
        try {
            Sim::create([
                'simcode' => $request->code,
                'simnumero' => $request->numero,
                'simdateactivation' => $request->dateactivation,
                'simdateremise' => $request->dateremise,
                'simperte' => $request->perte,
                // 'simdeclarationperte' => $request->declarationperte,
                'simdatesuspension' => $request->datesuspension,
                'simmotifsuspension' => $request->motifsuspension,
                'simdateretrait' => $request->dateretrait,
                'simmotifretrait' => $request->motifretrait,
            ]); 
            return redirect()->route('sims.create')->with(['action' => "create", 'success' => true]);
        } catch (\Throwable $th) {dd($th); 
            //throw $th; 
            return redirect()->route('sims.create')->with(['action' => "create", 'success' => false]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sim $sim)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sim $sim)
    {
        // $sim = new Sim;   // new empty object
        $action = "edit"; // action create  
        return view('sims.sims-create-edit', compact('sim'), ['action'=> $action]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSimRequest $request, Sim $sim)
    {
        try {
            Sim::findOrFail($sim->id)->update([
                'simcode' => $request->code,
                'simnumero' => $request->numero,
                'simdateactivation' => $request->dateactivation,
                'simdateremise' => $request->dateremise,
                'simperte' => $request->perte,
                // 'simdeclarationperte' => $request->declarationperte,
                'simdatesuspension' => $request->datesuspension,
                'simmotifsuspension' => $request->motifsuspension,
                'simdateretrait' => $request->dateretrait,
                'simmotifretrait' => $request->motifretrait,
            ]); 
            return redirect()->route('sims.edit', $sim)->with(['action' => "create", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sims.edit', $sim)->with(['action' => "create", 'success' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sim $sim)
    {
        $response = $sim->delete(); 
        return redirect()->route('sims.index')->with(['action' => "delete", 'success' => true]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function guest_declarer_perte()
    {
        return view('sims.sim-guest-declarer-perte');
    }

     /**
     * Update the specified resource in storage.
     */
    public function update_guest_declarer_perte(Request $request)
    {
        // validation des données du formulaire 
        // $request->validate()
        try {
            // extraction de la demande concerné via son code 
            $demande = Demande::where('code', "=", $request->code)->get();
            
            if ($demande->count() == 0) { 
                // Mise à jour des informations de perte de la carte sim 
                // 1. Sauvegarde du fichier de déclaration de perte dans le dossier /storage/app/public/simpertes
                $paths = FileController::store($request, 'simpertes', 1);
                // 2. Mise à jour des valeurs des attributs <simperte> et <simdeclarationperte> dans la table sims
                // return redirect()->route('sim-guest-declarer-perte')->with('danger', "Echec : Demande non trouvé !")->withInput(); 
            }

            // Y a-t-il une carte sim affectée à la demande ?
            if ($demande->sims) {
                return $demande->sims; 
            } 
             
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sim-guest-declarer-perte')->with('danger', "Echec : Demande non trouvé !")->withInput(); 
        }
    }


    
}
