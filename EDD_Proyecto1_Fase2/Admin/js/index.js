//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
let avlTree = new AvlTree();


//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function logout() {
    window.location.href = "../Sesion/sesion.html";
  }



function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
                        // Crear el objeto usuarios

            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                studentsArray.map((estudiante, index) => {
                    return(`
                        <tr>
                            <th>${estudiante.carnet}</th>
                            <td>${estudiante.nombre}</td>
                            <td>${estudiante.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insertar(studentsArray[i]);
             
                
            }
           
            localStorage.setItem('logEst', JSON.stringify(studentsArray));
            var studentsData = localStorage.getItem('logEst');
            if (studentsData) {
            var studentsArray = JSON.parse(studentsData);
            console.log(studentsArray);
          }
            alert('Alumnos cargados con éxito!')
         
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }
}

function loadDataFromLocalStorage() {
    const studentsData = localStorage.getItem('logEst');
    if (studentsData) {
      const studentsArray = JSON.parse(studentsData);
      $('#studentsTable tbody').html(
        studentsArray.map((estudiante, index) => {
          return(`
            <tr>
              <th>${estudiante.carnet}</th>
              <td>${estudiante.nombre}</td>
              <td>${estudiante.password}</td>
            </tr>
          `);
        }).join('')
      );
      for(let i = 0; i < studentsArray.length; i++){
        avlTree.insertar(studentsArray[i]);
      }
    }
  }

  function inOrder(){
    let nodos = avlTree.recorrerNodosEnOrden();
  
    // Agregar cada estudiante en una fila de la tabla HTML
    let tableBody = document.querySelector('#studentsTable tbody');
    let row = "";
    for (let i = 0; i < nodos.length; i++) {
        let current = nodos[i];
        row += `
            <tr>
                <th>${current.estudiante.carnet}</th>
                <td>${current.estudiante.nombre}</td>
                <td>${current.estudiante.password}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = row;
  }


  function PostOrder(){
    let nodos = avlTree.recorrerNodosPostOrden();
  
    // Agregar cada estudiante en una fila de la tabla HTML
    let tableBody = document.querySelector('#studentsTable tbody');
    let row = "";
    for (let i = 0; i < nodos.length; i++) {
        let current = nodos[i];
        row += `
            <tr>
                <th>${current.estudiante.carnet}</th>
                <td>${current.estudiante.nombre}</td>
                <td>${current.estudiante.password}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = row;
  }

  function PreOrder(){
    let nodos = avlTree.recorrerNodosPreOrden();
  
    // Agregar cada estudiante en una fila de la tabla HTML
    let tableBody = document.querySelector('#studentsTable tbody');
    let row = "";
    for (let i = 0; i < nodos.length; i++) {
        let current = nodos[i];
        row += `
            <tr>
                <th>${current.estudiante.carnet}</th>
                <td>${current.estudiante.nombre}</td>
                <td>${current.estudiante.password}</td>
            </tr>
        `;
    }
    tableBody.innerHTML = row;
  }
//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function showStudentsForm(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                inOrder();
                break;
            case 'preOrder':
                
                PreOrder();
                
                break;
            case 'postOrder':
                PostOrder();
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}



//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.generarDot()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}


window.onload = function() {
    loadDataFromLocalStorage();
  };