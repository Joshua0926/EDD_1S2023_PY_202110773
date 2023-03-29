function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    if (username === "admin" && password === "admin") {
        
        window.location.href = "../Admin/admin.html";
    } else {
        var logEst = localStorage.getItem('logEst');
        if (logEst) {
            var studentsArray = JSON.parse(logEst);
            // Iterar a través de los objetos de estudiantes para encontrar una coincidencia
            for (var j = 0; j < studentsArray.length; j++) {
                var carnss=studentsArray[j].carnet.toString()
                if (carnss === username && studentsArray[j].password === password) {
                    // Redireccionar al estudiante a la página estudiantes.html si se encuentra una coincidencia
                    //window.location.href = "../DashboardUser/users.html";
                    window.location.href = "../Usuarios/Usuario.html";
                    sesEst=studentsArray[j].nombre;
                    sessionStorage.setItem('nombreEstudiante', sesEst);
                    return;
                }
            }
            alert("Usuario o constraseña incorrectos");
    }
    }
    
}