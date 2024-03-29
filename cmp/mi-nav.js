import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <li>
          <a href="sesion.html">
            Sesión</a>
        </li>
      </ul>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }
//menu.html

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
  async cambiaUsuario(usu) {
    if (usu && usu.email) {
      let html = "";
      const roles =
        await cargaRoles(
          usu.email);
    if (roles.has("Administrador")) {
        html += /* html */
          `<li>
            <a href=
"menu.html">Menú</a>
          </li>`;
      }
     if (roles.has("Cliente")) {
        html += /* html */
          `<li>
            <a href=
              "chat.html">Comentarios</a>
          </li>`;
      }
      if (roles.has("Administrador")) {
        html += /* html */
          `<li>
            <a href=
"alumnos.html">Cita</a>
          </li>`;
      }
      this.ul.innerHTML += html;
    }
  }
}

customElements.define(
  "mi-nav", MiNav);
