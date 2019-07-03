/** JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Sistema Home Menú©
 * @author Lic. Silvia Julián
 * @version 1.0
 * @package js
 * @final
 */


/**
 * Variable publica que contiene el nombre de la Clase a invocar al servidor.
 * @type String
 */
let SERVICE_CLASS = 'A_usuarios';

let banderaMail;

$(document).ready(function () {
    /* Ocultar elementos de error */
    $('.error').hide();
    /* Pinta a tabla de usuarios */
    let tituloFile = 'Usuarios';
    getListaHuesp();

    $('.contentHsp').hide();
    /* Mostrar  contenedor de detalles de usuario*/
    $('.oculto').hide();
    $('#estadoForm').hide();
    $('#addUsu').click(function () {
        let strAncla = $(this).attr('href');
        $('#tabUsu').addClass('col-lg-8');
        $(strAncla).show("slow");
        nuevoUsuario();
    });
    /* Cerrar el contenedor de detalles de usuario */
    $('#closeUsuario').click(function () {
        let strAncla = $(this).attr('href');
        $('#tabUsu').removeClass('col-lg-8');
        $(strAncla).hide();
    });
    /* Ocultar y mostrar input para el registro de un huesped */
    $('#rol').change(function () {
        let value = $('#rol option:selected').html();
        console.log(value);
        if (value == 'Huésped') {
            $('.contentHsp').show("slow");
            $("#habitacion").prop("required", "true");
            $("#fEgreso").prop("required", "true");
        } else {
            $('.contentHsp').hide("slow");
            $("#habitacion").removeAttr("required");
            $("#fEgreso").removeAttr("required");
        }
    });

    /* Bloque de caracteres especiales y números */
    validText("#nombre");
    validText("#apellidos");

    /*  $("#fIngreso").change(function () {
         let date = $(this).val();
         fechaForm = new Date(date);
         var hoy = new Date();
         hoy.setHours(0, 0, 0, 0);
         let resp = validDateActual(fechaForm, hoy);
         if (!resp) {
             $('#erFIngreso').show();
         } else {
             $('#erFIngreso').hide();
         }
     }); */
    $("#fEgreso").change(function () {
        let dateFin = $(this).val();
        let dateInic = $("#fIngreso").val();
        let resp = validDateActual(dateInic, dateFin);
        if (!resp) {
            $('#erFEgreso').show();
        } else {
            $('#erFEgreso').hide();
        }
    });

    /* Validar existencia del correo */
    $("#correo").change(function () {
        let usuario = $("#usuario").val();
        validEmail($(this).val(), usuario);
    });


    $("#formUsuario").submit(function () {
        if (validFomr()) {
            let mydata = obtenerValore();
            let usuario = $("#usuario").val();
            if (!usuario) {/* nuevo usuario */
                saveUsuario(mydata);
            }
            else {/*Editar usuario  */
                saveEditUsuario(mydata);
            }
            return false;
        }
        return false;
    });



    /* Datos generales de dataTable */
    $('.dataTables-example').DataTable({
        pageLength: 10,
        responsive: true,
        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
        dom: '<"html5buttons"B>lTfgitp',
        "createdRow": function (row, data, dataIndex) {
            if (data[4] == "Activo") {
                $($(row).find("td")[4]).addClass("badge bg-primary m-xs m-l-lg");
                $($(row).find("td")[4]).css("height", "20px");
            }
            else if (data[4] == "Inactivo") {
                $($(row).find("td")[4]).addClass("badge bg-danger m-xs m-l-lg");
                $($(row).find("td")[4]).css("height", "20px");
            }
            else {
                $($(row).find("td")[4]).addClass("badge bg-muted m-xs m-l-lg");
                $($(row).find("td")[4]).css("height", "20px");
            }

        },

        buttons: [
            { extend: 'csv' },
            { extend: 'excel', title: tituloFile },
            { extend: 'pdf', title: tituloFile },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]
    });

    $(document.body).on("click", ".client-link", function (e) {
        e.preventDefault()
        $(".selected .tab-pane").removeClass('active');
        $($(this).attr('href')).addClass("active");
    });

});

/**
 * Función que solcita a traves de AJAX la lista de usuarios activos e inactivos .
 * @returns {void} No retorna ningun valor
 */
function getListaHuesp() {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getListaUsuarios',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            pintarTabUsuarios(serverResponse.result);
        } else {
            let table = $('.dataTables-example').DataTable();
            table.clear().draw();
        }

    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}
/**
 * Función para pintar los usuarios en la dataTable .
 * @returns {void} No retorna ningun valor
 */
function pintarTabUsuarios(listHp) {
    let table = $('.dataTables-example').DataTable();
    table.clear().draw();
    $.each(listHp, function (indx, llave) {
        let objHdp = [];
        objComandas = listHp[indx];
        objHdp.push('<a href="#contentUsuario" data-ancla="contentUsuario" class="client-link" id="editUsu" onclick="editUsuario(' + objComandas.idUsuario + ')">' + objComandas.nombre + '</a>');
        objHdp.push(objComandas.habitacion);
        objHdp.push(objComandas.correo);
        objHdp.push(objComandas.rol);
        objHdp.push(objComandas.estado);
        table.row.add(objHdp).draw();
    });


}
/**
 * Función para mostrar el formulario para registrar un usuario.
 * @returns {void} No retorna ningun valor
 */
function nuevoUsuario() {
    $('#estadoForm').hide();
    limpInput();
    getListRoles();
    getHabDisp();
}

/**
 * Función para limpiar los datos de cada imput.
 * @returns {void} No retorna ningun valor
 */
function limpInput() {
    $('#people').val('');
    $('#usuario').val('');
    $('#nombre').val('');
    $('#apellidos').val('');
    $('#correo').val('');
    $('#fIngreso').val('');
    $('#grals').val('');
    $("#rol").empty();
    $('#habitacion').empty();
    $('#fEgreso').val('');
    $('#alergias').val('');
    $('#erMail').hide();
    $('#erFEgreso').hide();
}

/**
 * Función valida que solo los input contenga texto
 * @returns {void} No retorna ningun valor
 */
function validText(id) {//solo letras
    jQuery(id).keypress(function (tecla) {
        if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode != 45) && (tecla.charCode < 164 || tecla.charCode > 165)) return false;

    });
}

/**
 * Función valida que la fecha de ingreso sea menor a la actual
 * @returns {void} No retorna ningun valor
 */
function validDateActual(fInic, fEnd) {
    if (fInic < fEnd)
        return true;
    else
        return false;
}

/**
 * Función para validar tofo el formulario
 * @returns {void} No retorna ningun valor
 */
function validFomr() {
    let dateInic = $("#fIngreso").val();
    let dateFin = $("#fEgreso").val();
    let rol = $('#rol option:selected').html();

    if (rol == 'Huésped') {
        if (!validDateActual(dateInic, dateFin)) {
            $('#erFEgreso').show();
            return false;
        } else { $('#erFEgreso').hide(); }
    }
    if (banderaMail == 1) {
        return false;
    }
    return true;
}
/**
 * Función para validar tofo el formulario
 * @returns {void} No retorna ningun valor
 */
function validEmail(correo, idUsuario) {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getValidEmail',
        'clase': SERVICE_CLASS,
        'Params': [correo, idUsuario]
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            let total = serverResponse.result;
            $.each(total, function (ind, llave) {
                if (total[ind].total > 0) {
                    $("label#erMail").show();
                    $("input#correo").focus();
                    $('#erMail').show();
                    banderaMail = 1;
                } else {
                    $("label#erMail").hide();
                    banderaMail = 0;
                }
            });
        } else {
            $("label#erMail").hide();
            banderaMail = 0;
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para obtener los valos de cada input
 * @returns {array} No retorna ningun valor
 */
function obtenerValore() {
    let valore = [];
    let usuario = $("#usuario").val();
    if (usuario) {/* editar usuario */
        valore.push($('#people').val());
        valore.push($('#usuario').val());
        valore.push($("input[name='estado']:checked").val());
    }
    valore.push($('#nombre').val());
    valore.push($('#apellidos').val());
    valore.push($('#correo').val());
    valore.push($('#fIngreso').val());
    valore.push($('#grals').val());
    valore.push($("#rol option:selected").val());
    if ($('#rol option:selected').html() == 'Huésped') {
        valore.push($("#habitacion option:selected").val());
        valore.push($('#fEgreso').val());
    } else {
        valore.push('');
        valore.push('');
    }
    valore.push($('#alergias').val());
    return valore;
}

/**
 * Función que solcita a traves de AJAX la lista de roles activos.
 * @returns {void} No retorna ningun valor
 */
function getListRoles() {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getListRoles',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            let roles = serverResponse.result;
            $("#rol").empty();
            $("#rol").append('<option value="">Seleccione una opción</option>');
            $.each(roles, function (index, value) {
                $("#rol").append('<option value="' + roles[index].ID + '">' + roles[index].NAME + '</option>');
            });
        } else {
            $("#rol").empty();
            $("#rol").append('<option value="">Seleccione una opción</option>');
        }

    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función que solcita a traves de AJAX la habitaciones disponibles.
 * @returns {void} No retorna ningun valor
 */
function getHabDisp() {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getHabDisp',
        'clase': SERVICE_CLASS,
        'Params': []
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            let habitacion = serverResponse.result;
            $("#habitacion").empty();
            $("#habitacion").append('<option value="">Seleccione una opción</option>');
            $.each(habitacion, function (index, value) {
                $("#habitacion").append('<option value="' + habitacion[index].ID + '">' + habitacion[index].num + '</option>');
            });
        } else {
            $("#habitacion").empty();
            $("#habitacion").append('<option value="">Seleccione una opción</option>');
        }

    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para guardar un usuario
 * @returns {void} No retorna ningun valor
 */
function saveUsuario(mydata) {
    $('#iboxUsuario').children('.ibox-content').toggleClass('sk-loading');
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getSaveUsuario',
        'clase': SERVICE_CLASS,
        'Params': mydata
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); alert(''); return; }
        if (serverResponse.result.id > 0) {
            nuevoUsuario();
            $('.contentHsp').hide();
            $('#iboxUsuario').children('.ibox-content').toggleClass('sk-loading');
            getListaHuesp();
            toastr.success('Se ha registrado el nuevo usuario', 'Hecho');
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función que solcita a traves de AJAX  los datos de un usuario
 * @returns {void} No retorna ningun valor
 */
function editUsuario(id) {
    getHabDisp();
    $('#estadoForm').show();
    $('#tabUsu').addClass('col-lg-8');
    $('#contentUsuario').show("slow");

    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getDatosUsuario',
        'clase': SERVICE_CLASS,
        'Params': [id]
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            pintarDatosUsuario(serverResponse.result);
        } else {
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para llenar el formulario.
 * @returns {void} No retorna ningun valor
 */

function pintarDatosUsuario(datosUsuario) {
    $('.contentHsp').hide();
    $("#rol").prop("disabled", "true");
    $.each(datosUsuario, function (indx, llave) {
        if (!datosUsuario[indx].img) {
            $("#imgPerfil").attr("src", "/img/foto.png");
        }
        else {
            $('#imgPerfil').attr("src", "data:image/"+datosUsuario[indx].tpImg+";base64," + datosUsuario[indx].img);
        }
        if (datosUsuario[indx].estado == 'Activo') {
            $("#edoActivo").prop("checked", true);
        }
        else {
            $("#edoInactivo").prop("checked", true);
        }
        $('#people').val(datosUsuario[indx].idPeople);
        $('#usuario').val(datosUsuario[indx].idUsuario);
        $('#nombre').val(datosUsuario[indx].nombre);
        $('#apellidos').val(datosUsuario[indx].apellidos);
        $('#correo').val(datosUsuario[indx].correo);
        $('#fIngreso').val(datosUsuario[indx].fIng);
        $('#grals').val(datosUsuario[indx].grals);
        $("#rol").empty();
        $("#rol").append('<option value="' + datosUsuario[indx].idRol + '">' + datosUsuario[indx].rol + '</option>');
        // $("#rol option[value=" + datosUsuario[indx].idRol + "]").attr("selected", true);
        if (datosUsuario[indx].idRol == '3') {/* huesped */
            $("#habitacion").append('<option value=' + datosUsuario[indx].idRoom + '>' + datosUsuario[indx].habitacion + '</option>');
            $('.contentHsp').show("slow");
            $("#habitacion option[value=" + datosUsuario[indx].idRoom + "]").attr("selected", true);
            $('#fEgreso').val(datosUsuario[indx].fEnd);
            $('#alergias').val(datosUsuario[indx].alergias);

        }
    });
    let value = $('#rol option:selected').html();
    if (value == 'Huésped') {
        $("#habitacion").prop("required", "true");
        $("#fEgreso").prop("required", "true");
    } else {
        $("#habitacion").removeAttr("required");
        $("#fEgreso").removeAttr("required");
    }
}

/**
 * Función para guardar los datos editados de un usuario
 * @returns {void} No retorna ningun valor
 */

function saveEditUsuario(mydata) {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getEditUsuario',
        'clase': SERVICE_CLASS,
        'Params': mydata
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.id > 0) {
            editUsuario(serverResponse.result.id);
            getListaHuesp();
            toastr.success('Datos editados', 'Hecho');
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}