<!-- Button trigger modal -->
<button type="button" class="btn btn-sm btnAddRow float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="initForm('create', null, null);">
    <i class="fa fa-pencil me-1" aria-hidden="true"></i>Ajouter
    <!-- Launch static backdrop modal -->
</button>
<!-- Formulaire -->
<form id="myForm">
    @csrf
    <input type="hidden" id="action" name="action" value="">
    <input type="hidden" id="id" name="id" value="">
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header py-1">
                    <h1 class="modal-title fs-5 py-0" id="staticBackdropLabel">Ajouter</h1>
                    <button type="button" class="btn-close py-0" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{-- $itemFields --}}
                </div>
                <div class="modal-footer py-1">
                    <button type="submit" class="btn btn-sm btnSubmitForm">
                        <i class="fa fa-save me-1" aria-hidden="true"></i>Valider
                    </button>
                    <button type="button" class="btn btn-sm btnCloseForm" data-bs-dismiss="modal">
                        <i class="fa fa-close me-1" aria-hidden="true"></i>Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
</form>