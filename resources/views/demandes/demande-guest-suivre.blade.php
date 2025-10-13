<x-guest-layout>

    <div class="row">
        <div class="col-md-8 offset-2 py-0">

            <!-- Titre -->
            <div class="form-header-title card-header-title px-2 py-1 rounded mb-2">Suivre ma demande</div>

            <!-- Formulaire -->
            <div class="flex mb-2 justify-center items-center">
                <form class="d-flex ms-auto" role="search" action="" method="GET">
                    <input class="form-control form-control-sm me-2" type="search" placeholder="Code de la demande"
                        aria-label="Search" value="{{ old('search') ?? $search }}" id="search" name="search">
                    <button class="btn btn-sm btn-outline-primary" type="submit">Rechercher</button>
                </form>
                <a class="btn btn-sm btn-secondary ms-auto" href="{{ route('welcome') }}"><i class="fa fa-close me-1"
                        aria-hidden="true"></i>Fermer</a>
            </div>

            @if (count($demande) > 0)
            <div class="text-center text-success">{{ count($demande) . ' résultat trouvé !' }}</div>
            <div class="card mt-3">
                <div class="card-body">
                    <!-- @include('./demandes/demandes-table', [
                                'demande' => $demande,
                            ]) -->
                </div>
            </div>
            @else
            @if (!empty($search))
            <div class="text-center text-danger">Aucun résultat trouvé !</div>
            @endif
            @endif
            <!--  -->

        </div>
    </div>

</x-guest-layout>