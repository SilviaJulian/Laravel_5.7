@extends('layouts.login')
@section('title','Login')
@section('head')
@parent
<link href="../css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
@endsection
@section('content-resetPassword')
<div class="ibox ">
    <div class="ibox-title">
        <h4>Restablecer la contraseña.</h4>
    </div>
    <div class="ibox-content ">
        <form method="POST" action="{{ route('password.update') }}">
            @csrf

            <input type="hidden" name="token" value="{{ $token }}">

            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-sm-right">{{ __('Correo') }}</label>

                <div class="col-md-8">
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                        name="email" value="{{ $email ?? old('email') }}" required autocomplete="email" autofocus>

                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-sm-right">{{ __('Contraseña.') }}</label>

                <div class="col-md-8">
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                        name="password" required autocomplete="new-password">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>
            </div>

            <div class="form-group row">
                <label for="password-confirm"
                    class="col-md-4 col-form-label text-sm-right">{{ __('Confirmar contraseña.') }}</label>

                <div class="col-md-8">
                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation"
                        required autocomplete="new-password">
                </div>
            </div>

            <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Reset Password') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
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
