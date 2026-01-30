<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;
    
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

         User::create([
            'identifiant' => "456789A", 
            'name' => 'admin', 
            'nom' => "SANA", 
            'prenom' => "Adama", 
            'email' => 'adamasana929@gmail.com',
            'telephone1' => "54279448", 
            'telephone2' => "58125409",
            'role' => "administrateur",
            'isuser' => "oui", 
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        
    }
}
