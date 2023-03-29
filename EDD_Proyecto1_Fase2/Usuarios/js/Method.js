
let tree =  new Tree();

let dblink = new CircularLinkedList();





var nombreEstudiante = sessionStorage.getItem('nombreEstudiante');
console.log(nombreEstudiante);
var nombreUsuario = nombreEstudiante;
var elementoBienvenido = document.querySelector('h3');
elementoBienvenido.textContent = "Bienvenido " + nombreUsuario;

var datatre = 'tree'+ nombreUsuario;
var datacir = 'listaCircular'+ nombreUsuario;
console.log(datatre);



function CREATE(e){
    e.preventDefault();
    let folderName =  $('#folderName').val();
    let path =  $('#path').val();
    if (folderName === '') {
        alert('Para poder crear una carpeta, es necesario que ingrese un nombre.');
    } else {
        tree.insert(folderName, path);
        localStorage.setItem(datatre, JSON.stringify(tree));
        
        var mes = new Date().getMonth() + 1;
        var bitacora = "Se creo la carpeta " + folderName + "\\n" + " Fecha: " + new Date().getDate() +"/"+ mes + "/" + new Date().getFullYear() + "\\n" + " Hora: " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();	
        dblink.append(bitacora);
        localStorage.setItem(datacir, JSON.stringify(JSON.decycle(dblink)));
        $('#carpetas').html(tree.getHTML(path));
    }
  }

  
  let treeData = JSON.parse(localStorage.getItem(datatre));
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
function logout() {
  window.location.href = "../Sesion/sesion.html";
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
            localStorage.setItem(datatre, JSON.stringify(tree));
            alert('Carpeta eliminada. La carpeta ' + tmp + ' ha sido eliminada.');
        }
      }
    }

  }

  function Bitacora(){

    var bitacora = dblink.print();
    console.log(bitacora);
    

  }


  function SEARCHING() {
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
     alert('NSeleccione una carpeta para modificar.');
    }
    else{
    let userInput = prompt("Por favor, ingresa tu nombre:", "");
      
        let newName = userInput;
        tree.renameFolder(oldPath, newName);
        localStorage.setItem(datatre, JSON.stringify(tree));
    }
    
  }
  function showGraphB(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body;
    body = `${dblink.generateGraph()}`;
    $("#GraphBitacora").attr("src", url + body);
  }