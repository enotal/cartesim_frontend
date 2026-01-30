<div class="py-1" style="height: 4.2em;">
    <div class="alert alert-{{ $success ? 'success' : 'danger' }} alert-dismissible fade {{ $success !== null ? show : '' }}" role="alert">
        <strong>
            <i class="fa {{ $success ? 'fa-check' : 'fa-triangle-exclamation' }} me-1" aria-hidden="true"></i>
        </strong>
        <!-- Response is OK -->
        @if ($success)
        <!-- Action Edit -->
        @if ($action === "edit")
        {{ 'Modification effectuée !' }}
        @endif
        <!-- Action Delete -->
        @if ($action === "delete")
        {{ 'Suppression effectuée !' }}
        @endif
        @else
        <!-- Action Edit -->
        @if ($action === "edit")
        {{ 'Modification non effectuée !' }}
        @endif
        <!-- Action Delete -->
        @if ($action === "delete")
        {{ 'Suppression non effectuée !' }}
        @endif
        @endif
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</div>