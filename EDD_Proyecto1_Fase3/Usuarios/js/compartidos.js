var carnetEstudiante = sessionStorage.getItem("carnetEstudiante");

$(document).ready(() => {
  var listaPermisos = JSON.parse(localStorage.getItem("listaPermisos"));
  var archivosSelect = $("#listado");
  for (var i = 0; i < listaPermisos.length; i++) {
    if (listaPermisos[i].Destinatario === carnetEstudiante) {
        var option = $("<option></option>");
      option.text(listaPermisos[i].Archivo);
      option.attr("value", i);
      archivosSelect.append(option);
    }
  }

  archivosSelect.on("change", function () {
    var permiso = listaPermisos[$(this).val()].Permiso;
    var type = listaPermisos[$(this).val()].Tipo;
    var content = listaPermisos[$(this).val()].Contenido;
    if (type === "text/plain") {
      if (permiso === "R") {
        $("#area").html(
          '<textarea readonly="readonly" style="width: 1000px; height: 400px;">' + content + '</textarea>'
        );
        
      } else if (permiso === "R-W") {
        $("#area").html(
          '<textarea style="width: 1000px; height: 400px;">' + content + "</textarea>"
      );
      }
    } else if (type === "application/pdf") {
      $("#area").html('<embed src="' + content + '" type="application/pdf" width="100%" height="400px" />');
    } else if (type === "image/jpeg" || type === "image/png") {
      $("#area").html('<img src="' + content + '" width="100%" height="400px"/>');
    }
  });

  $(document).on("input", "#area textarea", function () {
    var index = archivosSelect.val();
    listaPermisos[index].Contenido = $(this).val();
    localStorage.setItem("listaPermisos", JSON.stringify(listaPermisos));
  });

  $("#descargar").on("click", function() {
    descargar();
  });
  
  function descargar() {
    var index = archivosSelect.val();
    var type = listaPermisos[index].Tipo;
    var content = listaPermisos[index].Contenido;
    var archivo = listaPermisos[index].Archivo;
  
    if (type === "text/plain") {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(content)
      );
      element.setAttribute("download", archivo + ".txt");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else if (type === "application/pdf") {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        content
      );
      element.setAttribute("download", archivo + ".pdf");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else if (type === "image/jpeg" || type === "image/png") {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        content
      );
      element.setAttribute("download", archivo);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      window.open(content);
    }
  }
});  

function regresar() {
  window.location.href = "./Usuario.html";
}