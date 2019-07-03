/** JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Sistema de Gestión de Movilidad©
 * @author Ing. Luis Alberto Pérez González.
 * @version 2.0
 * @package js
 * @final
 */

/**
 * Variable publicaque contiene la respuesta del servidor
 * @type {JSON}
 */
var serverResponse = null;

/**
 * Variable publica que contiene el usuario.
 * @type {String}
 */
var usuario = null;

/**
 * Variable publica que contiene la contraseña.
 * @type {String}
 */
var contrasena = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * Variable publica que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var SERVICE_CLASS = 'Acceso';

/**
 * Funcion para verificar los datos de Login proporcionados
 * @returns {void}
 */
function verificarDatos(){
    usuario = $('#username').val().toString().trim();
    contrasena = $('#password').val().toString().trim();
    if (usuario.length > 0 && contrasena.length > 0) {
        verificar();
    } else {
        mostrarAlerta("Verifica los datos ingresados sean correctos", "error");
    }
}

/**
 * Funcion para realizar el Login del Usuario
 * @returns {void}
 */
function verificar(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'verificar',
        'clase': SERVICE_CLASS,
        'Params': [usuario, contrasena]
    });

    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){   
            exitoVerificarAcceso(serverResponse, statusResponse, jqXHR);
        },
        error: function (jqXHR, statusError, textoError)
        {
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}

/**
 * Funcion Listener para Verificar el acceso mediante AJAX hacia el Servidor.
 * @param {object} serverResponse Objeto de tipo JSON con la respuesta recibida del Servidor.
 * @param {string} statusResponse Cadena de texto, con el estatus de la respuesta (succes)
 * @param {object} jqXHR Objeto XHR, con toda la traza de la respuesta.
 * @return {void}
 */
function exitoVerificarAcceso(serverResponse, statusResponse, jqXHR){
    $('#username').val('');
    $('#password').val('');
    if (serverResponse.error) {

        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    if ((serverResponse.result).toString().length >= 30) {
        document.location.assign('site/');
        return;
    } else {
        showMessageModal('La respuesta no es de confianza.');
    }
}
