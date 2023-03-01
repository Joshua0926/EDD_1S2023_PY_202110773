# Proyecto 1 Fase 1
## Tabla de Datos
| Nombre | Joshua David Osorio Tally |
| ------ | ------ |
| Carnet | 202110773 |

## EDD GoDrive
EDD GoDrive es una herramienta desarrollada para el uso exclusivo de la Universidad de San Carlos de Guatemala el cuál es un sistema encargada del almacenamiento de archivos de los estudiantes que cuentan con una cuenta de usuario en el sistema. 
Para la creación de la misma se hizo uso de distintas tecnolgías que facilitaron la creación y manejo de las estructuras generadas para el programa.
Estas son:

#### Golang
Go, también conocido como Golang, es un lenguaje de programación de código abierto creado en 2007 por Robert Griesemer, Rob Pike y Ken Thompson en Google. Go se diseñó para ser un lenguaje de programación de alto rendimiento, eficiente, escalable y fácil de usar.

Go se caracteriza por tener una sintaxis sencilla y una fácil legibilidad, lo que lo convierte en una excelente opción para el desarrollo de aplicaciones web, de escritorio y de sistemas. Además, Go cuenta con una amplia biblioteca estándar que facilita la implementación de muchos tipos de aplicaciones.

#### JSON
JSON (JavaScript Object Notation) es un formato ligero y de intercambio de datos que se utiliza para transmitir información entre aplicaciones web y servicios. Se basa en una sintaxis simple de pares de nombre-valor que es fácilmente legible por humanos y también es fácil de procesar por máquinas.

En JSON, los datos se representan como objetos que constan de una serie de pares de nombre-valor encerrados entre llaves {}. Cada par de nombre-valor consta de una cadena de texto que representa el nombre, seguida de dos puntos ':' y un valor que puede ser una cadena de texto, número, booleano, objeto o una matriz.

#### Estrcuturas desarrolladas para el sistema

- Lista Doblemente Enlazada

Una lista doblemente enlazada es una estructura de datos lineal en la que cada elemento (nodo) contiene dos enlaces o punteros, uno al elemento anterior y otro al siguiente elemento de la lista. Cada nodo contiene un elemento de datos y los punteros que apuntan al nodo anterior y al siguiente.

La lista doblemente enlazada permite la inserción y eliminación eficiente de elementos en la lista, ya que sólo se necesitan ajustar los punteros de los nodos circundantes, sin necesidad de reorganizar toda la lista. Esto la hace ideal para situaciones en las que se necesita un acceso rápido a los elementos en cualquier parte de la lista.


- Pila

Una pila es una estructura de datos lineal que permite agregar y quitar elementos sólo en un extremo de la estructura, denominado "tope" o "cima" de la pila. La operación de agregar un elemento se denomina "apilar" o "push", mientras que la operación de quitar un elemento se llama "desapilar" o "pop". La pila sigue una política de "último en entrar, primero en salir", lo que significa que el último elemento en ser apilado es el primero en ser desapilado.

Las pilas se utilizan comúnmente en muchas aplicaciones informáticas, como la evaluación de expresiones matemáticas, la gestión de llamadas de sistema, el procesamiento de texto y el manejo de excepciones. En estas aplicaciones, las pilas se utilizan para almacenar elementos temporalmente y acceder a ellos en el orden inverso al que se agregaron.

- Cola

Una cola es una estructura de datos lineal que permite agregar elementos por un extremo y eliminar elementos por el otro extremo. La operación de agregar elementos se conoce como "encolar" o "enqueue", mientras que la operación de eliminar elementos se llama "desencolar" o "dequeue". La cola sigue una política de "primero en entrar, primero en salir" (FIFO, por sus siglas en inglés), lo que significa que el primer elemento en ser encolado es el primer elemento en ser desencolado.

Las colas se utilizan comúnmente en muchas aplicaciones informáticas, como la gestión de tareas en un sistema operativo, el enrutamiento de paquetes en redes de computadoras, la impresión de documentos en cola y la simulación de procesos.

## Funcionamiento
A continuación se describen las opciones del programa

- Login
Permite ingresar al sistema desde una cuenta de administrador o de un usuario previamente creado

- Creación de Usuario
Permite crear un usuario que será puesto temporalmente en una cola de espera para aguardar a ser acpetado o rechazado

- Carga Masiva
Permite crear varios usuarios a la vez para colocarlos en la cola de espera

- Estudiantes Pendientes

Permite ver la cola de estudiantes para decidir si de agregarán al sistema o se rechazarán

- Visualización de Usuarios

Permite ver la lista de los estudiantes que fueron aceptados dentro del sistema en orden ascendente con respecto su carnet

- Generación de Reportes

Despliega los reportes que informan de las acciones del administrador, las colas y los estudiantes aceptados por medio de la herramienta Graphviz

#### Requerimientos del Sistema
Sistemas operativos compatibles
Windows 8.1 (x86 y x64)
Windows 8 (x86 y x64)
Windows 7 SP1 (x86 y x64)
Windows Server 2008 R2 SP1 (x64)
Windows Server 2012 (x64)
Windows Server 2012 R2 (x64)

Requisitos de hardware
Procesador a 1.6 GHz o superior
1 GB (32 bits) o 2 GB (64 bits) de RAM (agregue 512 MB al host si se ejecuta en una máquina virtual)
3 GB de espacio disponible en el disco duro
Disco duro de 5400 RPM
Tarjeta de vídeo compatible con DirectX 9 con resolución de pantalla de 1024 x 768 o más.
