<?php

namespace App\Http\Controllers;

use App\Models\Sessiondemande;
use App\Http\Requests\StoreSessiondemandeRequest;
use App\Http\Requests\UpdateSessiondemandeRequest;

class SessiondemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sessiondemandes = Sessiondemande::orderBy('id', "DESC")->get(); 
        $action = ""; 
        $success = null;  
        return view('sessiondemandes.sessiondemandes-index', compact('sessiondemandes'), ['action' => $action, 'success' => $success]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    { 
        $sessiondemande = new Sessiondemande;   // new empty object
        $action = "create"; // action create 
        $success = session('success') ? session('success') : null; 
        $nbrows = Sessiondemande::count(); 
        return view('sessiondemandes.sessiondemandes-create-edit', compact('sessiondemande'), ['action'=> $action, 'success' => $success, 'nbrows' => $nbrows]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessiondemandeRequest $request)
    {
        try {
            Sessiondemande::create([
                'sedcode' => $request->code, 
                'seddatedebut' => $request->datedebut, 
                'seddatefin' => $request->datefin, 
                'sedcommentaire' => $request->commentaire, 
            ]); 
            return redirect()->route('sessiondemandes.create')->with(['action' => "create", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sessiondemandes.create')->with(['action' => "create", 'success' => false]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sessiondemande $sessiondemande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sessiondemande $sessiondemande)
    {
        // $sessiondemande = new Sessiondemande;   // new empty object
        $action = "edit"; // action edit  
        $success = session('success') ? session('success') : null;
        return view('sessiondemandes.sessiondemandes-create-edit', compact('sessiondemande'), ['action' => $action, 'success' => $success]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessiondemandeRequest $request, Sessiondemande $sessiondemande)
    {
        try {
            Sessiondemande::findOrFail($sessiondemande->id)->update([
                'sedcode' => $request->code, 
                'seddatedebut' => $request->datedebut, 
                'seddatefin' => $request->datefin, 
                'sedcommentaire' => $request->commentaire, 
            ]); 
            return redirect()->route('sessiondemandes.edit', $sessiondemande)->with(['action' => "edit", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sessiondemandes.edit', $sessiondemande)->with(['action' => "edit", 'success' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sessiondemande $sessiondemande)
    {
        $response = $sessiondemande->delete(); 
        return redirect()->route('sessiondemandes.index')->with(['action' => "delete", 'success' => true]);
    }
}
