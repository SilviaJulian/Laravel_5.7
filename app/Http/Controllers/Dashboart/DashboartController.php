<?php

namespace HomeMadrid\Http\Controllers\Dashboart;

use Illuminate\Http\Request;
use HomeMadrid\Http\Controllers\Controller;
use HomeMadrid\Models\Tables\User;
use Auth;

//Importing laravel-permission models
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

//Enables us to output flash messaging
use Session;

class DashboartController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth','role:Empleado']);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('dashboart\dashboart');
    }
}
