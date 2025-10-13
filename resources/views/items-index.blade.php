<div class="py-6 px-6">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

        <div class="card">
            <div class="card-header">
                <!-- Create button -->
                @if (in_array("create", $tableActions))
                <button type="button" class="btn btn-sm btnAddRow tableActionBtnCreateItem tableActionBtnCreateOrEditItem float-end" data-action="create">
                    <i class="fa fa-pencil me-1" aria-hidden="true"></i>Ajouter
                </button>
                @endif
            </div>
            <div class="card-body py-0">
                <div class="table-responsive">
                    <table id="myTable" class="myTable display" style="width: 100%">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                @foreach ($tableHeaders as $tableHeader)
                                <th>{{ $tableHeader['title'] }}</th>
                                @endforeach
                                @if (!empty($tableActions))
                                <th class="text-center">Actions</th>
                                @endif
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($tableItems as $key => $tableItem)
                            <tr class="" id="tr_{{ $tableItem->id }}">
                                <td>{{ $key + 1 }}</td>
                                <td class="text-center"></td>
                                @foreach ($tableHeaders as $tableHeader)
                                <td>{{ $tableItem[$tableHeader['data']] }}</td>
                                @endforeach
                                @if (!empty($tableActions))
                                <td class="tableActionBtnColumn flex items-center justify-center">
                                    @if (in_array("show", $tableActions))
                                    <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnShowItem" data-action="" data-id="{{ $tableItem->id }}">
                                        <i class="fa fa-eye text-warning" aria-hidden="true"></i>
                                    </a>
                                    @endif
                                    @if (in_array("edit", $tableActions))
                                    <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnEditItem tableActionBtnCreateOrEditItem" data-action="edit" data-id="{{ $tableItem->id }}">
                                        <i class="fa fa-edit text-info" aria-hidden="true"></i>
                                    </a>
                                    @endif
                                    @if (in_array("delete", $tableActions))
                                    <a href="javascript:void(0)" class="btn btn-sm tableActionBtn tableActionBtnDeleteItem" data-action="" data-id="{{ $tableItem->id }}">
                                        <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                                    </a>
                                    @endif
                                </td>
                                @endif
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- create -->
        @if (in_array("create", $tableActions))
        @include('items-create', ['itemCreatePath' => $itemCreatePath])
        @endif

    </div>
</div>