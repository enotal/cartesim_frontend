<x-guest-layout>

    <div class="row">
        <div class="col-md-8 offset-2 py-0">

            <!-- Formulaire -->
            <form method="post" action="{{ route('sim-update-guest-declarer-perte') }}" enctype="multipart/form-data">
                @csrf 
                @method('PATCH')

                @include('alert')

                <div class="card">
                    <!-- Titre -->
                    <div class="card-header card-header-title">Déclarer une perte</div>

                    <div class="card-body">

                        <!-- INE -->
                        <div class="mb-2">
                            <label for="code" class="form-control-label text-sm">Code de la demande</label>
                            <div class="">
                                <input type="text" id="code" name="code" class="form-control form-control-sm" value="{{ old('code') }}" required autofocus />
                            </div>
                        </div>

                        <!-- Déclaration reçue de la Police -->
                        <div class="row">
                            <!-- Chargement du fichier -->
                            <div class="col-md-6">
                                <div class="mb-2">
                                    <label for="file" class="form-control-label text-sm mb-0">Déclaration obtenue auprès de la Police</label>
                                    <input type="file" class="form-control form-control-sm" aria-describedby="fileHelpBlock"
                                        id="file" name="file" accept="" value="{{ old('file') }}" required>
                                    <div id="fileHelpBlock" class="form-text text-center py-0 my-0 fst-italic">
                                        <div class="text-danger fw-bold" id="file-error"></div>
                                    </div>
                                    @error('file')
                                    <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>

                            </div>
                            <!-- Prévisualisation du fichier -->
                            <div class="col-md-6 flex flex-column items-center justify-center preview-file" id="preview-file"></div>
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

    <script>
        const fileInput = document.getElementById('file');
        const previewFile = document.getElementById('preview-file');
        const fileError = document.getElementById('file-error');

        function loadFile() {
            previewFile.innerHTML += `<img class="preview-file-img" src="${this.result}" />`;
        }

        function addSingleFile() {
            previewFile.innerHTML = "";
            let reader = new FileReader();
            reader.addEventListener("load", loadFile);
            reader.readAsDataURL(this.files[0]);
        }

        document.addEventListener("DOMContentLoaded", () => {
            fileInput.addEventListener("change", addSingleFile);
        });
    </script>

</x-guest-layout>