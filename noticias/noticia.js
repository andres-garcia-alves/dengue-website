async function buildContent() {
  content = document.querySelector("#content");

  news = await this.getData();
  content.innerHTML = this.renderData(news);
};

async function getData() {

  // extract news id
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  
  // get data
  response = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  responseJSON = await response.json();

  return responseJSON;
}

// build content
function renderData(news) {
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

window.onload = buildContent;