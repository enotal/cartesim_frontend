<x-app-layout>
    <div class="container">
        <!-- Formulaire -->
        <form method="post" action="{{ $action === 'create' ? route('sites.store') : route('sites.edit', $site) }}" enctype="" class="">
            @csrf
            @method($action === 'create' ? 'POST' : 'PATCH')

            <div class="row mt-5">
                <div class="col-md-6 offset-3 py-0">

                    @include('alert-create-edit-delete', ['action' => $action, 'success' => $success])

                    <div class="card">
                        <!-- Titre -->
                        <div class="card-header card-header-title">{{ $action === 'create' ? 'Ajouter' : 'Editer' }}</div>

                        <div class="card-body">
                            <!-- NOM -->
                            <div class="">
                                <label for="nom" class="form-control-label text-sm">NOM</label>
                                <div class="">
                                    <input type="text" id="nom" name="nom" class="form-control form-control-sm" value="{{ old('nom') ?? $site->sitnom }}" required />
                                </div>
                            </div>
                            <!--  -->
                        </div>

                        <div class="card-footer text-end py-1">
                            <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-save me-1"
                                    aria-hidden="true"></i>Enregistrer</button>
                            <a href="{{ route('sites.index') }}" class="btn btn-sm btn-secondary"><i
                                    class="fa fa-close me-1" aria-hidden="true"></i>Fermer</a>
                        </div>
                        <!--  -->
                    </div>

                    <!-- Nombre total d'enregistrments -->
                    <div class="text-sm py-1">
                        {{ $action === 'create' ? $nbrows . " enregistrement(s) trouvé(s)" : "" }}
                    </div>

                </div>
            </div>

        </form>
        <!--  -->
    </div>
</x-app-layout>