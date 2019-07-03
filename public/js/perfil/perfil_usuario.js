/** JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Sistema Home Menú©
 * @author Ing. Christian Iván Ledesma Bermúdez.
 * @version 1.0
 * @package js
 * @final
 */

/**
 * Variable publica que contiene la respuesta del servidor
 * @type {JSON}
 */
var serverResponse = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * .
 * @type {String}
 */
var SERVICE_CLASS = 'PerfilUsuario';

$( document ).ready(function() {
    llenarImagen();
    llenarNombre();
    llenarApellido();
    llenarHabitacion();
    llenarFechaIngreso();
    llenarFechaEgreso();
    llenarCorreo();
    llenarAlergias();
    llenarGenerales();
});

/**
 * Función para llenar el campo imagen.
 * @returns {void}
 */
function llenarImagen(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getImagen',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetImagen(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetImagen(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    imagen = serverResponse.result.imagen[0]["IMG_USER"];
    if (imagen!=null){
        $('#imagen').attr("src","data:image/jpg;base64,"+imagen);
    }
    
}

/**
 * Función para llenar el campo nombre.
 * @returns {void}
 */
function llenarNombre(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getNombre',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetNombre(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetNombre(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    nombre = serverResponse.result.nombre[0]["FIRST_NAME"];
    $('#nombre').text(nombre);
}

/**
 * Función para llenar el campo apellido.
 * @returns {void}
 */
function llenarApellido(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getApellido',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetApellido(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetApellido(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    apellido = serverResponse.result.apellido[0]["LAST_NAME"];
    $('#apellido').text(apellido);
}

/**
 * Función para llenar el campo habitacion.
 * @returns {void}
 */
function llenarHabitacion(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getHabitacion',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetHabitacion(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetHabitacion(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    habitacion = serverResponse.result.habitacion[0]["NUM_ROOM"];
    $('#habitacion').text(habitacion);
}

/**
 * Función para llenar la fecha de ingreso.
 * @returns {void}
 */
function llenarFechaIngreso(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getFechaIngreso',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetFechaIngreso(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetFechaIngreso(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    fechaIngreso = serverResponse.result.fecha[0]["ENTRY_DATE"];
    $('#fechaIngreso').text(fechaIngreso);
}

/**
 * Función para llenar la fecha de egreso.
 * @returns {void}
 */
function llenarFechaEgreso(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getFechaEgreso',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetFechaEgreso(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetFechaEgreso(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    fechaEgreso = serverResponse.result.fecha[0]["EGRESS_DATE"];
    if (fechaEgreso==null){
        $('#fechaEgreso').text("NA");
    } else {
        $('#fechaEgreso').text(fechaEgreso);
    }
    
}

/**
 * Función para llenar el correo.
 * @returns {void}
 */
function llenarCorreo(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getCorreo',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetCorreo(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetCorreo(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    correo = serverResponse.result.correo[0]["EMAIL"];
    $('#correo').text(correo);
}

/**
 * Función para llenar alergias.
 * @returns {void}
 */
function llenarAlergias(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getAlergias',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetAlergias(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetAlergias(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    alergias = serverResponse.result.alergias[0]["ALLERGIES"];
    $('#alergias').val(alergias);
}

/**
 * Función para llenar generales.
 * @returns {void}
 */
function llenarGenerales(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getGenerales',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetGenerales(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Función listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes).
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoGetGenerales(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    generales = serverResponse.result.generales[0]["DESCRIPTION"];
    $('#generales').val(generales);
}