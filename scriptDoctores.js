function crear(){
    var datos={
        id:$("#miId").val(),
        specialty:$("#specialty").val(),
        graduate_year:$("#graduate_year").val(),
        department_id:$("#department_id").val(),
        name:$("#name").val()
    }

    var dataToSend=JSON.stringify(datos); //esto se usa solo en el put y el delete
    $.ajax({
        dataType: 'json',
        data:datos,
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor",
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
            datosDoctor();
            }
        }
    });
}

function datosDoctor(){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor",
        type:'GET',

        success:function(response) {

            var misDatos=response.items;

            $("#datos").append("<tr>");
            $("#datos").append("<td> Id </td>");
            $("#datos").append("<td> Especialidad </td>");
            $("#datos").append("<td> Año de graduación </td>");
            $("#datos").append("<td> Departamento </td>");
            $("#datos").append("<td> Nombre </td>");
            $("#datos").append("</tr>");

            for(i=0; i<misDatos.length; i++){
                $("#datos").append("<tr>");
                $("#datos").append("<td>"+misDatos[i].id+"</td>");
                $("#datos").append("<td>"+misDatos[i].specialty+"</td>");
                $("#datos").append("<td>"+misDatos[i].graduate_year+"</td>");
                $("#datos").append("<td>"+misDatos[i].department_id+"</td>");
                $("#datos").append("<td>"+misDatos[i].name+"</td>");
                $("#datos").append('<td><button onclick="borrarDoc('+misDatos[i].id+')">Borrar</button></td>');
                $("#datos").append('<td><button onclick="datoEspDoc('+misDatos[i].id+')">Cargar dato</button></td>');
                $("#datos").append("</tr>");
            }
            
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function borrarDoc(idDoctor){
    var da_to={
      id:idDoctor
    };

    var dataToSend=JSON.stringify(da_to);

    $.ajax({
          dataType:'json',
          data:dataToSend,
          url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor",
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
            datosDoctor();
            }
        }
    });
}

function datoEspDoc(idDato){

    $.ajax({
        dataType: 'json',
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor/"+idDato,
        type:'GET',
        success:function(response) {
            console.log(response);
            var dato=response.items[0];

            $("#miId").val(dato.id);
            $("#miId").attr("readonly",true);
            $("#specialty").val(dato.specialty);
            $("#graduate_year").val(dato.graduate_year);
            $("#department_id").val(dato.department_id);
            $("#name").val(dato.name);
        },

        error: function(jqXHR, textStatus, errorThrown){

        }
    });
}

function limpiarCampos(){
    $("#miId").val("");
    $("#specialty").val("");
    $("#graduate_year").val("");
    $("#department_id").val("");
    $("#name").val("");
}

function actualizarDoctores(){
    var datos={
        id:$("#miId").val(),
        specialty:$("#specialty").val(),
        graduate_year:$("#graduate_year").val(),
        department_id:$("#department_id").val(),
        name:$("#name").val(),
    }
    
    $.ajax({
        dataType: 'json',
        data:JSON.stringify(datos),
        contentType: "application/json; charset=utf-8",
        url:"https://g2cfdebd176ca01-medicobd1.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/doctor/doctor",
        type:'PUT',

        statusCode:{
            201:function(){
            $("#datos").empty();
            $("#miId").attr("readonly",false);
            limpiarCampos();
            datosDoctor();
            }
        }

    });
}