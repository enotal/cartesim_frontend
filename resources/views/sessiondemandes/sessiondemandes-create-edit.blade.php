<x-app-layout>
    <div class="container">
        <!-- Formulaire -->
        <form method="post" action="{{ $action === 'create' ? route('sessiondemandes.store') : route('sessiondemandes.edit', $sessiondemande) }}" enctype="" class="">
            @csrf
            @method($action === 'create' ? 'POST' : 'PATCH')

            <div class="row mt-5">
                <div class="col-md-6 offset-3 py-0">

                    @include('alert-create-edit-delete', ['action' => $action, 'success' => $success])

                    <div class="card">
                        <!-- Titre -->
                        <div class="card-header card-header-title">{{ $action === 'create' ? 'Ajouter' : 'Editer' }}</div>

                        <div class="card-body">
                            <!-- Code -->
                            <div class="">
                                <label for="code" class="form-control-label text-sm">Code</label>
                                <div class="">
                                    <input type="text" id="code" name="code" class="form-control form-control-sm" value="{{ old('code') ?? $sessiondemande->sedcode }}" required />
                                </div>
                            </div>

                            <!-- Date de début et Date de fin -->
                            <div class="row">
                                <!-- Date de début -->
                                <div class="col-md-6">
                                    <label for="datedebut" class="form-control-label text-sm">Date de début</label>
                                    <div class="">
                                        <input type="date" id="datedebut" name="datedebut" class="form-control form-control-sm" value="{{ old('datedebut') ?? $sessiondemande->seddatedebut }}" required />
                                    </div>
                                </div>
                                <!-- Date de fin -->
                                <div class="col-md-6">
                                    <label for="datefin" class="form-control-label text-sm">Date de fin</label>
                                    <div class="">
                                        <input type="date" id="datefin" name="datefin" class="form-control form-control-sm" value="{{ old('datefin') ?? $sessiondemande->seddatefin }}" required />
                                    </div>
                                </div>
                            </div>

                            <!-- Commentaire -->
                            <div class="">
                                <label for="commentaire" class="form-control-label text-sm">Commentaire</label>
                                <div class="">
                                    <input type="text" id="commentaire" name="commentaire" class="form-control form-control-sm" value="{{ old('commentaire') ?? $sessiondemande->sedcommentaire }}" />
                                </div>
                            </div>
                            <!--  -->

                        </div>

                        <div class="card-footer text-end py-1">
                            <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-save me-1"
                                    aria-hidden="true"></i>Enregistrer</button>
                            <a href="{{ route('sessiondemandes.index') }}" class="btn btn-sm btn-secondary"><i
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