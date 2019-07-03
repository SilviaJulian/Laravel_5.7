/**
 * Js Salir, para brindar funcionalidades JSON desde / hacia el servidor.
 * Software Gestion de movilidad©
 * @author Ing.Luis Alberto Pérez González.
 * @version 1.0
 * @package js
 * @final
 */

/**
 * Variable publica que contiene la respuesta del servidor.
 * @var {JSON}
 */
var jsonRespuesta = null;

/**
 * Variable publica para crear la peticionJSON que se enviara al servidor.
 * @var {JSON}
 */
var peticionJSON = null;

/**
 * Constante publica que contiene el nombre de la Clase a invocar al servidor.
 * Si fuera desde Windows 8 Desktop, necesitan cambiar el const por var, ya que Windows 8 no soporta const
 * @var {String}
 */
var NOMBRE_CLASE = 'Salir';

/**
 * Funcion para cerrar la Sesion mediante AJAX hacia el servidor.
 * @return {void} No se devuelve ningun dato
 */
function cerrarSesion()
{
    peticionJSON = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'terminarSesion',
        'clase': NOMBRE_CLASE
    });
    $.ajax({
        method: 'POST',
        timeout: 50000,
        data: peticionJSON,
        dataType: 'json',
        url: GATEWAY,
        success: function (jsonRespuesta, estatusRespuesta, jqXHR)
        {
            exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR);
        },
        error: function (jqXHR, estatusError, textoError)
        {
            mostrarErrorJSON(jqXHR, estatusError, textoError);
        }
    });
}

/**
 * Funcion Listener para cerrar la Sesion mediante AJAX hacia el Servidor.
 * @param {Object} jsonRespuesta Objeto del tipo JSON con la respuesta recibida del Servidor
 * @param {String} estatusRespuesta Cadena de texto, con el estatus de la respuesta (success)
 * @param {Object} jqXHR Objeto XNR, con toda la traza de la respuesta.
 * @return {void} No devueve ningun valor
 */
function exitoTerminarSesion(jsonRespuesta, estatusRespuesta, jqXHR)
{
    if (jsonRespuesta.error) {
        mostrarError(jsonRespuesta.error, estatusRespuesta, jqXHR);
        return;
    }
    document.location.assign('/');//Se agrega la pagina al historial
}

var activoUsuario;

$(document).ready(function () {
    activoUsuario = setTimeout(cerrarSesion, 900000);
});
$(document).mousemove(function (event) {
    clearTimeout(activoUsuario);
    activoUsuario = setTimeout(cerrarSesion, 900000);
});
$(document).keypress(function (event) {
    clearTimeout(activoUsuario);
    activoUsuario = setTimeout(cerrarSesion, 900000);
});