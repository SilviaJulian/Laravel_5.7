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
 * Variable publica que contiene el usuario.
 * @type {String}
 */
var usuario = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * .
 * @type {String}
 */
var SERVICE_CLASS = 'OlvidoContrasena';

/**
 * Función principal para recuperar la contraseña
 * @returns {void}
 */
function recuperarContraseña(){
    usuario = $('#username').val().toString().trim();
    verificarCorreo();
}

/**
 * Función para verificar que exista el correo, sea único y este activo.
 * @returns {void}
 */
function verificarCorreo(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'verificarCorreo',
        'clase': SERVICE_CLASS,
        'Params': [usuario]
    });

    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoVerificarCorreo(serverResponse, statusResponse, jqXHR);
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
function exitoVerificarCorreo(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    valor = serverResponse.result.contador[0]["count(*)"];
    if (valor==1){
        mandarCorreo();
    } else {
        $('#errorCorreoNoValido').attr('hidden', false);
    }
}

/**
 * Función para mandar correo de recuperación de contraseña.
 * @returns {void}
 */
function mandarCorreo(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'mandarCorreo',
        'clase': SERVICE_CLASS,
        'Params': [usuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoMandarCorreo(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError){
            console.log(jqXHR);
            console.log(statusError);
            console.log(textoError);
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
function exitoMandarCorreo(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    $('#errorCorreoNoValido').attr('hidden', true);
    $('#exitoCorreo').attr('hidden', false);
    $('#enviar').attr('disabled', true);
}