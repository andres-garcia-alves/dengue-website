class NavigationMenu extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = this.content + this.styles + this.mediaqueries;
    this.onload = this.init();
  }

  init() {
    /* navigation menu */
    document.querySelector(".menu-btn").addEventListener("click", () => {
      document.querySelector(".nav-menu").classList.toggle("show");
    });
  }

  content = `
    <!-- burger button -->
    <div class="menu-btn">
        <i class="fas fa-bars fa-2x"></i>
    </div>

    <!-- navigation main -->
    <nav class="nav-main">

      <!-- logo -->
      <a href="../home/index.html">
        <img class="nav-brand" src="../resources/img/brand.png" alt="TechNews Logo">
      </a>

      <!-- navigation menu -->
      <ul class="nav-menu">
        <li><a href="../autotest/autotest.html">Auto-Test</a></li>
        <li><a href="../hospitales/hospitales.html">Hospitales</a></li>
        <li><a href="../mapa/mapa.html">Mapa de Calor</a></li>
        <li><a href="../noticias/noticias.html">Noticias</a></li>
        <li><a href="../prevencion/prevencion.html">Prevención</a></li>
        <li><a href="../sintomas/sintomas.html">Síntomas</a></li>
        <li><a href="../telefonos/telefonos.html">Tel. Utiles</a></li>
      </ul>

      <!-- search -->
      <ul class="nav-menu-search">
        <li>
          <a href="#"><i class="fas fa-search"></i></a>
        </li>
      </ul>
        
    </nav>
    <hr>
  `;

  styles = `
    <style>
      /* burger button */
      .menu-btn {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 30px;
        z-index: 2;
        display: none;
      }

      /* navigation */
      .nav-main {
        font-size: 17px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        padding: 20px 0;
      }
      .nav-brand {
        width: 50px;
      }

      /* navigation menu */
      .nav-main ul {
        display: flex;
      }
      .nav-main ul li {
        padding: 10px;
      }
      .nav-main ul li a {
        padding: 2px;
      }
      .nav-main ul li a:hover {
        border-bottom: 2px solid var(--text-primary-color);
      }
      .nav-main ul.nav-menu {
        flex: 1;
        margin-left: 20px;
      }
      hr {
        margin: 10px 0;
      }
    </style>
  `;

  mediaqueries = `
    <style>
      @media (max-width: 1024px) {
        .menu-btn {
          display: block !important;
        }
        .menu-btn:hover {
          opacity: 0.5;
        }
        .nav-main ul.nav-menu {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          background: var(--bg-secondary-color);
          width: 50%;
          max-width: 320px;
          height: 100%;
          border-right: 1px solid var(--text-secondary-color);
          opacity: 0.9;
          padding: 30px;
          transform: translateX(-500px);
          transition: transform 0.5s ease-in-out;
          z-index: 10;
        }
        .nav-main ul.nav-menu li {
          padding: 20px;
          border-bottom: solid 1px var(--text-secondary-color);
          font-size: 14px;
        }
        .nav-main ul.nav-menu li a {
          color: var(--text-secondary-color);
        }
        .nav-main ul.nav-menu li:last-child {
          border-bottom: 0;
        }
        .nav-main ul.nav-menu.show {
          transform: translateX(-20px);
        }
        .nav-main ul.nav-menu-search {
          margin-right: 50px;
        }
      }
    </style>
  `;
}

window.customElements.define('navigation-menu', NavigationMenu);
