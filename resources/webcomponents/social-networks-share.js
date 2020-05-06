class SocialNetworksShare extends HTMLElement {

  constructor() {
    super();
    this.innerHTML = this.content + this.styles + this.mediaqueries;
    this.onload = this.init();
  }

  init() {
    const title = window.document.title.replace("|", "-");
    const url = window.location.href;

    facebook = document.querySelector("#facebook");
    facebook.href = `http://www.facebook.com/sharer/sharer.php?title=${title}&u=${url}`;

    linkedin = document.querySelector("#linkedin");
    linkedin.href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

    twitter = document.querySelector("#twitter");
    twitter.href = `https://twitter.com/share?text=${title}&url=${url}`;

    whatsapp = document.querySelector("#whatsapp");
    whatsapp.href = `https://web.whatsapp.com/send?text=${url}`;
  }

  content = `
    <!-- social networks share -->
    <div class="social-networks-share">
      <span>Compartir</span>
      <a id="facebook" href=""><i class="fab fa-facebook fa-1x"></i></a>
      <a id="linkedin" href=""><i class="fab fa-linkedin fa-1x"></i></a>
      <a id="twitter" href=""><i class="fab fa-twitter fa-1x"></i></a>
      <a id="whatsapp" href=""><i class="fab fa-whatsapp fa-1x"></i></a>
      <a rel="nofollow" href="javascript:if(window.print)window.print()"><i class="fas fa-print fa-1x"></i></a>
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
