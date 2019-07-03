/**
 * JS Generales, para contener las variables generales en todos los archivos
 * @author Ing. Luis Alberto Pérez González
 * @version 2.0
 */

/**
 * Variable publica para la Generación de un ID unico para cada petición al
 * servidor.
 * @var {String}
 */
var idRequest = '';

/**
 * Funcion para generar un ID aleatorio
 * @returns {String}
 */
function genIDrequest()
{
    idRequest = ('' + Math.random()).substring(2);
    return idRequest;
}

/**
 * Variable publica para la Generación de un TimeStamp para asegurarnos que es unico.
 * Para ver si se esta actualizando el archivo JS, al hacer cambios o no.
 * @type {String}
 */
var marcaTiempo = new Date().getTime();

/**
 * Variable publica que contiene la respuesta del servidor.
 * @type {JSON}
 */
var serverResponse = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * Variable para auxiliar a los ciclos
 * @type {Number}
 */
var indice = 0;

/**
 * Variable auxiliar al generar textos
 * @type {String}
 */
var htmlNuevo = '';

/**
 * Variable publica que contiene la accion requerida en el servidor.
 * @type {String}
 */
var accion = null;

/**
 * Variable publica con la URL del GateWay que recibe las peticiones al servidor.
 * @type {String}
 */
var GATEWAY = "/services/index.php";

/**
 * Variable publica que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var CLASE_CATALOGO = 'Catalogos';

/**
 * Variable publica para alojar html ya purificado.
 * @var {String}
 */
var htmlPuro = null;

/**
 * Funcion para purificar un codigo HTML nuevo
 * @param {String} codigoHTML El codigo HTML a purificar
 * @return {String} Codigo HTML purificado
 */
function purificarHTML(codigoHTML)
{
    htmlPuro = codigoHTML;
    if (window.toStaticHTML) {
        htmlPuro = window.toStaticHTML(htmlPuro);
    }
    return htmlPuro;
}

/**
 * Función para obtener los datos de una fila completa (jqGrid !exclusive)
 * @returns {object}
 */
function getFullRow(){
    let grid = $("#jqGrid");
    let model = grid.jqGrid('getGridParam','colModel');
    let selrow = grid.jqGrid('getGridParam','selrow');
    let fila = [];
    for(let i=0;i<model.length;i++){
        if(model[i].name){
            let key = model[i].name;
            fila.push({key:key, value:grid.jqGrid ('getCell', selrow, key)});
        }
    }
    return fila;
}