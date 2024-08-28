// app.js
import { auth } from "./assets/js/firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

document.addEventListener("DOMContentLoaded", function() {
    // Referencias a los elementos del DOM
    const registerSection = document.getElementById("register-section");
    const loginSection = document.getElementById("login-section");
    const logoutSection = document.getElementById("logout-section");

    const showLoginBtn = document.getElementById("show-login");
    const showRegisterBtn = document.getElementById("show-register");
    const logoutBtn = document.getElementById("logout");

    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Muestra la sección de inicio de sesión y oculta la de registro
    showLoginBtn.addEventListener("click", function() {
        registerSection.style.display = "none";
        loginSection.style.display = "block";
        logoutSection.style.display = "none";
    });

    // Muestra la sección de registro y oculta la de inicio de sesión
    showRegisterBtn.addEventListener("click", function() {
        registerSection.style.display = "block";
        loginSection.style.display = "none";
        logoutSection.style.display = "none";
    });

    // Manejo del cierre de sesión
    logoutBtn.addEventListener("click", function() {
        signOut(auth).then(function() {
            // Cierra la sesión exitosamente
            registerSection.style.display = "block";
            loginSection.style.display = "none";
            logoutSection.style.display = "none";
        }).catch(function(error) {
            // Manejo de errores
            console.error("Error al cerrar sesión:", error);
        });
    });

    // Manejo del registro
    registerBtn.addEventListener("click", function(event) {
        event.preventDefault();
        limpiarErrores();
        let textNombre = document.getElementById("nombre").value;
        let textEmail = document.getElementById("email").value;
        let textClave = document.getElementById("password").value;
        let resultado = validar(textNombre, textEmail, textClave);
        if (resultado) {
            createUserWithEmailAndPassword(auth, textEmail, textClave)
                .then(function(userCredential) {
                    // Registro exitoso
                    document.querySelector(".resultado").innerHTML = "Se ha registrado con éxito!";
                    registerSection.style.display = "none";
                    loginSection.style.display = "none";
                    logoutSection.style.display = "block";
                })
                .catch(function(error) {
                    // Manejo de errores
                    document.querySelector(".resultado").innerHTML = `Error: ${error.message}`;
                });
        }
    });

    // Manejo del inicio de sesión
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault();
        limpiarErrores();
        let textEmail = document.getElementById("login-email").value;
        let textClave = document.getElementById("login-password").value;
        let resultado = validar("", textEmail, textClave); // Nombre no requerido para login
        if (resultado) {
            signInWithEmailAndPassword(auth, textEmail, textClave)
                .then(function(userCredential) {
                    // Inicio de sesión exitoso
                    document.querySelector(".resultado").innerHTML = "Has iniciado sesión con éxito!";
                    registerSection.style.display = "none";
                    loginSection.style.display = "none";
                    logoutSection.style.display = "block";
                })
                .catch(function(error) {
                    // Manejo de errores
                    document.querySelector(".resultado").innerHTML = `Error: ${error.message}`;
                });
        }
    });

    function limpiarErrores() {
        document.querySelector(".resultado").innerHTML = "";
        document.querySelector(".errorNombre").innerHTML = "";
        document.querySelector(".errorEmail").innerHTML = "";
        document.querySelector(".errorClave").innerHTML = "";
    }

    function validar(nombre, email, clave) {
        let pasamosLaValidacion = true;
        let validacionNombre = /[a-zA-Z]/gim;
        if (nombre && validacionNombre.test(nombre) == false) {
            document.querySelector(".errorNombre").innerHTML = "Ingrese un nombre válido.";
            pasamosLaValidacion = false;
        }
        let validacionEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,}/gim;
        if (validacionEmail.test(email) == false) {
            document.querySelector(".errorEmail").innerHTML = "Ingrese un correo válido";
            pasamosLaValidacion = false;
        }
        let validaciónClave = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/gim;
        if (validaciónClave.test(clave) == false) {
            document.querySelector(".errorClave").innerHTML = "Ingrese una Contraseña válida.";
            pasamosLaValidacion = false;
        }
        return pasamosLaValidacion;
    }
});
