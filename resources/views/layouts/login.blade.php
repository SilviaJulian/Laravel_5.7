<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @section('head')
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('font-awesome/css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css')}}" rel="stylesheet">
    <title>Home Madrid | @yield('title') </title>
    @show
</head>

<body>
    <div class="loginColumns animated fadeInDown p-xs">
        <div class="row gray-bg  b-r-md">
            @yield('content-register')
        </div>
    </div>
    <div class="middle-box text-center loginscreen animated fadeInDown ">
        <div id="login">
            @yield('content-login')
        </div>
    </div>
    <div class="middle-box animated fadeInDown m-t-xs ">
        <div class="row">
            <div class="col-md-12">
                @yield('content-resetPassword')
            </div>
        </div>
    </div>


    <!-- Mainly scripts -->
    @section('Js')
    <script src=" {{ asset('js/jquery-3.1.1.min.js') }}"></script>
    <script src="{{ asset('js/popper.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.js') }}"></script>
    @show
</body>

</html>
