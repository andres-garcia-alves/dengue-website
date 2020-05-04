class NavigationMenu extends HTMLElement {

  content = `
    <!-- burger button -->
    <div class="menu-btn">
        <i class="fas fa-bars fa-2x"></i>
    </div>

    <!-- navigation main -->
    <nav class="nav-main">

      <!-- logo -->
      <img src="../resources/img/brand.png" alt="TechNews Logo" class="nav-brand">
      
      <!-- navigation menu -->
      <ul class="nav-menu">
          <li><a href="../autotest/autotest.html">Auto-Test</a></li>
          <li><a href="../hospitales/hospitales.html">Hospitales</a></li>
          <li><a href="../mapa/mapa.html">Mapa de Calor</a></li>
          <li><a href="../noticias/noticias.html">Noticias</a></li>
          <li><a href="../prevencion/prevencion.html">Prevención</a></li>
          <li><a href="../sintomas/sintomas.html">Síntomas</a></li>
          <li><a href="../telefonos/telefonos.html">Tel. Utiles</a></li>
          <li><a href="../tratamientos/tratamientos.html">Tratamientos</a></li>
      </ul>

      <!-- search -->
      <ul class="nav-menu-right">
          <li>
          <a href="#">
              <i class="fas fa-search"></i>
          </a>
          </li>
      </ul>
        
    </nav>
    <hr>
  `;

  constructor() {
    super();
    this.innerHTML = this.content;
    this.onload = this.init();
  }

  init() {
    /* navigation menu */
    document.querySelector(".menu-btn").addEventListener("click", () => {
      document.querySelector(".nav-menu").classList.toggle("show");
    });
  }
}

window.customElements.define('navigation-menu', NavigationMenu);
