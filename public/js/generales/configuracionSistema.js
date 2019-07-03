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
var SERVICE_CLASS = 'ConfiguracionSistema';

$( document ).ready(function() {
    //Pestaña 1 GENERALES
    llenarLabelOpcion1();
    llenarTextOpcion1();
    llenarLabelOpcion2();
    llenarTextOpcion2();
    llenarLabelOpcion3();
    llenarTextOpcion3();
    llenarLabelOpcion4();
    llenarTextOpcion4();

    //Pestaña 2 COMIDA-CENA
    llenarLunesInicioComida();
    llenarLunesFinComida();
    llenarMartesInicioComida();
    llenarMartesFinComida();
    llenarMiercolesInicioComida();
    llenarMiercolesFinComida();
    llenarJuevesInicioComida();
    llenarJuevesFinComida();
    llenarViernesInicioComida();
    llenarViernesFinComida();
    llenarSabadoInicioComida();
    llenarSabadoFinComida();
    llenarDomingoInicioComida();
    llenarDomingoFinComida();

    llenarLunesInicioCena();
    llenarLunesFinCena();
    llenarMartesInicioCena();
    llenarMartesFinCena();
    llenarMiercolesInicioCena();
    llenarMiercolesFinCena();
    llenarJuevesInicioCena();
    llenarJuevesFinCena();
    llenarViernesInicioCena();
    llenarViernesFinCena();
    llenarSabadoInicioCena();
    llenarSabadoFinCena();
    llenarDomingoInicioCena();
    llenarDomingoFinCena();

    //Pestaña 3 AGRADECIMIENTOS
    llenarAgradeciemitnos();

});

/**
 * Función para llenar la opcion 1.
 * @returns {void}
 */
function llenarLabelOpcion1(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLabelOption1',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetLabelOption1(serverResponse, statusResponse, jqXHR);
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
function exitoGetLabelOption1(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    label = serverResponse.result.label[0]["OPTION_NAME"];
    $('#labelOption1').text(label);
}

/**
 * Función para llenar la opcion 1.
 * @returns {void}
 */
function llenarTextOpcion1(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getTextOption1',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetTextOption1(serverResponse, statusResponse, jqXHR);
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
function exitoGetTextOption1(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    text = serverResponse.result.text[0]["OPTION_VALUE"];
    $('#textOption1').attr('value',text);
}

/**
 * Función para llenar la opcion 2.
 * @returns {void}
 */
function llenarLabelOpcion2(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLabelOption2',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetLabelOption2(serverResponse, statusResponse, jqXHR);
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
function exitoGetLabelOption2(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    label = serverResponse.result.label[0]["OPTION_NAME"];
    $('#labelOption2').text(label);
}

/**
 * Función para llenar la opcion 2.
 * @returns {void}
 */
function llenarTextOpcion2(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getTextOption2',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetTextOption2(serverResponse, statusResponse, jqXHR);
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
function exitoGetTextOption2(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    text = serverResponse.result.text[0]["OPTION_VALUE"];
    $('#textOption2').attr('value',text);
}

/**
 * Función para llenar la opcion 3.
 * @returns {void}
 */
function llenarLabelOpcion3(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLabelOption3',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetLabelOption3(serverResponse, statusResponse, jqXHR);
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
function exitoGetLabelOption3(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    label = serverResponse.result.label[0]["OPTION_NAME"];
    $('#labelOption3').text(label);
}

/**
 * Función para llenar la opcion 3.
 * @returns {void}
 */
function llenarTextOpcion3(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getTextOption3',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetTextOption3(serverResponse, statusResponse, jqXHR);
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
function exitoGetTextOption3(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    text = serverResponse.result.text[0]["OPTION_VALUE"];
    $('#textOption3').attr('value',text);
}

/**
 * Función para llenar la opcion 4.
 * @returns {void}
 */
function llenarLabelOpcion4(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLabelOption4',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetLabelOption4(serverResponse, statusResponse, jqXHR);
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
function exitoGetLabelOption4(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    label = serverResponse.result.label[0]["OPTION_NAME"];
    $('#labelOption4').text(label);
}

/**
 * Función para llenar la opcion 4.
 * @returns {void}
 */
function llenarTextOpcion4(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getTextOption4',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetTextOption4(serverResponse, statusResponse, jqXHR);
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
function exitoGetTextOption4(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    text = serverResponse.result.text[0]["OPTION_VALUE"];
    $('#textOption4').attr('value',text);
}

/**
 * Función para guardar las opcionciones.
 * @returns {void}
 */
function guardarOpciones(){
    opcion1 = $('#textOption1').val();
    opcion2 = $('#textOption2').val();
    opcion3 = $('#textOption3').val();
    opcion4 = $('#textOption4').val();
    guardarOpcion1(opcion1);
    guardarOpcion2(opcion2);
    guardarOpcion3(opcion3);
    guardarOpcion4(opcion4);
    $('#exitoCambioGenerales').attr('hidden', false);
}

/**
 * Función para guardar la opcion 1.
 * @returns {void}
 */
function guardarOpcion1(opcion1){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarOpcion1',
        'clase': SERVICE_CLASS,
        'Params': [opcion1]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoguardarOpcion1(serverResponse, statusResponse, jqXHR);
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
function exitoguardarOpcion1(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
}

/**
 * Función para guardar la opcion 2.
 * @returns {void}
 */
function guardarOpcion2(opcion1){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarOpcion2',
        'clase': SERVICE_CLASS,
        'Params': [opcion2]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoguardarOpcion2(serverResponse, statusResponse, jqXHR);
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
function exitoguardarOpcion2(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
}

/**
 * Función para guardar la opcion 3.
 * @returns {void}
 */
function guardarOpcion3(opcion1){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarOpcion3',
        'clase': SERVICE_CLASS,
        'Params': [opcion3]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoguardarOpcion3(serverResponse, statusResponse, jqXHR);
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
function exitoguardarOpcion3(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
}

/**
 * Función para guardar la opcion 4.
 * @returns {void}
 */
function guardarOpcion4(opcion4){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarOpcion4',
        'clase': SERVICE_CLASS,
        'Params': [opcion4]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoguardarOpcion4(serverResponse, statusResponse, jqXHR);
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
function exitoguardarOpcion4(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
}

/**
 * Función para llenar la lunes inicio.
 * @returns {void}
 */
function llenarLunesInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLunesInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetLunesInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetLunesInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#lunesInicioComida').attr('value',hora);
}

/**
 * Función para llenar la lunes fin.
 * @returns {void}
 */
function llenarLunesFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLunesFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetLunesFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetLunesFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#lunesFinComida').attr('value',hora);
}

/**
 * Función para llenar la martes inicio.
 * @returns {void}
 */
function llenarMartesInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMartesInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMartesInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetMartesInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlertaComida(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#martesInicioComida').attr('value',hora);
}

/**
 * Función para llenar la martes fin.
 * @returns {void}
 */
function llenarMartesFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMartesFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMartesFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetMartesFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#martesFinComida').attr('value',hora);
}

/**
 * Función para llenar la miercoles inicio.
 * @returns {void}
 */
function llenarMiercolesInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMiercolesInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMiercolesInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetMiercolesInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#miercolesInicioComida').attr('value',hora);
}

/**
 * Función para llenar la martes fin.
 * @returns {void}
 */
function llenarMiercolesFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMiercolesFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMiercolesFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetMiercolesFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#miercolesFinComida').attr('value',hora);
}

/**
 * Función para llenar la Jueves inicio.
 * @returns {void}
 */
function llenarJuevesInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getJuevesInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetJuevesInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetJuevesInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#juevesInicioComida').attr('value',hora);
}

/**
 * Función para llenar la martes fin.
 * @returns {void}
 */
function llenarJuevesFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getJuevesFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetJuevesFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetJuevesFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#juevesFinComida').attr('value',hora);
}

/**
 * Función para llenar la Viernes inicio.
 * @returns {void}
 */
function llenarViernesInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getViernesInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetViernesInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetViernesInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#viernesInicioComida').attr('value',hora);
}

/**
 * Función para llenar la Viernes fin.
 * @returns {void}
 */
function llenarViernesFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getViernesFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetViernesFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetViernesFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#viernesFinComida').attr('value',hora);
}

/**
 * Función para llenar la Sabado inicio.
 * @returns {void}
 */
function llenarSabadoInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getSabadoInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetSabadoInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetSabadoInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#sabadoInicioComida').attr('value',hora);
}

/**
 * Función para llenar la Sabado fin.
 * @returns {void}
 */
function llenarSabadoFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getSabadoFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetSabadoFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetSabadoFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#sabadoFinComida').attr('value',hora);
}

/**
 * Función para llenar la Domingo inicio.
 * @returns {void}
 */
function llenarDomingoInicioComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getDomingoInicioComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetDomingoInicioComida(serverResponse, statusResponse, jqXHR);
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
function exitogetDomingoInicioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#domingoInicioComida').attr('value',hora);
}

/**
 * Función para llenar la Domingo fin.
 * @returns {void}
 */
function llenarDomingoFinComida(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getDomingoFinComida',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetDomingoFinComida(serverResponse, statusResponse, jqXHR);
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
function exitogetDomingoFinComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#domingoFinComida').attr('value',hora);
}

/**
 * Función para validar y guardar los horarios de la comida.
 * @returns {void}
 */
function guardarHorarioComida(){
    $('#errorHorarioComidaLunes').attr('hidden', true);
    $('#errorHorarioComidaMartes').attr('hidden', true);
    $('#errorHorarioComidaMiercoles').attr('hidden', true);
    $('#errorHorarioComidaJueves').attr('hidden', true);
    $('#errorHorarioComidaViernes').attr('hidden', true);
    $('#errorHorarioComidaSabado').attr('hidden', true);
    $('#errorHorarioComidaDomingo').attr('hidden', true);
    horarioLunesInicioComida = $('#lunesInicioComida').val();
    horarioLunesFinComida = $('#lunesFinComida').val();
    if(horarioLunesInicioComida>horarioLunesFinComida){
        $('#errorHorarioComidaLunes').attr('hidden', false);
        return;
    }
    horarioMartesInicioComida = $('#martesInicioComida').val();
    horarioMartesFinComida = $('#martesFinComida').val();
    if(horarioMartesInicioComida>horarioMartesFinComida){
        $('#errorHorarioComidaMartes').attr('hidden', false);
        return;
    }
    horarioMiercolesInicioComida = $('#miercolesInicioComida').val();
    horarioMiercolesFinComida = $('#miercolesFinComida').val();
    if(horarioMiercolesInicioComida>horarioMiercolesFinComida){
        $('#errorHorarioComidaMiercoles').attr('hidden', false);
        return;
    }
    horarioJuevesInicioComida = $('#juevesInicioComida').val();
    horarioJuevesFinComida = $('#juevesFinComida').val();
    if(horarioJuevesInicioComida>horarioJuevesFinComida){
        $('#errorHorarioComidaJueves').attr('hidden', false);
        return;
    }
    horarioViernesInicioComida = $('#viernesInicioComida').val();
    horarioViernesFinComida = $('#viernesFinComida').val();
    if(horarioViernesInicioComida>horarioViernesFinComida){
        $('#errorHorarioComidaViernes').attr('hidden', false);
        return;
    }
    horarioSabadoInicioComida = $('#sabadoInicioComida').val();
    horarioSabadoFinComida = $('#sabadoFinComida').val();
    if(horarioSabadoInicioComida>horarioSabadoFinComida){
        $('#errorHorarioComidaSabado').attr('hidden', false);
        return;
    }
    horarioDomingoInicioComida = $('#domingoInicioComida').val();
    horarioDomingoFinComida = $('#domingoFinComida').val();
    if(horarioDomingoInicioComida>horarioDomingoFinComida){
        $('#errorHorarioComidaDomingo').attr('hidden', false);
        return;
    }
    var arreglo = [];
    arreglo.push(horarioLunesInicioComida);
    arreglo.push(horarioLunesFinComida);
    arreglo.push(horarioMartesInicioComida);
    arreglo.push(horarioMartesFinComida);
    arreglo.push(horarioMiercolesInicioComida);
    arreglo.push(horarioMiercolesFinComida);
    arreglo.push(horarioJuevesInicioComida);
    arreglo.push(horarioJuevesFinComida);
    arreglo.push(horarioViernesInicioComida);
    arreglo.push(horarioViernesFinComida);
    arreglo.push(horarioSabadoInicioComida);
    arreglo.push(horarioSabadoFinComida);
    arreglo.push(horarioDomingoInicioComida);
    arreglo.push(horarioDomingoFinComida);
    actualizarHorarioComida(arreglo);
}

/**
 * Función para guardar los horarios de comida.
 * @returns {void}
 */
function actualizarHorarioComida(arreglo){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'actualizarHorarioComida',
        'clase': SERVICE_CLASS,
        'Params': [arreglo]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoactualizarHorarioComida(serverResponse, statusResponse, jqXHR);
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
function exitoactualizarHorarioComida(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    $('#exitoCambioHorarioComida').attr('hidden', false);
}

/**
 * Función para llenar la lunes inicio.
 * @returns {void}
 */
function llenarLunesInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLunesInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetLunesInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetLunesInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#lunesInicioCena').attr('value',hora);
}

/**
 * Función para llenar la lunes fin.
 * @returns {void}
 */
function llenarLunesFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getLunesFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetLunesFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetLunesFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#lunesFinCena').attr('value',hora);
}

/**
 * Función para llenar la martes inicio.
 * @returns {void}
 */
function llenarMartesInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMartesInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMartesInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetMartesInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#martesInicioCena').attr('value',hora);
}

/**
 * Función para llenar la martes fin.
 * @returns {void}
 */
function llenarMartesFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMartesFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMartesFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetMartesFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#martesFinCena').attr('value',hora);
}

/**
 * Función para llenar la miercoles inicio.
 * @returns {void}
 */
function llenarMiercolesInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMiercolesInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMiercolesInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetMiercolesInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#miercolesInicioCena').attr('value',hora);
}

/**
 * Función para llenar la miercoles fin.
 * @returns {void}
 */
function llenarMiercolesFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getMiercolesFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetMiercolesFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetMiercolesFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#miercolesFinCena').attr('value',hora);
}

/**
 * Función para llenar la Jueves inicio.
 * @returns {void}
 */
function llenarJuevesInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getJuevesInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetJuevesInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetJuevesInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#juevesInicioCena').attr('value',hora);
}

/**
 * Función para llenar la jueves fin.
 * @returns {void}
 */
function llenarJuevesFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getJuevesFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetJuevesFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetJuevesFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#juevesFinCena').attr('value',hora);
}

/**
 * Función para llenar la Viernes inicio.
 * @returns {void}
 */
function llenarViernesInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getViernesInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetViernesInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetViernesInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#viernesInicioCena').attr('value',hora);
}

/**
 * Función para llenar la Viernes fin.
 * @returns {void}
 */
function llenarViernesFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getViernesFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetViernesFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetViernesFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#viernesFinCena').attr('value',hora);
}

/**
 * Función para llenar la Sabado inicio.
 * @returns {void}
 */
function llenarSabadoInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getSabadoInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetSabadoInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetSabadoInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#sabadoInicioCena').attr('value',hora);
}

/**
 * Función para llenar la Sabado fin.
 * @returns {void}
 */
function llenarSabadoFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getSabadoFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetSabadoFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetSabadoFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#sabadoFinCena').attr('value',hora);
}

/**
 * Función para llenar la Domingo inicio.
 * @returns {void}
 */
function llenarDomingoInicioCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getDomingoInicioCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetDomingoInicioCena(serverResponse, statusResponse, jqXHR);
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
function exitogetDomingoInicioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_START"];
    $('#domingoInicioCena').attr('value',hora);
}

/**
 * Función para llenar la Domingo fin.
 * @returns {void}
 */
function llenarDomingoFinCena(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getDomingoFinCena',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitogetDomingoFinCena(serverResponse, statusResponse, jqXHR);
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
function exitogetDomingoFinCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    hora = serverResponse.result.hora[0]["HR_FINISH"];
    $('#domingoFinCena').attr('value',hora);
}

/**
 * Función para validar y guardar los horarios de la cena.
 * @returns {void}
 */
function guardarHorarioCena(){
    $('#errorHorarioCenaLunes').attr('hidden', true);
    $('#errorHorarioCenaMartes').attr('hidden', true);
    $('#errorHorarioCenaMiercoles').attr('hidden', true);
    $('#errorHorarioCenaJueves').attr('hidden', true);
    $('#errorHorarioCenaViernes').attr('hidden', true);
    $('#errorHorarioCenaSabado').attr('hidden', true);
    $('#errorHorarioCenaDomingo').attr('hidden', true);
    horarioLunesInicioCena = $('#lunesInicioCena').val();
    horarioLunesFinCena = $('#lunesFinCena').val();
    if(horarioLunesInicioCena>horarioLunesFinCena){
        $('#errorHorarioCenaLunes').attr('hidden', false);
        return;
    }
    horarioMartesInicioCena = $('#martesInicioCena').val();
    horarioMartesFinCena = $('#martesFinCena').val();
    if(horarioMartesInicioCena>horarioMartesFinCena){
        $('#errorHorarioCenaMartes').attr('hidden', false);
        return;
    }
    horarioMiercolesInicioCena = $('#miercolesInicioCena').val();
    horarioMiercolesFinCena = $('#miercolesFinCena').val();
    if(horarioMiercolesInicioCena>horarioMiercolesFinCena){
        $('#errorHorarioCenaMiercoles').attr('hidden', false);
        return;
    }
    horarioJuevesInicioCena = $('#juevesInicioCena').val();
    horarioJuevesFinCena = $('#juevesFinCena').val();
    if(horarioJuevesInicioCena>horarioJuevesFinCena){
        $('#errorHorarioCenaJueves').attr('hidden', false);
        return;
    }
    horarioViernesInicioCena = $('#viernesInicioCena').val();
    horarioViernesFinCena = $('#viernesFinCena').val();
    if(horarioViernesInicioCena>horarioViernesFinCena){
        $('#errorHorarioCenaViernes').attr('hidden', false);
        return;
    }
    horarioSabadoInicioCena = $('#sabadoInicioCena').val();
    horarioSabadoFinCena = $('#sabadoFinCena').val();
    if(horarioSabadoInicioCena>horarioSabadoFinCena){
        $('#errorHorarioCenaSabado').attr('hidden', false);
        return;
    }
    horarioDomingoInicioCena = $('#domingoInicioCena').val();
    horarioDomingoFinCena = $('#domingoFinCena').val();
    if(horarioDomingoInicioCena>horarioDomingoFinCena){
        $('#errorHorarioCenaDomingo').attr('hidden', false);
        return;
    }
    var arreglo = [];
    arreglo.push(horarioLunesInicioCena);
    arreglo.push(horarioLunesFinCena);
    arreglo.push(horarioMartesInicioCena);
    arreglo.push(horarioMartesFinCena);
    arreglo.push(horarioMiercolesInicioCena);
    arreglo.push(horarioMiercolesFinCena);
    arreglo.push(horarioJuevesInicioCena);
    arreglo.push(horarioJuevesFinCena);
    arreglo.push(horarioViernesInicioCena);
    arreglo.push(horarioViernesFinCena);
    arreglo.push(horarioSabadoInicioCena);
    arreglo.push(horarioSabadoFinCena);
    arreglo.push(horarioDomingoInicioCena);
    arreglo.push(horarioDomingoFinCena);
    actualizarHorarioCena(arreglo);
}

/**
 * Función para guardar los horarios de cena.
 * @returns {void}
 */
function actualizarHorarioCena(arreglo){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'actualizarHorarioCena',
        'clase': SERVICE_CLASS,
        'Params': [arreglo]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoactualizarHorarioCena(serverResponse, statusResponse, jqXHR);
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
function exitoactualizarHorarioCena(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    $('#exitoCambioHorarioCena').attr('hidden', false);
}

/**
 * Función para llenar la tabla de agradecimienetos.
 * @returns {void}
 */
function llenarAgradeciemitnos(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getAgradeciemitnos',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGetAgradeciemitnos(serverResponse, statusResponse, jqXHR);
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
function exitoGetAgradeciemitnos(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    for (var i in serverResponse.result.registros) {
        nombre = serverResponse.result.registros[i]["CONGRATULATIONS"];
        valor = serverResponse.result.registros[i]["LEVEL"];
        icono = serverResponse.result.registros[i]["ICON"];
        $('#tabla').append("<tr> <td>"+nombre+"</td><td>"+valor+"</td><td>"+icono+"</td></tr>")
    }
}

/**
 * Función para guardar el agradecimiento.
 * @returns {void}
 */
function guardarAgradecimiento(){
    $('#errorNombreAgradecimiento').attr('hidden', true);
    $('#errorNombreAgradecimientoExiste').attr('hidden', true);
    $('#errorNivelAgradecimiento').attr('hidden', true);
    $('#errorNivelAgradecimientoExiste').attr('hidden', true);
    $('#errorIconoAgradecimiento').attr('hidden', true);
    $('#errorIconoAgradecimientoExiste').attr('hidden', true);
    nombreValido();
}

/**
 * Función para validar el nombre del agradecimiento.
 * @returns {void}
 */
function nombreValido(){
    var nombre = $('#nombreAgradecimiento').val();
    if(nombre==""){
        $('#errorNombreAgradecimiento').attr('hidden', false);
    }else{
        existeNombreAgradecimiento(nombre);
    }
}

/**
 * Función para validar que no exista el nombre del agradecimiento.
 * @returns {void}
 */
function existeNombreAgradecimiento(nombre){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'existeNombreAgradecimiento',
        'clase': SERVICE_CLASS,
        'Params': [nombre]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoExisteNombreAgradecimiento(serverResponse, statusResponse, jqXHR);
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
function exitoExisteNombreAgradecimiento(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    numero = serverResponse.result.registros[0]["count(ID)"];
    if(numero==0){
        nivelValido();
    }else{
        $('#errorNombreAgradecimientoExiste').attr('hidden', false);
    }
}

/**
 * Función para validar el nombre del nivel.
 * @returns {void}
 */
function nivelValido(){
    var nivel = $('#nivelAgradecimiento').val();
    if(nivel==""){
        $('#errorNivelAgradecimiento').attr('hidden', false);
    }else{
        existeNivelAgradecimiento(nivel);
    }
}

/**
 * Función para validar que no exista el nivel del agradecimiento.
 * @returns {void}
 */
function existeNivelAgradecimiento(nivel){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'existeNivelAgradecimiento',
        'clase': SERVICE_CLASS,
        'Params': [nivel]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoExisteNivelAgradecimiento(serverResponse, statusResponse, jqXHR);
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
function exitoExisteNivelAgradecimiento(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    numero = serverResponse.result.registros[0]["count(ID)"];
    if(numero==0){
        iconoValido();
    }else{
        $('#errorNivelAgradecimientoExiste').attr('hidden', false);
    }
}

/**
 * Función para validar el nombre del icono.
 * @returns {void}
 */
function iconoValido(){
    var icono = $('#iconoAgradecimiento').val();
    if(icono==""){
        $('#errorIconoAgradecimiento').attr('hidden', false);
    }else{
        existeIconoAgradecimiento(icono);
    }
}

/**
 * Función para validar que no exista el icono del agradecimiento.
 * @returns {void}
 */
function existeIconoAgradecimiento(icono){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'existeIconoAgradecimiento',
        'clase': SERVICE_CLASS,
        'Params': [icono]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoExisteIconoAgradecimiento(serverResponse, statusResponse, jqXHR);
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
function exitoExisteIconoAgradecimiento(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    numero = serverResponse.result.registros[0]["count(ID)"];
    if(numero==0){
        guardarNuevoAgradecimiento();
    }else{
        $('#errorIconoAgradecimientoExiste').attr('hidden', false);
    }
}

/**
 * Función guarda agradecimiento validado.
 * @returns {void}
 */
function guardarNuevoAgradecimiento(){
    var nombre = $('#nombreAgradecimiento').val();
    var nivel = $('#nivelAgradecimiento').val();
    var icono = $('#iconoAgradecimiento').val();
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'guardarNuevoAgradecimiento',
        'clase': SERVICE_CLASS,
        'Params': [nombre,nivel,icono]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            exitoGuardarNuevoAgradecimiento(serverResponse, statusResponse, jqXHR);
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
function exitoGuardarNuevoAgradecimiento(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    window.location="configuracion_sistema.php";
}
