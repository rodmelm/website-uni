const form = document.getElementById('cuadricula_registro');
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const correoElectronico = document.getElementById('correo_electronico');
const confirmarCorreo = document.getElementById('confirmar_correo');
const birthday = document.getElementById('birthday');
const usuario = document.getElementById('usuario');
const contraseña = document.getElementById('contraseña');
const errorElement = document.getElementById('error_registro');
const botonSubmit = document.getElementById('boton_submit');
const ackPrivacidad = document.getElementById('ack_privacidad');
const imgPerfil = document.getElementById('img_perfil');

// Deshabilitar submit inicialmente si el checkbox no está marcado
if (!ackPrivacidad.checked) {
    botonSubmit.disabled = true;
}
// Habilitar/deshabilitar botón según el checkbox de privacidad
ackPrivacidad.addEventListener("change", function() {
    botonSubmit.disabled = !ackPrivacidad.checked;
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let messages = [];

    // Eliminamos errores previos
    const campos = [nombre, apellidos, correoElectronico, birthday, confirmarCorreo, usuario, contraseña];
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("error");
    }

    // Validar nombre
    if (nombre.value === "") {
        nombre.classList.add("error");
        messages.push("Nombre obligatorio");
    } else if (nombre.value.length < 3) {
        nombre.classList.add("error");
        nombre.placeholder = "El nombre debe tener al menos 3 caracteres";
        messages.push("Nombre no válido");
    }

    // Validar apellidos
    if (apellidos.value === "") {
        apellidos.classList.add("error");
        messages.push("Apellidos obligatorios");
    } else {
        const partesApellidos = apellidos.value.trim().split(" ");
        if (partesApellidos.length < 2) {
            apellidos.classList.add("error");
            apellidos.placeholder = "Debe ingresar al menos dos apellidos";
        } else {
            for (let i = 0; i < partesApellidos.length; i++) {
                if (partesApellidos[i].length < 3) {
                    apellidos.classList.add("error");
                    apellidos.placeholder = "Cada apellido debe tener al menos 3 caracteres";
                    break;
                }
            }
        }
    }

    // Validamos formato de correo electrónico
    if (correoElectronico.value === "") {
        correoElectronico.classList.add("error");
        messages.push("Correo electrónico obligatorio");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoElectronico.value)) {
            correoElectronico.classList.add("error");
            correoElectronico.placeholder = "Correo electrónico no válido";
        }
    }

    // Validamos que los correos coincidan
    if (correoElectronico.value !== confirmarCorreo.value) {
        confirmarCorreo.classList.add("error");
        confirmarCorreo.placeholder = "Los correos no coinciden";
    }

    // Validar fecha de nacimiento
    if (birthday.value) {
        const fechaNacimiento = new Date(birthday.value);
        const fechaActual = new Date();
        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

        if (fechaNacimiento > fechaActual) {
            messages.push("La fecha de nacimiento no puede ser futura");
            birthday.classList.add("error");
        } else if (edad > 120) {
            messages.push("La fecha de nacimiento no es válida");
            birthday.classList.add("error");
        } else if (edad < 13) {
            messages.push("Debes tener al menos 13 años para registrarte");
            birthday.classList.add("error");
        }
    }

    // Validar usuario
    if (usuario.value === "") {
        usuario.classList.add("error");
        messages.push("Usuario obligatorio");
    } else if (usuario.value.length < 5) {
        usuario.classList.add("error");
        usuario.placeholder = "El usuario debe tener al menos 5 caracteres";
    } else if (localStorage.getItem(usuario.value)) {
        usuario.classList.add("error");
        usuario.placeholder = "Nombre de usuario no disponible";
        messages.push("El nombre de usuario ya está en uso");
    }

    // Validar contraseña
    if (contraseña.value === "") {
        contraseña.classList.add("error");
        messages.push("Contraseña obligatoria");
    } else {
        let errores_contraseña = [];
        
        // longitud
        if (contraseña.value.length < 8) {
            errores_contraseña.push("La contraseña debe tener al menos 8 caracteres de longitud");
        }

        //deepseek para el regex de todas estas cosas porque estoy muy cansado
        // verificar números
        const numeros = (contraseña.value.match(/\d/g) || []).length;
        if (numeros < 2) {
            errores_contraseña.push("La contraseña debe contener mínimo 2 números");
        }
        
        // verificar carácter especial
        const caracteresEspeciales = /[!@#$%^&*()_+\-=\[\]{};":"\\|,.<>\/?]/;
        if (!caracteresEspeciales.test(contraseña.value)) {
            errores_contraseña.push("La contraseña debe contener 1 carácter especial");
        }
        
        // Verificar mayúscula
        if (!/(?=.*[A-Z])/.test(contraseña.value)) {
            errores_contraseña.push("La contraseña debe contener 1 letra mayúscula");
        }
        
        // verificar minúscula
        if (!/(?=.*[a-z])/.test(contraseña.value)) {
            errores_contraseña.push("La contraseña debe contener 1 letra minúscula");
        }

        // Si hay erroers, los añadimos al mensaje de error
        if (errores_contraseña.length > 0) {
            contraseña.classList.add("error");
            contraseña.placeholder = "Contraseña no válida";
            messages.push(errores_contraseña.join(", "));
        }
    }

    // Validar formato de la imagen de perfil
    if (imgPerfil.files.length === 0) {
        messages.push("Debe subir una imagen de perfil");
    } else {
        const archivo = imgPerfil.files[0];
        const nombreArchivo = archivo.name.toLowerCase();
        const formato = nombreArchivo.split(".").pop();
        
        // Verificar extensión del archivo
        const formatosValidos = ["webp", "png", "jpg"];
        if (!formatosValidos.includes(formato)) {
            messages.push("Formato de imagen no válido: use webp, png o jpg");
        }
    }
    
    // Si hay errores, enseñamos mensaje de error y eliminamos contenido de campos con errores
    if (messages.length > 0) {
        errorElement.innerText = messages.join(", ");
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].classList.contains("error")) {
                campos[i].value = null;
            }
        }
    } else {
        // Si no hay errores, guardamos en localStorage y redirigimos
        guardar_datos();
    }
});

function guardar_datos() {
    // Obtener el archivo de imagen
    const archivo = imgPerfil.files[0];
    
    // Usar FileReader para convertir imagen a base64
    const reader = new FileReader();  // <- ia copilot para poder guardar la imagen en base64
    
    reader.onload = function(e) {
        // Crear objeto con los datos del usuario incluida la imagen de perfil
        const datos_usuario = {
            nombre: nombre.value,
            apellidos: apellidos.value,
            correo: correoElectronico.value,
            fechaNacimiento: birthday.value,
            usuario: usuario.value,
            contraseña: contraseña.value,
            imagenPerfil: e.target.result, // Base64 string de la imagen
            nombreImagen: archivo.name,
            tipoImagen: archivo.type
        };

        const usuarioKey = datos_usuario.usuario;

        // Guardamos en localStorage
        localStorage.setItem(usuarioKey, JSON.stringify(datos_usuario));
        localStorage.setItem("usuario_logueado", usuarioKey);

        window.location.href = "version_b.html";
    };

    reader.readAsDataURL(archivo);
};



