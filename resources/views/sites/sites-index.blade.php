<x-app-layout>
    <div class="container">

        <div class="py-0 px-6">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

                @include('alert-index', ['action' => $action, 'success' => $success])

                <div class="card">
                    <div class="card-header">
                        <!-- Create button -->
                        <a href="{{ route('sites.create') }}" class="btn btn-sm btnAddRow tableActionBtnCreateItem tableActionBtnCreateOrEditItem float-end">
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
                                        <th>NOM</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($sites as $key => $site)
                                    <tr class="" id="tr_{{ $site->id }}">
                                        <td>{{ $key + 1 }}</td>
                                        <td class="text-center"></td>
                                        <td>{{ $site->sitnom }}</td>
                                        <td class="tableActionBtnColumn flex items-center justify-center">
                                            <!-- Détails -->
                                            <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnShowItem" data-id="{{ $site->id }}">
                                                <i class="fa fa-eye text-warning" aria-hidden="true"></i>
                                            </a>
                                            <!-- Edit -->
                                            <a href="{{ route('sites.edit', $site) }}">
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