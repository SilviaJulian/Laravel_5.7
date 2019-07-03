@section('nav')
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <img alt="image" class="rounded-circle" src="img/profile_small.jpg" />
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <span class="block m-t-xs font-bold"> {{ Auth::user()->name_user }}</span>
                        <span class="text-muted text-xs block"> {{ Auth::user()->getRoleName() }}<b class="caret"></b></span>
                    </a>
                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                        <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                        <li><a class="dropdown-item" href="contacts.html">Contacts</a></li>
                        <li><a class="dropdown-item" href="mailbox.html">Mailbox</a></li>
                        <li class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="login.html">Logout</a></li>
                    </ul>
                </div>
                <div class="logo-element">
                    IN+
                </div>
            </li>
            <li class="active">
                <a href="{{route ('inicio') }}"><i class="fa fa-diamond"></i> <span class="nav-label">{{ __('Inicio') }}</a>
            </li>
            <li>
                <a href="{{route ('inicio') }}"><i class="fa fa-th-large"></i> <span
                        class="nav-label">{{ __('Dashboart') }}</span> <span class="fa arrow"></span></a>
                <ul class="nav nav-second-level">
                    <li class="active"><a href="{{route ('dashboart') }}">{{ __('dashboart v1') }}</a></li>
                    <li><a href="{{route ('inicio') }}">Dashboard v.2</a></li>
                    <li><a href="{{route ('home') }}">Dashboard v.3</a></li>
                </ul>
            </li>

            <li class="special_link">
                <a href="package.html"><i class="fa fa-database"></i> <span class="nav-label">Package</span></a>
            </li>
        </ul>
    </div>
</nav>
@show
