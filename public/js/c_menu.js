
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
var date=null;
/**
 * Variable publica que contiene la funcion timeout.
 * @var {String}
 */

var noFood = {1:"Comida",2:"Cena"};
var noTime = {1:"Primero",2:"Segundo",3:"Tercero"}
var star = {1:"one",2:"two"}


var tabsAli = {"Comida-Menú":"tab-comida-menu","Comida-Picnic":"tab-comida-picnic","Comida-Especial":"tab-comida-especial","Cena-Menú":"tab-cena-menu","Cena-Picnic":"tab-cena-picnic","Cena-Especial":"tab-cena-especial"};
var arrCards = ["Menú","Picnic","Especial"];
var cards = {"Menú":"menu","Picnic":"picnic","Especial":"especial"};

var times = {1:"pb-primero",2:"pb-segundo"}


var mInfoNoData = '<div class="alert alert-warning"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No hay opciones disponibles.</div>';

/**
 * Variable pública que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var SERVICE_CLASS = 'C_menu';

/**
 * Constante para obtener columna de un array
 * @type {Array}
 */
const arrayColumn = (arr, n) => arr.map(x => x[n]); 

const dayName = ['domingo','lunes','martes','miércoles','jueves','viernes','sabado'];
const monthShortNames = {1:"ENE", 2:"FEB", 3:"MAR", 4:"ABR", 5:"MAY", 6:"JUN", 7:"JUL", 8:"AGO", 9:"SEP", 10:"OCT", 11:"NOV", 12:"DIC"};
const arrClass = {"Comida-Primero":"event-comida-one","Comida-Segundo":"event-comida-two","Cena-Primero":"event-cena-one","Cena-Segundo":"event-cena-two"}
const arrBadge = {"Comida-Primero":"badge-green","Comida-Segundo":"badge-teal","Cena-Primero":"badge-blue","Cena-Segundo":"badge-royal"}

/**
 * Variable de opciones de platillos
 */
var optCont='';
/**
 * Variable de opciones de alternativas
 */
var altCont='';
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

/* Block Form */
 var bDayName = '';
 var bNumDay = '';
 var bNameMon = '';
 var bNumYea = '';
 var inpDate = '';
 var selSaucer = '';
 var arrEvents = [];
 var calendarEl;
 var calendar;

/**
 * Configuración base para mensajes de Toastr
 */
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
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
  var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  var f = new Date();

$(document).ready(function () {
    /* Set block */
    bDayName = $('#dayName');
    bNumDay = $('#numDay');
    bNameMon = $('#nameMon');
    bNumYea = $('#numYea');
    inpDate = $('#today');
    selSaucer = $('#sel-saucer');
    loadForm();
    /* Multi Select */
    getSaucer('chosen-select');
    getAlter('block-alter'); 

    $('.radio-btn').click(function(){
        $(this).removeClass('btn-white').addClass('btn-primary selected').siblings().removeClass('btn-primary selected').addClass('btn-white');
    });
    
    $('#saveAlter').on('click',function(){
        date = inpDate.val();
        cve = $('#cveSaucer').val();
        opt = $('.block-alter').find('input[name="radioAlter"]:checked').val();
        console.log("Selñecciono: "+cve+" | "+opt);
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendAlter','clase': SERVICE_CLASS,'Params': [date,cve,opt]});
            $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
                success: function (serverResponse, statusResponse, jqXHR){                
                    if (serverResponse.error){toastr.error(serverResponse.error.message, 'Error!'); return; }
                    if (serverResponse.result){
                        if(serverResponse.result == 'success' ){                          
                            loadMenu();   
                            toastr.success('La alternativa ha sido registrada.', 'Hecho');
                        }else{ toastr.warning('Actualice la página para verificar si su selección ha sido guardada. ', 'Atención'); }
                    }else{ toastr.warning(serverResponse.error, 'Atención!'); }
                },error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
            });
            $('#myModal4').modal('toggle');
    });

    $('.createMenu').click(function(){
        slc = String($('#sel-saucer').val());
        if (slc.length == 0 ){ 
            toastr.error('Debe seleccionar un platillo', 'Error!'); return;
        }else{
            d = inpDate.val();
            f = noFood.hasOwnProperty($('#food').find('button.selected').val())?noFood[$('#food').find('button.selected').val()]:null;
            t = noTime.hasOwnProperty($('#time').find('button.selected').val())?noTime[$('#time').find('button.selected').val()]:null;
            arr = slc.split(',');
            request = JSON.stringify({'Id': genIDrequest(),'method': 'sendMenu','clase': SERVICE_CLASS,'Params': [d,f,t,arr]});
            $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
                success: function (serverResponse, statusResponse, jqXHR){                
                    if (serverResponse.error){toastr.error(serverResponse.error.message, 'Error!'); return; }
                    if (serverResponse.result){
                        if(serverResponse.result == 'success' ){ 
                            var title, clase;
                            $.each(arr,function(i){
                                title = selSaucer.find('option[value="'+arr[i]+'"]').text();
                                clase = (arrClass.hasOwnProperty(String(f+'-'+t))?arrClass[String(f+'-'+t)]:'event-default');
                                insCalendar(title,clase,d,String(clase+'-'+i));
                            });
                            toastr.success('El menú ha sido registrado.', 'Hecho');
                            loadMenu();                            
                        }else{ toastr.warning('Actualice la página para verificar si su selección ha sido guardada. ', 'Atención'); }
                    }else{ toastr.warning(serverResponse.error, 'Atención!'); }
                },error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
            });
            cleanSel();
        }
    });
    $('.fc-day').click(function(){
        $(this).addClass('fc-active').parents('.fc-widget-content').find('.fc-day').not(this).removeClass('fc-active');
    });

    //toggleLoader();

       

    $(document.body).on("click", ".client-link", function (e) {
        e.preventDefault()
        $(".selected .tab-pane").removeClass('active');
        $($(this).attr('href')).addClass("active");
    });

    /* initialize the external events
     -----------------------------------------------------------------*/
    $('#external-events div.external-event').each(function () {
        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1111999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });

    });

});
/* -----------------------------------------------------------------*/
/* initialize the calendar
--------------------------------------------------------------------*/
calendarEl = document.getElementById('calendar');
document.addEventListener('DOMContentLoaded', function() {  
    calendar = new FullCalendar.Calendar(calendarEl, {
        header: { left:'', center: 'title', right:'today prev,next' },
        plugins: [ 'dayGrid', 'interaction' ], 
        locale:'es',
        showNonCurrentDates:false,
        dateClick: function(info) {
            var ele = moment(info.dateStr).format('YYYY-MM-DD');
            inpDate.val(info.dateStr);
            $('div.fc-view-container').find('td.fc-day[data-date]').removeClass('fc-active').filter('[data-date="'+ele+'"]').addClass('fc-active');
            loadForm(); $('#menuCont').html('');
        },
        eventClick: function(info) {
            var ele = moment(info.event.start).format('YYYY-MM-DD');
            $('div.fc-view-container').find('td.fc-day[data-date]').removeClass('fc-active').filter('[data-date="'+ele+'"]').addClass('fc-active');
            inpDate.val(ele);
            loadForm();
            
            loadMenu();
        },
        events: function(info, successCallback, failureCallback) {
            paramDate = String($('#today').val());
            request = JSON.stringify({'Id': genIDrequest(),'method': 'getEvents','clase': SERVICE_CLASS,'Params': [moment(info.start).format('YYYY-MM-DD')]});
            $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
                success: function (serverResponse, statusResponse, jqXHR){
                    if (serverResponse.error){toastr.error(serverResponse.error.message, 'Error!'); return; }
                    if(serverResponse.result==null){ return; }
                    if(serverResponse.result.length == 0 ){  
                        toastr.warning('No hay información para el mes visualizado.', 'Atención');
                    }else{ 
                        var obj = serverResponse.result; 
                        var arrEvents=[];               
                        var clName, clStar, tmpDate=null, tmpFood=null;
                        var nrow = 1;
                        $.each(obj, function(i) { 
                            nrow = (obj[i]['start']!=tmpDate)?1:nrow+1;
                            tmpDate = obj[i]['start'];
                            tmpFood = obj[i]['food'];                            
                            clName = (noFood.hasOwnProperty(obj[i]['food']))?'event-'+noFood[obj[i]['food']]:'event-default';
                            clStar = (star.hasOwnProperty(obj[i]['time']))?'-'+star[obj[i]['time']]:'';

                            arrEvents.push({
                                title: String(nrow)+' '+obj[i]['title'],
                                classNames: [clName.toLowerCase()+clStar],
                                start: obj[i]['start'],
                                id:obj[i]['cve']
                            });
                        });
                        successCallback(arrEvents);
                    }
                },error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
            });

        },
        eventDestroy: function(info) {                 
            actualM = moment(calendar.getDate()).format('MM');
            eventM =  moment(info.event.start).format('MM');
            strClass = info.event.classNames;
            if(~strClass.indexOf("star") && (eventM!=actualM)){
                   info.event.remove();
            }
        }
    }); 
    calendar.render();
});

/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function loadForm(){
    date = (inpDate.val()==null)? moment() : moment(inpDate.val());
    bDayName.html(dayName[date.day()]);
    bNumDay.html(date.format('D'));
    bNameMon.html(monthShortNames[date.format('M')]);
    bNumYea.html(date.format('YYYY'));
}
/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function loadMenu(){
    date = (inpDate.val()==null)? moment().format('YYYY-MM-DD') : moment(inpDate.val()).format('YYYY-MM-DD');
    request = JSON.stringify({'Id': genIDrequest(),'method': 'loadMenu','clase': SERVICE_CLASS,'Params': [date]});
    $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            if (serverResponse.error){mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            if(serverResponse.result == null){ html = '<div class="col-sm-12 div-saucer"><label>Sin registros de menú</label><div class="hr-line-dashed"></div></div>'; 
            }else{
                if(serverResponse.result.length > 0 ){
                    var obj = serverResponse.result;           
                    var nrow = 0;
                    html='';
                    $.each(obj, function(i) {
                        nrow = nrow+1;
                        badge = (arrBadge.hasOwnProperty(obj[i]['badge']))?'<span class="badge '+arrBadge[obj[i]['badge']]+'">&nbsp;'+nrow+'&nbsp;</span>&nbsp;':'<span class="badge badge-brown">&nbsp;'+nrow+'&nbsp;</span>&nbsp;';
                        alter = (obj[i]['altTag']==null)?'':'&nbsp;<span class="badge badge-success">'+obj[i]['altTag']+'</span>';
                        html += '<div class="col-sm-12 div-saucer"><label>'+badge+obj[i]['saucer']+alter+'</label><div class="float-right">'; 
                        html += '<button class="btn btn-white btn-sm btn-alter" id="alt_'+obj[i]['ID']+'" style="padding:2px 6px; margin-top:-3px" data-toggle="modal" data-target="#myModal4" data-placement="top" title="Agregar" data-original-title="Alternativa"><i class="fa fa-plus text-teal"></i></button>'; 
                        html += '<button class="btn btn-white btn-sm" id="del_'+obj[i]['ID']+'" style="padding:2px 6px; margin-top:-3px" data-toggle="tooltip" data-placement="top" title="Eliminar" data-original-title="Eliminar" onclick="delSaucer(this.id)"><i class="fa fa-times text-danger"></i>'; 
                        html += '</div><div class="hr-line-dashed"></div></div>'; 
                    });
                }else{ html = '<div class="col-sm-12 div-saucer"><label>Sin registros de menú</label><div class="hr-line-dashed"></div></div>';  }
            }
            $('#menuCont').html(html);
            $('.btn-alter').on('click',function(){ $('#cveSaucer').val( $(this).prop('id') ); console.log("POR AQUI::"+$(this).prop('id')); });
            return;
        },error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
    });
    return true;
}

/**
 * Función insertar un evento en el calendario
 * @returns {void} No retorna ningun valor
 */
function insCalendar(t,c,d,i){
    calendar.addEvent({
      title: t,
      className: [c,'star'],
      start: d,
      id:i
    });
}
/**
 * Función recargar eventos
 * @returns {void} No retorna ningun valor
 */
function reloadCalendar(){
    calendar.refetchEvents()
}

/**
 * Función de limpieza de select
 * @returns {void} No retorna ningun valor
 */
function cleanSel(){
    $('#sel-saucer').val('');
    $("#sel-saucer").trigger('chosen:updated');
    return;
}

/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function getSaucer(clase){
    clase = (clase==null)?'chosen-select':clase;
    request = JSON.stringify({'Id': genIDrequest(),'method': 'getSaucer','clase': SERVICE_CLASS,'Params': []});
    $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            if (serverResponse.error){mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            if(serverResponse.result.length > 0 ){ 
                obj = serverResponse.result;
                $.each(obj, function(i,key) {
                    optCont += '<option value='+obj[i]["cve"]+'>'+obj[i]['opt']+'</option>'; 
                });
                if(clase==null){ return null }else{ 
                    $('.'+clase).html('').html(optCont); 
                    $('.'+clase).chosen({ width: "100%",max_selected_options: 2 }); };
            }else{
                optCont = '<option value="">No hay platillos disponibles.</option>';
            }  
        },
        error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
    });
    return true;
}
/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function getAlter(clase){
    clase = (clase==null)?null:clase;
    request = JSON.stringify({'Id': genIDrequest(),'method': 'getAlter','clase': SERVICE_CLASS,'Params': []});
    $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            if (serverResponse.error){mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            if(serverResponse.result.length > 0 ){ 
                obj = serverResponse.result;
                altCont = '<div class="hr-line-dashed"></div><div class="radio radio-info"><input type="radio" name="radioAlter" id="radioAlt_0" value="0"><label class="label-cap" for="radioAlt_0">Sin alternativa</label></div>';
                $.each(obj, function(i,key) {
                    altCont += '<div class="hr-line-dashed"></div><div class="radio radio-info">';
                    altCont += '<input type="radio" name="radioAlter" id="radioAlt_'+obj[i]["cve"]+'" value="'+obj[i]["cve"]+'"><label class="label-cap" for="radioAlt_'+obj[i]["cve"]+'">'+obj[i]['opt']+'</label>';
                    altCont += '<span class="label label-success float-right">'+obj[i]["tag"]+'</span></div>';
                });
                if(clase==null){ return null }else{ 
                    $('.'+clase).html('').html(altCont); 
                }
            }else{
                altCont = '';
            }  
        },
        error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
    });
    return true;
}


/* Sweet alert */
function delSaucer(id) {
    swal({
        title: "Eliminar platillo",
        text: "Esta acción eliminará el platillo registrado.",
        type: "error",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Eliminar",
        
        closeOnConfirm: false
    }, function (isConfirm) {
        if (!isConfirm) return;
        sendDelSaucer(id);        
    });
}

/**
 * Función para obtener y setear el menu de tipo picnic especial
 * @returns {void} No retorna ningun valor
 */
function sendDelSaucer(id){
    date = (inpDate.val()==null)? moment().format('YYYY-MM-DD') : moment(inpDate.val()).format('YYYY-MM-DD');
      
    if(id == null || date == null){
        swal("Error!", "No fue posible enviar su solicitud.","error");
    }else{
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendDelSaucer','clase': SERVICE_CLASS,'Params': [date,id]});
        $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR){
                if (serverResponse.error){  swal("Error!", serverResponse.error["message"], "error"); return; }
                if (serverResponse.result=='success'){
                    swal("Realizado", "Se ha eliminado el platillo.", "success");
                    $('#'+id).parents('.div-saucer').remove();
                    loadMenu();
                    reloadCalendar();
                }else{
                    swal("Error!", "No fue posible realizar su soliciud.", "error");
                }
            },
            error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
        });        
    }
    return true;
}

function saveAlter(){

}