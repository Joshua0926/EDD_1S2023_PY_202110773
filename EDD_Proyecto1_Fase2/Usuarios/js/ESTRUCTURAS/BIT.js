class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class CircularLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    // Agregar un elemento al final de la lista circular
    append(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.tail.next = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
        this.tail.next = this.head;
      }
    }
  
    // Eliminar un elemento de la lista circular por valor
    remove(value) {
      if (!this.head) {
        return null;
      }
      let removedNode = null;
      if (this.head.value === value) {
        removedNode = this.head;
        if (this.head === this.tail) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = this.head.next;
          this.tail.next = this.head;
        }
      } else {
        let currentNode = this.head;
        while (currentNode.next !== this.head) {
          if (currentNode.next.value === value) {
            removedNode = currentNode.next;
            currentNode.next = removedNode.next;
            break;
          }
          currentNode = currentNode.next;
        }
        if (removedNode === this.tail) {
          this.tail = currentNode;
          this.tail.next = this.head;
        }
      }
      return removedNode;
    }
  
    // Imprimir la lista circular
    print() {
      if (!this.head) {
        return null;
      }
      let currentNode = this.head;
      while (currentNode.next !== this.head) {
        console.log(currentNode.value);
        currentNode = currentNode.next;
      }
      console.log(currentNode.value);
    }

    generateGraph() {
      let graph = 'digraph G {\n';
      graph += 'rankdir="LR";\n';
      graph += 'node[shape=box];\n';
      if (this.head) {
        let currentNode = this.head;
        let i = 0;
        do {
          graph += `${i} [label="${currentNode.value}"];\n`;
          if (currentNode.next && currentNode.next !== this.head) {
            graph += `${i} -> ${i+1};\n`;
          }
          currentNode = currentNode.next;
          i++;
        } while (currentNode !== this.head);
        // add arrow from last node to head node
        graph += `${i-1} -> 0;\n`;
      }
      graph += '}';
      console.log(graph)
      return graph;
    }

  }