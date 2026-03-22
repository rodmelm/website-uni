const usuario = document.getElementById('usuario_inicio_sesion');
const contraseña = document.getElementById('contraseña_inicio_sesion');
const botonInicioSesion = document.getElementById('inicio_sesion');
const botonRegistro = document.getElementById('boton_registro');
const errorElement = document.getElementById('error_index');
const compraSlide1 = document.querySelector('.compra-slide1');
const compraSlide2 = document.querySelector('.compra-slide2');
const compraSlide3 = document.querySelector('.compra-slide3');

// Codigo de carrusel con slides de compra
compraSlide1.addEventListener("click", function() {
    localStorage.setItem("slide", 'first');
    window.location.href = "compra.html";
});
compraSlide2.addEventListener("click", function() {
    localStorage.setItem("slide", 'second');
    window.location.href = "compra.html";
});
compraSlide3.addEventListener("click", function() {
    localStorage.setItem("slide", 'third');
    window.location.href = "compra.html";
});

const track = document.querySelector(".carrusel-track");
const items = document.querySelectorAll(".carrusel-item")
const prevButton = document.querySelector(".prev")
const nextButton = document.querySelector(".next")

let index = 0;
let intervalo;

function showSlide(n){
    if (n < 0){
        index = items.length - 1;
    } else if (n >= items.length){
        index = 0;
    } else{
        index = n;
    }
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`; 
}

function iniciarIntervalo() {
    // Reiniciamos contadores anteriores
    if (intervalo) {
        clearInterval(intervalo);
    }
    // Iniciamos nuevo intervalo de 2 segundos
    intervalo = setInterval(function() {
        showSlide(index + 1);
    }, 2000);
}

prevButton.addEventListener("click", () => { 
    showSlide(index - 1);
    iniciarIntervalo(); 
});

nextButton.addEventListener("click", () => { 
    showSlide(index + 1);
    iniciarIntervalo(); 
});

showSlide(index);
iniciarIntervalo();


botonRegistro.addEventListener("click", function() {
    window.location.href = "registro.html";
});

botonInicioSesion.addEventListener("click", function() {
    let messages = [];
    
    // Eliminamos errores previos
    usuario.classList.remove("error");
    contraseña.classList.remove("error");

    // Validamos que los campos no estén vacíos
    if (usuario.value === "") {
        usuario.classList.add("error");
        messages.push("Usuario obligatorio");
    } 
    if (contraseña.value === "") {
        contraseña.classList.add("error");
        messages.push("Contraseña obligatoria");
    }

    // Si por ahora no hay errores de campos vacíos, procedemos a verificar las credenciales
    if (messages.length === 0) {

        // Verificamos las credenciales contra localStorage
        const usuarioRegistrado = JSON.parse(localStorage.getItem(usuario.value));

        if (!usuarioRegistrado || usuario.value !== usuarioRegistrado.usuario || contraseña.value !== usuarioRegistrado.contraseña) {
            usuario.classList.add("error");
            contraseña.classList.add("error");
            messages.push("Usuario o contraseña incorrecta");
        }
    }

    // Mostramos errores si hay
    if (messages.length > 0) {
        errorElement.innerText = messages.join(", ");
        alert("Error en el inicio de sesión");
    } else {
        // Si no hay errores guardamos en localStorage el usuario logueado y redirigimos a versión_b.html
        // Si antes ya habia un usuario logeado, se sobreescribe
        localStorage.setItem("usuario_logueado", usuario.value);
        alert("Inicio de sesión exitoso");
        window.location.href = "version_b.html";
    }
});


