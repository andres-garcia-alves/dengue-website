class SocialNetworksShare extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = this.content + this.styles + this.mediaqueries;
    this.onload = this.init();
  }

  init() {
    const title = window.document.title.replace("|", "-");
    const url = window.location.href;

    let facebook = document.querySelector("#facebook");
    facebook.href = `http://www.facebook.com/sharer/sharer.php?title=${title}&u=${url}`;

    let linkedin = document.querySelector("#linkedin");
    linkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

    let twitter = document.querySelector("#twitter");
    twitter.href = `https://twitter.com/share?text=${title}&url=${url}`;

    let whatsapp = document.querySelector("#whatsapp");
    whatsapp.href = `https://web.whatsapp.com/send?text=${url}`;

    let telegram = document.querySelector("#telegram");
    telegram.href = `https://web.telegram.org/#/im?tgaddr=tg://msg_url?url=${url}`

    let email = document.querySelector("#email");
    email.href = `mailto:?subject=${title}&body=${url}`

    let copy = document.querySelector("#copy");
    copy.href = `javascript: if (navigator.clipboard) { navigator.clipboard.writeText('${url}'); }`;

    let print = document.querySelector("#print");
    print.href = `javascript: if (window.print) { window.print(); }`;
  }

  content = `
    <!-- social networks share -->
    <div class="social-networks-share">
      <span>Compartir</span>
      <a id="facebook" href="" target="_blank" title="facebook"><i class="fab fa-facebook fa-1x"></i></a>
      <a id="linkedin" href="" target="_blank" title="linkedin"><i class="fab fa-linkedin fa-1x"></i></a>
      <a id="twitter" href="" target="_blank" title="twitter"><i class="fab fa-twitter fa-1x"></i></a>
      <a id="whatsapp" href="" target="_blank" title="whatsapp"><i class="fab fa-whatsapp fa-1x"></i></a>
      <a id="telegram" href="" target="_blank" title="telegram"><i class="fab fa-telegram fa-1x"></i></a>
      <a id="email" href="" target="_blank" title="email"><i class="fas fa-envelope fa-1x"></i></a>
      <a id="copy" href="" title="copiar enlace"><i class="fas fa-link fa-1x"></i></a>
      <a id="print" href="" title="imprimir" rel="nofollow"><i class="fas fa-print fa-1x"></i></a>
    </div>
  `;

  styles = `
    <style>
      /* social networks share */
      .social-networks-share {
        margin: 40px 0px 20px 20px;
        padding-right: 10px;
        text-align: right;
      }
      .social-networks-share i {
        margin: 0px 6px;
      }
      .social-networks-share span {
        font-size: 16px;
        margin: 0px 10px;
        vertical-align: middle;
      }
    </style>
  `;

  mediaqueries = ``;
}

window.customElements.define('social-networks-share', SocialNetworksShare);
