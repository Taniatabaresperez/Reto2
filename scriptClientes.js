function crearC(){
    var datos={
        id:$("#miId").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val()
    }
    
    var dataToSend=JSON.stringify(datos);
    $.ajax({
        dataType: 'json',
        data:datos,
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
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
            datosCliente();
            }
        }
    });
}

function datosCliente(){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:'GET',

        success:function(response) {

            var misDatos=response.items;

            $("#datos").append("<tr>");
            $("#datos").append("<td> Id </td>");
            $("#datos").append("<td> Nombre </td>");
            $("#datos").append("<td> Email </td>");
            $("#datos").append("<td> Edad </td>");
            $("#datos").append("</tr>");

            for(i=0; i<misDatos.length; i++){
                $("#datos").append("<tr>");
                $("#datos").append("<td>"+misDatos[i].id+"</td>");
                $("#datos").append("<td>"+misDatos[i].name+"</td>");
                $("#datos").append("<td>"+misDatos[i].email+"</td>");
                $("#datos").append("<td>"+misDatos[i].age+"</td>");
                $("#datos").append('<td><button onclick="borrarCliente('+misDatos[i].id+')">Borrar</button></td>');
                $("#datos").append('<td><button onclick="datoEspCliente('+misDatos[i].id+')">Cargar dato</button></td>');
                $("#datos").append("</tr>");
            }
            
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function borrarCliente(idCliente){
    console.log(idCliente);
    var da_to={
      id:idCliente
    };
    
    var dataToSend=JSON.stringify(da_to);
    $.ajax({
          dataType:'json',
          data:dataToSend,
          url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
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
            datosCliente();
            }
        }
          
    });
}

function datoEspCliente(idDato){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/"+idDato,
        type:'GET',
        success:function(response) {
            console.log(response);
            var dato=response.items[0];

            $("#miId").val(dato.id);
            $("#miId").attr("readonly",true);
            $("#name").val(dato.name);
            $("#email").val(dato.email);
            $("#age").val(dato.age);
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function limpiarCampos(){
    $("#miId").val("");
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}

function actualizarCliente(){
    var datos={
        id:$("#miId").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val()
    }

    $.ajax({
        dataType: 'json',
        data:JSON.stringify(datos),
        contentType: "application/json; charset=utf-8",
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type:'PUT',

        statusCode:{
            201:function(){
            $("#datos").empty();
            $("#miId").attr("readonly",false);
            limpiarCampos();
            datosCliente();
            }
        }
    });
}