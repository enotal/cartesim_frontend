<div class="flex items-center justify-center" style="height: 2em;">
    @if ($errors->get('email'))
    <span class="text-light bg-danger w-full text-center p-1" style="font-size: 0.8em;">
        <i class="fas fa-exclamation-triangle me-1"></i>Identifiant ou mot de passe incorrect !
    </span>
    @endif
</div>