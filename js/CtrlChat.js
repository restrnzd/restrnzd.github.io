import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

const daoMensaje = getFirestore().
  collection("Mensaje");
let usuarioId = "";
/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Cliente"])) {
    usuarioId = usuario.email;
    consulta();
    forma.addEventListener(
      "submit", agrega);
  }
}

/** Agrega un usuario a la base de
 * datos.
 * @param {Event} evt */
async function agrega(evt) {
  try {
    evt.preventDefault();
    const formData = new FormData(forma);
    const texto = getString(formData, "texto").trim();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    
    // Obtener la URL del avatar del usuario actual
    const usuario = await getAuth().currentUser;
    const avatarUrl = usuario.photoURL;

    const modelo = {
      usuarioId,
      texto,
      timestamp,
      avatar: avatarUrl, // Agregar la URL del avatar al modelo
    };

    await daoMensaje.add(modelo);
    forma.texto.value = "";
  } catch (e) {
    muestraError(e);
  }
}



/** Muestra los mensajes
 * almacenados en la collection
 * "Mensaje". Se actualiza
 * automáticamente. */
function consulta() {
  /* Consulta que se actualiza
   * automáticamente. Pide todos
   * los registros de la colección
   *  "Mensaje"
   * ordenados por el campo
   *  "timestamp"
   * de forma
   *  descendente. */
  daoMensaje.
    orderBy("timestamp", "desc").
    onSnapshot(
      htmlLista, errConsulta);
}

/** Muestra los datos enviados por
 * el servidor.
 * Si los datos cambian en el
 * servidor, se vuelve a invocar
 * esta función y recibe los datos
 * actualizados.
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap estructura
 *    parecida a un Array, que
 *    contiene una copia de los
 *    datos del servidor.
 */
function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    /* Cuando el número de
     * documentos devueltos por la
     * consulta es mayor que 0,
     * revisa uno por uno los
     * documentos de la consulta y
     * los muestra. El iterador
     * "doc" apunta a un
     * documento de la base
     * de datos. */
    snap.forEach(doc =>
      html += htmlFila(doc));
  } else {
    /* Cuando el número de
     * documentos devueltos por la
     * consulta es igual a 0,
     * agrega un texto HTML. */
    html += /* html */
      `<li class="vacio">
        -- No hay mensajes
        registrados. --
      </li>`;
  }
  lista.innerHTML = html;
}

/** Agrega el texto HTML
 * que corresponde a un
 * documento de un mensaje.
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
function htmlFila(doc) {
  const data = doc.data();

  return ( /* html */
    `<li class="fila">
        <strong class="primario">
          ${cod(data.usuarioId)}
        </strong>
        <span class="secundario">
          ${cod(data.texto)}
        </span>
      </div>
    </li>`);
}



/** Función que se invoca cuando
 * hay un error al recuperar los
 * mensajes y muestra el error. Al
 * invocar esta función, la
 * conexión se cancela, por lo
 * cual intenta conectarse otra
 * vez.
 * @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  // Intenta conectarse otra vez.
  consulta();
}
