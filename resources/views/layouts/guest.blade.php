<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="icon" href="{{ asset('images/uvbf-login.png') }}" type="image/png" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- styles -->
    <!-- Bootstrap, FontAwesome -->
    <link href="{{ asset('bootstrap-5.3.8-dist/css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('fontawesome-free-7.0.0-web/css/all.css') }}" rel="stylesheet" />

    <style type="text/css">
        .guest-layout-nav {
            background-color: #00407D;
        }
        
        .welcomeTitle {
            background-color: #00407D;
            color: lightgray;
            font-size: 1em;
            font-weight: bolder;
        }

        .btnInitiateRequest,
        .btnFollowRequest,
        .btnReportLoss,
        .btnLogIn {
            background-color: #00407D;
            border: 1px solid #00407D;
            color: lightgray;
        }

        .btnInitiateRequest:hover,
        .btnFollowRequest:hover,
        .btnReportLoss:hover {
            border: 1px solid #00407D;
            color: #00407D;
        }

        .btnLogIn:hover {
            background-color: #00407D;
            color: #fff;
        }

        .footer {
            font-size: 0.7em;
        }

        .form-header-title {
            background-color: #f8f8f8;
            border: 1px solid #d2d2d2;
        }

        .card-header-title {
            color: #00407D; 
            font-weight: bolder;
        }

        .form-control-label {
            /* color: #00407D; */
            font-weight: bolder;
        }

        .preview-file {
            height: 5em;
        }

        .preview-file-img {
            height: 5em;
        }
    </style>
    <!-- -->

</head>

<body class="font-sans text-gray-900 antialiased">
    <div class="min-h-screen flex flex-col sm:justify-start items-center pt-6 sm:pt-0">
        <!-- <div class="min-h-screen flex flex-col sm:justify-start items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900"> -->

        <!-- Header : Bannière -->
        <header class="w-full text-sm mb-6 not-has-[nav]:hidden">
            <nav class="flex items-start justify-start gap-0 px-4 py-2 guest-layout-nav">
                <img src="{{ asset('images/logo-uvbf.png') }}" class="block h-9 w-auto fill-current text-gray-800" />
                <div class="ms-auto flex items-center text-light">Vous n'êtes pas connecté(e) !</div>
            </nav>
        </header>
        <!--  -->

        <!-- <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg"> -->
        <div class="container bg-white overflow-hidden">
            {{ $slot }}
        </div>
        <!--  -->

        <!-- Footer -->
        @if (request()->routeIs('welcome'))
        <div class="footer border-b border-gray-100 py-1 position-absolute bottom-0 w-full flex justify-center items-center h-16">
            &copy;2025 UV-BF - Tous droits réservés.
        </div>
        @endif
        <!--  -->
    </div>

    <!-- scripts -->
    <script src="{{ asset('bootstrap-5.3.8-dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('fontawesome-free-7.0.0-web/js/all.js') }}"></script>
    <!-- -->

</body>

</html>