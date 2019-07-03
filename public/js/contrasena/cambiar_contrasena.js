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
 * Variable publica que contiene la contraseña anterior.
 * @type {String}
 */
var oldPass = null;

/**
 * Variable publica que contiene la nueva contraseña.
 * @type {String}
 */
var newPassA = null;

/**
 * Variable publica que contiene la nueva contraseña.
 * @type {String}
 */
var newPassB = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * .
 * @type {String}
 */
var SERVICE_CLASS = 'CambiarContrasena';

/**
 * Función principal para cambiar la contraseña
 * @returns {void}
 */
function cambiarContrasena(){
    $('#errorFormatoNuevaContraseña').attr('hidden', true);
    $('#errorNuevaContraseñaNoCoincide').attr('hidden', true);
    $('#errorContraseñaNoValida').attr('hidden', true);
    $('#exitoCambioContraseña').attr('hidden', true);
    oldPass = $('#oldPass').val().toString().trim();
    newPassA = $('#newPassA').val().toString().trim();
    newPassB = $('#newPassB').val().toString().trim();
    contrasenaValida();
}

/**
 * Función para verificar que exista la contraseña, sea única y este activa.
 * @returns {void}
 */
function contrasenaValida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'contrasenaValida',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario,oldPass]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoContrasenaValida(serverResponse, statusResponse, jqXHR);
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
function exitoContrasenaValida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    valor = serverResponse.result.contador[0]["count(*)"];
    if (valor==1){
        formatoCorrecto();
    } else {
        $('#errorContraseñaNoValida').attr('hidden', false);
    }
}

/**
 * Función para verificar que sea válido el formato de la contraseña.
 * @returns {void}
 */
function formatoCorrecto(){
    if( newPassA.length<8 || newPassA.length>25 ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneMayuscula = false;
    for(i = 0 ; i < newPassA.length ; i++){
        ascii = newPassA[i].charCodeAt(0);
        if( ascii>64 && ascii<91 ){
            tieneMayuscula = true;
        }
    }
    if( !tieneMayuscula ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneNumero = false;
    for(i = 0 ; i < newPassA.length ; i++){
        ascii = newPassA[i].charCodeAt(0);
        if( ascii>47 && ascii<58 ){
            tieneNumero = true;
        }
    }
    if( !tieneNumero ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    tieneSimbolo = false;
    for(i = 0 ; i < newPassA.length ; i++){
        ascii = newPassA[i].charCodeAt(0);
        if( ascii>41 && ascii<47 ){
            tieneSimbolo = true;
        }
    }
    if( !tieneSimbolo ){
        $('#errorFormatoNuevaContraseña').attr('hidden', false);
        return;
    }
    contrasenasCoinciden();
}

/**
 * Función para verificar que la nueva contraseña A sea igual a la nueva contarseña B.
 * @returns {void}
 */
function contrasenasCoinciden(){
    if( newPassA != newPassB ){
        $('#errorNuevaContraseñaNoCoincide').attr('hidden', false);
        return;
    }
    guardarNuevaPass();
}

/**
 * Función que guarda la nueva contraseña.
 * @returns {void}
 */
function guardarNuevaPass(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarNuevaPass',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario,newPassA]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            $('#exitoCambioContraseña').attr('hidden', false);
            $('#enviar').attr('disabled', true);
        },
        error: function (jqXHR, statusError, textoError){
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}
