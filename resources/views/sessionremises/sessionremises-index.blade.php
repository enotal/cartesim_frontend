<x-app-layout>
    <div class="container">

        <div class="py-0 px-6">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

                @include('alert-index', ['action' => $action, 'success' => $success])

                <div class="card">
                    <div class="card-header">
                        <!-- Create button -->
                        <a href="{{ route('sessionremises.create') }}" class="btn btn-sm btnAddRow tableActionBtnCreateItem tableActionBtnCreateOrEditItem float-end">
                            <i class="fa fa-pencil me-1" aria-hidden="true"></i>Ajouter
                        </a>
                    </div>
                    <div class="card-body py-0">
                        <div class="table-responsive">
                            <table id="myTable" class="myTable display" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>CODE</th>
                                        <th>DATE DE DEBUT</th>
                                        <th>DATE DE FIN</th>
                                        <th>COMMENTAIRE</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($sessionremises as $key => $sessionremise)
                                    <tr class="" id="tr_{{ $sessionremise->id }}">
                                        <td>{{ $key + 1 }}</td>
                                        <td class="text-center"></td>
                                        <td>{{ $sessionremise->sercode }}</td>
                                        <td>{{ $sessionremise->serdatedebut }}</td>
                                        <td>{{ $sessionremise->serdatefin }}</td>
                                        <td>{{ $sessionremise->sercommentaire }}</td>
                                        <td class="tableActionBtnColumn flex items-center justify-center">
                                            <!-- Détails -->
                                            <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnShowItem" data-id="{{ $sessionremise->id }}">
                                                <i class="fa fa-eye text-warning" aria-hidden="true"></i>
                                            </a>
                                            <!-- Edit -->
                                            <a href="{{ route('sessionremises.edit', $sessionremise) }}">
                                                <i class="fa fa-edit text-info" aria-hidden="true"></i>
                                            </a>
                                            <!-- Delete -->
                                            <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnDeleteItem">
                                                <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                                            </a>
                                            <!--  -->
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!--  -->

            </div>
        </div>

    </div>
</x-app-layout>