const formCompra = document.querySelector('.form_compra');
const nombreCompra = document.getElementById('nombre_compra');
const correoCompra = document.getElementById('correo_compra');
const tipoTarjeta = document.getElementById('tarjeta');
const numTarjeta = document.getElementById('num_tarjeta');
const titularTarjeta = document.getElementById('titular_tarjeta');
const caducidad = document.getElementById('caducidad');
const cvv = document.getElementById('CVV');
const botonCompra = document.getElementById('boton_compra');
const botonBorrar = document.getElementById('boton_borrar');
const errorCompra = document.getElementById('error_compra');
const container = document.querySelector('.container');
const tituloViaje = document.getElementById('titulo_viaje');
const descripcionViaje = document.getElementById('descripcion_viaje');
const parrafo1 = document.getElementById('parrafo1');
const parrafo2 = document.getElementById('parrafo2');
const parrafo3 = document.getElementById('parrafo3');
const precioViaje = document.getElementById('precio_viaje');

function cargar_imagen_compra() {
    // para cada opcion, cambiamos la imagen de fondo de class="container"
    if (localStorage.getItem("slide") == 'first') {
        container.style.backgroundImage = "url('../images/mochilero.png')";
        tituloViaje.textContent = "Ruta del Horizonte";
        descripcionViaje.textContent = "Un viaje por los Pirineos";
        precioViaje.textContent = "600€";
        parrafo1.textContent = "¿Cansado de viajes típicos y aburridos? ¿Quieres llegar ahí donde nadie ha llegado todavía? Estás en el sitio correcto, acabas de encontrar la experiencia de tu vida.";
        parrafo2.textContent = "Gracias al Pack Ruta del Horizonte visitarás los lugares más impresionantes del territorio Pirineo. Explorarás Ordesa con sus impresionantes paisajes, la villa medieval de Aínsa y te adentrarás en la aventura haciendo barranquismo en el Valle de Benasque, siempre acompañado de tu mochila y un guía experto de la zona.";
        parrafo3.textContent = "No esperes más, reserva ya y prepárate para vivir la experiencia de tu vida.";
    
    } else if (localStorage.getItem("slide") == 'second') {
        container.style.backgroundImage = "url('../images/paisaje2.jpg')";
        tituloViaje.textContent = "Ruta del Acantilado";
        descripcionViaje.textContent = "Las mejores vistas";
        precioViaje.textContent = "800€";
        parrafo1.textContent = "¿Buscas una experiencia única con vistas impresionantes? La Ruta del Acantilado es perfecta para ti. Prepárate para descubrir paisajes que te dejarán sin aliento.";
        parrafo2.textContent = "Con nuestro paquete exclusivo, explorarás los acantilados más espectaculares, disfrutarás de caminatas emocionantes y te relajarás en playas escondidas. Todo esto acompañado de guías expertos que te mostrarán los secretos mejor guardados de la zona.";
        parrafo3.textContent = "No pierdas la oportunidad de vivir esta aventura inolvidable. Reserva ahora y prepárate para una experiencia que cambiará tu perspectiva del mundo.";
    
    } else if (localStorage.getItem("slide") == 'third') {
        container.style.backgroundImage = "url('../images/paisaje3.jpg')";
        tituloViaje.textContent = "Ruta del Monte Nevado";
        descripcionViaje.textContent = "Un paisaje helado";
        precioViaje.textContent = "1.000€";
        parrafo1.textContent = "¿Te apasiona la aventura y los paisajes invernales? La Ruta del Monte Nevado te ofrece una experiencia única en un entorno helado y majestuoso.";
        parrafo2.textContent = "Explora montañas cubiertas de nieve, participa en emocionantes actividades como el esquí y el snowboard, y disfruta de la tranquilidad de la naturaleza invernal. Nuestros guías expertos te acompañarán en cada paso del camino para garantizar una experiencia segura y memorable.";
        parrafo3.textContent = "No esperes más para vivir esta aventura invernal. Reserva tu lugar en la Ruta del Monte Nevado y prepárate para crear recuerdos que durarán toda la vida.";
    }
    container.style.backgroundSize = "cover";
}

cargar_imagen_compra();

// Evento para el botón de comprar
botonCompra.addEventListener("click", function(e) {
    e.preventDefault();
    let messages = [];

    // Eliminamos errores previos
    const campos = [nombreCompra, correoCompra, tipoTarjeta, numTarjeta, titularTarjeta, caducidad, cvv];
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("error");
    }

    // Validamos nombre completo
    if (nombreCompra.value === "") {
        nombreCompra.classList.add("error");
        messages.push("Nombre completo obligatorio");
    } else if (nombreCompra.value.length < 3) {
        nombreCompra.classList.add("error");
        nombreCompra.placeholder = "El nombre debe tener al menos 3 caracteres";
        messages.push("Nombre muy corto");
    }

    // Validamos correo electrónico
    if (correoCompra.value === "") {
        correoCompra.classList.add("error");
        messages.push("Correo electrónico obligatorio");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(correoCompra.value)) {
            correoCompra.classList.add("error");
            correoCompra.placeholder = "Formato de correo no válido";
            messages.push("Correo electrónico no válido");
        }
    }

    // Validamos tipo de tarjeta
    if (!["Visa", "Mastercard", "American Express"].includes(tipoTarjeta.value)) {
        tipoTarjeta.classList.add("error");
        messages.push("Debe seleccionar un tipo de tarjeta");
    }

    // Validamos número de tarjeta
    if (numTarjeta.value === "") {
        numTarjeta.classList.add("error");
        messages.push("Numero de tarjeta obligatorio");
    } else {
        
        // Verificamos que solo contenga números
        if (!/^\d+$/.test(numTarjeta.value)) { // ia copilot regex
            numTarjeta.classList.add("error");
            numTarjeta.placeholder = "Solo se permiten números";
            messages.push("Número de tarjeta no válido");
        } else {
            // Verificamos longitud
            const longitudesValidas = [13, 15, 16, 19];
            if (!longitudesValidas.includes(numTarjeta.value.length)) {
                numTarjeta.classList.add("error");
                numTarjeta.placeholder = "Debe tener 13, 15, 16 o 19 digitos";
                messages.push("Longitud de tarjeta no valida");
            }
        }
    }

    // Validamos titular de la tarjeta
    if (titularTarjeta.value === "") {
        titularTarjeta.classList.add("error");
        messages.push("Nombre del titular obligatorio");
    } else if (titularTarjeta.value.length < 3) {
        titularTarjeta.classList.add("error");
        titularTarjeta.placeholder = "Mínimo 3 caracteres";
        messages.push("Nombre del titular muy corto");
    }

    // Validamos fecha de caducidad
    if (caducidad.value === "") {
        caducidad.classList.add("error");
        messages.push("Fecha de caducidad obligatoria");
    } else {
        const fechaCaducidad = new Date(caducidad.value);
        const fechaActual = new Date();
                
        if (fechaCaducidad < fechaActual) {
            caducidad.classList.add("error");
            messages.push("La tarjeta ha caducado");
        }
    }

    // Validamos CVV
    if (cvv.value === "") {
        cvv.classList.add("error");
        messages.push("CVV obligatorio");
    } else if (!/^\d{3}$/.test(cvv.value)) {
        cvv.classList.add("error");
        cvv.placeholder = "Debe tener 3 dígitos";
        messages.push("CVV no válido");
    }

    // Si hay errores, los mostramos y limpiamos campos con errores
    if (messages.length > 0) {
        errorCompra.innerText = messages.join(", ");
        for (let i = 0; i < campos.length; i++) {
            if (campos[i].classList.contains("error")) {
                campos[i].value = "";
            }
        }
    } else {
        // Si no hay errores, mostramos mensaje de compra realizada
        alert("Compra realizada");
        errorCompra.innerText = "";
        limpiar_formulario();
    }
});

// Evento para el botón de borrar
botonBorrar.addEventListener("click", function() {
    limpiar_formulario();
});

// Limpiar tanto para boton borrar como para cuando se termina una copmra
function limpiar_formulario() {
    nombreCompra.value = "";
    correoCompra.value = "";
    tipoTarjeta.value = "";
    numTarjeta.value = "";
    titularTarjeta.value = "";
    caducidad.value = "";
    cvv.value = "";

    // Eliminamos errores visuales
    const campos = [nombreCompra, correoCompra, tipoTarjeta, numTarjeta, titularTarjeta, caducidad, cvv];
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("error");
    }
    
    // Limpiamos mensaje de error
    errorCompra.innerText = "";
    
    // Restauramos placeholders originales
    nombreCompra.placeholder = "Nombre completo";
    correoCompra.placeholder = "Correo electrónico";
    numTarjeta.placeholder = "Número de tarjeta";
    titularTarjeta.placeholder = "Nombre del titular de la tarjeta";
    cvv.placeholder = "Código CVV";
}