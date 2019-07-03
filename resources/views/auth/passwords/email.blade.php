@extends('layouts.login')
@section('title','Nueva contraseña')
@section('head')
@parent
@endsection
@section('content-login')
<div class="ibox ">
    <div class="ibox-title">
        <h4 >Restablecer la contraseña.</h4>
    </div>
    <div class="ibox-content">
        <div class="card-body">
            @if (session('status'))
            <div class="alert alert-success" role="alert">
                {{ session('status') }}
            </div>
            @endif

            <form method="POST" action="{{ route('password.email') }}">
                @csrf

                <div class="form-group row justify-content-centerr ">
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                        name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                        placeholder="email">

                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong class="invalid-feedback">{{ $message }}</strong>
                    </span>
                    @enderror
                    <small class="text-success">* Ingresa el correo con la que fuiste registrado.</small>
                </div>
                <div class="form-group row mb-0">
                    <button type="submit" class="btn btn-primary block full-width m-b">
                        {{ __('Enviar Link') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="row">
        <p class="m-t text-center">
            <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
        </p>
    </div>
</div>
@endsection
