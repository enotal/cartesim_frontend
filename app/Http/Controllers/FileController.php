<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    static public function store(Request $request, string $storagePath, string $id)
    {
        // Validate the uploaded file (recommended)
        /*$request->validate([
            'file' => 'image|max:2048|mimes:jpg,png', // Example validation rules
        ]);*/
        $files = $request->file;

        // Using storeAs() to specify filename and path
        // $fileName = time() . '.' . $request->file('document')->extension();
        // $path = $request->file('document')->storeAs('public/documents', $fileName);
        $fileName = $id . '.' . $files->extension();
        return $files->storeAs($storagePath, $fileName, 'public');
        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
