<?php

namespace HomeMadrid\Http\Controllers\Auth;

use HomeMadrid\Models\Tables\User;
use HomeMadrid\Models\Tables\Tpeople;
use HomeMadrid\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        /*  return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]); */
        return Validator::make($data, [
            'name' => ['required', 'string', 'min:2', 'max:80'],
            'last_name' => ['required', 'string', 'min:4', 'max:100'],
            'sexo' => ['required', 'string', 'min:3', 'max:4'],
            'f_nacimiento' => ['string', 'size:10'],
            'name_user' => ['required', 'string', 'min:2', 'max:40', 'unique:tusers'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:tusers'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new people instance after a valid registration.
     *
     * @param  array  $data
     * @return \HomeMadrid\Models\Tables\People
     */
    protected function create(array $data)
    {
        $idPeople = Tpeople::create([
            'name' => $data['name'],
            'last_name' => $data['last_name'],
            'gender' => $data['sexo'],
            'date_birth' => $data['f_nacimiento'],
            'created_by' => 'name_user',
        ]);
        return $this->createUser($data, $idPeople->id);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \HomeMadrid\Models\Tables\User
     */
    protected function createUser(array $data, $idPeople)
    {
        return User::create([
            'fk_tpeoples' => $idPeople,
            'name_user' => $data['name_user'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'created_by' => 'name_user',
        ]);
    }
}
