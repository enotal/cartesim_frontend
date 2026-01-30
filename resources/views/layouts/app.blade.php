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
    <!-- DataTables plugins : fixed columns, select, buttons -->
    <link href="{{ asset('datatables/datatables.css') }}" rel="stylesheet" />
    <link href="{{ asset('datatables/dataTables.dataTables.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('datatables/fixedColumns.dataTables.css') }}" rel="stylesheet" />
    <link href="{{ asset('datatables/select.dataTables.css') }}" rel="stylesheet" />
    <link href="{{ asset('datatables/buttons.dataTables.css') }}" rel="stylesheet" />
    <!--  -->
    <style type="text/css">
        .app-layout-nav {
            background-color: #00407D;
        }

        .nav-link-active {
            color: #00407D;
            font-weight: bolder;
        }

        .nav-link-false {
            color: lightgray;
            font-weight: normal;
        }

        .nav-link-false:hover {
            background-color: lightgray;
            color: #08438b;
        }

        .myTable tbody tr {
            height: 20px;
            /* Set a fixed height */
            min-height: 20px;
            /* Ensure minimum height */
        }

        .btnAddRow {
            background-color: #00407D;
            color: lightgray;
            border: 1px solid #00407D;
        }

        .btnAddRow:hover {
            background-color: lightgray;
            color: #00407D;
            border: 1px solid #00407D;
        }

        .btnSubmitForm {
            background-color: #056409;
            color: lightgray;
            border: 1px solid #056409;
        }

        .btnSubmitForm:hover {
            background-color: lightgray;
            color: #056409;
            border: 1px solid #056409;
        }

        .btnCloseForm {
            background-color: #6c757D;
            color: lightgray;
            border: 1px solid #6c757D;
        }

        .btnCloseForm:hover {
            background-color: lightgray;
            color: #6c757D;
            border: 1px solid #6c757D;
        }
    </style>

</head>

<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        @include('layouts.navigation')

        <!-- Page Heading -->
        <!-- @isset($header)
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {{ $header }}
            </div>
        </header>
        @endisset -->

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
    </div>

    <!-- scripts -->
    <script src="{{ asset('bootstrap-5.3.8-dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('fontawesome-free-7.0.0-web/js/all.js') }}"></script>
    <!-- -->
    <script src="{{ asset('datatables/jquery-3.7.1.min.js') }}"></script>
    <!--  -->
    <!-- DataTables plugins : fixed columns, select, buttons -->
    <script src="{{ asset('datatables/datatables.min.js') }}"></script>
    <script src="{{ asset('datatables/dataTables.fixedColumns.js') }}"></script>
    <script src="{{ asset('datatables/fixedColumns.dataTables.js') }}"></script>
    <script src="{{ asset('datatables/dataTables.select.js') }}"></script>
    <script src="{{ asset('datatables/select.dataTables.js') }}"></script>
    <script src="{{ asset('datatables/dataTables.buttons.js') }}"></script>
    <script src="{{ asset('datatables/buttons.dataTables.js') }}"></script>
    <script src="{{ asset('datatables/jszip.min.js') }}"></script>
    <script src="{{ asset('datatables/pdfmake.min.js') }}"></script>
    <script src="{{ asset('datatables/vfs_fonts.min.js') }}"></script>
    <script src="{{ asset('datatables/buttons.html5.min.js') }}"></script>
    <!--  -->
    <script type="text/javascript">
        $(document).ready(function() {
            var table = $('#myTable').DataTable({
                processing: false,
                serverSide: false,
                responsive: true,
                autoFill: true,
                paging: true,
                destroy: true,
                searching: true,
                scrollCollapse: true,
                scrollX: true,
                scrollY: 450,
                layout: {
                    bottom2Start: {
                        buttons: ['copyHtml5', 'excelHtml5', 'csvHtml5', 'pdfHtml5', 'printHtml5']
                    }
                },
                language: {
                    "url": './datatables/plugins-1.11.3-i18n-fr_fr.json',
                },
            });
        });
    </script>

</body>

</html>