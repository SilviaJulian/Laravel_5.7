/**
 * Js Tiempo, para generar cadenas de tiepo.
 * Software My Store©
 * @author Ing. Luis Alberto Pérez González (igoodbad)
 * @copyright Derechos reservados, México 2008-2016
 * @version 2.0
 * @package js
 * @final
 */

/**
 * Array de Meses
 * @type Array
 */
var mesesFecha = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

/**
 * Funcion para generar fecha actual
 * @return date
 */
function asignar_fecha()
{
    var d = new Date();
    var fmeses = d.getMonth() + 1;
    var fdias = d.getDate();
    if (fmeses < 10) {
        fmeses = '0' + fmeses;
    }
    if (fdias < 10) {
        fdias = '0' + fdias;
    }
    var fecha = d.getFullYear() + "-" + fmeses + "-" + fdias;
    return fecha;
}

/**
 * Funcion para generar hora actual
 * @returns hour
 */
function mostrarhora()
{
    var f = new Date();
    var hora = f.getHours() + "-" + f.getMinutes() + "-" + f.getSeconds();
    return hora;
}

/**
 * Funcion para dar formato "dd/mm/yyyy" a fecha
 * @param {String} fecha La fecha a convertir
 * @return {String} La fecha con el nuevo formato
 */
function fFecha(fecha)
{
    var arrayFecha = fecha.split("-");
    return arrayFecha[2] + " / " + mesesFecha[Number(arrayFecha[1])] + " / " + arrayFecha[0];
}
