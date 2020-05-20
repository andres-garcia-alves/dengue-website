async function buildContent() {

  stats = document.querySelector("#stats");
  map = document.querySelector("#map");

  // config json: google api-key
  let config = await loadConfig();

  // get markers
  markersData = await this.getTestData(); // ToDo: cambiar por getData()

  // render markers
  this.renderTotals(stats, markersData, config);
  this.renderJavascriptAPI(map, markersData, config);
  // this.renderEmbedAPI(map, markersData, config);
  // this.renderStaticAPI(map, markersData);
};

async function getData() {

  try {
    // get data
    let response = await fetch("/map/markers");
    if (response.status != 200) { throwError(request, response); }

    // parse response
    let markers = await response.json();
    return markers;

  } catch (error) { throw error }
}

async function getTestData() {
  markers = [
    { state: "C.A.B.A.", city: "CAECE", lat: -34.6090000, long: -58.3786700, cases: 100, intensity: 1 },
    { state: "Buenos Aires", city: "Mar del Plata", lat: -38.0063098, long: -57.5431993, cases: 10, intensity: 1 },
    { state: "Córdoba", city: "La Falda", lat: -31.0968835, long: -64.4828954, cases: 20, intensity: 1 },
    { state: "Salta", city: "Los Andes", lat: -24.2804591, long: -66.9380861, cases: 30, intensity: 1 },
    { state: "Santa Fe", city: "Rosario", lat: -32.976674, long: -60.6861702, cases: 40, intensity: 1 }
  ];

  return markers;
}

// build content
function renderTotals(div, markersData) {

  const reducer = (result, marker) => result + marker.cases;
  const total = markersData.reduce(reducer, 0);

  div.innerHTML = total;
}

let map, heatmap;

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

// build content
async function renderJavascriptAPI(div, markersData, config) {

  let request = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_API_KEY}`
  request += `&libraries=visualization&callback=initMap`;

  // create the script tag, set the appropriate attributes
  let script = document.createElement('script');
  script.src = request;
  script.defer = true;
  script.async = true;

  // append the 'script' element to 'head'
  document.head.appendChild(script);

  // attach the callback function to the 'window' object, JS API is loaded and available
  window.initMap = function() {
        
    let center = { lat: -32.7000000, lng: -66.000000 }; // Argentina center
    let bounds = { north: -18, south: -58, west: -100, east: -30 }; // Argentina bounds
    let heatmapData = [];

    // map
    let mapOptions = { 
      center: center,
      mapTypeId: 'hybrid', // 'roadmap', 'terrain', 'satellite', 'hybrid'
      restriction: { latLngBounds: bounds, strictBounds: false, },
      streetViewControl: false,
      zoom: 5
    }
    map = new google.maps.Map(div, mapOptions);

    // markers
    markersData.forEach( (item, i) => {
      const { state, city, lat, long, cases, intensity } = item;

      // marker
      let markerOptions = {
        map: map,
        position: { lat: lat, lng: long },
        title: `${city}, ${state}`
      };
      let marker = new google.maps.Marker(markerOptions);

      // info window
      var infoWindow = new google.maps.InfoWindow({
        content: `<span style='font-weight: 600;'>${city}, ${state}</span></br>Casos: ${cases}`,
        maxWidth: 200
      });     
      marker.addListener('click', () => { infoWindow.open(map, marker); });

      heatmapData.push({
        location: new google.maps.LatLng(lat, long),
        weight: cases
      });
    });
  
    // heatmap
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      map: map,
      radius: 30
    });
  }
}

// build content
/*async function renderEmbedAPI(div, markersData, config) {

  let query = `Obelisco, Buenos Aires`;

  let request = `https://www.google.com/maps/embed/v1/place`;
  request += `&key=${config.GOOGLE_API_KEY}&q=${query}`;

  let html = `<iframe width="600" height="450" frameborder="0" style="border:0" src=${request} allowfullscreen></iframe>`;
  div.innerHTML = html;
}*/

// build content
/*async function renderStaticAPI(div, markersData, config) {

  let request = `https://maps.googleapis.com/maps/api/staticmap?center=Argentina&zoom=4&size=640x640&maptype=roadmap`;
  request += `&key=${config.GOOGLE_API_KEY}`;

  markersData.forEach( (marker, i) => {
    const { state, city, lat, long, cases, intensity } = marker;
    request += `&markers=color:red%7C${lat},${long}`;
  });

  div.innerHTML = `<img src=${request}></img>`;
}*/

window.onload = buildContent;
