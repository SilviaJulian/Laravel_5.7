
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
let SERVICE_CLASS = 'C_comandas';

/**
 * Variable publica que contiene la fecha actual.
 * @type Date
 */
let diaActual = new Date();
diaActual.setDate(diaActual.getDate());

/**
 * Variables publica que contiene los estilos del tipo de alimento
 * @type Obj
 */
let objFa = { Comida: 'fa fa-cutlery text-navy', Cena: 'fa fa-coffee text-navy' };
let color = ['bg-success', 'yellow-bg'];

/**
 * Variables publica que contiene los datos obtenidos de sql
 * @type Obj
 */
let objProgMenu;

$(document).ready(function () {

    let tituloFile = 'Comandas';
    $('#panelHuesped').hide();
       getComandas();

    $('.dataTables-example').DataTable({
        pageLength: 10,
        responsive: true,
        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
        dom: '<"html5buttons"B>lTfgitp',
        "createdRow": function (row, data, dataIndex) {
            if (data[5] != '') {
                $($(row).find("td")[5]).addClass("text-success text-center");
                $($(row).find("td")[5]).css("font-size", "25px");
                $($(row).find("td")[5]).css("font-weight", "600");
            }
            if (data[7] != '') {
                $($(row).find("td")[7]).addClass("text-success text-center");
                $($(row).find("td")[7]).css("font-size", "25px");
                $($(row).find("td")[7]).css("font-weight", "600");
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
});
/**
 * Función para ejecutar la primera funcion al cargar la aplicación:
 */
$(function() {
    $('#date').datepicker({
        locales:'es',
        language: 'es',
        format: 'LT',
        format: 'dd-mm-yyyy',
        defaultDate: diaActual,
        autoclose: true,
        todayBtn: true,
        minView: 2,
        todayHighlight: true,
        useCurrent: true,
        todayHighlight: true,
    });
    resetDate();
})
/* Función que resta in día a la fecha  */
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
        getComandas();
    }
}
/**
 * Función para solicitar las registros de las ordenes reservadas a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
function getComandas() {
    date = $('#date').val();

    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getProgDiaria',
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
            let numAlimentos = [];
            /* 1- Se obtiene los alimentos programados */
            $.each(listComandas, function (indice, llave) {
                let alimento = {
                    ordAlim: listComandas[indice].ordAlim,
                    alimento: listComandas[indice].alimento,
                    horario: listComandas[indice].horario
                }
                numAlimentos.push(alimento);
            });
            /* 1.1 Se elimina los duplicados de los alimentos */
            let hash = {};
            numAlimentos = numAlimentos.filter(function (current) {
                let exists = !hash[current.ordAlim] || false;
                hash[current.ordAlim] = true;
                return exists;
            });
            /* Se Ordena antes de insertar  */
            numAlimentos.sort(function (a, b) {
                if (a.ordAlim > b.ordAlim) {
                    return 1;
                }
                if (a.ordAlim < b.ordAlim) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            /* 1.3 Se agregar al obj Padre */
            objProgMenu = numAlimentos;


            /* 2 Se obtiene el tipo de Opciones que tiene un alimento  */
            $.each(numAlimentos, function (indice, llave) {
                let opciones = [];
                /* Se obtiene un los registros de un tipo de alimento  */
                let listOpciones = listComandas.filter(listComandas => listComandas.ordAlim == numAlimentos[indice].ordAlim);
                /* Se optiene todas las opciones */
                $.each(listOpciones, function (indice, llave) {
                    let op = {
                        ordOp: listOpciones[indice].ordOp,
                        opcion: listOpciones[indice].opcion,
                        total: listOpciones[indice].totales
                    }
                    opciones.push(op);
                });
                let totales = opciones;
                /* Se elimina dulicados de las opciones */
                let hash = {};
                opciones = opciones.filter(function (current) {
                    let exists = !hash[current.ordOp] || false;
                    hash[current.ordOp] = true;
                    return exists;
                });

                /* Se suman los totales  */
                $.each(opciones, function (indice, llave) {
                    let listTotales = totales.filter(totales => totales.ordOp == opciones[indice].ordOp);
                    let suma = 0;
                    $.each(listTotales, function (idx, llave) {
                        suma = parseInt(suma) + parseInt(listTotales[idx].total);
                    });
                    opciones[indice].total = suma;
                });

                /* Se Ordena antes de insertar  */
                opciones.sort(function (a, b) {
                    if (a.ordOp > b.ordOp) {
                        return 1;
                    }
                    if (a.ordOp < b.ordOp) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                /* Se agrega al Obj Padre */
                objProgMenu[indice].prog = opciones;

                /* 3- Se optienen los tipos de tiempos que tiene cada opcion  */

                $.each(opciones, function (indiceOP, llave) {
                    let tiempos = [];
                    /* Se obtiene los tipos de tiempos que tiene cada Opcion */
                    let listTiempos = listOpciones.filter(listOpciones => listOpciones.ordOp == opciones[indiceOP].ordOp);

                    $.each(listTiempos, function (indice, llave) {
                        let time = {
                            ordTiempo: listTiempos[indice].ordTiempo,
                            timeMenu: listTiempos[indice].TIME_MENU
                        }
                        tiempos.push(time);
                    });
                    /* Se elimina dulicados de los tiempos*/
                    let hash = {};
                    tiempos = tiempos.filter(function (current) {
                        let exists = !hash[current.ordTiempo] || false;
                        hash[current.ordTiempo] = true;
                        return exists;
                    });
                    /* Se Ordena antes de insertar  */
                    tiempos.sort(function (a, b) {
                        if (a.ordTiempo > b.ordTiempo) {
                            return 1;
                        }
                        if (a.ordTiempo < b.ordTiempo) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    });

                    /* Se agrega al Obj Padre */
                    objProgMenu[indice].prog[indiceOP].tiempo = tiempos;


                    $.each(tiempos, function (indiceTmp, llave) {
                        let platillos = [];
                        /* Se obtiene los tipos de tiempos que tiene cada Opcion */
                        let listPlatillos = listTiempos.filter(listTiempos => listTiempos.ordTiempo == tiempos[indiceTmp].ordTiempo);
                        $.each(listPlatillos, function (indiceP, llave) {
                            let plato = {
                                platillo: listPlatillos[indiceP].platillo,
                                totales: listPlatillos[indiceP].totales,
                                totalAlternativa: listPlatillos[indiceP].alternativa,
                                pAlternativa: listPlatillos[indiceP].ALTERNATIVE,
                                tagAlternativa: listPlatillos[indiceP].TAG
                            }
                            platillos.push(plato);
                        });
                        objProgMenu[indice].prog[indiceOP].tiempo[indiceTmp].platillo = platillos;
                    });
                });
            });
            pintarComadas();

            let html = '';
            let id;
            $.each(objProgMenu, function (indxMenu, llave) {
                html += '<li id="ls_comandas">';
                html += '<a class="nav-link';
                if (indxMenu == 0) {
                    html += ' active ';
                    id = objProgMenu[indxMenu].ordAlim;
                }
                html += '" data-toggle="tab" href="#TabComadas" onclick="getListaHuesp(' + objProgMenu[indxMenu].ordAlim + ')">';
                html += '<i class="' + objFa[objProgMenu[indxMenu].alimento] + '"></i>' + objProgMenu[indxMenu].alimento;
                html += '</a>';
                html += '</li>';
            });
            document.getElementById('titleTab').innerHTML = html;
            getListaHuesp(id);
        } else {
            let html = '<div class="middle-box text-center animated fadeInRightBig">';
            html += '<div class="alert alert-warning">';
            html += '<h3> No hay datos que mostrar</h3>';
            html += '</div></div>';
            document.getElementById('panelAlimento').innerHTML = html;
            $('#panelHuesped').hide();
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });

}

/**
 * Función para pintar los elementos HTML con los contados obtenidos del JSON principal.
 * @returns {void} No retorna ningun valor
 */
function pintarComadas() {
    let html = '';
    $.each(objProgMenu, function (indxMenu, llave) {
        html += '<div class="col-lg-6"><div class="ibox">';
        html += '<div class="ibox-title b-r-lg">';
        html += '<div class="col-lg-12 col-md-10 p-xxs no-margins">';
        html += '<div class="row">';
        html += '<div class="col-2">';
        html += '<div class="col-2 m-r-md"><i class="' + objFa[objProgMenu[indxMenu].alimento] + '" style="font-size:35px"></i></div>';
        html += '</div>';
        html += '<div class="col-6">';
        html += '<h2>' + objProgMenu[indxMenu].alimento + '</h2>';
        html += '<div><i class="fa fa-clock-o"></i> <strong><span>' + objProgMenu[indxMenu].horario + '</span></strong></div>';
        html += '</div>';
        html += '<div class="col-4 text-right">';
        let programacion = objProgMenu[indxMenu].prog;
        $.each(programacion, function (indxProg, llave) {
            if (programacion[indxProg].ordOp == '1') {
                html += '<h2 class="font-bold" id="totalMenu">' + programacion[indxProg].total + '</h2><small>total</small>';
            }
        });
        html += '</div>';
        html += '</div> <!-- Fin de row -->';
        html += '</div>';
        html += '<div class="ibox-tools"> <a  class="collapse-link"><i class="fa fa-chevron-down"></i> </a></div>';
        html += '</div> <!-- Fin de box-title -->';

        $.each(programacion, function (indxProg, llave) {
            /* Se ponta el Menú */
            let tiempos = programacion[indxProg].tiempo;
            switch (programacion[indxProg].ordOp) {
                case ('1'):
                    let contador = 1;
                    html += '<div class="ibox-content gray-bg" style="display:none">';
                    html += ' <div class="row"><div class="col-lg-12">';

                    $.each(tiempos, function (indxTmp, llave) {
                        html += '<h2><strong>' + tiempos[indxTmp].timeMenu + '</strong> </h2>';
                        html += ' <div class="hr-line-dashed style1 lazur-bg"></div>';
                        let platillos = tiempos[indxTmp].platillo;
                        let conColor = 0;

                        html += '<div class="row justify-content-center align-items-center">';
                        $.each(platillos, function (indxPl, llave) {
                            html += '<div class="col-lg-6 col-md-10">';
                            html += '<div class="widget style1 ' + color[conColor] + '"><div class="row">';
                            html += '<div class="col-3"><h2 class="font-bold btn-default btn-circle btn-lg text-muted border-size-sm" style="padding:2px 2px">' + contador + '</h2></div>';
                            html += '<div class="col-9 text-right">';
                            html += '<span>' + platillos[indxPl].platillo + '</span><h2 class="font-bold">' + (parseInt(platillos[indxPl].totales) - parseInt(platillos[indxPl].totalAlternativa)) + '</h2>';
                            html += '</div> <!-- Fin col-8 -->';
                            html += '</div></div> <!-- Fin widget -->';
                            html += '</div> <!-- Fin col-lg-6 -->';
                            html += '<div class="col-lg-6 col-md-10">';
                            if (platillos[indxPl].totalAlternativa > 0) {
                                html += '<div class="widget style1"><div class="row">';
                                html += '<div class="col-4 text-center"> <h2 class="font-bold btn-info btn-circle btn-lg border-size-sm" style="padding:5px">' + platillos[indxPl].tagAlternativa + '</h2>';
                                html += '</div>';
                                html += '<div class="col-8 text-right">';
                                html += '<span>' + platillos[indxPl].pAlternativa + '</span><h2 class="font-bold">' + platillos[indxPl].totalAlternativa + '</h2>';
                                html += '</div> <!-- Fin col-8 -->';
                                html += '</div></div> <!-- Fin widget -->';
                            }
                            html += '</div> <!-- Fin col-lg-6 -->';
                            contador = contador + 1;
                            conColor = conColor + 1;
                        });
                        html += '</div> <!-- Fin row justify-content-center -->';
                    });
                    html += '</div></div> <!-- Fin col-lg-12 del Menu-->';
                    html += ' <div class="hr-line-dashed style1 lazur-bg"></div>';
                    html += '</div> <!-- Fin ibox-content -->';
                    break;
                case ('2'):
                    html += '<div class="row m-t-xs m-b-xs">';
                    html += '<div class="col-lg-12"><div class="ibox" style="margin-bottom:5px;">';
                    html += '<div class="ibox-title  bg-info b-r-md">';
                    html += '<div class="row"><div class="col-4 text-center">';
                    html += '<h2><strong>' + programacion[indxProg].opcion + '</strong></h2> </div>';
                    html += '<div class="col-8 text-right"><h2 class="font-bold">' + programacion[indxProg].total + '&nbsp<small>total</small></h2></div></div>';
                    html += '<div class="ibox-tools"><a class="collapse-link"><i class="fa fa-chevron-down"></i></a></div>';
                    html += '</div> <!-- Fin ibox-title-->';
                    html += '<div class="ibox-content" style="display:none;"><div class="dd" id="nestable2">';
                    $.each(tiempos, function (indxTmp, llave) {
                        let platillos = tiempos[indxTmp].platillo;
                        $.each(platillos, function (indxPl, llave) {
                            html += '<div class="dd-handle">';
                            html += '<span class="float-right">' + platillos[indxPl].totales + ' </span>';
                            html += '<span class="label label-info"><i class="fa fa-shopping-basket"></i></span></span>' + platillos[indxPl].platillo;
                            html += '</div> <!-- Fin dd-handle -->';
                        });
                    });
                    html += '</div></div> <!-- Fin ibox-content -->';
                    html += '</div></div> <!-- Fin col-lg-12 del Picnic-->';
                    html += '</div> <!-- Fin row m-t-lg-->';
                    break;
                case ('3'):
                    html += '<div class="row m-t-xs m-b-xs">';
                    html += '<div class="col-lg-12"><div class="ibox" style="margin-bottom:5px;">';
                    html += '<div class="ibox-title  bg-primary b-r-md">';
                    html += '<div class="row"><div class="col-4 text-center">';
                    html += '<h2><strong>' + programacion[indxProg].opcion + '</strong></h2> </div>';
                    html += '<div class="col-8 text-right"><h2 class="font-bold">' + programacion[indxProg].total + '&nbsp<small>total</small></h2></div></div>';
                    html += '<div class="ibox-tools"><a class="collapse-link"><i class="fa fa-chevron-down"></i></a></div>';
                    html += '</div> <!-- Fin ibox-title-->';
                    html += '<div class="ibox-content" style="display:none;">';
                    $.each(tiempos, function (indxTmp, llave) {
                        let platillos = tiempos[indxTmp].platillo;
                        $.each(platillos, function (indxPl, llave) {
                            html += '<div class="forum-item active"><div class="row"><div class="col-sm-12">';
                            html += '<div class="float-right">';
                            /* Parte que se itera para agregar las guarniciones  */
                            html += '<span class="views-number">' + platillos[indxPl].totales + '</span>';
                            html += '<div> <small>Total</small></div>';
                            /*  */
                            html += '</div> <!-- Fin float-right  -->';
                            html += '<div class="forum-icon"> <i class="fa fa-star"></i></div>';
                            html += '<h4>' + platillos[indxPl].platillo + '</h4>';
                            html += '<div class="forum-sub-title"> Con guarnición</div>';
                            html += '</div> </div> </div> <!-- Fin forum-item  -->';
                        });
                    });
                    html += '</div> <!-- Fin ibox-content -->';
                    html += '</div></div> <!-- Fin col-lg-12 del Especial-->';
                    html += '</div> <!-- Fin row m-t-lg-->';
                    break;
                case ('4'):
                    html += '<div class="row m-t-xs m-b-xs">';
                    html += '<div class="col-lg-12"><div class="ibox" style="margin-bottom:5px;">';
                    html += '<div class="ibox-title bg-warning b-r-md">';
                    html += '<div class="row"><div class="col-8 ">';
                    html += '<h2><strong>' + programacion[indxProg].opcion + '</strong></h2> </div>';
                    html += '<div class="col-4 text-right"><h2 class="font-bold">' + programacion[indxProg].total + '&nbsp<small>total</small></h2></div></div>';
                    html += '</div> <!-- Fin ibox-title-->';
                    html += '</div></div> <!-- Fin ibox-content -->';
                    html += '</div></div> <!-- Fin col-lg-12 del Asistencia x-->';
                    html += '</div> <!-- Fin row m-t-lg-->';
                    break;
            }
        });
        // html += '</div> <!-- Fin ibox-content -->';
        html += '</div></div> <!-- Fin col-lg-6 y  de ibox -->';
        document.getElementById('panelAlimento').innerHTML = html;
    });

    $('.collapse-link').on('click', function (e) {
        e.preventDefault();
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });


}


/**
 * Función que solcita a traves de AJAX la lista de ordenes y  Huspedes .
 * @returns {void} No retorna ningun valor
 */
function getListaHuesp(id) {
    date = $('#date').val();
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getListaHuesp',
        'clase': SERVICE_CLASS,
        'Params': [id, date]
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
            $('#bodyTabComandas > tr').remove();
            pintarTabComandas(serverResponse.result);
        } else {
            $('#bodyTabComandas > tr').remove();
        }

    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para pintar la dataTable .
 * @returns {void} No retorna ningun valor
 */
function pintarTabComandas(listHp) {
    let table = $('.dataTables-example').DataTable();
    table.clear().draw();
    $.each(listHp, function (indx, llave) {
        let objHdp = [];
        objComandas = listHp[indx];
        objHdp.push(objComandas.date);
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
            objHdp.push('<div class="text-success text-center">'+objMenu[index].alt+'</div>');
        });
        if (objMenu.length == 1) {
            objHdp.push('');
            objHdp.push('');
        }
        objHdp.push(objComandas.obs);
        objHdp.push(objComandas.status);
        table.row.add(objHdp).draw();
    });
    $('#panelHuesped').show();
}
