const imagen_perfil = document.getElementById('imagen_perfil');
const nombre_logueado = document.getElementById('nombre_logueado');
const boton_cerrar_sesion = document.getElementById('cerrar_sesion');
const ultimos_consejos = document.getElementById('ultimos_consejos');
const formConsejo = document.getElementById('form_consejo');
const nombreConsejo = document.getElementById('nombre_consejo');
const consejoEscrito = document.getElementById('consejo_escrito');
const errorConsejo = document.getElementById('error_consejo');
const compraSlide1 = document.querySelector('.compra-slide1');
const compraSlide2 = document.querySelector('.compra-slide2');
const compraSlide3 = document.querySelector('.compra-slide3');


// Verificamos si hay un usuario logueado
if (!localStorage.getItem("usuario_logueado")) {
    // Si no hay usuario logueado, redirigimos al index.html
    window.location.href = "index.html";
} else {
    const usuarioLogueado = localStorage.getItem("usuario_logueado");
    const datosUsuario = JSON.parse(localStorage.getItem(usuarioLogueado));

    // Mostramos nombre completo del usuario
    if (datosUsuario) {
        nombre_logueado.textContent = datosUsuario.nombre + " " + datosUsuario.apellidos;
        
        // Usamos la foto de perfil del usuario logueado
        if (datosUsuario.imagenPerfil) {
            imagen_perfil.src = datosUsuario.imagenPerfil;
        }
    }
}

cargar_ultimos_consejos(); // cargamos consejos al inciair la pagina

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



// Función para cerrar sesión
boton_cerrar_sesion.addEventListener("click", function() {
    var confirmacion = confirm("¿Desea cerrar sesión?");
    if (confirmacion == true) {
        // Si el usuario confirma, eliminamos el usuario logueado y redirigimos
        localStorage.removeItem("usuario_logueado");
        window.location.href = "index.html";
    }
});


// Envio de consejos
formConsejo.addEventListener("submit", (e) => {
    e.preventDefault();
    let messages = [];

    // Eliminamos errores previos
    const campos = [nombreConsejo, consejoEscrito];
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("error");
    }

    // Validamos título del consejo
    if (nombreConsejo.value === "") {
        nombreConsejo.classList.add("error");
        messages.push("Título del consejo obligatorio");
    } else if (nombreConsejo.value.length < 15) {
        nombreConsejo.classList.add("error");
        nombreConsejo.placeholder = "Mínimo de 15 caracteres";
        messages.push("Título muy corto");
    }

    // Validamos descripción del consejo
    if (consejoEscrito.value === "") {
        consejoEscrito.classList.add("error");
        messages.push("Descripción del consejo obligatoria");
    } else if (consejoEscrito.value.length < 30) {
        consejoEscrito.classList.add("error");
        consejoEscrito.placeholder = "Mínimo 30 caracteres";
        messages.push("Descripción muy corta");
    }

    // Si hay errores, los mostramos y limpiamos campos con errores
    if (messages.length > 0) {
        errorConsejo.innerText = messages.join(", ");
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].classList.contains("error")) {
                campos[i].value = "";
            }
        }
    } else {
        // Si no hay errores, guardamos el consejo
        guardar_consejo();
        errorConsejo.innerText = ""; // Limpiamos errores previos
    }
});

function guardar_consejo() {
    // Creamos objeto del consejo
    const nuevo_consejo = {
        titulo: nombreConsejo.value,
        descripcion: consejoEscrito.value,
    };

    // Obtenemos lista actual de consejos o creamos array vacío
    var consejos_guardados = localStorage.getItem("lista_consejos");
    var lista_consejos = [];
    
    if (consejos_guardados) {
        lista_consejos = JSON.parse(consejos_guardados);
    }

    // Añadimos el nuevo consejo al comienzo de la lista
    lista_consejos.unshift(nuevo_consejo); // <- ia copilot como añadirlo al comienzo

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem("lista_consejos", JSON.stringify(lista_consejos));

    // Limpiamos el formulario
    nombreConsejo.value = "";
    consejoEscrito.value = "";
    
    // Recargamos la lista de consejos para mostrar los últimos 3
    cargar_ultimos_consejos();
}

function cargar_ultimos_consejos() {
    // Obtenemos la lista de consejos de localStorage
    var consejos_guardados = localStorage.getItem("lista_consejos");
    
    if (consejos_guardados) {
        var lista_consejos = JSON.parse(consejos_guardados);
        
        // Obtenemos la lista ul de consejos
        var lista_ul = ultimos_consejos.querySelector("ul");
        
        // Reiniciamos el contenido de la lista
        lista_ul.innerHTML = "";
        
        // Si hay menos de 3 consejos, mostrar solo los que haya
        var cantidad_mostrar = Math.min(3, lista_consejos.length);
        for (var i = 0; i < cantidad_mostrar; i++) {
            var consejo = lista_consejos[i];
            
            // Creamos el elemento li con su a dentro
            var nuevo_li = document.createElement("li");
            var nuevo_link = document.createElement("a");
            
            nuevo_link.href = "ver_consejo.html";
            nuevo_link.className = "navegacion";
            nuevo_link.textContent = consejo.titulo;
            
            nuevo_li.appendChild(nuevo_link);
            lista_ul.appendChild(nuevo_li);
        }
    }
}
