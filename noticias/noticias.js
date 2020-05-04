async function buildContent() {
  content = document.querySelector("#content");

  news = await this.getData();
  content.innerHTML = this.renderData(news);
};

async function getData() {
  // get data
  response = await fetch("https://jsonplaceholder.typicode.com/posts");
  responseJSON = await response.json();

  // limit to 10 first results (hardcoded)
  responseJSON = responseJSON.slice(0, 10);
  return responseJSON;
}

// build content
function renderData() {
  html = "";
  responseJSON.forEach( (news, i) => {
    news.body = news.body.length >= 250 ? news.body.slice(1, 250) + " ..." : news.body;
    html += Boolean(i % 2) ? this.renderDataOdd(news) : this.renderDataEven(news);
  });
  return html;
}

function renderDataEven(news) {
  return `
  <div class="noticias-cards noticias-cards-par">
    <img src="/resources/img/news-02.jpg" alt="" />
    <div>
      <a href="/noticias/noticia.html?id=${news.id}">${news.title}</a>
      <p>${news.body}</p>
    </div>
    </br>
  </div>`
}

function renderDataOdd(news) {
  return `
  <div class="noticias-cards noticias-cards-impar">
    <div>
      <a href="/noticias/noticia.html?id=${news.id}">${news.title}</a>
      <p>${news.body}</p>
    </div>
    <img src="/resources/img/news-02.jpg" alt="" />
    </br>
  </div>`
}

window.onload = buildContent;
