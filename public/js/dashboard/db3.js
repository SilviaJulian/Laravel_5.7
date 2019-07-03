
/** JS Acceso, para brindar funcionalidades JSON desde / hacia el servidor.
 * Sistema Home Menú©
 * @author Ing. Claudia Pérez
 * @version 1.0
 * @package js
 * @final
 */

/**
 * Variable publicaque contiene la respuesta del servidor
 * @type {JSON}
 */
var serverResponse = null;

/**
 * Variable publica que contiene el usuario.
 * @type {String}
 */
var usuario = null;
var oBlocks = {"Comida":1,"Cena":2};
var nameDays = {1:"Lunes",2:"Martes",3:"Miércoles",4:"Jueves",5:"Viernes",6:"Sábado",7:"Domingo"}
var nCard = {"Menú":1,"Picnic":2,"Especial":3,"Imprevisto":4}
var times = {1:"Primero",2:"Segundo"}
var altPicnic = {'F':'Acompañado con fruta del día','Y':'Acompañado con yogurt'}
var altEspecial = {'P':'Acompañado con patatas','E':'Acompañado de ensalada'}
var emptySlide ='<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Comida</i></h5><div class="ibox-tools"></div></div><div class="ibox-content sk-overlay"><div class="sk-overlay sk-message"><div class="alert alert-danger"><i class="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;No cuenta con reservación.<br><a class="alert-link" href="#" id="D1-comida-request" onclick="req(this.id)">Solicitar servicio</a></div></div><div class="row D1-cenas"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div><div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Cena</i></h5><div class="ibox-tools"></div></div><div class="ibox-content sk-overlay"><div class="sk-overlay sk-message"><div class="alert alert-danger"><i class="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;No cuenta con reservación.<br><a class="alert-link" href="#" id="D1-cena-request" onclick="req(this.id)">Solicitar servicio</a></div></div><div class="row D1-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div>';
var arrStatus={1:'',2:'<span class="badge badge-warning">Retardo</span>',3:'<span class="badge">No asistirá</span>',4:'<span class="badge badge-primary">Entregado</span>',5:'<span class="badge badge-danger">Cancelado</span>'}

/**
 * Variable publica que contiene la contraseña.
 * @type {String}
 */
var contrasena = null;

/**
 * Variable publica para crear la peticion JSON que se enviara al servidor.
 * @type {JSON}
 */
var request = null;

/**
 * Variable publica que contiene el nombre de la Clase a invocar al servidor.
 * @type {String}
 */
var SERVICE_CLASS = 'Db3';

$(document).ready(function () {
    obtenerDashboard();
});


/**
 * Función para obtener datos del dashboard
 * @returns {void} No retorna ningun valor
 */
function obtenerDashboard(){
    if($('.ibox-content').hasClass('sk-loading') == false ){ toggleLoader('wrapper-content','ibox-content'); }

    request = JSON.stringify({'Id': genIDrequest(),'method': 'dashboard','clase': SERVICE_CLASS,'Params': []});
    $.ajax({ method: 'POST', timeout: 30000, data: request, dataType: 'json', url: GATEWAY,
        success: function (serverResponse, statusResponse, jqXHR){
            if (serverResponse.error){mostrarError(serverResponse.error, statusResponse, jqXHR); return; }
            var json = serverResponse.result;
            $('.slick').html('');
            if(json.hasOwnProperty('D1')&&json.hasOwnProperty('D2')){

                slide1 = createConteiner('D1',json.D1['no'],json.D1['date'],json.D1['order']);
                slide2 = createConteiner('D2',json.D2['no'],json.D2['date'],json.D2['order']);
                // Interacción
                if (slide1==true || slide2==true){   
                    $(".slick").slick({ dots: true });
                    toggleLoader('wrapper-content','ibox-content');
                }
                
                return;
            }
        },
        error: function (jqXHR, statusError, textoError)
        {
            mostrarErrorJSON(jqXHR, statusError, textoError);
        }
    });
}
/**
 * Funcion para contrir contenido por día
 * @returns {bool} Cadena de contenido
 */
function createConteiner(cve,no,date,obj){
    var slide = slideHead(cve,no,date,obj);
    var content = (obj==null)?((cve=='D1')?emptySlide:emptySlideEdit(date)): card(cve,date,obj); 
    slide += content + '</div></div>';
    if($( ".slick" ).has( ".slide" ).length == 0 ){
        $('.slick').html(slide);
    }else{
        $(slide).insertAfter($('.slide')).last();
    }
    return true;
}
/**
 * Funcción de contrución de cabecera para orden vacia pero editable
 * @param {date} date
 * @param {*} date 
 * @param {*} obj 
 */
function emptySlideEdit(date){
    var html = '<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Comida</i></h5><div class="ibox-tools"><a class="" href="h_menusemanal.php?f='+date+'" tabindex="0"><i class="fa fa-pencil"></i></a></div></div><div class="ibox-content"><div class="row D1-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div><div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Cena</i></h5><div class="ibox-tools"><a class="" href="h_menusemanal.php?f='+date+'" tabindex="0"><i class="fa fa-pencil"></i></a></div></div><div class="ibox-content"><div class="row D1-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div>';
    return html;
}

/**
 * Funcción de contrución de cabecera para orden vacia pero editable
 * @param {date} date
 * @param {*} date 
 * @param {*} obj 
 */
function emptyBlock(cve){
    var html = '<div class="row '+cve+'-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div>';
    return html;
}

/**
 * Funcción de contrución de cabecera para orden vacia pero editable
 * @param {date} date
 * @param {*} date 
 * @param {*} obj 
 */
function emptyBlockEdit(cve,date){
    var html = '<div class="row '+cve+'-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div><div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Cena</i></h5><div class="ibox-tools"><a class="" href="h_menusemanal.php?f='+date+'" tabindex="0"><i class="fa fa-pencil"></i></a></div></div><div class="ibox-content"><div class="row D1-cena"><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Primero</h2> <div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div> </div></div><div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;"><div class="block-cena"><h2 class="menu-section-title">Segundo</h2><div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido tipo menú.
 * @returns {string} No se retorna ningun valor
 */
function card(cve,date,obj){
    if(cve==null || date==null){
        return emptySlide;
    }else{    
        try { 
            var obj = $.parseJSON(obj);
            var card, block='';
            nBlocks = obj.length; 
            console.log('nblocks::'+nBlocks);
            $.each(obj, function(i) {
                ali=obj[i]["type"]; //Comida-Cena
                card=obj[i]["card"];                 
                status=obj[i]["status"];
                no=nCard.hasOwnProperty(card)?nCard[card]:0;
                config=obj[i].hasOwnProperty("config")?obj[i]["config"]:null;
                nTimes=obj[i].hasOwnProperty('det')?obj[i]["det"].length : 0;
                console.log("Variable Config:: "+config);
                block += head(ali,cve,date,no,status,config);               
                /* Determinar si solo trae un hijo*/                
                switch (card){
                    case 'Menú':
                        switch(nTimes){
                            case 1:
                                // obtener el tiempo que ya seleccionó
                                detTime = obj[i]["det"][0]["time"];
                                if(detTime==1){
                                    //crear primer tiempo vacio
                                    block += setTwoObj(ali,obj[i]["det"][0]["order"],obj[i]["det"][0]["alt"],obj[i]["det"][0]["time"]);
                                    block += setTwoObjEmpty(ali,2);
                                    
                                }
                                if(detTime==2){
                                    //crear primer tiempo vacio
                                    block += setTwoObjEmpty(ali,1);
                                    block += setTwoObj(ali,obj[i]["det"][0]["order"],obj[i]["det"][0]["alt"],obj[i]["det"][0]["time"]);
                                }
                                break;
                            case 2:
                                block += setTwoObj(ali,obj[i]["det"][0]["order"],obj[i]["det"][0]["alt"],obj[i]["det"][0]["time"]);
                                block += setTwoObj(ali,obj[i]["det"][1]["order"],obj[i]["det"][1]["alt"],obj[i]["det"][1]["time"]);
                                break;
                        }
                        block +='</div></div></div></div>';                        
                        break;
                    case 'Picnic': block += setOneObj(ali,card,obj[i]["det"][0]["order"],altPicnic[obj[i]["det"][0]["alt"]]);
                        break;
                    case 'Especial': block += setOneObj(ali,card,obj[i]["det"][0]["order"],altEspecial[obj[i]["det"][0]["alt"]]);
                        break;
                    case 'Imprevisto': block += setObjImp(ali); 
                        break;
                    case 'Sin_reserva': block += setObjSR(status);
                        break;
                    default: block += setObjSR();
                }
            });
            return block;        
        }catch (error) {
            console.error(error);
            return emptySlide;
        }
    }
}
/**
 * Función de construcción de cabecera de slide.
 * @returns {string} No se retorna ningun valor
 */
function slideHead(cve,nD,date){
    var html = '<div class="slide"><div class="row"><div class="col-lg-12"><h2 class="text-center"><i id="'+cve+'-title">'+nameDays[nD]+'</i></h2><hr class="center"><input type="hidden" id="'+cve+'-fecha" value="'+date+'"></div></div><div class="row">';
    return html;
}

/**
 * Función de construcción de contenido de un solo elemento.
 * @returns {string} No se retorna ningun valor
 */
function head(ali,cve,date,card,status,obj){
    if(card==0 && status==0){
        return '<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>'+ali+'</i></h5></div><div class="ibox-content"><div class="row">';
    }
    if(ali==null || status==null || cve==null){
        return '<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>Sin descripción</i></h5></div><div class="ibox-content"><div class="row">';
    }else{
        var txtStatus = (status in arrStatus)?arrStatus[status]:'';
        var html = '';
        if(card==0){
            over = (status==0)?'sk-overlay':'';
            msg = (status==0)?'<div class="sk-overlay sk-message"><div class="alert alert-danger"><i class="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;No registró reservación.<br><a class="alert-link" href="#" id="'+cve+'-'+ali.toLowerCase()+'-request" onclick="req(this.id)">Solicitar servicio</a></div></div>':'';
            html = '<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>'+ali+'</i></h5>'
            if(obj != null ){
                html += (obj['edit']==1)?'<div class="ibox-tools"><a href="h_menusemanal.php?f='+date+'"><i class="fa fa-pencil"></i></a></div>':'';
            }
            html += '</div><div class="ibox-content '+over+'">'+msg;
            return html;
        }

        html ='<div class="col-lg-6"><div class="ibox"><div class="ibox-title"><h5 class="text-center"><i>'+ali+'</i>&nbsp;&nbsp;'+txtStatus+'</h5><div class="ibox-tools">';
        if(obj != null ){
            html += (obj['delay']==1)?'<a href="#" id="'+cve+'-'+ali.toLowerCase()+'-delay" onclick="delay(this.id)"><i class="fa fa-toggle-on"></i></a>':'';
            html += (obj['edit']==1)?'<a href="h_menusemanal.php?f='+date+'"><i class="fa fa-pencil"></i></a>':'';
            html += (obj['cancel']==1)?'<a href="#" id="'+cve+'-'+ali.toLowerCase()+'-cancel" onclick="cancel(this.id)"><i class="fa fa-times"></i></a>':'';
        }
        html += '</div></div>';
        if(status==3){
            if(card==4){
                html += '<div class="ibox-content sk-overlay">';
                html += '<div class="sk-overlay sk-message"><div class="alert alert-info"><i class="fa fa-bell" aria-hidden="true"></i>&nbsp;Se considerado su<br><strong>asistencia no prevista</strong></div></div>';
                html += '<div class="row '+cve+'-'+ali.toLowerCase()+'">';
            }else{
                html += '<div class="ibox-content sk-overlay">';
                html += '<div class="sk-overlay sk-message"><div class="alert alert-danger"><i class="fa fa-minus-circle" aria-hidden="true"></i>&nbsp;Su reservación se encuentra cancelada.<br><a class="alert-link" href="#" id="'+cve+'-'+ali.toLowerCase()+'-request" onclick="req(this.id)">Solicitar servicio</a></div></div>';
                html += '<div class="row '+cve+'-'+ali.toLowerCase()+'">';
            }
        }else{
            if (card==4 && status==1){
                html += '<div class="ibox-content sk-overlay">';
                html += '<div class="sk-overlay sk-message"><div class="alert alert-warning"><i class="fa fa-bell" aria-hidden="true"></i>&nbsp;Se ha considerado su<br><strong>asistencia no prevista</strong></div></div>';
                html += '<div class="row '+cve+'-'+ali.toLowerCase()+'">';
            }else{
                console.log("PASO:::"+html);
                html += '<div class="ibox-content"><div class="row '+cve+'-'+ali.toLowerCase()+'">';
            }
        }
        
        return html;
    }
}

/**
 * Función de construcción de contenido de un solo elemento.
 * @returns {void} No se retorna ningun valor
 */
function setOneObjEmp(ali,card,saucer,alt){
    var html = '<div class="offset-lg-3 col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">'+card+'</h2><a class=" b-link-stripe b-animate-go swipebox"><div class="gal-spin-effect horizontal"><img src="/img/food/img000.jpg" alt=" " />';
    html += '<div class="gal-text-box"><div class="info-gal-con"><h4>'+saucer+'</h4><span class="separator"></span><p>'+alt+'</p><span class="separator"></span>';
    html += '</div></div></div></a></div></div></div></div></div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de un solo elemento.
 * @returns {void} No se retorna ningun valor
 */
function setOneObj(ali,card,saucer,alt){
    var html = '<div class="offset-lg-3 col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">'+card+'</h2><a class=" b-link-stripe b-animate-go swipebox"><div class="gal-spin-effect horizontal"><img src="/img/food/img000.jpg" alt=" " />';
    html += '<div class="gal-text-box"><div class="info-gal-con"><h4>'+saucer+'</h4><span class="separator"></span><p>'+alt+'</p><span class="separator"></span>';
    html += '</div></div></div></a></div></div></div></div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de dos elementos.
 * @returns {string} No se retorna una cadena
 */
function setTwoObj(ali,saucer,alt,time){
    var html = '<div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">'+times[parseInt(time)]+'</h2><a class=" b-link-stripe b-animate-go swipebox"><div class="gal-spin-effect horizontal"><img src="/img/food/img000.jpg" alt=" " />';
    html += '<div class="gal-text-box"><div class="info-gal-con"><h4>'+saucer+'</h4>';
    html += (alt==null)?'<span class="separator"></span><p> - </p><span class="separator"></span>':'<span class="separator"></span><p>'+alt+'</p><span class="separator"></span>';
    html += '</div></div></div></a></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de dos elementos.
 * @returns {string} No se retorna una cadena
 */
function setTwoObjEmpty(ali,time){
    var html = '<div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">'+times[parseInt(time)]+'</h2>';
    html += '<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de dos elementos.
 * @returns {string} No se retorna una cadena
 */
function setObjEmpty(ali,time){
    var html = '';
    html += '<div class="col-lg-12 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">'+times[parseInt(time)]+'</h2>';
    html += '<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de dos elementos.
 * @returns {string} No se retorna una cadena
 */
function setObjImp(ali){
    var html = '<div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">Primero</h2>';
    html += '<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div>';
    html += '<div class="col-lg-6 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-'+ali.toLowerCase()+'"><h2 class="menu-section-title">Segundo</h2>';
    html += '<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div>';
    return html;
}

/**
 * Función de construcción de contenido de dos elementos.
 * @returns {string} No se retorna una cadena
 */
function setObjSR(){
    var html = '';
    html += '<div class="col-lg-12 offset-md-0 col-md-12 baner-top wow fadeInRight animated animated" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInRight;">';
    html += '<div class="block-sr"><h2 class="menu-section-title">No cuenta con reservación</h2>';
    html += '<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i> Sin selección.</div></div></div></div></div></div>';
    return html;
}

/* SweetAlert */
function delay(id) {
    swal({
        title: "Llegada tarde",
        text: "Esta acción notificará a cocina que llegará después del horario de cierre.",
        type: "info",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#7A9CC6",
        confirmButtonText: "Retardo",
        
        closeOnConfirm: false
    }, function (isConfirm) {
        if (!isConfirm) return;
        sendDelay(id);        
    });
}

function cancel(id) {
    swal({
        title: "Cancelar reservación",
        text: "Esta acción cancelará su reserva de los alimentos seleccionados.",
        type: "error",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "No asistiré",
        
        closeOnConfirm: false
    }, function (isConfirm) {
        if (!isConfirm) return;
        sendCancel(id);        
    });
}

function req(id) {
    swal({
        title: "Asistencia no prevista",
        text: "Esta acción solicitará a cocina se le consideré en la preparación de algún alimento.",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Solicitar servicio",
        
        closeOnConfirm: false
    }, function (isConfirm) {
        if (!isConfirm)return;
        sendReq(id);        
    });
}

/**
 * Función para obtener y setear el menu de tipo picnic especial
 * @returns {void} No retorna ningun valor
 */
function sendDelay(id){
    div = (id.length>0)?id.split('-',3):null;
    date = $('#'+div[0]+'-fecha').val();
       
    if(id == null || date == null){
        swal("Error!", "No fue posible enviar su solicitud.","error");
    }else{
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendDelay','clase': SERVICE_CLASS,'Params': [id,date]});
        $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR){
                if (serverResponse.error){  swal("Error!", serverResponse.error["message"], "error"); return; }
                if (serverResponse.result=='success'){
                    swal("Realizado", "Se ha enviado la notificación a cocina.", "success");
                    $('.slick').slick('unslick');
                    obtenerDashboard();
                }else{
                    swal("Error!", "No fue posible realizar su soliciud.", "error");
                }
            },
            error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
        });        
    }
    return true;
}

/**
 * Función para obtener y setear el menu de tipo picnic especial
 * @returns {void} No retorna ningun valor
 */
function sendCancel(id){
    div = (id.length>0)?id.split('-',3):null;
    date = $('#'+div[0]+'-fecha').val();
       
    if(id == null || date == null){
        swal("Error!", "No fue posible enviar su solicitud.","error");
    }else{
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendCancel','clase': SERVICE_CLASS,'Params': [id,date]});
        $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR){
                if (serverResponse.error){  swal("Error!", serverResponse.error["message"], "error"); return; }
                if (serverResponse.result=='success'){
                    swal("Realizado", "Se ha enviado la notificación a cocina.", "success");
                    $('.slick').slick('unslick');
                    obtenerDashboard();
                }else{
                    swal("Error!", "No fue posible realizar su soliciud.", "error");
                }
            },
            error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
        });        
    }
    return true;
}

/**
 * Función para obtener y setear el menu de tipo picnic especial
 * @returns {void} No retorna ningun valor
 */
function sendReq(id){
    div = (id.length>0)?id.split('-',3):null;
    date = $('#'+div[0]+'-fecha').val();
       
    if(id == null || date == null){
        swal("Error!", "No fue posible enviar su solicitud.","error");
    }else{
        request = JSON.stringify({'Id': genIDrequest(),'method': 'sendReq','clase': SERVICE_CLASS,'Params': [id,date]});
        $.ajax({method: 'POST',timeout: 30000,data: request,dataType: 'json',url: GATEWAY,
            success: function (serverResponse, statusResponse, jqXHR){
                if (serverResponse.error){  swal("Error!", serverResponse.error["message"], "error"); return; }
                if (serverResponse.result=='success'){
                    swal("Realizado", "Se ha enviado la notificación a cocina.", "success");
                    $('.slick').slick('unslick');
                    obtenerDashboard();
                }else{
                    swal("Error!", "No fue posible realizar su soliciud.", "error");
                }
            },
            error: function (jqXHR, statusError, textoError){mostrarErrorJSON(jqXHR, statusError, textoError);}
        });        
    }
    return true;
}


