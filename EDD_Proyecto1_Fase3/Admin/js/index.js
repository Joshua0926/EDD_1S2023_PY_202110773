
//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------

let avlTree = new AvlTree();

let tablaHash = new HashTable(7);
//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function finalizarSesion() {
    window.location.href = "../../LOGIN.html";
  }



  function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
  
    // cargar los estudiantes del archivo
    try {
      let fr = new FileReader();
      fr.readAsText(form.inputFile);
      fr.onload = () => {
        studentsArray = JSON.parse(fr.result).alumnos;
        let studentsData = localStorage.getItem('studentsData');
        let studentsDataArray = studentsData ? JSON.parse(studentsData) : [];
  
        let newStudentsArray = [];
        let repeatedStudentsArray = [];
  
        // verificar si los estudiantes ya existen en localStorage
        for (let i = 0; i < studentsArray.length; i++) {
          let studentExists = false;
  
          for (let j = 0; j < studentsDataArray.length; j++) {
            if (studentsArray[i].carnet === studentsDataArray[j].carnet) {
              studentExists = true;
              repeatedStudentsArray.push(studentsArray[i].carnet);
              break;
            }
          }
  
          if (!studentExists) {
            newStudentsArray.push(studentsArray[i]);
            studentsDataArray.push(studentsArray[i]);
          }
        }
  
        // mostrar mensaje de estudiantes repetidos
        if (repeatedStudentsArray.length > 0) {
          alert(`Los siguientes estudiantes ya existen en la base de datos: ${repeatedStudentsArray.join(', ')}`);
        }
  
        for(let i = 0; i < newStudentsArray.length; i++){
          const encryptedPassword = CryptoJS.SHA256(newStudentsArray[i].password).toString();
          newStudentsArray[i].password = encryptedPassword;
          avlTree.insert(newStudentsArray[i]);
  
        }
  
        
  
        // GUARDAR DATOS EN LOCALSTORAGE
        localStorage.setItem('studentsData', JSON.stringify(studentsDataArray));
        studentsData = localStorage.getItem('studentsData');
        if (studentsData) {
          const studentsDataArray = JSON.parse(studentsData);
          for(let i = 0; i < studentsDataArray.length; i++){
            // desencriptar la contraseña
            const decryptedPassword = CryptoJS.SHA256(studentsDataArray[i].password).toString();
            studentsDataArray[i].password = decryptedPassword;
            avlTree.insert(studentsDataArray[i]);
          }
        }
      }
    } catch(error){
      alert('Error al cargar el archivo');
    }
  
    
  }

let blockChain = new BlockChain();


  let block = JSON.retrocycle(JSON.parse(localStorage.getItem("blockChain")));
  if (block !== null && block !== undefined) {
      blockChain = Object.assign(new BlockChain(), block);
    }
  
  function getBlock(index){
      if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        } else {
            alert('No hay bloques');
        }
      }else{
          let currentBlock = Number($('#block-table').attr('name'));
  
          if(index < 0){ // MOSTRAR EL ANTERIOR
              if(currentBlock - 1 < 0){
                  alert('Estás en el bloque inicial');
              } else {
                  let html = blockChain.blockReport(currentBlock - 1);
                  if(html){
                      $('#show-block').html(html);
                      $('#block-table').attr('name', currentBlock - 1);
                  } else {
                      alert('No hay bloques');
                  }
              }
          } else if(index > 0){ // MOSTRAR EL SIGUIENTE
              if(currentBlock + 1 > blockChain.size ){
                  alert('Estás en el bloque final');
              } else {
                  let html = blockChain.blockReport(currentBlock + 1);
                  if(html){
                      $('#show-block').html(html);
                      $('#block-table').attr('name', currentBlock + 1);
                  } else {
                      alert('No hay bloques');
                  }
              }
          }
      }
  }



function loadDataFromLocalStorage() {
    const studentsData = localStorage.getItem('studentsData');
    if (studentsData) {
      const studentsDataArray = JSON.parse(studentsData);
      for(let i = 0; i < studentsDataArray.length; i++){
        // desencriptar la contraseña
        const decryptedPassword = CryptoJS.SHA256(studentsDataArray[i].password).toString();
        studentsDataArray[i].password = decryptedPassword;
        avlTree.insert(studentsDataArray[i]);
      }
    }
  }


//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------




//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = ` ${blockChain.toDot()} `
    console.log(body);
    $("#graph").attr("src", url + body);
}


function cargarTabla() {
  const permisosData = localStorage.getItem('listaPermisos');
  if (permisosData) {
    const permisosArray = JSON.parse(permisosData);
    $('#permisosTable tbody').html(
      permisosArray.map((item, index) => {
        if (item.Tipo === 'text/plain') {
          // Si es un archivo de texto plano, agregar un enlace para descargar el archivo
          return(`
            <tr>
              <th>${item.Propietario}</th>
              <td>${item.Destinatario}</td>
              <td>${item.Ubicacion}</td>
              <td>
                <a href="#" class="link-like" onclick="downloadTxt('${item.Contenido}','${item.Archivo}')">${item.Archivo}</a>
              </td>
              <td>${item.Permiso}</td>
            </tr>
          `);
        } else {
          // Si no es un archivo de texto plano, agregar un enlace para descargar el archivo como antes
          return(`
            <tr>
              <th>${item.Propietario}</th>
              <td>${item.Destinatario}</td>
              <td>${item.Ubicacion}</td>
              <td>
                <a href="${item.Contenido}" download="${item.Archivo}">${item.Archivo}</a>
              </td>
              <td>${item.Permiso}</td>
            </tr>
          `);
        }
      }).join('')
    );
  }
}

window.onload = function() {
    loadDataFromLocalStorage();
    // Recuperar los datos del almacenamiento local
    cargarTabla();
    getBlock(0);

  };


  function logout() {
    window.location.href = "../Sesion/sesion.html";
  }