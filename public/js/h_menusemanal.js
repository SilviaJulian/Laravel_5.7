
/** JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Sistema Home Menú©
 * @author Ing. Claudia Pérez
 * @version 1.0
 * @package js
 * @final
 */

/**
 * Variable públicaque contiene la respuesta del servidor
 * @type {JSON}
 */
var serverResponse = null;

/**
 * Variable pública que contiene el usuario.
 * @type {String}
 */
var usuario = null;

/**
 * Variable pública que contiene la contraseña.
 * @type {String}
 */
var contrasena = null;

/**
 * Variable pública para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * Variable pública para presentación del menú tipo picnic
 * @type {String}
 */
var txtPicnic = null;
var txtEspecial = null;
var date = null;
/**
 * Variable publica que contiene la funcion timeout.
 * @var {String}
 */

var tabs = { "Comida": "comida", "Cena": "cena" };
var tabsAli = { "Comida-Menú": "tab-comida-menu", "Comida-Picnic": "tab-comida-picnic", "Comida-Especial": "tab-comida-especial", "Cena-Menú": "tab-cena-menu", "Cena-Picnic": "tab-cena-picnic", "Cena-Especial": "tab-cena-especial" };
var arrCards = ["Menú", "Picnic", "Especial"];
var cards = { "Menú": "menu", "Picnic": "picnic", "Especial": "especial" };
var noTimes = { 1: "primero", 2: "segundo", 3: "tercero" }
var times = { 1: "pb-primero", 2: "pb-segundo" }


var mInfoNoData = '<div class="alert alert-warning"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No hay opciones disponibles.</div>';

/**
 * Variable pública que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var SERVICE_CLASS = 'H_menusemanal';

/**
 * Constante para obtener columna de un array
 * @type {Array}
 */
const arrayColumn = (arr, n) => arr.map(x => x[n]);


/**
 * Variable pública de presentación de contenido para tab de alternativas.
 * @type {String}
 */
var tAlimento1 = 'Comida';
var tAlimento2 = 'Cena';
var tTime1 = 'Primero';
var tTime2 = 'Segundo';

var c1 = 'badge-teal';
var c2 = 'badge-green';
var c3 = 'badge-indigo';
var c4 = 'badge-deep-purple';

/**
 * Configuración base para mensajes de Toastr
 */
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$(document).ready(function () {

    window.history.replaceState({}, document.title, "/site/" + "h_menusemanal.php");
    getConfig($('#form-id').val());
    toggleLoader();
    
});
/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function loadMenu(date) {
    getConfig(date);
}
/**
 * Función para obtener y setear el menu de dia
 * @returns {void} No retorna ningun valor
 */
function getConfig(date = null) {
    toggleLoader();
    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'getConfig', 'clase': SERVICE_CLASS, 'Params': [date] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            let { date, day, prev, next } = serverResponse.result.config;
            if (prev != null) { $('#prev').val(prev).attr("disabled", false); } else { $('#prev').val("").attr("disabled", true); }
            if (next != null) { $('#next').val(next).attr("disabled", false); } else { $('#next').val("").attr("disabled", true); }
            $('#day').html(day);
            $('#form-id').val(date);
            serverResponse.result.data.map(e => {
                e.card = e.card.split(";");
                for (const card of e.card) {
                    let name = `tab-${tabs[e.tab]}-${cards[card]}`;
                    $(`a[href="#${name}"]`).parents("li").removeClass("invisible");
                    $(`#${name}`).removeClass("invisible");
                    switch (card) {
                        case 'Menú': getMenu(name, date, e.tab, tabs[e.tab]);
                            break;
                        case 'Picnic': getPicnic(name, tabs[e.tab]);
                            break;
                        case 'Especial': getEspecial(name, tabs[e.tab]);
                            break;
                    }
                }
                for (const card of arrCards) {
                    let name = `tab-${tabs[e.tab]}-${cards[card]}`;
                    if (e.card.indexOf(card) == -1) {
                        $(`a[href="#${name}"]`).parents("li").addClass("invisible");
                        $(`#${name}`).addClass("invisible");
                    }
                }
                return e;
            });
            getOrder(date);
            if (serverResponse.result.config.edit == 0) { $('.ibox-content').addClass('sk-overlay'); } else { $('.ibox-content').removeClass('sk-overlay'); }
            return;
        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    toggleLoader();
}

/**
 * Función para obtener y setear el menu del dia
 * @returns {void} No retorna ningun valor
 */
function getMenu(div, date, title, tipo) {
    var divMenu = $('#' + div + ' .panel-body');
    var container = '';
    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'getMenu', 'clase': SERVICE_CLASS, 'Params': [date, title] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            if (serverResponse.result.length == 0) {
                divMenu.html(mInfoNoData);
            } else {
                container = setCard(serverResponse.result, title, tipo);
                divMenu.html(container);
                $('.opt').on('change', function () {
                    $(this).parents('.panel-block').find('.opt, .alt').not(this).prop('checked', false).filter('.alt').attr('disabled', true);
                    $(this).parents('.menu-item').find('.alt').attr('disabled', false);
                    ck = $(this).parents('.menu-item').find('.alt').attr('disabled', false).attr("id");
                });
                $('.alt').on('change', function () {
                    $(this).parents('.menu-item').find('.alt').attr('disabled', false);
                    ck = $(this).parents('.menu-item').find('.alt').attr('disabled', false).attr("id");
                });
            }
        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    return true;
}
/**
 * Función de contrucción de elementos para presentación del menú semanal.
 * @param {Object} rows Objeto del tipo JSON con la respuesta recibida del servidor
 * @param {String} title Titulo del componente
 * @returns {string} Devuelve componente
 */
function setCard(rows, title, tipo) {
    var plat, nAli;
    var txtTime, txtPlat, txtAlt, txtOpt, txtMenúTime, badge;
    var columnTime, uniqueTime;

    txtOpt = '';
    nAli = 0;
    ali = rows;
    columnTime = arrayColumn(rows, "TIME_MENU");
    uniqueTime = columnTime.filter(function (itm, i, a) {
        return i == a.indexOf(itm);
    });

    for (var k = 0; k < uniqueTime.length; k++) {
        txtTime = '<div class="panel-block pb-' + uniqueTime[k].toLowerCase() + '"><h6 class="menu-section-title">' + uniqueTime[k] + '</h6>';
        txtMenúTime = '';
        txtPlat = '';
        alimento = title;
        idSec = title.toLowerCase();
        switch (alimento) {
            case tAlimento1:
                if (uniqueTime[k] == tTime1) {
                    badge = c1;
                } else { badge = c2; }
                break;
            case tAlimento2:
                if (uniqueTime[k] == tTime1) {
                    badge = c3;
                } else { badge = c4; }
                break;
            default:
                badge = 'badge-brown';
        }
        plat = null;
        plat = $.grep(ali, function (ele, index) {
            return ele.TIME_MENU == uniqueTime[k];
        });

        for (var l = 0; l < plat.length; l++) {
            nAli++;
            radio = plat[l].menu;
            check = plat[l].alt;
            radioName = "check" + '_' + tipo + '_menu_' + uniqueTime[k].toLowerCase();

            if (nAli == 3) { radio = 1; check = 1; } else { }
            txtPlat += '<div class="menu-item"><div class="menu-item-name"><div class="radio rtl radio-warning radio-circle">'
            txtPlat += '<input type="radio" id="' + radioName + '_' + plat[l].ID + '" class="opt" value="' + plat[l].ID + '" name="' + radioName + '" onclick="setOrder(this.id)">'
            txtPlat += '<label for="' + radioName + '_' + plat[l].ID + '" class="lg"><span class="badge ' + badge + '">' + nAli + '</span> ' + plat[l].SAUCER + '</label>'
            txtPlat += '</div></div>';

            if (plat[l].CALTER_MENU_ID != null && plat[l].ALTERNATIVE != null) {
                txtAlt = '<div class="menu-item-description"><div class="checkbox rtl checkbox-warning checkbox-circle">';
                txtAlt += '<input type="checkbox" id="alt_' + plat[l].ID + '" class="alt" value="0" name="' + radioName + '_alt" tabindex="0" onclick="setOrderAlt(this.id)" disabled>';
                txtAlt += '<label for="alt_' + plat[l].ID + '">Posibilidad de cambiar a ' + plat[l].ALTERNATIVE + '</label></div></div>';
                txtPlat += txtAlt;
            }
            txtPlat += '</div>';
        }
        txtOpt += txtTime + txtPlat + '</div>';
    }
    txtMenúTime += txtOpt;
    return (txtMenúTime);
}

/**
 * Función para obtener y setear el menu tipo picnic
 * @returns {void} No retorna ningun valor
 */
function getPicnic(div, tipo) {
    var divPicnic = $('#' + div + ' .panel-body');
    if (txtPicnic == null) {
        request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'getPicnic', 'clase': SERVICE_CLASS, 'Params': [] });
        $.ajax({
            method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR) {
                if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
                var n = 1;
                if (serverResponse.result.length > 0) {
                    txtPicnic = '<div class="panel-block pb-primero"><h6 class="menu-section-sub-title">**Todos los platos van acompañados de fruta del día o yogurt **</h6>';
                    txtPicnic += '<div class="row justify-content-md-center"><div class="col-sm-6 col-lg-5"><div class="radio radio-success"><input type="radio" id="alt_F" class="alt" value="F" name="check_' + tipo + '_picnic_alt" onclick="setAlt(this.id)" checked="" disabled><label for="alt_F">Fruta del día</label></div></div><div class="col-sm-6 col-lg-5"><div class="radio radio-success"><input type="radio" id="alt_Y" class="alt" value="Y" name="check_' + tipo + '_picnic_alt" onclick="setAlt(this.id)" disabled><label for="alt_Y">Yogurt</label></div></div></div>';

                    json = serverResponse.result;
                    $.each(json, function (i, key) {
                        txtPicnic += '<div class="menu-item"><div class="menu-item-name"><div class="radio rtl radio-warning radio-circle">';
                        txtPicnic += '<input type="radio" id="check_' + tipo + '_picnic_primero_' + json[i]['cve'] + '" class="pic" value="' + json[i]['cve'] + '" name="check_' + tipo + '_picnic_primero" tabindex="0" onclick="setOrder(this.id)">';
                        txtPicnic += '<label for="check_' + tipo + '_picnic_primero_' + json[i]['cve'] + '" class="lg"><span class="badge badge-blue">' + n + '</span> ' + json[i]['menu'] + '</label>';
                        txtPicnic += '</div></div>';
                        if (json[i]['det'].length >= 1) {
                            txtPicnic += '<div class="menu-item-description">' + json[i]['det'] + '</div>';
                        }
                        txtPicnic += '</div>';
                        n++;
                    });
                    txtPicnic += '</div>';

                } else {
                    txtPicnic = mInfoNoData;
                }
                divPicnic.html(txtPicnic);
                $('.pic').on('change', function () {
                    $(this).parents('.panel-block').find('.alt').attr('disabled', false);
                });
            },
            error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
        });
    } else {
        divPicnic.html(txtPicnic);
    }
    return true;
}

/**
 * Función para obtener y setear el menu de tipo picnic especial
 * @returns {void} No retorna ningun valor
 */
function getEspecial(div, tipo) {
    var divEspecial = $('#' + div + ' .panel-body');
    if (txtPicnic == null) {
        request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'getEspecial', 'clase': SERVICE_CLASS, 'Params': [] });
        $.ajax({
            method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR) {
                var n = 1;
                if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
                if (serverResponse.result.length > 0) {
                    txtEspecial = '<div class="panel-block pb-primero"><h6 class="menu-section-sub-title">Menú especial</h6>';
                    txtEspecial += '<div class="row justify-content-md-center"><div class="col-lg-3"><div class="radio radio-success"><input type="radio" id="alt_P" class="alt" value="P" name="check_' + tipo + '_especial_alt" onclick="setAlt(this.id)" checked disabled><label for="alt_P">Patatas</label></div></div><div class="col-lg-3"><div class="radio radio-success"><input type="radio" id="alt_E" class="alt" value="E" name="check_' + tipo + '_especial_alt" onclick="setAlt(this.id)" disabled><label for="alt_E">Ensalada</label></div></div></div>';

                    json = serverResponse.result;
                    $.each(json, function (i, key) {
                        txtEspecial += '<div class="menu-item"><div class="menu-item-name"><div class="radio rtl radio-warning radio-circle">';
                        txtEspecial += '<input type="radio" id="check_' + tipo + '_especial_primero_' + json[i]['cve'] + '" class="esp" value="' + json[i]['cve'] + '" name="check_' + tipo + '_especial_primero" tabindex="0" onclick="setOrder(this.id)">';
                        txtEspecial += '<label for="check_' + tipo + '_especial_primero_' + json[i]['cve'] + '" class="lg"><span class="badge badge-pink">' + n + '</span> ' + json[i]['menu'] + '</label>';
                        txtEspecial += '</div></div>';
                        if (json[i]['det'].length >= 1) {
                            txtEspecial += '<div class="menu-item-description">' + json[i]['det'] + '</div>';
                        }
                        txtEspecial += '</div>';
                        n++;
                    });
                    txtEspecial += '</div>';
                } else {
                    txtEspecial = mInfoNoData;
                }
                divEspecial.html(txtEspecial);
                $('.esp').on('change', function () {
                    $(this).parents('.panel-block').find('.alt').attr('disabled', false);
                });
            },
            error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
        });
    } else {
        divEspecial.html(txtEspecial);
    }
    return true;
}
/**
 * Función para obtener y setear el menu del dia
 * @returns {void} No retorna ningun valor
 */
function getOrder(date) {
    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'getOrder', 'clase': SERVICE_CLASS, 'Params': [date] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            try {
                var obj = $.parseJSON(serverResponse.result["orden"]);
                var tabName = null;
                var jQTab = null;
                var det = null;
                var checkName = null;
                $.each(obj, function (i) {
                    if (tabs.hasOwnProperty(obj[0].type) && obj[0].card.length > 0) {
                        tabName = (tabsAli.hasOwnProperty(obj[i].type + "-" + obj[i].card)) ? tabsAli[obj[i].type + "-" + obj[i].card] : null;
                        cardName = (cards.hasOwnProperty(obj[i].card)) ? cards[obj[i].card] : null;

                        $('#' + tabName).parents('.tabs-container').find('.nav-link,.tab-pane').removeClass('active show');
                        $('#' + tabName + ', a[href="#' + tabName + '"]').addClass('active show');

                        if (tabName != null) {
                            jQTab = "#" + tabName;
                            det = obj[i].det;

                            $.each(det, function (j) {
                                checkName = "check_" + tabs[obj[i].type] + '_' + cardName + '_' + noTimes[det[j].time] + '_' + det[j].val;
                                $(jQTab).find('#' + checkName).attr("checked", true);
                                if (cardName == 'menu') {
                                    $(jQTab + " ." + times[det[j].time]).find('#alt_' + det[j].val).attr("disabled", false);
                                    if (det[j].alt == 1) { $(jQTab + " ." + times[det[j].time]).find('#alt_' + det[j].val).attr("checked", true); }
                                } else {
                                    $(jQTab + " ." + times[det[j].time]).find('#alt_' + det[j].alt).attr("checked", true);
                                    $(jQTab + " ." + times[det[j].time]).find('.alt').attr("disabled", false);
                                }

                            });
                        }
                    } else { console.log("Reservación no identificada."); }
                });
            } catch (error) {
                console.error(error);
                return 'El objeto no tiene formato JSON';
            }
        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    return true;
}

/**
 * Función de petición de registro de reservación.
 * @param {String} id Titulo del componente
 * @returns {string} Devuelve componente
 */
function setOrder(id) {
    var date = $('#form-id').val();
    var jQel = $("#" + id);
    var cve = jQel.attr("name");
    var val = jQel.attr("value");

    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'setOrder', 'clase': SERVICE_CLASS, 'Params': [date, cve, val] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { toastr.error(serverResponse.error, 'Error!'); return; }
            jQel.parents('.panel-body').find('.justify-content-md-center').find('input[type=radio]').prop("disabled", false);
            jQel.parents('.tab-pane').siblings().find('.menu-item-name').find('input[type=radio]').prop("checked", false);
            jQel.parents('.tab-pane').siblings().find('.justify-content-md-center').find('input[type=radio]').prop("disabled", true);
            jQel.parents('.tab-pane').siblings().find('.justify-content-md-center').find('input[type=radio]:first').prop("checked", true);
            jQel.parents('.tab-pane').siblings().find('input[type=checkbox]').prop("checked", false).prop("disabled", true);
            if (serverResponse.result == 'success') {
                jQel.parents('.tab-pane').siblings().find('.menu-item').filter('input[type=checkbox]').prop("checked", false);
                toastr.success('Su selección ha sido guardada.', 'Hecho');
            } else if (serverResponse.result == 'update') {
                toastr.success('Su selección ha sido actualizada.', 'Hecho');
            } else {
                toastr.warning('Actualice la página para verificar si su selección ha sido guardada. ', 'Atención');
            }

        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    return;

}

/**
 * Función de petición de registro de reservación.
 * @param {String} id Titulo del componente
 * @returns {string} Devuelve componente
 */
function setOrderAlt(id) {
    var date = $('#form-id').val();
    var cve = $("#" + id).attr("name");
    var padre = $("#" + id).attr("id");
    var val = $("#" + id).is(':checked') ? 1 : 0;

    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'setOrderAlt', 'clase': SERVICE_CLASS, 'Params': [date, cve, padre, val] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { toastr.error(serverResponse.error, 'Error!'); return; }
            if (serverResponse.result == 'success') {
                toastr.success('Su alternativa ha sido guardada.', 'Hecho');
            } else if (serverResponse.result == 'update') {
                toastr.success('Su alternativa ha sido actualizada.', 'Hecho');
            } else {
                toastr.warning('Actualice la página para verificar si su selección ha sido guardada. ', 'Atención');
            }
        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    return;
}

/**
 * Función de petición de registro de reservación.
 * @param {String} id Titulo del componente
 * @returns {string} Devuelve componente
 */
function setAlt(id) {
    var date = $('#form-id').val();
    var cve = $("#" + id).attr("name");
    var padre = $("#" + id).attr("id");
    var val = $("#" + id).val();

    request = JSON.stringify({ 'Id': genIDrequest(), 'method': 'setAlt', 'clase': SERVICE_CLASS, 'Params': [date, cve, padre, val] });
    $.ajax({
        method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR) {
            if (serverResponse.error) { toastr.error(serverResponse.error, 'Error!'); return; }
            if (serverResponse.result == 'success') {
                toastr.success('Su alternativa ha sido guardada.', 'Hecho');
            } else if (serverResponse.result == 'update') {
                toastr.success('Su alternativa ha sido actualizada.', 'Hecho');
            } else {
                toastr.warning('Actualice la página para verificar si su selección ha sido guardada. ', 'Atención');
            }
        },
        error: function (jqXHR, statusError, textoError) { mostrarErrorJSON(jqXHR, statusError, textoError); }
    });
    return;
}

