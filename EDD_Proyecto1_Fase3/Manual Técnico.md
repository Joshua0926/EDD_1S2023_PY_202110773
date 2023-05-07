Universidad de San Carlos de Guatemala
Facultad de Ingeniería
Escuela de Ciencias y Sistemas
Arquitectura de Computadoras y Ensambladores 1

# Manual Técnico - Proyecto 1 Fase 2

| Nombre | Carnet |  
| ------ | ------ |  
| Joshua David **Osorio Tally** | 202110773 |  

El desarrollo de software es una tarea compleja que involucra varios pasos y procesos que deben ser seguidos para garantizar la calidad y eficacia del resultado final. Uno de estos procesos importantes es la fase de diseño y planificación, en la que se debe establecer la estructura y organización de los datos que se manejarán en el programa. 

El siguiente sitio web nos permite visualizar cómo es que lo datos se manejan a la hora de armar un programa que permita el almacenamiento de los archivos, y cómo es posible llevar a cabo dichas acciones.
En esta fase es necesario descomponer los archivos en 3 secciones:
-	Administrador
-	Usuario
-	Login

En esta fase, es fundamental descomponer los archivos en secciones lógicas y definir cómo se van a almacenar y manipular los datos. En el caso de un programa que permita el almacenamiento de archivos, se deben considerar diferentes aspectos, como la gestión de usuarios, la seguridad, la organización de las carpetas y la asignación de permisos. 

 

En el manual técnico que nos ocupa, se describe cómo se lleva a cabo esta fase de diseño y se detallan las diferentes estructuras y algoritmos que se han utilizado para desarrollar el programa. En particular, se han empleado diferentes tipos de árboles, listas y matrices para gestionar la información de los usuarios, las carpetas y los permisos. 

 

En la sección de Login, se utiliza un archivo HTML para crear la página de inicio de sesión, donde los usuarios pueden ingresar sus credenciales. Este archivo se complementa con un archivo JavaScript que se encarga de realizar las validaciones y acciones necesarias para verificar que la información sea correcta y redirigir al usuario a la siguiente página. 
En Login tenemos nuestro archivo HTML, que nos permite agregar los botones y campos de texto necesarios para poder ingresar las credenciales de cada usuario, además es necesario llevar esto en simultáneo con un archivo js, que nos permita realizar las validaciones y acciones que hagan que nos redireccione a la siguiente página si toda la información está correcta.

 

En la sección de Admin, se ha utilizado una estructura AVL-Tree para almacenar la información de los usuarios o estudiantes, y se han definido los métodos necesarios para realizar diferentes tipos de ordenamiento en la tabla. También se han creado archivos HTML, CSS y JavaScript para diseñar la página y definir las funcionalidades que se deben realizar en ella. 

 

Por último, en la sección de Usuario, se han utilizado tres estructuras diferentes para gestionar la información de las carpetas, los permisos y las acciones del usuario. En particular, se ha utilizado una estructura n-ary-tree para almacenar la información de las carpetas, una lista circular llamada Bitácora para registrar las acciones del usuario y una matriz dispersa llamada Sparse-Matrix para gestionar los permisos de acceso a las carpetas. 

 

En conclusión, el manual técnico proporciona una visión detallada de cómo se ha diseñado y desarrollado el programa, y cómo se han utilizado diferentes estructuras y algoritmos para gestionar la información de manera eficiente y efectiva. Este enfoque en el diseño y planificación es esencial para garantizar que el programa cumpla con las necesidades y requisitos del usuario final. 

Listas, nodos y estructuras utilizadas en el proyecto: 

## AVL-TREE: 

Class: Avl-Node 

Métodos:  

- Insert 
- getHeight 
- getMaxHeight 
- insertRecursive 
- RotateLeft 
- RotateRight 
- DoubleLeft 
- DoubleRight
- treeGraph 
- InOrder 
- PostOrder 
- Preorder   

## Hashnode ##

Esta clase nos permite tener una tabla de hash, la cual haremos uso para almacenar todos nuestros usuarios, además que para eso es necesario anteriormente tenerlos almacenados en el avl.
Los metodos usados son:

* insert
* CalcularIndice
* recaluclarIndice
* nuevoIndice
* checkCapacidad
* search
* #esPrimo

## Block-Chain ##

Esta otra estructura fue utilizada para los chats entre usuarios, es una tecnología basada en una cadena de bloques de operaciones descentralizada y pública. Esta tecnología genera una base de datos compartida a la que tienen acceso sus participantes, los cuáles pueden rastrear cada transacción que hayan realizado. Es como un gran libro de contabilidad inmodificable y compartido que van escribiendo una gran cantidad de ordenadores de forma simultánea.

Para esta estructura fue necesario los siguientes métodos:

* async getSha254
* print
* getMessages
* blockReport
* toDot

## Bitacora:

Class: CircularLinkedList 

Métodos:

- Append 
- Remove 
- Print 
- generateGraph   

## n-ary-tree 

Class: Tree 

Métodos: 

- insert 
- getFolder 
- graph 
- getHTML 
- SEARCH 
- Renombrar 
- InsertFile 


## Sparse-Matrix 

Class: SparseMatrix 

Métodos: 

- Insert 
- xHeaders 
- yHeaders 
- addX 
- addY 
- printX 
- printY
- graph 
- headersGrpah 
- NodesGraph

Para usuario también es necesario utilizar un js que de las acciones dentro del sitio web, para los cuales se utilizaron los siguientes métodos:

•	mostrarBotones
•	mostrarArchivo
•	subirArchivo
•	CrearCarpeta
•	entrarCarpeta
•	RetornarInicio
•	Grafica
•	Eliminar
•	Bitacora
•	Buscar
•	RenombrarCarpeta