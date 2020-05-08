async function buildContent() {

  // get & render the news
  stats = document.querySelector("#stats");
  map = document.querySelector("#map");
  markers = await this.getTestData();

  this.renderTotals(stats, markers)
  this.renderMap(map, markers);
};

async function getData() {

  try {
    // request
    const request = "/map/markers";

    // get data
    response = await fetch(request);
    if (response.status != 200) { throwError(request, response); }

    // parse response
    markers = await response.json();
  } catch (error) { throw error }

  return markers;
}

async function getTestData() {
  markers = [
    { state: "Buenos Aires", city: "Mar del Plata", cases: 10, intensity: 1 },
    { state: "Córdoba", city: "La Falda", cases: 20, intensity: 2 },
    { state: "Salta", city: "Los Andes", cases: 30, intensity: 3 },
    { state: "Santa Fe", city: "Rosario", cases: 40, intensity: 4 }
  ];

  return markers;
}

// build content
function renderTotals(content, markers) {

  const reducer = (result, marker) => result + marker.cases;
  const total = markers.reduce(reducer, 0);

  content.innerHTML = total;
}

// build content
function renderMap(content, markers) {

  html = "";
  markers.forEach( (marker, i) => {
    const { state, city, cases, intensity } = marker;
    // console.log(state, city, cases, intensity);
    // html += Boolean(i % 2) ? this.renderDataOdd(newsItem) : this.renderDataEven(newsItem);
  });

  content.innerHTML = html;
}

window.onload = buildContent;
