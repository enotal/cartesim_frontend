<x-guest-layout>

    <div class="row">
        <div class="col-md-8 offset-2 py-0">

            <!-- Formulaire -->
            <form method="post" action="{{ route('demande-guest-initier-store') }}" enctype="">
                @csrf

                <!-- @include('alert') -->

                <div class="card">
                    <!-- Titre -->
                    <div class="card-header card-header-title">Initier ma demande</div>

                    <div class="card-body">

                        <!-- INE -->
                        <div class="mb-2">
                            <label for="ine" class="form-control-label text-sm">INE</label>
                            <div class="">
                                <input type="text" id="ine" name="ine" class="form-control form-control-sm" required autofocus />
                            </div>
                        </div>

                        <!-- NOM, Prénom(s) -->
                        <div class="row">
                            <!-- NOM -->
                            <div class="col-md-6 mb-2">
                                <label for="nom" class="form-control-label text-sm">NOM</label>
                                <div class="">
                                    <input type="text" id="nom" name="nom" class="form-control form-control-sm" required />
                                </div>
                            </div>
                            <!-- Prénom(s) -->
                            <div class="col-md-6 mb-2">
                                <label for="prenom" class="form-control-label text-sm">Prénom(s)</label>
                                <div class="">
                                    <input type="text" id="prenom" name="prenom" class="form-control form-control-sm" required />
                                </div>
                            </div>
                        </div>

                        <!-- Email Address -->
                        <div class="mb-2">
                            <label for="email" class="form-control-label text-sm">Email</label>
                            <div class="">
                                <input type="email" id="email" name="email" class="form-control form-control-sm" required />
                            </div>
                        </div>

                        <!-- Téléphone 1, Téléphone 2 -->
                        <div class="row">
                            <!-- Téléphone 1 -->
                            <div class="col-md-6 mb-2">
                                <label for="telephone1" class="form-control-label text-sm">Téléphone 1</label>
                                <div class="">
                                    <input type="text" id="telephone1" name="telephone1" class="form-control form-control-sm" required />
                                </div>
                            </div>
                            <!-- Téléphone 2 -->
                            <div class="col-md-6 mb-2">
                                <label for="telephone2" class="form-control-label text-sm">Téléphone 2</label>
                                <div class="">
                                    <input type="text" id="telephone2" name="telephone2" class="form-control form-control-sm" />
                                </div>
                            </div>
                        </div>

                        <!-- Filière, Niveau -->
                        <div class="row">
                            <!-- Filière -->
                            <div class="col-md-6 mb-2">
                                <label for="filiere" class="form-control-label text-sm">Filière</label>
                                <div class="">
                                    <select class="form-select form-select-sm" aria-label="Default select example" id="filiere" name="filiere">
                                        <option value="">Sélectionner ici !</option>
                                        @foreach ($filieres as $key => $value)
                                        <option value="{{ $value->id }}">{{ ($key + 1) . "- " . $value->nivlibelle }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <!-- Niveau -->
                            <div class="col-md-6 mb-2">
                                <label for="niveau" class="form-control-label text-sm">Niveau</label>
                                <div class="">
                                    <select class="form-select form-select-sm" aria-label="Default select example" id="niveau" name="niveau">
                                        <option value="">Sélectionner ici !</option>
                                        @foreach ($niveaus as $key => $value)
                                        <option value="{{ $value->id }}">{{ ($key + 1) . "- " . $value->flrnom }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Site -->
                        <div class="mb-2">
                            <label for="site" class="form-control-label text-sm">Site désiré pour la remise</label>
                            <div class="">
                                <select class="form-select form-select-sm" aria-label="Default select example" id="site" name="site">
                                    <option value="">Sélectionner ici !</option>
                                    @foreach ($sites as $key => $value)
                                    <option value="{{ $value->id }}">{{ ($key + 1) . "- " . $value->sitnom }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                    </div>

                    <div class="card-footer text-end py-1">
                        <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-save me-1"
                                aria-hidden="true"></i>Enregistrer</button>
                        <a href="{{ route('welcome') }}" class="btn btn-sm btn-secondary"><i
                                class="fa fa-close me-1" aria-hidden="true"></i>Fermer</a>
                    </div>

                </div>
            </form>
            <!--  -->

        </div>
    </div>

</x-guest-layout>