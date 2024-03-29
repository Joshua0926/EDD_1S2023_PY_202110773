Universidad de San Carlos de Guatemala
Facultad de Ingeniería
Escuela de Ciencias y Sistemas
Arquitectura de Computadoras y Ensambladores 1

# Manual de Usuario - Proyecto 1 Fase 3

| Nombre | Carnet |  
| ------ | ------ |  
| Joshua David **Osorio Tally** | 202110773 |  

## Descripción General
Este software proporciona un espacio para el almacenamiento de archivos, permitiendo a los usuarios subir archivos y otorgar permisos a otros usuarios.  

 
Para acceder al sistema, es necesario iniciar sesión en la pantalla de login. Al principio, solo se puede acceder como administrador, y para esto será necesario tomar en cuenta que la contraseña y el nombre de usuario es “admin”. Después de la carga masiva de información de otros usuarios, ellos también pueden acceder. 

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/loginedd.PNG)

Este sitio web tiene dos modos de uso, según el cargo del usuario: administrador o usuario. 

## Administrador: 

Después de iniciar sesión como administrador, se muestra una pantalla con las siguientes opciones: 

En la sección de "subir estudiantes" se encuentra el botón "seleccionar archivo", que permite subir un archivo JSON con la información de los estudiantes y sus contraseñas para usar en el login. 

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/dashboard.PNG)

El combobox "seleccionar recorrido" permite ordenar la tabla según el parámetro deseado. 

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/combobox.PNG)

El botón "graficar el Árbol" muestra el árbol de los estudiantes cargados. 

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/graficar.PNG)

## Usuario: 

Las funciones disponibles para los usuarios son: 


Crear carpetas: para crear una carpeta, seleccione un nombre en el combobox y presione el botón "crear". La carpeta se muestra en el cuadro de la derecha.

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/carpetas.PNG)


Modificar y eliminar carpetas: para realizar estas acciones, es necesario situarse dentro de la carpeta. 

Subir archivos: seleccione el botón "subir archivo", busque el archivo deseado y cárguelo. 

 
Permisos: seleccione el botón "mostrar botones" para ver las opciones disponibles y llenar la información necesaria. 


Los botones de reportes permiten mostrar los árboles y la matriz que indica la información de todo lo que el usuario ha realizado, demostrando los procesos necesarios para realizar dichas acciones. 

![Arquitectura](https://github.com/Joshua0926/EDD_1S2023_PY_202110773/blob/main/EDD_Proyecto1_Fase2/reportes.PNG)

Chat:
Esta otra funcionalida permite tener conversaciones entre usuarios, por medio de un blockchain, que nos permite enviar entre sesiones los mensajes, además que cuenta con encriptación para que solo ellos puedan visualizarlos.