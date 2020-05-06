async function buildContent() {

  // build pager
  btnNext = document.querySelector("#btn-next");
  btnPrev = document.querySelector("#btn-prev");
  this.buildPager(btnNext, btnPrev);   
  
  // get & render the news
  content = document.querySelector("#content");
  news = await this.getData();
  this.renderData(content, news);

  /* scroll reveal */
  ScrollReveal().reveal('.news-item', { delay: 500 });
};

async function getData() {

  try {
    // page number
    const url = new URL(window.location.href);
    let pageNumber = parseInt(url.searchParams.get("page"));
    if (isNaN(pageNumber) || pageNumber <= 0) { pageNumber = 1 }
      
    // request
    const request = "https://jsonplaceholder.typicode.com/posts";

    // get data
    response = await fetch(request);
    if (response.status != 200) { throwError(request, response); }

    // parse response
    news = await response.json();
    news = news.slice(0, 10); // hardcoded: limit to 10 first results

  } catch (error) { throw error }

  return news;
}

// build content
function renderData(content, news) {

  html = "";
  news.forEach( (newsItem, i) => {
    newsItem.body = newsItem.body.length >= 250 ? newsItem.body.slice(1, 250) + " ..." : newsItem.body;
    html += Boolean(i % 2) ? this.renderDataOdd(newsItem) : this.renderDataEven(newsItem);
  });

  content.innerHTML = html;
}

function renderDataEven(item) {
  return `
  <div class="news-item news-item-even">
    <img src="../resources/img/news-02.jpg" alt="" />
    <a href="./noticia.html?id=${item.id}">
      <h2>${item.title}</h2>
      <p>${item.body}</p>
    </a>
  </div>`
}

function renderDataOdd(item) {
  return `
  <div class="news-item news-item-odd">
    <img src="../resources/img/news-02.jpg" alt="" />
    <a href="./noticia.html?id=${item.id}">
      <h2>${item.title}</h2>
      <p>${item.body}</p>
    </a>
  </div>`
}

function buildPager(btnNext, btnPrev) {

  const url = new URL(window.location.href);
  let pageNumber = parseInt(url.searchParams.get("page"));

  if (isNaN(pageNumber) || pageNumber <= 0) { pageNumber = 1 }
  if (pageNumber <= 1) { btnPrev.style.display = "none"; }

  btnPrev.href = `noticias.html?page=${pageNumber - 1}`
  btnNext.href = `noticias.html?page=${pageNumber + 1}`  
}

window.onload = buildContent;
