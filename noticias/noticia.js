async function buildContent() {
  content = document.querySelector("#content");

  news = await this.getData();
  content.innerHTML = this.renderData(news);
};

async function getData() {

  try {
    // arrange
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const request = "https://jsonplaceholder.typicode.com/posts/" + id;

    // get data
    response = await fetch(request);
    responseJSON = await response.json();
    if (response.status != 200) { throwError(request, response); }

  } catch (error) { throw error }

  return responseJSON;
}

// build content
function renderData(news) {
  return `
  <div class="news-detail">
    <!-- heading -->
    <h1>${news.title}</h1>

    <!-- showcase -->
    <img src="../resources/img/news-02.jpg" alt="" />

    <!-- content -->
    <p>${news.body}</p>
  </div>`
}

window.onload = buildContent;