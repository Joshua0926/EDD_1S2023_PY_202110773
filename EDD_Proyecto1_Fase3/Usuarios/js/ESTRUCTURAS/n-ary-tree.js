class Tnode{
    constructor(folderName, weight){
        this.folderName = folderName;
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
        this.files = [];
       
        this.weight = weight
    }
}


class Tree{
    constructor(){
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }

    insert(folderName, fatherPath){ 
        
        let {node: fatherNode, weight} = this.getFolder(fatherPath);
        let newNode =  new Tnode(folderName, weight);
        if(fatherNode){
            newNode.id = this.size;
            this.size++;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }

    }


    getFolder(path){
        let weight = 1;
        if(path == this.root.folderName){
            return {node: this.root, weight: weight};
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
    
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
                weight++;
            }
            return {node: temp, weight: weight}; 
        }
    }

    graph() {
        let nodes = "";
        let connections = "";
    
        let node = this.root;
        let queue = [];
        queue.push(node);
        while (queue.length !== 0) {
          let len = queue.length;
          for (let i = 0; i < len; i++) {
            let node = queue.shift();
            nodes += `S_${node.id}[label="${node.folderName}"];\n`;
            node.children.forEach( item => {
              connections += `S_${node.id} -> S_${item.id} [label="${item.weight}"];\n`
              queue.push(item);
          });
          }
        }
        return  '\nlayout=neato; \nedge[dir=none];\n' + nodes +'\n'+ connections;
      }

    getHTML(path){
        
   let { node } = this.getFolder(path);
    let code = "";
    node.children.map((child) => {
      code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                      <img src="./imgs/folder.png" width="100%"/>
                      <p class="h6 text-center">${child.folderName}</p>
                  </div>`;
    });
    node.files.map((file) => {
      if (file.type==="text/plain") {
        code += `<div class="col-2 folder">
        <div class="link-like" onclick="downloadTxt('${file.name}', '${file.content}')">
          <img src="./txt-icon.png" width="100%"/>
          <p class="h6 text-center">${file.name}</p>
        </div>
      </div>`;
      }
      else {
      code += `<div class="col-2 folder">
                    <a href="${file.content}" download="${file.name}" class="link-like">
                      <img src="./txt-icon.png" width="100%"/>
                      <p class="h6 text-center">${file.name}</p>
                    </a>
                  </div>`;
  }});
    return code;

          
    }
    search(path) {
        let node = this.getFolder(path);
        if (node !== null) {
            let newPath = path == '/' ? path + node.folderName : path;
            $('#path').val(newPath);
            $('#carpetas').html(this.getHTML(newPath));
        } else {
         alert("La carpeta no existe");
        }
    }


    renameFolder(oldPath, newName) {
        let node = this.getFolder(oldPath);
        if (node !== null) {
          let newPath = '';
          if (oldPath !== '/') {
            // obtener la ruta anterior sin el nombre de la carpeta
            let pathArr = oldPath.split('/');
            pathArr.pop();
            let parentPath = pathArr.join('/');
      
            // construir la nueva ruta con el nuevo nombre de la carpeta
            newPath = `${parentPath}/${newName}`;
          } else {
            newPath = `/${newName}`;
          }
          
          node.folderName = newName;
          node.path = newPath;
          $('#path').val(newPath);
          $('#carpetas').html(this.getHTML(newPath));
        } else {
          console.log('La carpeta no existe');
        }
      }




     matrixGrpah(path){
         let temp = this.getFolder(path);
         console.log(temp.matriz);
         return temp.matriz.graphMD();
     }


}