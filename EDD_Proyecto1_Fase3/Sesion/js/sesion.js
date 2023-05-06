function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    var password2 = document.getElementById("login-password").value;
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    password = encryptedPassword;
    console.log(password);
    
    if (username === "admin" && password2 === "admin") {
        
        window.location.href = "../Admin/admin.html";
    } else {
        var logEst = localStorage.getItem('studentsData');
        if (logEst) {
            var studentsArray = JSON.parse(logEst);
            // Iterar a través de los objetos de estudiantes para encontrar una coincidencia
            for (var j = 0; j < studentsArray.length; j++) {
                var carnss=studentsArray[j].carnet.toString()
                if (carnss === username && studentsArray[j].password === password) {
                    console.log("Usuario encontrado");
                    // Redireccionar al estudiante a la página estudiantes.html si se encuentra una coincidencia
                    //window.location.href = "../DashboardUser/users.html";
                    window.location.href = "../Usuarios/Usuario.html";
                    sesEst=studentsArray[j].nombre;
                    carEst=studentsArray[j].carnet;
                    sessionStorage.setItem('nombreEstudiante', sesEst);
                    sessionStorage.setItem('carnetEstudiante', carEst);
                    return;
                }
            }
            alert("Usuario o constraseña incorrectos");
    }
    }
    
}