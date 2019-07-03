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
var SERVICE_CLASS = 'RegistroUsuario';

$(document).ready(function(){
    $("#wizard").steps();
    $("#form").steps({
        bodyTag: "fieldset",
        onStepChanging: function (event, currentIndex, newIndex){
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex){
                return true;
            }
            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18){
                return false;
            }
            var form = $(this);
            // Clean up if user went backward before
            if (currentIndex < newIndex){
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }
            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";
            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex){
            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18){
                $(this).steps("Siguente");
            }
            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3){
                $(this).steps("Anterior");
            }
        },
        onFinishing: function (event, currentIndex){
            var form = $(this);
            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";
            // Start validation; Prevent form submission if false
            return form.valid();
        },
        onFinished: function (event, currentIndex){
            var form = $(this);
            // Submit form input
            form.submit();
        }
    }).validate({
                errorPlacement: function (error, element){
                    element.before(error);
                },
                rules: {
                    confirm: {
                        equalTo: "#email"
                    }
                }
            });
    llenarTiposUsuarios();      
    llenarHabitaciones();
    $('#tipos').change(function() {
        var tipo =  $('#tipos').val();
        if( tipo=="Administrador" || tipo=="Cocina" || tipo==""){
            $('#habitaciones_sec').attr('hidden', true);
            $('#vigencia_sec').attr('hidden', true);
        }else{
            $('#habitaciones_sec').attr('hidden', false);
            $('#vigencia_sec').attr('hidden', false);
        }
    });
    $('#habitaciones').change(function() {
        $('#errorHabitacion').attr('hidden', true);
    });
    $('#vigencia').change(function() {
        $('#errorFecha').attr('hidden', true);
    });
});

/**
 * Función para llenar el campo imagen.
 * @returns {void}
 */
function llenarTiposUsuarios(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getTiposUsuarios',
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
            exitoGetTiposUsuarios(serverResponse, statusResponse, jqXHR);
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
function exitoGetTiposUsuarios(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    for (var i in serverResponse.result.tipos) {
        $('#tipos').append("<option value='"+serverResponse.result.tipos[i]["NAME"]+"'>"+serverResponse.result.tipos[i]["NAME"]+"</option>")
    }
}

/**
 * Función para llenar el campo imagen.
 * @returns {void}
 */
function llenarHabitaciones(){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'getHabitaciones',
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
            exitoGetHabitaciones(serverResponse, statusResponse, jqXHR);
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
function exitoGetHabitaciones(serverResponse, statusResponse, jqXHR){
    if (serverResponse.error) {
        mostrarAlerta(serverResponse.error.message, "error");
        return;
    }
    for (var i in serverResponse.result.habitaciones) {
        $('#habitaciones').append("<option value='"+serverResponse.result.habitaciones[i]["NUM_ROOM"]+"'>"+serverResponse.result.habitaciones[i]["NUM_ROOM"]+"</option>")
    }
}

/**
 * Función para llenar el campo nombre.
 * @returns {void}
 */
function guardar(){
    var tipo =  $('#tipos').val();
    var nombre  = $('#name').val();
    var apellido = $('#lastname').val();
    var correo = $('#email').val();
    var habitacion = $('#habitaciones').val();
    var vigencia = $('#vigencia').val();
    if( tipo=="Administrador"){
        registrar(1,nombre,apellido,correo,habitacion,vigencia);
    }else if(tipo=="Cocina"){
        registrar(2,nombre,apellido,correo,habitacion,vigencia);
    }else{
        if (habitacion==""){
            $('#errorHabitacion').attr('hidden', false);
        }else if(vigencia==""){
            $('#errorFecha').attr('hidden', false);
        }else{
            console.log(vigencia);
            registrar(3,nombre,apellido,correo,habitacion,vigencia);
        }
    }
}

/**
 * Función para llenar el campo nombre.
 * @returns {void}
 */
function registrar(tipo,nombre,apellido,correo,habitacion,vigencia){
    request = JSON.stringify({
        'id': genIDrequest(),
        'method': 'registrar',
        'clase': SERVICE_CLASS,
        'Params': [idUsuario,tipo,nombre,apellido,correo,habitacion,vigencia]
    });
    $.ajax({
        method: 'POST',
        timeout: 20000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            //exitoGetNombre(serverResponse, statusResponse, jqXHR);
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


