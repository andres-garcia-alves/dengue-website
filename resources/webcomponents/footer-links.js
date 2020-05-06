class FooterLinks extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = this.content + this.styles + this.mediaqueries;
  }

  content = `
    <!-- footer links -->
    <div class="footer-container">

      <div class="footer-title">
        <h2>Mapa de Links</h2>
      </div>

      <div class="footer-links">
        <p><a href="../home/index.html">Inicio</a></p>
        <p><a href="../autotest/autotest.html">Auto-Test</a></p>
        <p><a href="../hospitales/hospitales.html">Hospitales</a></p>
        <p><a href="../mapa/mapa.html">Mapa de Calor</a></p>
        <p><a href="../noticias/noticias.html">Noticias</a></p>
        <p><a href="../prevencion/prevencion.html">Prevención</a></p>
        <p><a href="../sintomas/sintomas.html">Síntomas</a></p>
        <p><a href="../telefonos/telefonos.html">Teléfonos Utiles</a></p>
      </div>
    </div>

    <!-- footer copyright -->
    <footer class="footer-copyright">
      <span>Copyright</span>
      <i class="far fa-copyright"></i>
      <span>2020 - Desarrollo de un Proyecto, CAECE</span>   
    </footer>
  `;

  styles = `
    <style>
      /* footer */
      .footer-container {
        background: var(--bg-secondary-color);
        color: var(--text-secondary-color);
        font-size: 12px;
        margin-top: 50px;
      }
      .footer-title {
        padding: 40px 0px 20px 30px;
      }
      .footer-links {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        align-items: flex-start;
        justify-content: center;
      }
      .footer-links a {
        color: var(--text-secondary-color);
      }
      .footer-links p {
        margin: 0 auto;
        padding: 10px 0px;
      }
      .footer-links li {
        line-height: 2.4;
      }
      .footer-copyright {
        background-color: var(--bg-secondary-color);
        color: var(--text-secondary-color);
        font-size: 12px;
        margin-bottom: 20px;
        padding: 40px 0px 20px 0px;
        text-align: center;
      }
    </style>
  `;

  mediaqueries = `
    <style>
      /* media queries */
      @media (max-width: 1024px) {
        .footer-container .footer-links {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (max-width: 600px) {
        .footer-container .footer-links {
          grid-template-columns: 1fr;
        }
        .footer-container .footer-links ul {
          text-align: center;
        }
      }
    </style>
  `;
}

window.customElements.define('footer-links', FooterLinks);
