<x-app-layout>

    <div class="py-6 px-6">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="table-responsive">
                <table id="myTable" class="myTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Date</th>
                            <th>Code</th>
                            <th>Code SIM</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($demandes as $key => $demande)
                        <tr class="">
                            <td>{{ ++$key }}</td>
                            <td class="text-center"></td>
                            <td>{{ $demande->dmddate }}</td>
                            <td>{{ $demande->dmdcode }}</td>
                            <td>{{ $demande->sim->simcode }}</td>
                            <td class="actions-column flex">
                                <a href="#" class="btn btn-sm" onclick="">
                                    <i class="fa fa-eye text-warning" aria-hidden="true"></i>
                                </a>
                                <a href="{{ route('demandes.edit', $demande->id) }}" class="btn btn-sm">
                                    <i class="fa fa-edit text-info" aria-hidden="true"></i>
                                </a>
                                <form id="{{ 'user' . $demande->id }}"
                                    action="{{ route('demandes.destroy', $demande->id) }}" method="POST"
                                    style="display:inline-block;"
                                    onsubmit="return confirm('Voulez-vous vraiment supprimer cet enregistrement ?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-sm">
                                        <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                                    </button>
                                </form>

                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>