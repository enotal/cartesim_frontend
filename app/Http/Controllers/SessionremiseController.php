<?php

namespace App\Http\Controllers;

use App\Models\Sessionremise;
use App\Http\Requests\StoreSessionremiseRequest;
use App\Http\Requests\UpdateSessionremiseRequest;

class SessionremiseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sessionremises = Sessionremise::orderBy('id', "DESC")->get(); 
        $action = ""; 
        $success = null;  
        return view('sessionremises.sessionremises-index', compact('sessionremises'), ['action' => $action, 'success' => $success]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $sessionremise = new Sessionremise;   // new empty object
        $action = "create"; // action create 
        $success = session('success') ? session('success') : null; 
        $nbrows = Sessionremise::count(); 
        return view('sessionremises.sessionremises-create-edit', compact('sessionremise'), ['action'=> $action, 'success' => $success, 'nbrows' => $nbrows]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSessionremiseRequest $request)
    {
        try {
            Sessionremise::create([
                'sercode' => $request->code, 
                'serdatedebut' => $request->datedebut, 
                'serdatefin' => $request->datefin, 
                'sercommentaire' => $request->commentaire, 
            ]); 
            return redirect()->route('sessionremises.create')->with(['action' => "create", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sessionremises.create')->with(['action' => "create", 'success' => false]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Sessionremise $sessionremise)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sessionremise $sessionremise)
    {
        // $sessionremise = new Sessionremise;   // new empty object
        $action = "edit"; // action edit  
        $success = session('success') ? session('success') : null;
        return view('sessionremises.sessionremises-create-edit', compact('sessionremise'), ['action' => $action, 'success' => $success]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSessionremiseRequest $request, Sessionremise $sessionremise)
    {
        try {
            Sessionremise::findOrFail($sessionremise->id)->update([
                'sercode' => $request->code, 
                'serdatedebut' => $request->datedebut, 
                'serdatefin' => $request->datefin, 
                'sercommentaire' => $request->commentaire, 
            ]); 
            return redirect()->route('sessionremises.edit', $sessionremise)->with(['action' => "edit", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sessionremises.edit', $sessionremise)->with(['action' => "edit", 'success' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sessionremise $sessionremise)
    {
        $response = $sessionremise->delete(); 
        return redirect()->route('sessionremises.index')->with(['action' => "delete", 'success' => true]);
    }
}
