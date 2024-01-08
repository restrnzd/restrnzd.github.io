// Obtén una referencia al botón de inicio de sesión con Google
var googleLoginButton = document.getElementById('google-login');

// Añade un evento click al botón de Google
googleLoginButton.addEventListener('click', signInWithGoogle);

// Función para iniciar sesión con Google
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log("Usuario autenticado con Google:", user);
      redirectToSesionPage(user); // Redirige a la página de sesión con los datos del usuario
    })
    .catch((error) => {
      console.error("Error al autenticar con Google:", error);
    });
}

// Obtén una referencia al botón de inicio de sesión con Facebook
var facebookLoginButton = document.getElementById('facebook-login');

// Añade un evento click al botón de Facebook
facebookLoginButton.addEventListener('click', signInWithFacebook);

// Función para iniciar sesión con Facebook
function signInWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      console.log("Usuario autenticado con Facebook:", user);
      redirectToSesionPage(user); // Redirige a la página de sesión con los datos del usuario
    })
    .catch((error) => {
      console.error("Error al autenticar con Facebook:", error);
    });
}

// Función para redirigir a la página de sesión con los datos del usuario
function redirectToSesionPage(user) {
  localStorage.setItem('user', JSON.stringify(user)); // Almacena los datos del usuario en el almacenamiento local
  window.location.href = 'sesion.html';
}
