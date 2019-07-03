/**
 * JS Paginacion, para interactuar con el paginador actual
 * @author Ing. Luis Alberto Pérez González
 * @version 1.0
 */

/**
 * Variable que contiene el numero actual de la paginacion
 * @type Number
 */
var numPag = 1;

/**
 * Variable que contiene el maximo de paginas posibles
 * @type Number
 */
var maxPags = 0;

/**
 * Variable que contiene el numero total de filas
 * @type Number
 */
var maxRows = 20;

/**
 * Variable que contiene el numero de filas
 * @type Number
 */
var rowNum = 0;

/**
 * Variable que contiene el id del paginador con el que se trabaja
 * @type Number
 */
var idPag = "";
var intervalo = 1;
var maxInter;
function paginarListas(accion, inPag) {
    var cList = false;
 
       switch (accion) {
        case "previews":
            if (numPag > 1) {
                pag = numPag % 10;                               
                intervalo = intervalo - 10;
                
                numPag = intervalo;               
                cList = true;
            }
            break;
        case "next":
            if (numPag < maxPags) {
                intervalo = intervalo + 10;
                numPag = intervalo;
                cList = true;
            }
            break;
        case "goTo":
            numPag = inPag;
            cList = true;
            break;
        case "inicio":
            intervalo = 1;
            numPag = 1;
            cList = true;
            break;
        case "fin":
            intervalo = maxInter + 1;
            numPag = maxPags;
            cList = true;
            break;
            
    }
    return cList;
}

function calcPager(totalRegs) {
    rowNum = ((numPag == 1 ? 1 : (numPag - 1)) * (numPag == 1 ? 1 : maxRows)) + (numPag > 1 ? 1 : 0)
    var limNextPag = totalRegs % maxRows;
    maxPags = (totalRegs - limNextPag) / maxRows;
    if (limNextPag >= 1 && limNextPag < maxRows) {
        maxPags++;
    }
    var limNextInter = maxPags % 10;
     maxInter = maxPags - limNextInter;
     
     if(limNextInter == 0){
         maxInter = maxInter - 10;         
     }
   
    if (idPag != "") {
        $("#" + idPag + " > li").remove();
        var contNavPag = "";
        
        if (numPag >10) {
            contNavPag += "<li id='" + idPag + "_inicio' class=''><a href='javascript:void(0);' class='waves-effect' data-arrow='inicio'>" +
                    "<i class='material-icons'>skip_previous</i></a></li>";
            contNavPag += "<li id='" + idPag + "_previews' class=''><a href='javascript:void(0);' class='waves-effect' data-arrow='previews'>" +
                    "<i class='material-icons'>fast_rewind</i></a></li>";
            
        } else {
            contNavPag += "<li id='" + idPag + "_inicio' class='disabled'><a href='javascript:void(0);' data-arrow='inicio'>" +
                    "<i class='material-icons'>skip_previous</i></a></li>";
            contNavPag += "<li id='" + idPag + "_previews' class='disabled'><a href='javascript:void(0);' data-arrow='previews'>" +
                    "<i class='material-icons'>fast_rewind</i></a></li>";
        }
        for (var ccc = 1; ccc <= maxPags; ccc++) {
             if(numPag == 1){
                    intervalo =1;
                }
            if (ccc == numPag) {
                contNavPag += "<li class='active'><a href='javascript:void(0);' data-numpag='" + ccc + "'>" + ccc + "</a></li>";
               
            } else if(ccc >= intervalo && ccc < 10 + intervalo) {
                contNavPag += "<li><a href='javascript:void(0);' data-numpag='" + ccc + "' class='waves-effect'>" + ccc + "</a></li>"
            }
        }
        if (numPag < maxPags && numPag <= maxInter) {
            
            contNavPag += "<li id='" + idPag + "_next' class=''><a href='javascript:void(0);' class='waves-effect' data-arrow='next'>" +
                    "<i class='material-icons'>fast_forward</i></a></li>";
             contNavPag += "<li id='" + idPag + "_fin' class=''><a href='javascript:void(0);' class='waves-effect' data-arrow='fin'>" +
                    "<i class='material-icons'>skip_next</i></a></li>";
        } else {
            contNavPag += "<li id='" + idPag + "_next' class='disabled'><a href='javascript:void(0);' data-arrow='next'>" +
                    "<i class='material-icons'>fast_forward</i></a></li>";
             contNavPag += "<li id='" + idPag + "_fin' class='disabled'><a href='javascript:void(0);' data-arrow='fin'>" +
                    "<i class='material-icons'>skip_next</i></a></li>";
        }
        if(totalRegs <= 20){
            $('#ocultar').hide();
            $('#ocultarInactivo').hide();
        }else{
            $('#ocultar').show();
        }
        $("#" + idPag).append(contNavPag);
    }
}