
let tree =  new Tree();


let Bitacoradb = new CircularLinkedList();


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
  ShowFile()
  
}





function ShowFile(){
  let path = $("#path").val();
  const archivoSelect = document.getElementById("CBArchivo");
  archivoSelect.options.length = 1;
  const root = tree.getFolder(path);
  root.files.forEach(file => {
    const option = document.createElement("option");
    option.text = file.name;
    archivoSelect.add(option);
  });
  }

  function SendPermission() {
    // Obtener valores seleccionados en los elementos de formulario
    let path = $("#path").val();
    const permiso = document.getElementById("boton1").value;
    const carnet = document.getElementById("boton2").value;
    const archivo = document.getElementById("boton3").value;
    console.log(permiso);
    console.log(carnet);
    console.log(archivo);

    tree.insertFile(path, archivo, carnet, permiso)
  //Agregar acción a realizar
  }





var nombreEstudiante = sessionStorage.getItem('NomLogEst');
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


async function Upload(e) {
  e.preventDefault();
  const input = document.querySelector('#file');
  const file = input.files[0];
  var fileName = file.name.split(".")[0];

  // Validar si ya existe un archivo con el mismo nombre en la carpeta actual
  let path = $("#path").val();
  let folder = tree.getFolder(path);


  const formData = new FormData(e.target);
  const form = Object.fromEntries(formData);
  if (folder) {
    if (form.file.type === "text/plain") {
      let fr = new FileReader();
      fr.readAsText(form.file);
      fr.onload = () => {
        folder.files.push({
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

     localStorage.setItem(datacir, JSON.stringify(JSON.decycle(Bitacoradb)));
     localStorage.setItem(datatre, JSON.stringify(JSON.decycle(tree)));
      $('#carpetas').html(tree.getHTML(path));
    }
  }
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
        Bitacoradb.append(bitacora);
        localStorage.setItem(datacir, JSON.stringify(JSON.decycle(Bitacoradb)));
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
  Bitacoradb = Object.assign(new CircularLinkedList(), CirData);
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
}

function showGraphM(){
  let path = $('#path').val();
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G { ${tree.matrixGrpah(path)} }`
  $("#GraphMatix").attr("src", url + body);
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
            Bitacoradb.append(bitacora);
            localStorage.setItem(datacir, JSON.stringify(JSON.decycle(Bitacoradb)));
            
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

    var bitacora = Bitacoradb.print();
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
    body = `${Bitacoradb.generateGraph()}`;
    $("#GraphBitacora").attr("src", url + body);
  }