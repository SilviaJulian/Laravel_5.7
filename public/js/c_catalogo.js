
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
 * Variable pública para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * Variable pública de opciones de select.
 * @type {String}
 */
var slcAlt = null;
/**
 * Variable pública de opciones de select.
 * @type {String}
 */
var slcCat = null;
/**
 * Variable pública de opciones de select.
 * @type {String}
 */
var slcType = null;


/**
 * Variable pública para titulo de archivo.
 * @type {JSON}
 */
let tituloFile = 'Catalogo_platillos';

/**
 * Variable pública que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var SERVICE_CLASS = 'C_catalogo';

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


$(document).ready(function() {
    
    //toggleLoader();
    getSaucer();
    getLists();

    $('.dataTable').DataTable({
        pageLength: 10,
        responsive: true,
        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [{ extend: 'excel', title: tituloFile }],
        "createdRow": function (row, data) {
            if (data[2] != null) {
                $($(row).find("td")[2]).addClass("text-center");
             }
            if (data[5] != '') {
                $($(row).find("td")[5]).addClass("text-success text-center");
            }
        }
    });

    $('#formSaucer').on('submit',function(event){
        event.preventDefault();
        alert("Enviar");
        return;
    });
});

/**
 * Función para obtener y setear la pantalla de menú
 * @returns {void} No retorna ningun valor
 */
function getSaucer() {
    date = $('#date').val();
    request = JSON.stringify({'Id': genIDrequest(),'method': 'getSaucer','clase': SERVICE_CLASS,'Params': []});
    $.post( GATEWAY, request, 'json')
        .done(function (serverResponse) {
            if (serverResponse.error) { toastr.error(serverResponse.error.message, 'Error!'); return; }
            if (serverResponse.result.length > 0) {
               setDataTable(serverResponse.result);
            } else {
                $('#bodyTabComandas > tr').remove();
                toastr.warning(serverResponse.error.message, 'Atención'); return;
            } })
        .fail(function (jqXHR, statusError, textoError){ mostrarErrorJSON(jqXHR, statusError, textoError); });
}

/**
 * Función para pintar la dataTable .
 * @returns {void} No retorna ningun valor
 */
function setDataTable(obj) {
    let table = $('.dataTable').DataTable();
    table.clear().draw();
    $.each(obj, function (i) {
        let row = [];
        objRow = obj[i];
        row.push(objRow.saucer);
        row.push(objRow.desc);
        row.push((objRow.tag==null)?null:'<span class="badge badge-success" style="padding: 5px;">'+objRow.tag+'</span>');
        row.push(objRow.cat);
        row.push(objRow.type);
        let buttons = '<button class="btn btn-white btn-sm" id="ed_'+objRow.ID+'" style="padding:2px 6px; margin-top:-3px" data-toggle="tooltip" data-placement="top" title="Editar" data-original-title="Editar" onclick="edSaucer(this.id)"><i class="fa fa-pencil"></i></button>';
        buttons += '<button class="btn btn-white btn-sm" id="del_'+objRow.ID+'" style="padding:2px 6px; margin-top:-3px" data-toggle="tooltip" data-placement="top" title="Eliminar" data-original-title="Eliminar" onclick="delSaucer(this.id)"><i class="fa fa-times text-danger"></i></button>';
        row.push(buttons);
        table.row.add(row).draw();
    });
}
/**
 * Función para obtener y setear los input select
 * @returns {void} No retorna ningun valor
 */
function getLists() {
    request = JSON.stringify({'Id': genIDrequest(),'method': 'getLists','clase': SERVICE_CLASS,'Params': []});
    $.post( GATEWAY, request, 'json')
        .done(function (serverResponse) {
            if (serverResponse.error) { toastr.error(serverResponse.error.message, 'Error!'); return; }
            $('#slcAlter').html(serverResponse.result.alter);    
            $('#slcCat').html(serverResponse.result.cat);    
            $('#slcType').html(serverResponse.result.type);    
        })
        .fail(function (jqXHR, statusError, textoError){ mostrarErrorJSON(jqXHR, statusError, textoError); });
}

/* Sweet alert */
function delSaucer(id) {
    swal({
        title: "Eliminar platillo",
        text: "Esta acción eliminará el platillo del catálogo.",
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
 * Función para eliminar el platillo del catalogo
 * @returns {void} No retorna ningun valor
 */
function sendDelSaucer(id){
    if(id == null){ swal("Error!", "No fue posible enviar su solicitud.","error");
    }else{
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendDelSaucer','clase': SERVICE_CLASS,'Params': [id]});
        $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
            success: function (serverResponse){
                if (serverResponse.error){  swal("Error!", serverResponse.error["message"], "error"); return; }
                if (serverResponse.result=='success'){
                    swal("Realizado", "Se ha eliminado el platillo.", "success");
                    getSaucer();
                }else{ swal("Error!", "No fue posible realizar su soliciud.", "error"); }
            },
            error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
        });        
    }
    return true;
}

/**
 * Función para validar formulario
 * @returns {void} No retorna ningun valor
 */
function sendDelSaucer(id){

}

