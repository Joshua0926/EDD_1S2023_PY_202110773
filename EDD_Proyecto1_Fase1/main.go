package main

import (
	"encoding/csv"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

var option string
var q = &queue{}
var list = &DoublyLinkedList{}
var pila = Stack{}
var stackList = []Stack{}
var listadepilas = StackList{}

////////////// COLA PARA ALMACENAR ESTUDIANTES ANTES DE ACEPTAR O RECHAZAR ////////////

type Student struct {
	ID       int
	Name     string
	LastName string
	Password string
}

type NodeP struct {
	next    *NodeP
	student Student
}

type Queue struct {
	head *NodeP
	tail *NodeP
	size int
}

func (q *Queue) Enqueue(s Student) {
	newNode := &NodeP{student: s}
	if q.head == nil {
		q.head = newNode
		q.tail = newNode
	} else {
		q.tail.next = newNode
		q.tail = newNode
	}
	q.size++
}

func (q *Queue) Dequeue() (Student, error) {
	if q.head == nil {
		return Student{}, fmt.Errorf("queue is empty")
	}
	student := q.head.student
	q.head = q.head.next
	q.size--
	if q.head == nil {
		q.tail = nil
	}
	return student, nil
}

func (q *Queue) Front() (Student, error) {
	if q.head == nil {
		return Student{}, fmt.Errorf("queue is empty")
	}
	return q.head.student, nil
}

func (q *Queue) IsEmpty() bool {
	return q.head == nil
}

//////////////////////// Lista doblemente enlazada/////////////////

type Node struct {
	Student *student
	Next    *Node
	Prev    *Node
}

type DoublyLinkedList struct {
	Head *Node
	Tail *Node
}

func (dll *DoublyLinkedList) AddNode(student *student) {
	newNode := &Node{
		Student: student,
	}

	if dll.Head == nil {
		dll.Head = newNode
		dll.Tail = newNode
	} else {
		newNode.Prev = dll.Tail
		dll.Tail.Next = newNode
		dll.Tail = newNode
	}
}

//////////////////////////////// ORDENAMIENTO DE BURBUJA ////////////////////////

func (dll *DoublyLinkedList) ordenarPorCarnet() {
	if dll.Head == nil || dll.Head.Next == nil {
		return
	}

	actual := dll.Head
	for actual != nil {
		siguiente := actual.Next
		for siguiente != nil {
			if actual.Student.id > siguiente.Student.id {
				// Intercambiamos los estudiantes
				temp := actual.Student
				actual.Student = siguiente.Student
				siguiente.Student = temp
			}
			siguiente = siguiente.Next
		}
		actual = actual.Next
	}
}

////////////////////////////////// PILA DE ACCIONES DE ADMIN /////////////////////////

type StudentS struct {
	name     string
	lastname string
	id       int
	password string
}

type NodeS struct {
	data *StudentS
	next *NodeS
}

type StackS struct {
	top *NodeS
}

func (s *StackS) Push(st *StudentS) {
	n := &NodeS{data: st, next: s.top}
	s.top = n
}

func (s *StackS) Pop() *StudentS {
	if s.top == nil {
		return nil
	}
	n := s.top
	s.top = n.next
	return n.data
}

func (s *StackS) Peek() *StudentS {
	if s.top == nil {
		return nil
	}
	return s.top.data
}

func (s *StackS) IsEmpty() bool {
	return s.top == nil
}

////////////////////////////////////////// Lista de Pilas ////////////////////////////////////////////////////

type StackList struct {
	stacks []*Stack
	size   int
}

func NewStackList() *StackList {
	return &StackList{}
}

func (s *StackList) Push(stack *Stack) {
	s.stacks = append(s.stacks, stack)
	s.size++
}

func (s *StackList) Pop() *Stack {
	if len(s.stacks) == 0 {
		return nil
	}
	stack := s.stacks[len(s.stacks)-1]
	s.stacks = s.stacks[:len(s.stacks)-1]
	return stack
}

func printListStack(s *StackList) {

	for i := len(s.stacks) - 1; i >= 0; i-- {
		fmt.Println(s.stacks[i])

	}

}

func SortStacks(stacks []*Stack) {
	for i := 0; i < len(stacks); i++ {
		minIndex := i
		for j := i + 1; j < len(stacks); j++ {
			if stacks[j].Peek() < stacks[minIndex].Peek() {
				minIndex = j
			}
		}
		if minIndex != i {
			stacks[i], stacks[minIndex] = stacks[minIndex], stacks[i]
		}
	}
}

func NewStack() *Stack {
	return &Stack{items: []string{}}
}

////////////////////////////Generar Reportes de Cola //////////////////////////////////

func ReporteDeCola() {
	dot := "digraph cola {\n"
	dot += "node [shape=record];\n"
	dot += "rankdir=TB;\n"
	dot += "cola [label=\""

	for i := 0; i < q.size; i++ {
		s := q.students[i]
		dot += fmt.Sprintf("<f%d> %s %s %s %s |", i, s.name, s.lastName, s.id, s.password)
	}
	dot += "\"];\n"

	for i := 0; i < q.size; i++ {
		dot += fmt.Sprintf("cola:f%d -> cola:f%d;\n", i, i+1)
	}
	dot += "}\n"

	// Imprimir la salida en formato DOT
	file, err := os.Create("cola.dot")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Escribimos el contenido del archivo DOT en la salida estándar
	fmt.Fprintln(file, dot)

	// Cerramos el archivo
	file.Close()

	fileName := "cola.dot"

	cmd := exec.Command("dot", "-Tpng", "-o", "cola.png", fileName)

	// Ejecutar el comando y manejar cualquier error
	error := cmd.Run()
	if error != nil {
		fmt.Println("Error al generar la imagen:", err)
		os.Exit(1)
	}
}

///////////////////////////////Reporte de Acciones de Admin/////////////////////////

func ReporteDePila() {
	dot := "digraph cola {\n"
	dot += "node [shape=record];\n"
	dot += "rankdir=LR;\n"
	dot += "cola [label=\""

	for i := 0; i < pila.size; i++ {
		p := pila.items[i]
		dot += fmt.Sprintf("<f%d> %s |", i, p)
	}
	dot += "\"];\n"

	for i := 0; i < q.size; i++ {
		dot += fmt.Sprintf("cola:f%d -> cola:f%d;\n", i, i+1)
	}
	dot += "}\n"

	// Imprimir la salida en formato DOT
	file, err := os.Create("pila.dot")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Escribimos el contenido del archivo DOT en la salida estándar
	fmt.Fprintln(file, dot)

	// Cerramos el archivo
	file.Close()

	fileName := "pila.dot"

	cmd := exec.Command("dot", "-Tpng", "-o", "pila.png", fileName)

	// Ejecutar el comando y manejar cualquier error
	error := cmd.Run()
	if error != nil {
		fmt.Println("Error al generar la imagen:", err)
		os.Exit(1)
	}
}

///////////////////////////////Reporte de Lista /////////////////////////////////////

func ReporteDeLista() {
	dot := "digraph {\n"
	dot += "rankdir=LR;\n"
	dot += "node [shape=record];\n"

	node := list.Head
	for i := 0; i < listadepilas.size; i++ {
		l := listadepilas.stacks[i]
		dot += fmt.Sprintf("subgraph cluster_notas%d", i)
		dot += " {\n"
		dot += "node [shape=plaintext];\n"
		dot += `label = "Bitacora";`
		//dot += fmt.Sprintf(`label = "Login%d";`, i)
		dot += "\n"

		for i := 0; i < l.size; i++ {
			items := l.items[i]
			dot += "\""
			dot += fmt.Sprintf(items)
			dot += "\";\n"

		}

		dot += " }\n"
	}

	for i := 1; node != nil; i++ {
		dot += fmt.Sprintf("estudiante%d ", i)
		dot += "[label="
		dot += fmt.Sprintf(`"{%s %s`, node.Student.name, node.Student.lastName)
		dot += "|<notas> |<siguiente> }"
		dot += `"`
		dot += "];\n"
		node = node.Next

	}

	for i := 0; i < listadepilas.size; i++ {
		dot += fmt.Sprintf("estudiante%d -> estudiante%d;\n", i+1, i+2)
	}

	for i := 0; i < listadepilas.size; i++ {
		l := listadepilas.stacks[i]
		cabeza := l.Peek()
		dot += fmt.Sprintf("estudiante%d:notas -> %s;\n", i+1, cabeza)

	}

	dot += "}\n"

	// Imprimir la salida en formato DOT
	file, err := os.Create("lista.dot")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Escribimos el contenido del archivo DOT en la salida estándar
	fmt.Fprintln(file, dot)

	// Cerramos el archivo
	file.Close()

	fileName := "lista.dot"

	cmd := exec.Command("dot", "-Tpng", "-o", "lista.png", fileName)

	// Ejecutar el comando y manejar cualquier error
	error := cmd.Run()
	if error != nil {
		fmt.Println("Error al generar la imagen:", err)
		os.Exit(1)
	}
}

/////////////////////////////// Reporte JSON ////////////////////////////////////////

/////////////////////////////// Usuarios y Login ///////////////////////////////////

type Admin struct {
	Username string
	Password string
}

func estudianteLogin(dll *DoublyLinkedList) {
	t := time.Now()
	dateString := t.Format("2006-01-02 15:04:05")
	var carnet, contrasena string
	fmt.Print("Ingrese su carnet: ")
	fmt.Scanln(&carnet)
	fmt.Print("Ingrese su contraseña: ")
	fmt.Scanln(&contrasena)

	estudianteEncontrado := false
	nodoActual := dll.Head

	if carnet == "admin" && contrasena == "admin" {
		fmt.Println("Acceso concedido al dashboard de administrador")

		Administrador()

	}

	for nodoActual != nil {
		if nodoActual.Student.id == carnet && nodoActual.Student.password == contrasena {
			estudianteEncontrado = true
			for i := 0; i < listadepilas.size; i++ {
				l := listadepilas.stacks[i]
				cabeza := l.Peek()
				//fmt.Println(cabeza)
				if cabeza == carnet {
					l.Push("Sesión Iniciada: " + dateString)

					fmt.Println(l)
					fmt.Println("Elementos")
					for i := 0; i < l.size; i++ {
						fmt.Println(l.items[i])
					}
					//fmt.Println(listadepilas)
					SortStacks(listadepilas.stacks)
					fmt.Println("Lista de Pilas")
					printListStack(&listadepilas)
					//fmt.Println(cabeza)
					ReporteDeLista()

					break
				}

			}

			break
		}
		nodoActual = nodoActual.Next
	}
	//ReporteDeLista()

	if estudianteEncontrado {
		fmt.Println("Bienvenido,", nodoActual.Student.name, nodoActual.Student.lastName)
	} else {
		fmt.Println("Carnet o contraseña incorrectos")
	}
}

func login() {

	for {
		//fmt.Println("\033[2J") // Limpiar la consola
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Println("*            1. Iniciar Sesión              *")
		fmt.Println("*            2. Salir del Sistema           *")
		fmt.Println("*********************************************")
		fmt.Print("Seleccione una opción: ")
		fmt.Scanln(&option)

		switch option {
		case "1":
			estudianteLogin(list)

		case "2":
			fmt.Println("Cerrando Programa...")
			time.Sleep(time.Second)
			return

		}

	}

}

func Administrador() {

	var name, lastName, password, id string

	for {
		//fmt.Println("\033[2J") // Limpiar la consola
		fmt.Println("*** Dashboard Administrador - EDD GoDrive ***")
		fmt.Println("*       1. Ver estudiantes pendientes       *")
		fmt.Println("*       2. Ver estudiantes del sistema      *")
		fmt.Println("*       3. Registrar nuevo estudiante       *")
		fmt.Println("*       4. Carga masiva de estudiantes      *")
		fmt.Println("*       5. Cerrar sesión                    *")
		fmt.Println("*********************************************")
		fmt.Print("Seleccione una opción: ")
		fmt.Scanln(&option)

		switch option {
		case "1":
			EstudiantesPendientes()

		case "2":

			if list.Head != nil {
				fmt.Println("Estudiantes del sistema:")
				list.ordenarPorCarnet()
				node := list.Head

				for i := 1; node != nil; i++ {
					fmt.Printf("%d. %s %s, Carnet: %s, Contraseña: %s\n", i, node.Student.name, node.Student.lastName, node.Student.id, node.Student.password)
					node = node.Next
				}
				printStack(&pila)
				SortStacks(listadepilas.stacks)
				fmt.Println("Lista stack")
				printListStack(&listadepilas)
				//fmt.Println(stackList)
			} else {
				fmt.Println("No hay estudiantes en el sistema")
			}

			///////////////////////////////////////////////////////////////////////////////////

		case "3":
			fmt.Println("***** Registro de Nuevo Estudiante - EDD GoDrive *****")
			fmt.Println("Ingrese los datos del estudiante:")
			fmt.Print("Nombre: ")
			fmt.Scanln(&name)
			fmt.Print("Apellido: ")
			fmt.Scanln(&lastName)
			fmt.Print("Carnet: ")
			fmt.Scanln(&id)
			fmt.Print("Contraseña: ")
			fmt.Scanln(&password)

			s := &student{name: name, lastName: lastName, id: id, password: password}
			q.Enqueue(s)
			ReporteDeCola()

			fmt.Printf("Size: %d\n", q.size)
			fmt.Println("Students:")
			for i := 0; i < q.size; i++ {
				s := q.students[i]
				fmt.Printf("%s %s - Carnet: %s, Contraseña: %s\n", s.name, s.lastName, s.id, s.password)
			}

			///////////////////////////////////////////////////////////////////////////////////

		case "4":
			file, err := os.Open("Entrada_Practica2.csv")
			if err != nil {
				fmt.Println("Error al abrir el archivo:", err)
				return
			}
			defer file.Close()

			// Leer datos del archivo CSV
			reader := csv.NewReader(file)
			reader.Comma = ','

			registros, err := reader.ReadAll()
			if err != nil {
				fmt.Println("Error al leer el archivo CSV:", err)
				return
			}
			for _, registro := range registros {

				nombreCompleto := registro[1]
				nombreYApellido := strings.Split(nombreCompleto, " ")
				nombre := nombreYApellido[1]
				apellido := nombreYApellido[2]

				s := student{
					name:     nombre,
					lastName: apellido,
					id:       registro[0],
					password: registro[2],
				}
				q.Enqueue(&s)
				ReporteDeCola()
			}
			fmt.Println("Carga masiva de estudiantes completada.")
			// Lógica para cargar masivamente estudiantes
		case "5":
			login()

			break
		default:
			fmt.Println("Opción inválida")
		}
		time.Sleep(time.Second)

	}

}

func EstudiantesPendientes() {
	if q.isEmpty() {
		fmt.Println("No hay estudiantes pendientes")
	} else {
		for i := 0; i < q.size; i++ {
			s := q.students[i]
			fmt.Println("*** Estudiantes Pendientes - EDD GoDrive ***")
			fmt.Println("*************** Pendientes:" + strconv.Itoa(q.size) + "  ***************")
			fmt.Println("******** Estudiante Actual: " + s.name + " " + s.lastName + " ********")
			fmt.Println("*         1. Aceptar al Estudiante         *")
			fmt.Println("*         2. Rechazar al Estudiante        *")
			fmt.Println("*         3. Volver al Menú                *")
			fmt.Println("*********************************************")
			fmt.Print("Seleccione una opción: ")
			fmt.Scanln(&option)

			switch option {

			case "1":
				nueva := NewStack()
				t := time.Now()
				dateString := t.Format("2006-01-02 15:04:05")
				s := q.Dequeue()
				list.AddNode(s)
				pila.Push("Se aceptó a Estudiante: " + s.name + " " + dateString)
				nueva.Push(s.id)
				listadepilas.Push(nueva)
				fmt.Print("Estudiante: " + s.name + " " + s.lastName + " Aceptado Exitosamente")
				ReporteDeCola()
				ReporteDePila()

			case "2":
				t := time.Now()
				dateString := t.Format("2006-01-02 15:04:05")
				s := q.Dequeue()
				pila.Push("Se rechazó a Estudiante: " + s.name + " " + dateString)
				fmt.Print("Estudiante: " + s.name + " " + s.lastName + " Rechazado Exitosamente")
				ReporteDeCola()
				ReporteDePila()

			case "3":
				fmt.Println("Regresando")
				Administrador()

			default:
				fmt.Println("Opción inválida")
			}

		}
		/*s := q.Dequeue()
		list.AddNode(s)
		fmt.Println("Nombre:", s.name)
		fmt.Println("Apellido:", s.lastName)
		fmt.Println("Carnet:", s.id)
		fmt.Println("Contraseña:", s.password)*/
	}
}

func main() {

	login()

}

////////////// COLA PARA ALMACENAR ESTUDIANTES ANTES DE ACEPTAR O RECHAZAR ////////////

type student struct {
	name     string
	lastName string
	id       string
	password string
}

type queue struct {
	students []*student
	size     int
}

func (q *queue) Enqueue(s *student) {
	q.students = append(q.students, s)
	q.size++
}

func (q *queue) Dequeue() *student {
	if q.size == 0 {
		return nil
	}

	s := q.students[0]
	q.students = q.students[1:]
	q.size--
	return s
}

func (q *queue) isEmpty() bool {
	return len(q.students) == 0
}

////////////////////////////////// PILA DE ACCIONES DE ADMIN /////////////////////////

type Stack struct {
	items []string
	size  int
}

func (s *Stack) Push(item string) {
	s.items = append(s.items, item)
	s.size++
}

func (s *Stack) Pop() string {
	if len(s.items) == 0 {
		return ""
	}
	item := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	s.size--
	return item

}

func printStack(s *Stack) {

	for i := len(s.items) - 1; i >= 0; i-- {
		fmt.Println(s.items[i])

	}

}

// Función para verificar si la pila está vacía
func (s *Stack) isEmpty() bool {
	return len(s.items) == 0
}

func (s *Stack) Peek() string {
	if len(s.items) == 0 {
		panic("Stack is empty")
	}

	return s.items[0]
}
