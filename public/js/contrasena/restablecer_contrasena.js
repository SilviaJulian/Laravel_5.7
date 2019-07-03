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
 * Variable publica que contiene la key de la  URL.
 * @type {String}
 */
var key = null;

/**
 * Variable publica que contiene la nueva contraseña.
 * @type {String}
 */
var password = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * .
 * @type {String}
 */
var SERVICE_CLASS = 'RestablecerContrasena';

/**
 * Valida la url
 * @returns {void}
 */
$(document).ready(function(){
    key = getKey();
    verificarKey();
});

/**
 * Función principal para restablecer la contraseña
 * @returns {void}
 */
function restablecerContraseña(){
    $('#errorFormatoNuevaContraseña').attr('hidden', true);
    password = $('#password').val().toString().trim();
    formatoCorrecto();
}

/**
 * Funcion para obtener la key de la URL
 * @param String name
 * @return String
 */
function getKey() {
    name = "key";
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Función para verificar que exista la key, sea único y este activo.
 * @returns {void}
 */
function verificarKey(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'verificarKey',
        'clase': SERVICE_CLASS,
        'Params': [key]
    });

    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoVerificarKey(serverResponse, statusResponse, jqXHR);
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
function exitoVerificarKey(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    valor = serverResponse.result.contador[0]["count(*)"];
    if (valor!=1){
        window.location="404.html";
    }
}

/**
 * Función para verificar que sea válido el formato de la contraseña.
 * @returns {void}
 */
function formatoCorrecto(){
    if( password.length<8 ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneMayuscula = false;
    for(i = 0 ; i < password.length ; i++){
        ascii = password[i].charCodeAt(0);
        if( ascii>64 && ascii<91 ){
            tieneMayuscula = true;
        }
    }
    if( !tieneMayuscula ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneNumero = false;
    for(i = 0 ; i < password.length ; i++){
        ascii = password[i].charCodeAt(0);
        if( ascii>47 && ascii<58 ){
            tieneNumero = true;
        }
    }
    if( !tieneNumero ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneSimbolo = false;
    for(i = 0 ; i < password.length ; i++){
        ascii = password[i].charCodeAt(0);
        if( ascii>41 && ascii<47 ){
            tieneSimbolo = true;
        }
    }
    if( !tieneSimbolo ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    guardarNuevaPass();
}

/**
 * Función para guardar la nueva contraseña.
 * @returns {void}
 */
function guardarNuevaPass(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarNuevaPass',
        'clase': SERVICE_CLASS,
        'Params': [password,key]
    });
    
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            $('#errorURL').attr('hidden', true);
            $('#exitoRestableciendo').attr('hidden', false);
            $('#enviar').attr('disabled', true);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}
