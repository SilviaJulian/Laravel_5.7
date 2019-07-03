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
let SERVICE_CLASS = 'C_dashboard';

/**
 * Variable publica que contiene el color de cada PieChart.
 * @type String
 */
let colorPrimer = ["#1ABC9C", "#1A5276"];
let colorSegundo = ["#F4D03F", "#E67E22"];
let colorLavel = ["label-success", "label-info", "label-warning"];
let colorDonut = ["#F4D03F", "#E67E22", "#C39BD3", "#7FB3D5", "#F9E79F", "#7DCEA0", "#D98880", "#AED6F1", "#B3B6B7", "#7D3C98", "#F1C40F", "#117864", "#CB4335", "#512E5F", "#FCF3CF", "#D0D3D4", "#7FB3D5", "#2471A3"]


$(document).ready(function () {
    $('#containerComida').hide();
    $('#containerCena').hide();
});



/**
 * Función para solicitar el total de ordenes de alimentos a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
// function getCountFood() {  }
$(function () {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getCountFood',
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
            let totalFood = serverResponse.result;
            $.each(totalFood, function (indx, llave) {
                switch (totalFood[indx].ORDER) {
                    case ('1'):/* COMIDA */

                        getCountMenu(totalFood[indx].ID);
                        getAistNoPrevt(totalFood[indx].ID);
                        getCountPicnicEsp(totalFood[indx].ID);
                        getCountState(totalFood[indx].ID); 
                        setInterval(function(){ getCountState(totalFood[indx].ID); }, 3000);                        
                        $('#containerComida').show();
                        count('#countComida', totalFood[indx].total);
                        break;
                    case ('2'):/* CENA */
                        getCountMenu(totalFood[indx].ID);
                        getAistNoPrevt(totalFood[indx].ID);   
                        getCountState(totalFood[indx].ID);                      
                        setInterval(function(){ getCountState(totalFood[indx].ID); }, 3000);
                        $('#containerCena').show();
                        count('#countCena', totalFood[indx].total);
                        break;
                }
            });
        } else {
            let html = '<div class="middle-box text-center animated fadeInRightBig">';
            html += '<div class="alert alert-warning">';
            html += '<h3> No hay datos que mostrar</h3>';
            html += '</div></div>';
            $('.wrapper-content').html(html);
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
});

/**
 * Función para mostrar el contador animado
 * @returns {void} No retorna ningun valor
 */
function count(identificador, limit) {
    jQuery({ Counter: 0 }).animate({ Counter: limit }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
            $(identificador).text(Math.ceil(this.Counter));
        }
    });
}
/**
 * Función para solicitar el total de platillos del menú a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
function getCountMenu(idFood) {
    let dataPrimer = [];
    let dataSegundo = [];
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getCountMenu',
        'clase': SERVICE_CLASS,
        'Params': [idFood]
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
            let totalMenu = serverResponse.result;
            let contador = 0;
            let contador2 = 0;
            $.each(totalMenu, function (indx, llave) {
                if (totalMenu[indx].TAG) {
                    totalMenu[indx].TAG = '<span class="label label-info float-right">' + totalMenu[indx].TAG + '</span>'
                }
                if (totalMenu[indx].ORDER == 1) {
                    let data = {
                        label: totalMenu[indx].TAG + totalMenu[indx].SAUCER,
                        data: totalMenu[indx].porcentaje,
                        color: colorPrimer[contador]
                    };
                    dataPrimer.push(data);
                    contador++;
                    if (contador > (colorPrimer.length - 1)) { contador = 0; }
                }
                if (totalMenu[indx].ORDER == 2) {
                    let data = {
                        label: totalMenu[indx].TAG + totalMenu[indx].SAUCER,
                        data: totalMenu[indx].porcentaje,
                        color: colorSegundo[contador2]
                    };
                    dataSegundo.push(data);
                    contador2++;
                    if (contador2 > (colorSegundo.length - 1)) { contador2 = 0; }
                }
            });
            FlotPieChart(dataPrimer, '#flot-pie-chart-primer-' + idFood);
            FlotPieChart(dataSegundo, '#flot-pie-chart-segundo-' + idFood);
        }
        else {
            FlotPieChart(dataPrimer, '#flot-pie-chart-primer-1');
            FlotPieChart(dataSegundo, '#flot-pie-chart-segundo-1');
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

/**
 * Función para pintar los platillos del menú en un PieChar.
 * @returns {void} No retorna ningun valor
 */
function FlotPieChart(data, indentificador) {
    if (!data) {
        data = [{
            label: '',
            data: 100,
            color: "#BFC9CA ",
        }];
    }
    let plotObj = $.plot($(indentificador), data, {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    });
}

/**
 * Función para solicitar el total de picnic y especiales a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
function getCountPicnicEsp(idFood) {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getCountPicnicEsp',
        'clase': SERVICE_CLASS,
        'Params': [idFood]
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
            let picnic = total.filter(total => total.COPTION_SAUCER_ID == 2);
            let especiales = total.filter(total => total.COPTION_SAUCER_ID == 3);
            pintarPicnic(picnic);
            if (especiales) { pintarEspeciales(especiales); }
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}

function pintarPicnic(picnic) {
    let data = [];
    if (picnic) {
        let hash = {};
        let platillos = picnic.filter(function (current) {
            let exists = !hash[current.platillo] || false;
            hash[current.platillo] = true;
            return exists;
        });
        let contador = 0;
        $.each(platillos, function (indxP, llave) {
            let total = 0;
            $.each(picnic, function (indxPic, llave) {
                if (picnic[indxPic].platillo == platillos[indxP].platillo) {
                    total = parseInt(total) + parseInt(picnic[indxPic].total);
                }
            });
            let donut = {
                label: platillos[indxP].platillo,
                value: total,
                color: colorDonut[contador],
            };
            data.push(donut);
            if (contador > colorDonut.length) { contador = 0; }
            contador++;
        });

        let html = '';
        contador = 0;
        hash = {};
        let guarnicion = picnic.filter(function (current) {
            let exists = !hash[current.guarnicion] || false;
            hash[current.guarnicion] = true;
            return exists;
        });
        $.each(guarnicion, function (indx, llave) {
            let total = 0;
            $.each(picnic, function (indxPic, llave) {
                if (picnic[indxPic].guarnicion == guarnicion[indx].guarnicion) {
                    total = parseInt(total) + parseInt(picnic[indxPic].totalG);
                }
            });
            html += '<div class="float-right text-center">';
            html += '<span class="views-number m-l-xs ">' + total + '</span>';
            html += '<div> <span class="label ' + colorLavel[contador] + ' float-right m-l-xs">' + guarnicion[indx].guarnicion + '</span></div>';
            html += '</div>';
            if (contador > colorLavel.length) { contador = 0; }
            contador++;
        });
        $('#Picnic-1').html(html);
        total = 0;
        $.each(picnic, function (indxPic, llave) {
            total = parseInt(total) + parseInt(picnic[indxPic].total);
        });
        count('#totalPicnic-1', total);
    }
    Donut('morris-donut-chart', data);
}
/**
 * Función para pintar los datos en un Donut.
 * @returns {void} No retorna ningun valor
 */
function Donut(identificador, data) {
    if (!data) {
        data: [{
            label: "",
            value: 1,
            color: "#BFC9CA ",
        }]
    }
    Morris.Donut({
        element: identificador,
        data: data,
        resize: true,
        colors: ['#87d6c6', '#54cdb4', '#1ab394'],
    });
}
/**
 * Función para pintar los platillos especiales.
 * @returns {void} No retorna ningun valor
 */
function pintarEspeciales(especiales) {
    let hash = {};
    let html = '';
    let platillos = especiales.filter(function (current) {
        let exists = !hash[current.platillo] || false;
        hash[current.platillo] = true;
        return exists;
    });
    let colorLavel = ["label-success", "label-info", "label-warning"];
    $.each(platillos, function (indxP, llave) {
        let total = 0;
        let contador = 0;
        html += '<div class="col-sm-12">';
        $.each(especiales, function (indxEps, llave) {
            if (especiales[indxEps].platillo == platillos[indxP].platillo) {
                total = parseInt(total) + parseInt(especiales[indxEps].total);
                html += '<div class="float-right text-center">';
                html += '<span class="views-number m-l-xs ">' + especiales[indxEps].totalG + '</span>';
                html += '<div> <span class="label ' + colorLavel[contador] + ' float-right m-l-xs">' + especiales[indxEps].guarnicion + '</span></div>';
                html += '</div>';
            }
            if (contador > colorLavel.length) { contador = 0; }
            contador++;
        });
        html += '<div class="forum-icon"><i class="fa fa-star"></i></div>';
        html += '<h4>' + platillos[indxP].platillo + '.&nbsp;&nbsp;<span class="views-number">' + total + '</span><small>Total</small> </h4>';
        html += '<div class="forum-sub-title">';
        html += '</div>';
    });
    $('#especiales-1').html(html);
}
/**
 * Función para solicitar el total de las asistencias no previstas a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
function getAistNoPrevt(idFood) {
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getAistNoPrevt',
        'clase': SERVICE_CLASS,
        'Params': [idFood]
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
            let totalAsistencia = serverResponse.result;
            count('#imprevista-' + idFood, totalAsistencia[0].total);
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}
/**
 * Función para solicitar el total de las asistencias no previstas a traves de AJAX y crea el JSON principal.
 * @returns {void} No retorna ningun valor
 */
function getCountState(idFood) {
    console.log('hola');
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getCountState',
        'clase': SERVICE_CLASS,
        'Params': [idFood]
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
            let totales = serverResponse.result;
            let html = '';
            $.each(totales, function (indx, llave) {
                switch (totales[indx].ID) {
                    case '1':
                        html += '<li><a><i class="fa fa-clock-o"></i>' + totales[indx].STATE_ORDER;;
                        html += '<span class="label label-success float-right">' + totales[indx].total + '</span></a></li>';
                        break;
                    case '2':
                        html += '<li><a><i class="fa fa-hourglass-half"></i>' + totales[indx].STATE_ORDER;
                        html += '<span class="label label-warning float-right">' + totales[indx].total + '</span></a></li>';
                        break;
                    case '3':
                        html += '<li><a><i class="fa fa-times-circle"></i>' + totales[indx].STATE_ORDER;
                        html += '<span class="label label-danger float-right">' + totales[indx].total + '</span></a></li>';
                        break;
                    case '4':
                        html += '<li><a><i class="fa fa-check"></i>' + totales[indx].STATE_ORDER;
                        html += '<span class="label label-info float-right">' + totales[indx].total + '</span></a></li>';
                        break;
                    case '5':
                        html += '<li><a><i class="fa fa-times-circle"></i>' + totales[indx].STATE_ORDER;
                        html += '<span class="label label-danger float-right">' + totales[indx].total + '</span></a></li>';
                        break;
                }
            });
            $('#listState-' + idFood).html(html);
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}