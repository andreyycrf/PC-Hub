document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('RecuperarSenhaForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            recuperarSenha();
        });
    }
});
function recuperarSenha() {
    var email = document.getElementById("email").value;
    if (email) {
        // Simulação de envio de email
        setTimeout(function () {
            mostrarMensagemSucesso("Instruções de recuperação de senha enviadas para " + email);
        }, 1000);
    } else {
        mostrarMensagemErro("Por favor, digite um email válido.");
    }
}
function mostrarMensagemSucesso(mensagem) {
    var form = document.getElementById('RecuperarSenhaForm');
    var successMessage = document.createElement('p');
    successMessage.className = 'success-message';
    successMessage.textContent = mensagem;
    form.appendChild(successMessage);
}
function mostrarMensagemErro(mensagem) {
    var form = document.getElementById('RecuperarSenhaForm');
    var errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    errorMessage.textContent = mensagem;
    form.appendChild(errorMessage);
}
