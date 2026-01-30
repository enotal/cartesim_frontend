<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tableHeaders = [
            ['title' => "Nom", 'data' => "nom"], 
            ['title' => "Prénom(s)", 'data' => "prenom"],
            ['title' => "Email", 'data' => "email"],
            ['title' => "Téléphone 1", 'data' => "telephone1"],
            ['title' => "Téléphone 2", 'data' => "telephone2"],
        ];
        $tableActions = ["show", "edit", "delete"]; 
        $tableItems = User::all(); 
        return view('users.users-index', compact('tableItems'), ['tableHeaders' => $tableHeaders, 'tableActions' => $tableActions]); 
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
    public function store(Request $request)
    {
        //
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
