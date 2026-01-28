<x-app-layout>
    <div class="container">
        <!-- Formulaire -->
        <form method="post" action="{{ $action ? route('sims.store') : route('sims.edit', $sim) }}" enctype="" class="">
            @csrf
            @method('POST')

            <div class="row mt-5">
                <div class="col-md-6 offset-3 py-0">

                    @include('alert-create-edit-delete', ['action' => $action, 'success' => $success])

                    <div class="card">
                        <!-- Titre -->
                        <div class="card-header card-header-title">{{ $action ? 'Ajouter' : 'Editer' }}</div>

                        <div class="card-body">
                            <!-- Code -->
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="code" class="form-control-label text-sm">Code</label>
                                    <div class="">
                                        <input type="text" id="code" name="code" class="form-control form-control-sm" value="{{ old('code') ?? $sim->simcode }}" required />
                                    </div>
                                </div>
                                <!-- Numéro -->
                                <div class="col-md-6">
                                    <label for="numero" class="form-control-label text-sm">Numéro</label>
                                    <div class="">
                                        <input type="text" id="numero" name="numero" class="form-control form-control-sm" value="{{ old('numero') ?? $sim->simnumero }}" required />
                                    </div>
                                </div>
                            </div>

                            <!-- Date d'activation -->
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="dateactivation" class="form-control-label text-sm">Date d'activation</label>
                                    <div class="">
                                        <input type="date" id="dateactivation" name="dateactivation" class="form-control form-control-sm" value="{{ old('dateactivation') ?? $sim->simdateactivation }}" />
                                    </div>
                                </div>
                                <!-- Date de remise -->
                                <div class="col-md-6">
                                    <label for="dateremise" class="form-control-label text-sm">Date de remise</label>
                                    <div class="">
                                        <input type="date" id="dateremise" name="dateremise" class="form-control form-control-sm" value="{{ old('dateremise') ?? $sim->simdateremise }}" />
                                    </div>
                                </div>
                            </div>

                            <!-- Perte et déclaration de perte -->
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="perte" class="form-control-label text-sm">Perdu ?</label>
                                    <div class="">
                                        @foreach (["non", "oui"] as $enum)
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="perte" id="{{ 'perte' . $enum }}" value="{{ $enum }}">
                                            <label class="form-check-label" for="{{ 'perte' . $enum }}">{{ $enum }}</label>
                                        </div>
                                        @endforeach
                                    </div>

                                </div>
                                <div class="col-md-6">
                                    <label for="declarationperte" class="form-control-label text-sm">Déclaration de perte</label>
                                    <div class="">
                                        <input type="file" id="declarationperte" name="declarationperte" class="form-control form-control-sm" value="{{ old('declarationperte') ?? $sim->simdeclarationperte }}" />
                                    </div>
                                </div>
                            </div>

                            <!-- Date et motif de suspension -->
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="datesuspension" class="form-control-label text-sm">Date de suspension</label>
                                    <div class="">
                                        <input type="date" id="datesuspension" name="datesuspension" class="form-control form-control-sm" value="{{ old('datesuspension') ?? $sim->simdatesuspension }}" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="motifsuspension" class="form-control-label text-sm">Motif de suspension</label>
                                    <div class="">
                                        <input type="text" id="motifsuspension" name="motifsuspension" class="form-control form-control-sm" value="{{ old('motifsuspension') ?? $sim->simmotifsuspension }}" />
                                    </div>
                                </div>
                            </div>
                            <!-- Date et motif de retrait -->
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="dateretrait" class="form-control-label text-sm">Date de retrait</label>
                                    <div class="">
                                        <input type="date" id="dateretrait" name="dateretrait" class="form-control form-control-sm" value="{{ old('dateretrait') ?? $sim->simdateretrait }}" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="motifretrait" class="form-control-label text-sm">Motif de retrait</label>
                                    <div class="">
                                        <input type="text" id="motifretrait" name="motifretrait" class="form-control form-control-sm" value="{{ old('motifretrait') ?? $sim->simmotifretrait }}" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="card-footer text-end py-1">
                            <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-save me-1"
                                    aria-hidden="true"></i>Enregistrer</button>
                            <a href="{{ route('sims.index') }}" class="btn btn-sm btn-secondary"><i
                                    class="fa fa-close me-1" aria-hidden="true"></i>Fermer</a>
                        </div>
                        <!--  -->
                    </div>

                    <!-- Nombre total d'enregistrments -->
                    <div class="text-sm py-1">
                        {{ $action === "edit" ? $nbrows . " enregistrement(s) trouvé(s)" : "" }}
                    </div>


                </div>
            </div>

        </form>
        <!--  -->
    </div>
</x-app-layout>