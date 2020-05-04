async function buildContent() {
  content = document.querySelector("#content");

  news = await this.getData();
  content.innerHTML = this.renderData(news);
};

async function getData() {

  try {
    // arrange
    const request = "https://jsonplaceholder.typicode.com/posts";

    // get data
    response = await fetch(request);
    responseJSON = await response.json();
    responseJSON = responseJSON.slice(0, 10); // hardcoded: limit to 10 first results
    if (response.status != 200) { throwError(request, response); }

  } catch (error) { throw error }

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
  <div class="news-list news-list-even">
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
  <div class="news-list news-list-odd">
    <img src="/resources/img/news-02.jpg" alt="" />
    <div>
      <a href="/noticias/noticia.html?id=${news.id}">${news.title}</a>
      <p>${news.body}</p>
    </div>
    </br>
  </div>`
}

window.onload = buildContent;
