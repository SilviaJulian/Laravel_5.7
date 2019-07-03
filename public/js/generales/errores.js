/**
 * JS Errores, para mostrar y dar tratamiento a errores.
 * Software Gestión de movilidad©
 * @author Ing.Luis Alberto Pérez González.
 * @version 3.3.6
 * @package js
 * @final
 */

/**
 * Variable publica que contiene el mensaje de error de la respuesta JSON recibida del servidor.
 * @var {String}
 */
var mensajeError = null;

/**
 * Variable publica que contiene el contador de tiempo de cierre de una alerta emergente.
 * @var {String}
 */
var counterTimer = 1;

/**
 * Variable publica que contiene el limite de tiempo de una alerta.
 * @var {String}
 */
var timeOff = 5;

/**
 * Variable publica que contiene la funcion timeout.
 * @var {String}
 */
var timeout;

/**
 * Variable que contiene el id del elemento donde se despliega la alerta
 * @type String|alertEsp|resp
 */
var idAlertElement = "messageAlert";

/**
 * Variable publica que contiene texto adicional para el usuario cuando hay errores identificables.
 * @var {String}
 */
var adicional = null;

/**
 * Función para activar/desactivar el loader
 * @returns {void} No retorna ningun valor
 */
function toggleLoader(padre=null,childClass=null){
    padre = (padre == null )?'ibox':padre;
    childClass = (childClass == null )?'ibox-content':childClass;
    $('.'+padre).children('.'+childClass).toggleClass('sk-loading');
}

/**
 * Funcion para mostrar la ventana Modal.
 * @param {String} codigoHTML El codigo a mostrar en el mensaje.
 * @return {void} No se retorna ningun valor
 */
function showMessageModal(codigoHTML)
{
    $('#divAvisos').html(purificarHTML(codigoHTML));
    $('#divModalAvisos').modal('handleUpdate');
    $('#divModalAvisos').modal('show');
}

/**
 * Funcion para mostrar una alerta.
 * @param {String} codigoHTML El codigo a mostrar en el mensaje.
 * @param {String} tipo El tipo de alerta que se mostrara
 * @param {String} alertEsp El id del elemento alert a desplegar
 * @return {void} No se retorna ningun valor
 */
function mostrarAlerta(codigoHTML, tipo, alertEsp = null){
    idAlertElement = (alertEsp != null ? alertEsp : "msgDiv");

    $('#' + idAlertElement).hide();
    var clase,t, msg;

    if (timeout) {
        clearTimeout(timeout);
    }

    counterTimer = 1;
    switch (tipo) {
        case "success":
            clase ="alert alert-success alert-dismissable";
            t = "<b>Éxito: </b>";
            timeOff = 10;
            break;
        case "warning":
            clase ="alert alert-warning alert-dismissable";
            t = "<b>Atención: </b>";
            timeOff = 15;
            break;
        case "error":
            clase ="alert alert-danger alert-dismissable";
            t = "<b>Error: </b>";
            timeOff = 25;
            break;
        case "info":

            clase ="alert alert-info alert-dismissable";
            t = "<b>Info: </b>";
            timeOff = 30;
            break;
        default:
            clase ="alert alert-default alert-dismissable";
            t = "<b>Mensaje: </b>";
            timeOff = 40;
            break;
    }
    msg = '<div class="' + clase + '"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>';
    msg += '<span>' + t  + purificarHTML(codigoHTML) + ' </span>';
    msg += '</div>';

    $('#' + idAlertElement).html(msg);
    $('#' + idAlertElement).slideDown( "slow", closeAlert());
    
    $(".alert button.close").bind("click", function() {
        console.log("o cerrar");
        $(this).parent().slideDown('slow');
    });
    
}



/**
 * Funcion para cerrar un alert dependiendo de la seleccion
 * @returns {undefined}
 */
function closeAlert() {
    if (counterTimer == timeOff) {
        $('#' + idAlertElement).slideUp('slow');
    } else {
        counterTimer++;
        timeout = setTimeout(closeAlert, 500);
    }
}

/**
 * Funcion para cerrar un modal por tiempo
 * @returns {void}
 */
function closeModalAlert() {
    if (counterTimer == 5) {
        $('#alertEmergente').modal('hide');
    } else {
        counterTimer++;
        timeout = setTimeout(closeModalAlert, 550);
    }
}

/**
 * Funcion para mostrar una alerta emergente.
 * @param {String} codigoHTML El codigo a mostrar en el mensaje.
 * @return {void} No se retorna ningun valor
 */
function alertaEmergente(codigoHTML){
    $('#mensaje').html(purificarHTML(codigoHTML));
    $('#alertEmergente').modal({backdrop: false});
    $('#alertEmergente').modal('show');
    if (timeout) {
        clearTimeout(timeout);
    }
    counterTimer = 1;
    closeModalAlert();
}





/**
 * Funcion para mostrar los errores personalizados.
 * @param {Object} elError Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} estatusRespuesta Objeto del tipo JSON con el estatus recibido del Servidor
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @return {void} No se retorna ningun valor
 */
function mostrarError(elError, estatusRespuesta, jqXHR){
    mensajeError = '';
    estatusPeticion(jqXHR);
    switch (elError.code) {
        case - 32000:
            mensajeError += claveError(elError.message);
            break;
        case - 32600:
            mensajeError += 'Petición inválida.';
            break;
        case - 32601:
            mensajeError += 'El método en el servicio web no se encontro.';
            break;
        case - 32602:
            mensajeError += 'Parámetros inválidos.';
            break;
        case - 32603:
            mensajeError += 'Error interno.';
            break;
        case - 32700:
            mensajeError += 'Error de sintaxis.';
            break;
        default:
            mensajeError += 'Error ' + elError.code + '<br />' + elError.message;
            break;
    }
    errorHTTP(jqXHR);
    mensajeError += adicional;
    showMessageModal(mensajeError);
}

/**
 * Funcion para mostrar los errores personalizados en un alert.
 * @param {Object} elError Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} estatusRespuesta Objeto del tipo JSON con el estatus recibido del Servidor
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @param {String} resp Especifica el id del elemento especifico a la interaccion
 * @return {void} No se retorna ningun valor
 */
function mostrarErrorAlert(elError, estatusRespuesta, jqXHR, resp = null)
{
    mensajeError = '<strong>Error ' + jqXHR.status + ': <br />';
    estatusPeticion(jqXHR);
    switch (elError.code) {
        case - 32000:
            mensajeError += claveError(elError.message);
            break;
        case - 32600:
            mensajeError += 'Petición inválida.';
            break;
        case - 32601:
            mensajeError += 'El método en el servicio web no se encontro.';
            break;
        case - 32602:
            mensajeError += 'Parámetros inválidos.';
            break;
        case - 32603:
            mensajeError += 'Error Interno.';
            break;
        case - 32700:
            mensajeError += 'Error de sintaxis.';
            break;
        default:
            mensajeError += elError.code + '<br />' + elError.message;
            break;
    }
    errorHTTP(jqXHR);
    mensajeError += adicional;
    mostrarAlerta(mensajeError, "error", resp);
}

/**
 * Funcion para mostrar los Errores de la peticionJSON.
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} estatusError Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} textoError Objeto del tipo JSON con el error del Servidor
 * @return {void} No se devuelve ningun valor
 */
function mostrarErrorJSON(jqXHR, estatusError, textoError)
{
    mensajeError = '';
    estatusPeticion(jqXHR);
    switch ($.trim(estatusError)) {
        case 'timeout':
            mensajeError += 'El tiempo de espera se agotó.<br />Probablemente, existen intermitencias en su conexión a Internet.';
            break;
        case 'error':
            mensajeError += 'Se recibio una respuesta con el siguiente error:<br />' + textoError;
            break;
        case 'abort':
            mensajeError += 'Su navegador abortó la conexión al servidor por razones desconocidas.';
            break;
        case 'parsererror':
            mensajeError += 'Se recibió una respuesta pero esta corrupta o incompleta.';
            break;
        default:
            mensajeError += 'Error desconocido: ' + $.trim(estatusError) + ':<br />' + textoError;
            break;
    }
    errorHTTP(jqXHR);
    mensajeError += adicional;
    showMessageModal(mensajeError);
}

/**
 * Funcion para mostrar los Errores de la peticionJSON en un alert.
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} estatusError Objeto del tipo JSON con el error recibido del Servidor
 * @param {Object} textoError Objeto del tipo JSON con el error del Servidor
 * @param {String} resp Especifica el id del elemento especifico a la interaccion
 * @return {void} No se devuelve ningun valor
 */
function mostrarErrorJSONalert(jqXHR, estatusError, textoError, resp = null)
{
    mensajeError = '';
    estatusPeticion(jqXHR);
    switch ($.trim(estatusError)) {
        case 'timeout':
            mensajeError += 'El tiempo de espera se agotó.<br />Probablemente, existen intermitencias en su conexión a Internet.';
            break;
        case 'error':
            mensajeError += 'Se recibio una respuesta con el siguiente error:<br />' + textoError;
            break;
        case 'abort':
            mensajeError += 'Su navegador abortó la conexión al servidor por razones desconocidas.';
            break;
        case 'parsererror':
            mensajeError += 'Se recibió una respuesta pero esta corrupta o incompleta.';
            break;
        default:
            mensajeError += 'Error desconocido: ' + $.trim(estatusError) + ':<br />' + textoError;
            break;
    }
    errorHTTP(jqXHR);
    mensajeError += adicional;
    mostrarAlerta(mensajeError, "error", resp);
}

/**
 * Funcion para mostrar el Estatus al procesar la Peticion JSON.
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @return {void} No se retorna ningun valor
 */
function estatusPeticion(jqXHR)
{
    switch (jqXHR.readyState) {
        case 0:
            mensajeError += '<strong>Estado:</strong> Petición no completa<br />';
            break;
        case 1:
            mensajeError += '<strong>Estado:</strong> Conexión si se establecio<br />';
            break;
        case 2:
            mensajeError += '<strong>Estado:</strong> Petición si se recibio<br />';
            break;
        case 3:
            mensajeError += '<strong>Estado:</strong> Petición en procesamiento<br />';
            break;
        case 4:
            mensajeError += '<strong>Estado:</strong> Petición finalizada y con respuesta<br />';
            break;
        default:
            mensajeError += '<strong>Estado:</strong> Error desconocido (readyState: ' + jqXHR.readyState + ')<br />';
            break;
    }
    mensajeError += '<br />';
}

/**
 * Funcion para mostrar el tipo de error HTTP al procesar la Peticion JSON.
 * @param {Object} jqXHR Objeto del tipo JSON con el error recibido del Servidor
 * @return {void} No se retorna ningun valor
 */
function errorHTTP(jqXHR)
{
    switch (jqXHR.status) {
        case 403:
            adicional = '<br />El acceso a este <i>SERVIDOR</i> se encuentra restringido';
            break;
        case 404:
            adicional = '<br />La página o URL no existe en este <i>SERVIDOR</i>';
            break;
        default:
            adicional = '';
            break;
    }
    return;
}

/**
 * Funcion para mostrar el tipo de error MySQL
 * @param {String} clave
 * @returns {String}
 */
function claveError(clave)
{
    var aux = Number(clave.substring(4, 8));
    if ($.isNumeric(aux)) {
        // Error Numerico de MySQL:
        switch (aux) {
            case 1054:
                return 'La columna para el criterio de comparación no existe en la tabla de la base de datos.';
                break;
            case 1062:
                return 'Ya existe un valor idéntico.<br />No se aceptan duplicados.';
                break;
            case 1064:
                return 'Error de edicion.<br />Estructura de guardado incorrecta.';
                break;
            case 1136:
                return 'Formato incorrecto.<br />Faltan columnas por declarar en la estructura SQL.';
                break;
            case 1146:
                return 'La tabla de consulta no existe.<br />La tabla de referencia no existe en la base de datos.';
                break;
            case 1136:
                return 'Formato incorrecto.<br />Faltan columnas por declarar en la estructura SQL.';
                break;
            case 1406:
                return 'Excedes el tamaño permitido para el tipo de columna';
                break;
            case 1452:
                return 'Debes de completar los datos antes de enviar.';
                break;
            case 5011:
                return 'La conexión no tiene permisos de consultar contenido.';
                break;
            default:
                return 'Código de error de la base desconocido.<br />Es necesario reportarlo al administrador: ' + aux;
                break;
        }
    } else {
        return clave;
    }
}