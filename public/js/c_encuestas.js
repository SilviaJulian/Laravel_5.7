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
var SERVICE_CLASS = 'C_encuestas';

/**
 * Variable publica que contiene el número de días permitidos para crear el rango de fechas
 -* @type Date
 */
let nDays = 7;
/**
 * Variable publica que contiene el número de meses permitidos para crear el rango de fechas
 -* @type Date
 */
let nMonth = 5;
/**
 * Variable publica que contiene la fecha actual.
 -* @type Date
 */
let diaActual = new Date();
let inicioDate;
let minimoDate;

$(document).ready(function () {
    let hoy = moment(diaActual, "DD-MM-YYYY");
    inicioDate = moment(diaActual, "DD-MM-YYYY").subtract(nDays, 'days');
    minimoDate = moment(diaActual, "DD-MM-YYYY").subtract(nMonth, 'months');

    $('#daterange').val(inicioDate.format("DD/MM/YYYY") + ' - ' + hoy.format("DD/MM/YYYY"));
    getDataEvaluaciones(inicioDate.format("DD-MM-YYYY"), hoy.format("DD-MM-YYYY"));

    $('.dataTables-encuestas').DataTable({
        pageLength: 15,
        columnDefs: [
            {  // set default column settings
                orderable: false,
                targets: [0]
            },
            {
                searchable: false,
                targets: [0]
            },
            {className: "text-center", "targets": [0,1,2,3,4,5,6]}

        ],
        responsive: true,
        language: { "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json" },
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'excel', title: 'Encuestas' },
            { extend: 'pdf', title: 'Encuestas' },

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

$(function () {
    $('#daterange').daterangepicker({
        startDate: inicioDate,
        endDate: diaActual,
        minDate: minimoDate,
        maxDate: diaActual,
        // minYear: 2000,
        // maxYear: 2020,
        maxSpan: {
            "days": nDays
        },
        autoApply: false,
        // "showDropdowns": true,
        // "showISOWeekNumbers": true,
        // "singleDatePicker": true,
        // "timePicker": true,
        // "timePicker24Hour": true,
        showWeekNumbers: true,
        autoUpdateInput: false,
        locale: {
            "format": "DD/MM/YYYY",
            "separator": " - ",
            "applyLabel": "Aplicar",
            "cancelLabel": "Cancelar",
            "fromLabel": "De",
            "toLabel": "a",
            "firstDay": 1,
            "customRangeLabel": "Custom",
            "weekLabel": "Sem",
            "daysOfWeek": ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
            "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            "monthsShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            "today": "Hoy",
            "monthsTitle": "Meses",
            "clear": "Borrar",
            "weekStart": 1,
        },
        drops: "down",
        opens: "center",
        applyButtonClasses: "btn-success",
        buttonClasses: "btn btn-lg",
        cancelClass: "bg-muted",
        /*  ranges: {
             'Today': [moment(), moment()],
             'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
             'Last 7 Days': [moment().subtract(6, 'days'), moment()],
             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
             'This Month': [moment().startOf('month'), moment().endOf('month')],
             'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
         }, */

    }, function (start, end, label) {
        let dateStart = start.format("DD-MM-YYYY");
        let dateEnd = end.format("DD-MM-YYYY");
        getDataEvaluaciones(dateStart, dateEnd);
        // alert(start.format('YYYY-MM-DD')+'->'+ end.format('YYYY-MM-DD'));
        // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });

    $('#daterange').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + ' - ' + picker.endDate.format("DD/MM/YYYY"));
    });

    $('#daterange').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format("DD/MM/YYYY") + ' - ' + picker.endDate.format("DD/MM/YYYY"));
    });

})
/**
 * Funcion obtener los datos de las evaluaciones 
 */
function getDataEvaluaciones(dateStart, dateEnd) {
    console.log(dateStart + '->' + dateEnd);
    request = JSON.stringify({
        'Id': genIDrequest(),
        'method': 'getDataEvaluaciones',
        'clase': SERVICE_CLASS,
        'Params': [dateStart, dateEnd]
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
            let encuestas = serverResponse.result;
            let table = $('.dataTables-encuestas').DataTable();
            table.clear().draw();
            $.each(encuestas, function (indx, llave) {

                let objHdp = [];
                objEncuestas = encuestas[indx];

                objHdp.push(objEncuestas.dateServ);
                objHdp.push(objEncuestas.hab);
                objHdp.push(objEncuestas.nom);
                objHdp.push(objEncuestas.food);
                objHdp.push(objEncuestas.card);
                objHdp.push(objEncuestas.calif);
                objHdp.push(objEncuestas.obs);
                objEval = JSON.parse(objEncuestas.calificacion);


                let span = '';
                $.each(objEval, function (indxEval, llave) {

                    if (objEval[indxEval].type == 'CASP_IMPROVE') {
                        // <i class="fa fa-tag"> </i>
                        span += '<span class="tag badge badge-danger">';
                    } else {
                        span += '<span class="tag badge bg-primary">';
                    }
                    span += objEval[indxEval].aspCong + '</span>&nbsp;';
                });
                objHdp.push(span);
                // objHdp.push('<div class="bootstrap-tagsinput ">' + span + '</div>');
                table.row.add(objHdp).draw();
            });

        }
        else {
            let table = $('.dataTables-encuestas').DataTable();
            table.clear().draw();
        }
    }).fail(function (jqXHR, statusError, textoError) {
        mostrarErrorJSON(jqXHR, statusError, textoError);
    });
}


