function crearMen(){
    var datos={
        id:$("#miId").val(),
        messagetext:$("#messagetext").val(),
    }

    var dataToSend=JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data:datos,
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:'POST',

        success:function(response) {
            console.log(response);
        },

        error: function(jqXHR, textStatus, errorThrown){

        },

        statusCode:{
            201:function(){
            $("#datos").empty();
            $("#miId").attr("readonly",false);
            limpiarCampos();
            datosMensaje();
            }
        }
    });
}

function datosMensaje(){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:'GET',

        success:function(response) {

            var misDatos=response.items;

            $("#datos").append("<tr>");
            $("#datos").append("<td> Id </td>");
            $("#datos").append("<td> Mensaje </td>");
            $("#datos").append("</tr>");

            for(i=0; i<misDatos.length; i++){
                $("#datos").append("<tr>");
                $("#datos").append("<td>"+misDatos[i].id+"</td>");
                $("#datos").append("<td>"+misDatos[i].messagetext+"</td>");
                $("#datos").append('<td><button onclick="borrarMen('+misDatos[i].id+')">Borrar</button></td>');
                $("#datos").append('<td><button onclick="datoEspMen('+misDatos[i].id+')">Cargar dato</button></td>');
                $("#datos").append("</tr>");
            }
            
            
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function borrarMen(idMen){
    var da_to={
      id:idMen
    };
    
    var dataToSend=JSON.stringify(da_to);

    $.ajax({
          dataType:'json',
          data:dataToSend,
          url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
          type:'DELETE',
          contentType:'application/json',

          success:function(response) {
            console.log(response);
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          },

          statusCode:{
            204:function(){
            $("#datos").empty();
            datosMensaje();
            }
        }
    });
}

function datoEspMen(idDato){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/"+idDato,
        type:'GET',
        success:function(response) {
            console.log(response);
            var dato=response.items[0];

            $("#miId").val(dato.id);
            $("#miId").attr("readonly",true);
            $("#messagetext").val(dato.messagetext);
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function limpiarCampos(){
    $("#miId").val("");
    $("#messagetext").val("");
}

function actualizarMen(){
    var datos={
        id:$("#miId").val(),
        messagetext:$("#messagetext").val()
    }

    var dataToSend=JSON.stringify(datos); 
    $.ajax({
        dataType: 'json',
        data:dataToSend,
        contentType: "application/json; charset=utf-8",
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type:'PUT',

        statusCode:{
            201:function(){
            $("#datos").empty();
            $("#miId").attr("readonly",false);
            limpiarCampos();
            datosMensaje();
            }
        }
    });
}