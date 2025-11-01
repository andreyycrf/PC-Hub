function logar() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "admin" && password == "1234") {
        location.href = "index.html";
    } else {
        alert("Usuário ou senha inválidos.");
    }
}
// Fallback: escuta submit do formulário e previne o comportamento padrão
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('LoginForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            logar();
        });
    }
});

