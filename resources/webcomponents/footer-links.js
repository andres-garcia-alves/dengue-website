class FooterLinks extends HTMLElement {

  content = `
    <!-- footer links -->
    <div class="footer-container">

        <div class="footer-title">
            <h2>Mapa de Links</h2>
        </div>

        <div class="footer-links">
            <p><a href="/autotest/autotest.html">Auto-Test</a></p>
            <p><a href="/hospitales/hospitales.html">Hospitales</a></p>
            <p><a href="/mapa/mapa.html">Mapa de Calor</a></p>
            <p><a href="/noticias/noticias.html">Noticias</a></p>
            <p><a href="/prevencion/prevencion.html">Prevención</a></p>
            <p><a href="/sintomas/sintomas.html">Síntomas</a></p>
            <p><a href="/telefonos/telefonos.html">Teléfonos Utiles</a></p>
            <p><a href="/tratamientos/tratamientos.html">Tratamientos</a></p>
        </div>
    </div>

    <!-- footer copyright -->
    <footer class="footer-copyright">
        <span>Copyright</span>
        <i class="far fa-copyright"></i>
        <span>2020 - Desarrollo de un Proyecto, CAECE</span>   
    </footer>
  `;

  constructor() {
    super();
    this.innerHTML = this.content;
  }
}

window.customElements.define('footer-links', FooterLinks);
