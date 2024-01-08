// Obtén una referencia al objeto de autenticación de Firebase
const auth = firebase.auth();

// Función para iniciar sesión con Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  signInWithProvider(provider);
}

// Función para iniciar sesión con Facebook
function signInWithFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  signInWithProvider(provider);
}

// Función común para iniciar sesión con proveedores
function signInWithProvider(provider) {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log(`Usuario autenticado: ${user.displayName}`);
      showAuthenticatedContent(user);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

// Función para cerrar sesión
function signOut() {
  auth.signOut()
    .then(() => {
      console.log("Sesión cerrada.");
      showLoginContent();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

// Función para mostrar contenido después de autenticar
function showAuthenticatedContent(user) {
  // Ocultar el contenido de inicio de sesión
  document.getElementById('login-container').style.display = 'none';

  // Mostrar el formulario y contenido después de autenticar
  document.getElementById('sesion-container').style.display = 'block';

  // Actualizar el contenido del formulario con los datos del usuario
  document.querySelector('output[name="email"]').textContent = user.email;
  document.querySelector('output[name="nombre"]').textContent = user.displayName;
  document.getElementById('avatar').src = user.photoURL || 'ruta_default_avatar.jpg';
}

// Función para mostrar contenido de inicio de sesión
function showLoginContent() {
  // Ocultar el formulario y contenido después de cerrar sesión
  document.getElementById('sesion-container').style.display = 'none';

  // Mostrar el contenido de inicio de sesión
  document.getElementById('login-container').style.display = 'block';
}

// Configura los botones de inicio de sesión de Google y Facebook
document.getElementById('google-login').addEventListener('click', () => signInWithGoogle());
document.getElementById('facebook-login').addEventListener('click', () => signInWithFacebook());
document.getElementById('terminarSesion').addEventListener('click', () => signOut());
