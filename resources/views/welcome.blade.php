<x-guest-layout>

    <div class="flex flex-col sm:justify-start items-center pt-0 sm:pt-0">
        <!-- Logo -->
        <div>
            <a href="/">
                <x-application-logo class="w-20 h-20 fill-current text-gray-500" />
            </a>
        </div>
        <!--  -->

        <!--  -->
        <div class="row w-full mt-4">

            <!-- Présentation du module -->
            <div class="col-md-8">
                <div class="mb-2 text-light text-center p-1 welcomeTitle">GESTION DES CARTES SIM</div>
                <div class="card mb-2 border-0">
                    <div class="card-body flex flex-row items-center">
                        <img class="block w-auto text-gray-800 dark:text-gray-200" src="{{ asset('images/sims/sims-2.jpg') }}" alt="image de carte sim" style="height: 10em;" />
                        <div class="ps-2" style="text-align: justify;">
                            <p class="py-0 mb-1">Dans le cadre de l’amélioration des conditions d’étude des nouveaux étudiants de l’Université Virtuelle du Burkina Faso (UV-BF), des cartes SIM sont attribuées aux étudiant en ayant fait la demande.</p>
                            <p class="py-0 mb-1">Cette initiative vise à offrir aux étudiants des facilités d’apprentissage dont la particularité est l’utilisation obligatoire d’un micro-ordinateur comme support officiel pour suivre les cours à distance et se soumettre aux évaluations.</p>
                            <p class="py-0 mb-0">L'UV-BF invite ainsi l'ensemble des étudiants bénéficiaires à faire bon usage de cette aubaine qui confirme l'engagement de l'Etat à soutenir l'enseignement supérieur pour une éducation de qualité.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Boutons : Initier ma demande, Suivre ma demande, Déclarer une perte -->
                <div class="flex sm:justify-center">
                    <a class="btn btn-sm btnInitiateRequest me-3" href="{{ route('demande-guest-initier') }}">
                        <i class="fa fa-edit me-1" aria-hidden="true"></i>Initier ma demande
                    </a>
                    <a class="btn btn-sm btnFollowRequest me-3" href="{{ route('demande-guest-suivre') }}">
                        <i class="fa fa-eye me-1" aria-hidden="true"></i>Suivre ma demande
                    </a>
                    <a class="btn btn-sm btnReportLoss" href="{{ route('sim-guest-declarer-perte') }}">
                        <i class="fa fa-question-circle me-1" aria-hidden="true"></i>Déclarer une perte
                    </a>
                </div>
            </div>

            <!-- Formulaire de connexion -->
            <div class="col-md-4 pt-4">
                <div class="card mt-3">
                    <div class="card-body">
                        <form method="post" action="{{ route('welcome-login') }}" enctype="">
                            @csrf

                            <div class="flex items-center justify-center" style="height: 2em;">
                                @if ($errors->get('email'))
                                <span class="text-light bg-danger w-full text-center p-1" style="font-size: 0.8em;">
                                    <i class="fas fa-exclamation-triangle me-1"></i>Identifiant ou mot de passe incorrect !
                                </span>
                                @endif
                            </div>

                            <!-- Email Address -->
                            <div class="mb-1">
                                <label for="email" class="form-control-label form-control-label-sm">Email</label>
                                <div class="">
                                    <input type="email" id="email" name="email" class="form-control form-control-sm" required />
                                </div>
                            </div>

                            <!-- Password -->
                            <div class="mb-1">
                                <label for="password" class="form-control-label form-control-label-sm">Mot de passe</label>
                                <div class="">
                                    <input type="password" id="password" name="password" class="form-control form-control-sm" required />
                                </div>
                            </div>

                            <!-- Remember Me -->
                            <div class="block mt-2 d-grid">
                                <button type="submit" class="btn btn-sm btnLogIn">
                                    <i class="fa fa-sign-in me-1" aria-hidden="true"></i>Connexion
                                </button>
                            </div>

                            <div class="flex flex-column items-start justify-end mt-2">
                                <label for="remember_me" class="inline-flex items-center">
                                    <input id="remember_me" type="checkbox"
                                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                        name="remember">
                                    <span class="ms-2 text-sm text-gray-600">Se souvenir de moi</span>
                                </label>

                                @if (Route::has('password.request'))
                                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    href="{{ route('password.request') }}">
                                    Mot de passe oublié ?
                                </a>
                                @endif
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>

</x-guest-layout>