/**  
 * Software 
 * @copyright Cad&Lan
 * @version 1.0
 * @package js
 * @final
 */

/**
* Variable publica que contiene el nombre de la Clase a invocar al servidor.
* @type String
*/
let SERVICE_CLASS = 'C_entregas';
/**
 * Variable publica que contiene la fecha actual
 * @type String
 */
let diaActual = new Date();
diaActual.setDate(diaActual.getDate());
/**
 * Variable publica que contiene el id del alimento actual.
 * @type String
 */
let idAlimento = 0;

/**
 * Variables publica que contiene los estilos del tipo de alimento
 * @type Obj
 */
let objFa = { Comida: 'fa fa-cutlery text-navy', Cena: 'fa fa-coffee text-navy' };
let color = ['bg-success', 'yellow-bg'];

$(document).ready(function () {
    getCountFood();
    $('.dataTables-alimentos').DataTable({
        pageLength: 10,
        responsive: true,
        columnDefs: [
            { className: "text-center", "targets": [0, 2, 4, 6, 7, 8] }
        ],
        "order": [[8, "desc"]],
        dom: '<"html5buttons"B>lTfgitp',
        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
        "createdRow": function (row, data, dataIndex) {
            if (data[4] != '') {
                $($(row).find("td")[4]).addClass("text-success");
                $($(row).find("td")[4]).css("font-size", "25px");
                $($(row).find("td")[4]).css("font-weight", "600");
            }
            if (data[6] != '') {
                $($(row).find("td")[6]).addClass("text-success");
                $($(row).find("td")[6]).css("font-size", "25px");
                $($(row).find("td")[6]).css("font-weight", "600");
            }
        },
        buttons: [
            { extend: 'pdf', title: 'Entregas' },
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


});

/**
 * Función para ejecutar la primera funcion al cargar la aplicación:
 */
$(function () {
    $('#date').datepicker({
        locales: 'es',
        language: 'es',
        format: 'LT',
        format: 'dd-mm-yyyy',
        defaultDate: diaActual,
        autoclose: true,
        todayBtn: true,
        minView: 2,
        todayHighlight: true,
        useCurrent: true,
        todayHighlight: true
    });
    resetDate();
})

/**
* Funcion para asignar la fecha al datepicker
*/
function resetDate() {
    $('.form_datetime').datepicker("setDate", diaActual);
}
/**
* Funcion para sumar nDays a la fecha actual
*/
function addDays(nDays) {
    if (nDays != null) {
        var inputDateTime = $('.form_datetime');
        var date = $(inputDateTime).val();
        var nDays = parseInt(nDays);
        var m_date = moment(date, "DD-MM-YYYY").add(nDays, 'days');
        var day = m_date.format('DD');
        var month = m_date.format('MM');
        var year = m_date.format('YYYY');
        var newDate = day + '-' + month + '-' + year;
        $(inputDateTime).val(newDate);
        getCountFood();
    }
}

function getCountFood() {
    let date = $('#date').val();
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getCountFood',
        'clase': SERVICE_CLASS,
        'Params': [date]
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
            let listComandas = serverResponse.result;
            let html = '';
            let idFood;
            $.each(listComandas, function (indx, llave) {
                html += '<li>';
                html += '<a class="nav-link';
                if (indx == 0) {
                    html += ' active ';
                    idFood = listComandas[indx].ID;
                }
                html += '" data-toggle="tab" onclick="getPintarAlimentos(' + listComandas[indx].ID + ')" href="#contentFood">';
                html += '<i class="' + objFa[listComandas[indx].FOOD] + '"></i>' + listComandas[indx].FOOD;
                html += '</a>';
                html += '</li>';
            });
            $('#tab-Alimentos').html(html);
            getPintarAlimentos(idFood);
        } else {
            $('#tab-Alimentos').html('');
            let table = $('.dataTables-alimentos').DataTable();
            table.clear().draw();
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para listar los alimentos  mediante AJAX.
 * @returns {void} No retorna ningun valor
 */
function getPintarAlimentos(idFood) {
    let fecha = $('#date').val();
    idAlimento = idFood;

    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getListarAlimentos',
        'clase': SERVICE_CLASS,
        'Params': [idFood, fecha]
    });
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
    }).done(function (serverResponse, statusResponse, jqXHR) {
        if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
        if (serverResponse.result.length > 0) {
            let listHp = serverResponse.result;
            let table = $('.dataTables-alimentos').DataTable();
            table.clear().draw();

            $.each(listHp, function (indx, llave) {
                let objHdp = [];
                objComandas = listHp[indx];
                objHdp.push(objComandas.room);
                objHdp.push(objComandas.name);
                switch (objComandas.card) {
                    case ('Menú'):
                        objHdp.push('<span class="badge badge-success" style="padding: 10px;"> ' + objComandas.card + '</span>');
                        break;
                    case ('Picnic'):
                        objHdp.push('<span class="badge badge-info" style="padding: 10px;"> ' + objComandas.card + '</span>');
                        break;
                    case ('Especial'):
                        objHdp.push('<span class="badge badge-primary" style="padding: 10px;"> ' + objComandas.card + '</span>');
                        break;
                    default:
                        objHdp.push('<span class="badge badge-warning" style="padding: 10px;"> ' + objComandas.card + '</span>');
                        break;
                }
                objMenu = JSON.parse(listHp[indx].order);
                $.each(objMenu, function (index, llave) {
                    objHdp.push(objMenu[index].order);
                    if (!objMenu[index].alt) {
                        objMenu[index].alt = '';
                    }
                    objHdp.push('<div class="text-success text-center">' + objMenu[index].alt + '</div>');
                });
                if (objMenu.length == 1) {
                    objHdp.push('');
                    objHdp.push('');
                }
                objHdp.push(objComandas.obs);
                switch (objComandas.status) {
                    case ('Reservado')://Reservado
                        objHdp.push('<span class="badge badge-warning " style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    case ('Atraso'): //'Retardo'
                        objHdp.push('<span class="badge badge-success" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    case ('No asistirá')://'No asistirá'
                        objHdp.push('<span class="badge badge-danger" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    case ('Entregado')://'Entregado'
                        objHdp.push('<span class="badge badge-info" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    case ('Cancelado')://'Cancelado'
                        objHdp.push('<span class="badge badge-danger" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    case ('Rechazado')://'Cancelado'
                        objHdp.push('<span class="badge badge-danger" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                    default:
                        objHdp.push('<span class="badge badge-warning" style="padding: 10px;"> ' + objComandas.status + '</span>');
                        break;
                }


                if (objComandas.status == 'Reservado' || objComandas.status == 'Atrasado') {
                    objHdp.push('<div class="col-lg-6 h-10"><button class="btn btn-success btn-sm entrega" value=' + objComandas.cve + ' id="regEntrega">Entregar</button></div>');
                } else {
                    objHdp.push('<div class="col-lg-6 h-10"><button class="btn btn-success btn-sm" disabled>Entregar</button></div>');
                }

                table.row.add(objHdp).draw();
            });
        } else {
            let table = $('.dataTables-alimentos').DataTable();
            table.clear().draw();
        }

    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}


/* 
$(document.body).on("click", ".client-link", function (e) {
    e.preventDefault()
    $(".selected .tab-pane").removeClass('active');
});
 */
$(document.body).on("click", ".entrega", function (e) {
    var ident = $(this).val();
    swal({
        title: "¿Desea confirmar la entrega?",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false
    }, function (isConfirm) {
        if (isConfirm) {
            actualizarEntrega(ident);
        } else {
            swal("cancelado", "", "error");
        }
    });
});

/**
 * Función para actualizar estado de la orden.
 * @returns {void} No retorna ningun valor
 */
function actualizarEntrega(ident) {
    if (ident == null) { return swal("Error!", "No fue posible enviar su solicitud.", "error"); }
    let fecha = $('#date').val();
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'actualizarEntrega',
        'clase': SERVICE_CLASS,
        'Params': ['1', ident, fecha]
    });
    tipoBusqueda = '1';
    $.ajax({
        method: 'POST',
        timeout: 30000,
        data: request,
        dataType: 'json',
        url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {

            if (serverResponse.result == 'success') {
                swal("Realizado", "Se ha enviado la notificación a cocina.", "success");
                getPintarAlimentos(idAlimento);
            } else {
                swal("Error!", "No fue posible realizar su solicitud.", "error");
            }

        },
        error: function (jqXHR, statusError, textoError) {
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}




