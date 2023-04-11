class Nodo {
    constructor(estudiante) {
        this.estudiante = estudiante;
        this.izquierda = undefined;
        this.derecha = undefined;
        this.altura = 1;
    }
}

//--------------------------------------------------------------------------
//                   VARIABLES GLOBALES
//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//                   CLASE ARBOL AVL
//--------------------------------------------------------------------------
class AvlTree{
    constructor(){
        this.raiz = null;
    }
    // Función para obtener la altura de un nodo
    altura(nodo) {
        return nodo ? nodo.altura : 0;
    }

    // Función para obtener el factor de balance de un nodo
    factorBalance(nodo) {
        return this.altura(nodo.izquierda) - this.altura(nodo.derecha);
    }

    // Función para rotar a la izquierda en el árbol AVL
    rotarIzquierda(nodo) {
        let nodoDerecha = nodo.derecha;
        nodo.derecha = nodoDerecha.izquierda;
        nodoDerecha.izquierda = nodo;
        nodo.altura = Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha)) + 1;
        nodoDerecha.altura = Math.max(this.altura(nodoDerecha.izquierda), this.altura(nodoDerecha.derecha)) + 1;
        return nodoDerecha;
    }

    // Función para rotar a la derecha en el árbol AVL
    rotarDerecha(nodo) {
        let nodoIzquierda = nodo.izquierda;
        nodo.izquierda = nodoIzquierda.derecha;
        nodoIzquierda.derecha = nodo;
        nodo.altura = Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha)) + 1;
        nodoIzquierda.altura = Math.max(this.altura(nodoIzquierda.izquierda), this.altura(nodoIzquierda.derecha)) + 1;
        return nodoIzquierda;
    }

    // Función para balancear un nodo en el árbol AVL
    balancear(nodo) {
        let factorBalance = this.factorBalance(nodo);
        if (factorBalance > 1) {
            if (this.factorBalance(nodo.izquierda) < 0) {
                nodo.izquierda = this.rotarIzquierda(nodo.izquierda);
            }
            return this.rotarDerecha(nodo);
        } else if (factorBalance < -1) {
            if (this.factorBalance(nodo.derecha) > 0) {
                nodo.derecha = this.rotarDerecha(nodo.derecha);
            }
            return this.rotarIzquierda(nodo);
        } else {
            return nodo;
        }
    }

    insertar(estudiante) {
        let nuevoNodo = new Nodo(estudiante);
        this.raiz = this.insertarNodo(this.raiz, nuevoNodo);
    }

    // Función auxiliar para insertar un nodo en el árbol AVL
    insertarNodo(nodo, nuevoNodo) {
        if (!nodo) {
            return nuevoNodo;
        }
        if (nuevoNodo.estudiante.carnet < nodo.estudiante.carnet) {
            nodo.izquierda = this.insertarNodo(nodo.izquierda, nuevoNodo);
        } else if (nuevoNodo.estudiante.carnet > nodo.estudiante.carnet) {
            nodo.derecha = this.insertarNodo(nodo.derecha, nuevoNodo);
        } else {
            // Si el carnet ya existe, no se inserta el nuevo nodo
            return nodo;
        }
        nodo.altura = Math.max(this.altura(nodo.izquierda), this.altura(nodo.derecha)) + 1;
        return this.balancear(nodo);
    }


    // Función para recorrer los nodos del árbol AVL en orden ascendente por el carnet del estudiante
    recorrerNodosEnOrden() {
        let nodos = [];
        this.recorrerEnOrden(this.raiz, nodos);
        return nodos;
    }

    // Función auxiliar para recorrer los nodos del árbol AVL en orden ascendente
    recorrerEnOrden(nodo, nodos) {
        if (nodo) {
            this.recorrerEnOrden(nodo.izquierda, nodos);
            nodos.push(nodo);
            this.recorrerEnOrden(nodo.derecha, nodos);
        }
    }

    recorrerNodosPostOrden() {
        let nodos = [];
        this.recorrerPostOrder(this.raiz, nodos);
        return nodos;
    }

    recorrerPostOrder(nodo, nodos) {
        if (nodo) {
            this.recorrerPostOrder(nodo.izquierda, nodos);
            this.recorrerPostOrder(nodo.derecha, nodos);
            nodos.push(nodo);
        }
    }

    recorrerNodosPreOrden() {
        let nodos = [];
        this.recorrerPreOrder(this.raiz, nodos);
        return nodos;
    }

    recorrerPreOrder(nodo, nodos) {
        if (nodo) {
            nodos.push(nodo);
            this.recorrerPreOrder(nodo.izquierda, nodos);
            this.recorrerPreOrder(nodo.derecha, nodos);
        }
    }

    obtenerId() {
        return "id" + Math.random().toString(16).slice(2);
    }

    generarDot() {
        return this.recorrerEnOrdenDot(this.raiz, this.obtenerId());
    }

    // Función auxiliar para recorrer los nodos del árbol AVL en orden ascendente
    recorrerEnOrdenDot(nodo, name) {
        if (nodo) {

            let value = ' Nodo' + name + '  [label = \"' + nodo.estudiante.carnet +'\\n'+nodo.estudiante.nombre+ '\\n' + 'Altura: '+  nodo.altura + ' \"]';

            let nombreIzquierda = this.obtenerId();
            let dotIzquierda = this.recorrerEnOrdenDot(nodo.izquierda, nombreIzquierda);
            if (dotIzquierda) {
                value += dotIzquierda + ' Nodo' + name + ' -> ' + 'Nodo' + nombreIzquierda;
            }

            let nombreDerecha = this.obtenerId();
            let dotDerecha = this.recorrerEnOrdenDot(nodo.derecha, nombreDerecha);
            if (dotDerecha) {
                value += dotDerecha + ' Nodo' + name + ' -> ' + 'Nodo' + nombreDerecha;
            }

            return value
        }else{
            return undefined;
        }
    }

}