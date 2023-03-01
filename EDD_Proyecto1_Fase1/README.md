# Proyecto 1 Fase 1
## Tabla de Datos
| Nombre | Joshua David Osorio Tally |
| ------ | ------ |
| Carnet | 202110773 |

## Creación de Cola
El desarrollo web Front-end consiste en la conversión de datos en una interfaz gráfica para que el usuario pueda ver e interactuar con la información de forma digital usando HTML, CSS y JavaScript.
#### Angular
Para el proyecto se utilizó el framework Angular, el cual permite el uso de diferentes librerías y componentes. Principalmente está escrito en Typescript. Para su funcionamiento utilizamos el puerto del localhost:4200 (Predeterminado)

#### Manual de uso

- Login

La primera página que aparece es el Login, el cual permite iniciar sesión con un usuario precargado 

![Login](https://user-images.githubusercontent.com/98793837/164951490-8bb44082-803d-4bfc-a2bc-448f9cc943e3.png)


- Pókedex

La Pókedex es el lugar donde aparecen los pokemones, acá podrás ver los mejores 15 pokemon que existen, estos pueden ser buscados por tipo, nombre o número.

![Pokedex](https://user-images.githubusercontent.com/98793837/164951530-076bd1e7-7512-4b97-aa9c-b9cf21d178d9.png)


## Backend
Para el Backend se utilizó Node.js, el cual es  un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación TypeScript. Gracias a este entorno, pudimos crear una API Rest.

Acá en la API Rest utilizamos el lenguaje de TypeScript, como el uso de Express.js, este nos permite la creación de la misma API en Node.js

El puerto que se utilizó para crear el Backend fue el localhost:3000 (el más común para este tipo)
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


#### Endpoint
Para el manejo de los endpoints se utilizó el formato JSON
- Obtener Usuarios

Para este endpoint se usaron 3 usuarios, los cuales sus datos son usuarios y password.Este busca dentro del arreglo y si coinciden los datos, se ingresará a la pantalla principal.
- Obtener Pokemons

Para obtener los Pokemons, se crearon 15 de estos. Se utilizó un método el cual obtiene el arreglo de los 15 y los muestra. 
- Obtener por Número

Los Pokemons pueden ser obtenidos por número, esto ya que se utiliza una función en la cual despues de un endpoint (en el caso del proyecto es /pokenumero) se busca un número y presenta todos sus datos.
- Obtener por Número

Los Pokemons pueden ser obtenidos por Nombre, esto ya que se utiliza una función en la cual despues de un endpoint (en el caso del proyecto es /pokenombre) se busca un nombre y presenta todos sus datos.
- Obtener por Tipo

Los Pokemons pueden ser obtenidos por Tipo, esto ya que se utiliza una función en la cual despues de un endpoint (en el caso del proyecto es /poketipo) se busca un tipo de pokemon y presenta todos los pokemons de ese tipo y sus datos.