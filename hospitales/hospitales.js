let markersData 

async function buildContent() {

  map = document.querySelector("#map");
  let config = await loadConfig();
  markersData = await this.getTestData(); // ToDo: cambiar por getData()
  this.renderJavascriptAPI(map, markersData, config);
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
    { state: "Capital Federal", city: "CAECE", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -34.6090000, long: -58.3786700},
    { state: "Buenos Aires", city: "Mar del Plata", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -36.0063098, long: -59.5431993},
    { state: "Buenos Aires", city: "Mar del Plata", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -38.0063098, long: -57.5431993},
    { state: "Buenos Aires", city: "Mar del Plata", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -37.0063098, long: -58.5431993},
    { state: "Córdoba", city: "La Falda", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -31.0968835, long: -64.4828954},
    { state: "Salta", city: "Los Andes", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -24.2804591, long: -66.9380861},
    { state: "Santa Fe", city: "Rosario", name: "Hospital Posadas", address: "Carlos Gardel 1209", lat: -32.976674, long: -60.6861702}
  ];

  return markers;
}

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

    // map
    let mapOptions = { 
      center: center,
      mapTypeId: 'roadmap', // 'roadmap', 'terrain', 'satellite', 'hybrid'
      restriction: { latLngBounds: bounds, strictBounds: false, },
      streetViewControl: false,
      zoom: 4
    }
    map = new google.maps.Map(div, mapOptions);
    
    /* markersData.forEach( (item, i) => {
      const { state, city, lat, long, cases, intensity } = item;

      // marker
      let markerOptions = {
        map: map,
        position: { lat: lat, lng: long },
        title: `${city}, ${state}`
      };
      let marker = new google.maps.Marker(markerOptions);

      marker.addListener('click', () => {});
    }); */
  }
}

function selectProvince() {

  var listResults = document.createElement("div")
  listResults.classList.add("listResults")
  var totalHospitals = document.createElement("span")
  totalHospitals.classList.add("totalHospitals")
  var hospitalList = document.createElement("ul")
  hospitalList.classList.add("hospitalList")
  var total = 0
  var selectedValue = document.getElementById("provinceSelect").options[document.getElementById("provinceSelect").selectedIndex].text
  //hospitals = markersData.filter(hospital => hospital.state === selectedValue)
  markersData.map(hospital => {
    if (hospital.state === selectedValue) {
      var element = document.createElement("li")
      element.classList.add("listElement")
      
      var hospName = document.createElement("p")
      hospName.appendChild(document.createTextNode(hospital.name))
      hospName.classList.add("hospitalName")
      element.appendChild(hospName)

      var hospAddress = document.createElement("p")
      hospAddress.appendChild(document.createTextNode(hospital.address))
      hospName.classList.add("hospitalAddress")
      element.appendChild(hospAddress)

      hospitalList.appendChild(element)
      total++
    }
  })
  totalHospitals.appendChild(document.createTextNode(total + " hospitales"))
  listResults.appendChild(totalHospitals)
  listResults.appendChild(hospitalList)
  document.getElementById("results").innerHTML = ""
  document.getElementById("results").appendChild(listResults) 
}

window.onload = buildContent;