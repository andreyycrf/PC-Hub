document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('RecuperarSenhaForm');
    const emailInput = document.getElementById("email");

    if (form && emailInput) {

        // Validação dinâmica do email enquanto digita
        emailInput.addEventListener('input', function () {
            limparMensagens();
            if (emailInput.value.trim() === "") {
                emailInput.classList.remove('valid', 'invalid');
                return;
            }
            if (validarEmail(emailInput.value.trim())) {
                emailInput.classList.add('valid');
                emailInput.classList.remove('invalid');
            } else {
                emailInput.classList.add('invalid');
                emailInput.classList.remove('valid');
            }
        });

        // Envio do formulário
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            recuperarSenha();
        });
    }
});

let codigoGerado = null;

// Função de validação de email
function validarEmail(email) {
    if (/\s/.test(email)) return false;

    const partes = email.split('@');
    if (partes.length !== 2) return false;

    const local = partes[0];
    const dominio = partes[1];
    if (local.length < 1) return false;
    if (dominio.indexOf('.') === -1) return false;

    const labels = dominio.split('.');
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].length < 2) return false;
        if (!/^[A-Za-z0-9](?:[A-Za-z0-9\-]*[A-Za-z0-9])?$/.test(labels[i])) return false;
    }

    const tld = labels[labels.length - 1];
    if (!/^[A-Za-z]{2,6}$/.test(tld)) return false;

    return true;
}

// Função principal de recuperação
function recuperarSenha() {
    const email = document.getElementById("email").value.trim();

    if (!validarEmail(email)) {
        mostrarMensagemErro("Por favor, digite um email válido.");
        return;
    }

    // Gera código aleatório
    codigoGerado = Math.floor(100000 + Math.random() * 900000);
    console.log("Código enviado:", codigoGerado); // Apenas para teste
    mostrarMensagemSucesso(`✅ Um código de confirmação foi enviado para ${email}`);

    mostrarCampoConfirmacao();
}

// Mostra o campo de confirmação do código
function mostrarCampoConfirmacao() {
    const form = document.getElementById('RecuperarSenhaForm');

    // Evita duplicar o campo
    if (document.getElementById('confirmacaoContainer')) return;

    const container = document.createElement('div');
    container.id = 'confirmacaoContainer';
    container.style.marginTop = '15px';

    const label = document.createElement('label');
    label.textContent = 'Digite o código recebido:';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'codigoConfirmacao';
    input.placeholder = 'Ex: 123456';

    const botao = document.createElement('button');
    botao.textContent = 'Confirmar';
    botao.type = 'button';
    botao.addEventListener('click', confirmarCodigo);

    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(botao);

    form.appendChild(container);
}

// Função que confirma o código digitado
function confirmarCodigo() {
    const codigoDigitado = document.getElementById('codigoConfirmacao').value.trim();
    const container = document.getElementById('confirmacaoContainer');

    if (codigoDigitado === codigoGerado.toString()) {
        container.innerHTML = '<p class="success-message">✅ Código confirmado com sucesso!</p>';
        setTimeout(() => {
            window.location.href = "nova_senha.html"; // redireciona para redefinir senha
        }, 1500);
    } else {
        mostrarMensagemErro("❌ Código incorreto. Tente novamente.");
    }
}

// Funções auxiliares de mensagem
function mostrarMensagemSucesso(mensagem) {
    limparMensagens();
    const form = document.getElementById('RecuperarSenhaForm');
    const msg = document.createElement('p');
    msg.className = 'success-message';
    msg.textContent = mensagem;
    msg.style.color = 'green';
    form.appendChild(msg);
}

function mostrarMensagemErro(mensagem) {
    limparMensagens();
    const form = document.getElementById('RecuperarSenhaForm');
    const msg = document.createElement('p');
    msg.className = 'error-message';
    msg.textContent = mensagem;
    msg.style.color = 'red';
    form.appendChild(msg);
}

function limparMensagens() {
    document.querySelectorAll('.success-message, .error-message').forEach(e => e.remove());
}
