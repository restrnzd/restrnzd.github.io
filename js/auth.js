// Obtén una referencia al objeto de autenticación de Firebase
const auth = firebase.auth();

// Configura los botones de inicio de sesión de Google y Facebook
document.getElementById('google-login').addEventListener('click', () => signInWithGoogle());
document.getElementById('facebook-login').addEventListener('click', () => signInWithFacebook());

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
    })
    .catch((error) => {
      console.error(error.message);
    });
}
