<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiteRequest;
use App\Http\Requests\UpdateSiteRequest;
use App\Models\Site;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sites = Site::orderBy('id', "DESC")->get(); 
        $action = ""; 
        $success = null;  
        return view('sites.sites-index', compact('sites'), ['action' => $action, 'success' => $success]); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {  
        $site = new Site;   // new empty object
        $action = "create"; // action create 
        $success = session('success') ? session('success') : null; 
        $nbrows = Site::count(); 
        return view('sites.sites-create-edit', compact('site'), ['action'=> $action, 'success' => $success, 'nbrows' => $nbrows]); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSiteRequest $request)
    {
        try {
            Site::create([
                'sitnom' => $request->nom
            ]); 
            return redirect()->route('sites.create')->with(['action' => "create", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sites.create')->with(['action' => "create", 'success' => false]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Site $site)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(Site $site)
    public function edit(Site $site)
    {
        // $site = new Site;   // new empty object
        $action = "edit"; // action create  
        $success = session('success') ? session('success') : null;
        return view('sites.sites-create-edit', compact('site'), ['action' => $action, 'success' => $success]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSiteRequest $request, Site $site)
    {
        try {
            Site::findOrFail($site->id)->update([
                'sitnom' => $request->nom
            ]); 
            return redirect()->route('sites.edit', $site)->with(['action' => "edit", 'success' => true]);
        } catch (\Throwable $th) {
            //throw $th; 
            return redirect()->route('sites.edit', $site)->with(['action' => "edit", 'success' => false]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Site $site)
    {
        $response = $site->delete(); 
        return redirect()->route('sites.index')->with(['action' => "delete", 'success' => true]);
    }
}
