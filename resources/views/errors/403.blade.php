@extends('layouts.web')

@section('title','E-404')
@section('dashboard-header')
<div class="card-body">
    @if (session('status'))
    <div class="alert alert-success" role="alert">
        {{ session('status') }}
    </div>
    @endif
</div>
@endsection

@section('page-wrapper')
<div class="middle-box text-center animated fadeInDown">
    <h1>403</h1>
    <h3 class="font-bold">Usted no tiene permiso para acceder</h3>
    <div class="error-desc">
    </div>
</div>
@endsection
@section('Js')
@parent
<!-- Archivos adicionales, opcionales -->
<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>

<!-- jQuery UI -->
<script src="js/plugins/jquery-ui/jquery-ui.min.js"></script>
@endsection
