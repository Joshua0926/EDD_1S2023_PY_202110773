let tree =  new Tree();

console.log(tree);

let dblink = new CircularLinkedList();

let Compartidos = [];




function mostrarArchivo(){
  let path = $("#path").val();
  const archivoSelect = document.getElementById("CBArchivo");
  archivoSelect.options.length = 1;
  const {node:root, weight} = tree.getFolder(path);
  console.log(root);
  root.files.forEach(file => {
    const option = document.createElement("option");
    option.text = file.name;
    archivoSelect.add(option);
  });
  }

  function SendPermission() {
    // Obtener valores seleccionados en los elementos de formulario
    let path = $("#path").val();
    const permiso = document.getElementById("CBPermisos").value;
    const carnet = document.getElementById("CBCarnet").value;
    const archivo = document.getElementById("CBArchivo").value;
    console.log(permiso);
    console.log(carnet);
    console.log(archivo);


    //Agregar acción a realizar


    let listaPermisos = JSON.parse(localStorage.getItem("listaPermisos")) || [];

    const FoundFile = Compartidos.find(element => element.name == archivo);
    console.log(Compartidos);
    const ContentFile = FoundFile.content;
    
  
    listaPermisos.push({
      Propietario: nombreUsuario,
      Destinatario: carnet,
      Ubicacion: path,
      Archivo: archivo,
      Contenido: ContentFile,
      Tipo: FoundFile.type,
      Permiso: permiso,
    });

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("listaPermisos", JSON.stringify(listaPermisos));
    console.log(listaPermisos);

    // Obtener los datos existentes del LocalStorage para la clave del carnet
    let datosLocalStorage = localStorage.getItem(carnet);

    // Si no hay datos para la clave del carnet, crear una lista vacía
    if (!datosLocalStorage) {
      datosLocalStorage = "[]";
    }

    // Convertir los datos de cadena JSON a una lista de objetos
    const listaObjetos = JSON.parse(datosLocalStorage);

    // Crear un nuevo objeto con los datos del formulario
    const nuevoObjeto = {
      nombre: carnet,
      archivo: archivo,
      contenido: ContentFile,
      type: FoundFile.type,
      permiso: permiso,
      path: path,
      propietario: nombreUsuario
    };

    // Agregar el nuevo objeto a la lista de objetos existentes
    listaObjetos.push(nuevoObjeto);

    // Convertir la lista de objetos a una cadena JSON actualizada
    const listaObjetosJSON = JSON.stringify(listaObjetos);

    // Guardar la lista actualizada en el LocalStorage para la clave del carnet
    localStorage.setItem(carnet, listaObjetosJSON);

  }





var nombreEstudiante = sessionStorage.getItem('nombreEstudiante');
console.log(nombreEstudiante);
var nombreUsuario = nombreEstudiante;

var datatre = 'tree'+ nombreUsuario;
var datacir = 'listaCircular'+ nombreUsuario;
console.log(datatre);


const toBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

function downloadTxt(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function Upload(e) {

  e.preventDefault();
  const input = document.querySelector('#file');
  const file = input.files[0];
  var fileName = file.name.split(".")[0];

  // Validar si ya existe un archivo con el mismo nombre en la carpeta actual
  let path = $("#path").val();
  let {node:folder, weight} = tree.getFolder(path);
 

  const formData = new FormData(e.target);
  const form = Object.fromEntries(formData);
  if (folder) {
    console.log("Subiendo archivo");
    if (form.file.type === "text/plain") {
      let fr = new FileReader();
      fr.readAsText(form.file);
      fr.onload = () => {
        folder.files.push({
          name: fileName,
          content: fr.result,
          type: form.file.type,
        });
        Compartidos.push({
          name: fileName,
          content: fr.result,
          type: form.file.type,
        });
        localStorage.setItem(datatre, JSON.stringify(JSON.decycle(tree)));
        $('#carpetas').html(tree.getHTML(path));
      };
    } else {
      let parseBase64 = await toBase64(form.file);
      folder.files.push({
        name: fileName,
        content: parseBase64,
        type: form.file.type,
      });
      Compartidos.push({
        name: fileName,
        content: parseBase64,
        type: form.file.type,
      });
      /*const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const date = "Fecha: " + `${day}/${month}/${year}`;
      const hour = "Hora: " + `${hours}:${minutes}:${seconds}`;
      var creo = "Se creó archivo\\n" + fileName + "\\n" + date + "\\n" + hour;
      listaCircular.insert(creo);*/
     localStorage.setItem(datacir, JSON.stringify(JSON.decycle(dblink)));
     localStorage.setItem(datatre, JSON.stringify(JSON.decycle(tree)));
      $('#carpetas').html(tree.getHTML(path));
    }
  }
}

function Chat(){
  window.location.href = "Chat.html";
}




function CREATE(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    if (folderName === '') {
        alert('Por favor, ingrese un nombre para la carpeta.');
    } else {
        tree.insert(folderName, path);
        localStorage.setItem(datatre, JSON.stringify(JSON.decycle(tree)));
        
        var mes = new Date().getMonth() + 1;
        var bitacora = "Se creo la carpeta " + folderName + "\\n" + " Fecha: " + new Date().getDate() +"/"+ mes + "/" + new Date().getFullYear() + "\\n" + " Hora: " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();	
        dblink.append(bitacora);
        localStorage.setItem(datacir, JSON.stringify(JSON.decycle(dblink)));
        $('#carpetas').html(tree.getHTML(path));
    }
  }
  
  let treeData = JSON.retrocycle(JSON.parse(localStorage.getItem(datatre)));
  if (treeData) {
    tree = Object.assign(new Tree(), treeData);
    let path = $('#path').val();
    $('#carpetas').html(tree.getHTML(path));
  }
  let CirData = JSON.retrocycle(JSON.parse(localStorage.getItem(datacir)));
  if (CirData !== null && CirData !== undefined) {
  dblink = Object.assign(new CircularLinkedList(), CirData);
  }


function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function RETURN(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}


function showGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
    console.log(body)
}

function showGraphM(){
  let path = $('#path').val();
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { ${tree.matrixGrpah(path)} }`
  $("#GraphMatriz").attr("src", url + body);
}

function DELETE() {

    let path = $('#path').val();
    let folderNode = tree.getFolder(path);
    if (folderNode === null) {
      alert('No hay carpeta seleccionada. Seleccione una carpeta para eliminar.');
    } else if (folderNode === tree.root) {
      alert('No hay carpeta seleccionada. Seleccione una carpeta para eliminar.');
    } else {
      let parentNode = tree.getFolder(path.split('/').slice(0, -1).join('/'));
      if (parentNode === null) {
        console.log('No se puede eliminar la carpeta: padre no encontrado');
      } else {
        // Mostrar alerta para confirmar eliminación de carpeta
        var tmp=folderNode.folderName
        if (confirm('¿Está seguro que desea eliminar la carpeta ' + folderNode.folderName + '?\nEsta acción no se puede deshacer.')) {
          var mes = new Date().getMonth() + 1;
           var bitacora = "Se eliminó la carpeta " + tmp + "\\n" + " Fecha: " + new Date().getDate() +"/"+ mes + "/" + new Date().getFullYear() + "\\n" + " Hora: " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();	
            dblink.append(bitacora);
            localStorage.setItem(datacir, JSON.stringify(JSON.decycle(dblink)));
            
            parentNode.children = parentNode.children.filter(child => child !== folderNode);
            $('#path').val(path.split('/').slice(0, -1).join('/'));
            $('#carpetas').html(tree.getHTML($('#path').val()));
            $('#path').val('/' + path.split('/').slice(1, -1).join('/'));
            localStorage.setItem(datatre,JSON.stringify(JSON.decycle(tree)));
            alert('Carpeta eliminada. La carpeta ' + tmp + ' ha sido eliminada.');
        }
      }
    }

  }

  function Bitacora(){

    var bitacora = dblink.print();
    console.log(bitacora);
    

  }


  function buscarCarpeta() {
    let path = $('#TextBuscar').val();
  
    // Si la ruta es únicamente '/', no agrega otro '/'
    if (path === '/') {
      $('#TextBuscar').val(path);
    } else {
      let result = tree.search(path);
    }
  }
  
  
  function RENAME() {
    let oldPath = $('#path').val();
  
    // Verificar si hay carpeta seleccionada
    if (oldPath=="/") {
     alert('No hay carpeta seleccionada. Seleccione una carpeta para renombrar.');
    }
    else{
    let userInput = prompt("Por favor, ingresa tu nombre:", "");
      
        let newName = userInput;
        tree.renameFolder(oldPath, newName);
        localStorage.setItem(datatre,JSON.stringify(JSON.decycle(tree)));
    }
    
  }
  function showGraphB(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body;
    body = `${dblink.generateGraph()}`;
    $("#GraphBitacora").attr("src", url + body);
  }

  function Compartir(){
    window.location.href = "Compartidos.html";
  }


  function logout() {
    window.location.href = "../Sesion/sesion.html";
  }
  
  function showOptions() {
    var CBPermisos = document.getElementById("CBPermisos");
    var CBCarnet = document.getElementById("CBCarnet");
  
    if (CBPermisos.style.display === "none") {
      CBPermisos.style.display = "block";
      CBCarnet.style.display = "block";
      CBArchivo.style.display = "block";
      label1.style.display = "block";
      label2.style.display = "block";
      label3.style.display = "block";
      BtnPer.style.display = "block";
      
    } else {
      CBPermisos.style.display = "none";
      CBCarnet.style.display = "none";
      CBArchivo.style.display = "none";
      label1.style.display = "none";
      label2.style.display = "none";
      label3.style.display = "none";
      BtnPer.style.display = "none";
    }
    mostrarArchivo()
    
  }