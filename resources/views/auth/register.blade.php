@extends('layouts.login')
@section('title', 'Registro')

@section('head')
@parent
@endsection

@section('content-register')

<div class="col-lg-6 p-3 text-center">
    <h1 class="logo-name">HM+</h1>
    <p class="m-t">
        <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
    </p>
</div>
<div class="col-lg-6 text-center">
    <h2 class="text-success">Crea tu cuenta personal.</h2>
    <form method="POST" action="{{ route('register') }}" class="p-3">
        @csrf
        <div class="form-group row">
            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
                value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="name">
            @error('name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <input id="last_name" type="text" class="form-control @error('last_name') is-invalid @enderror"
                name="last_name" value="{{ old('last_name') }}" required autocomplete="last_name"
                placeholder="last_name">
            @error('last_name')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>{{-- Sexo --}}
        <div class="form-group row">
            <select id="sexo" class="form-control @error('sexo') is-invalid @enderror" name="sexo"
                value="{{ old('sexo') }}" required autocomplete="sexo">
                <option>Selecciona una opción</option>
                <option value="Fem">Femenino</option>
                <option value="Masc">Masculino</option>
            </select>
            @error('sexo')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>{{-- Fecha de nacimiento --}}
        <div class="form-group row">
            <input id="f_nacimiento" type="date" class="form-control @error('f_nacimiento') is-invalid @enderror"
                name="f_nacimiento" value="{{ old('f_nacimiento') }}" autocomplete="f_nacimiento"
                placeholder="f_nacimiento">
            @error('f_nacimiento')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <input id="name_user" type="text" class="form-control @error('name_user') is-invalid @enderror"
                name="name_user" value="{{ old('name_user') }}" required autocomplete="name_user"
                placeholder="name_user">
            @error('name_user')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                value="{{ old('email') }}" required autocomplete="email" placeholder="email">
            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                name="password" required autocomplete="new-password" placeholder="password">
            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required
                autocomplete="new-password" placeholder="password-confirm">
        </div>
        <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-2">
                <button type="submit" class="btn btn-primary">
                    {{ __('Register') }}
                </button>
            </div>
        </div>
    </form>
</div>
@endSection
