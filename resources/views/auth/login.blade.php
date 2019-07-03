@extends('layouts.login')
@section('title','Login')
@section('head')
@parent
<link href="../css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
@endsection
@section('content-login')
<div>
    <h1 class="logo-name">IN+</h1>
</div>
<div class="gray-bg p-3 b-r-md">
    {{--  <h3>Bienvenid@ a {{ config('app.name', 'Laravel') }}</h3> --}}
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="form-group">
            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="email">
            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group">
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                name="password" required autocomplete="current-password" placeholder="password">
            @error('password')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="form-group row">
            <div class="col-md-6 offset-md-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember"
                        {{ old('remember') ? 'checked' : '' }}>
                    <label class="form-check-label" for="remember"> {{ __('Remember Me') }} </label>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary block full-width m-b">
            {{ __('Login') }}
        </button>
        @if (Route::has('password.request'))
        <a class="btn btn-link" href="{{ route('password.request') }}">
            {{ __('¿Olvidaste tu contraseña?') }}
        </a>
        @endif
        <p class="text-muted text-center"><small>¿No tiene una cuentat?</small></p>
        <a class="btn btn-sm   btn-success" href="{{ route('register') }}">Registrarse en
            {{ config('app.name', 'Laravel') }}</a>
    </form>
</div>
<p class="m-t text-white"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
@endsection
@section('Js')
@parent
<!-- Archivos adicionales, opcionales -->
<script src="js/generales/generales.js" type="text/javascript"></script>
<script src="js/generales/errores.js" type="text/javascript"></script>
<script src="js/generales/acceso.js" type="text/javascript"></script>
@endsection
