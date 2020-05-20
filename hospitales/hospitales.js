let origMap

async function buildContent() {

  map = document.querySelector("#map");
  let config = await loadConfig();
  await this.getTestStates() // Cambiar por getStates()
  this.renderJavascriptAPI(map, config);
};

async function getHospitals(locationId) {

  try {
    // get data
    let response = await fetch(`/hospital/hospitals/${parseInt(locationId)}`);
    if (response.status != 200) { throwError(request, response); }

    // parse response
    let hospitals = await response.json();
    return hospitals;

  } catch (error) { throw error }
}

function getTestHospitals(locationId) {
  hospitals = [
    { name: "Hospital Posadas", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -34.6090000, longitude: -58.3786700 },
    { name: "Hospital Mitre", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -36.0063098, longitude: -59.5431993 },
    { name: "Hospital Guemes", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -38.0063098, longitude: -57.5431993 },
    { name: "Los Arcos", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -37.0063098, longitude: -58.5431993 },
    { name: "Hospital Britanico", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -31.0968835, longitude: -64.4828954 },
    { name: "La trinidad", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -24.2804591, longitude: -66.9380861 },
    { name: "Hospital San Martin", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9766743, longitude: -60.6865702 },
    { name: "Hospital Favaloro", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9736747, longitude: -60.6861702 },
    { name: "Hospital Fitz Roy", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9766741, longitude: -60.6831502 },
    { name: "Hospital Italiano", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9746746, longitude: -60.6871302 },
    { name: "Hospital Rauch", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9756748, longitude: -60.6851202 },
    { name: "Clinica San Pedro", address: "Carlos Gardel 1209", telephones: 1159823231, notes: "", latitude: -32.9776741, longitude: -60.6821102 }
  ];

  return hospitals;
}

async function getStates() {

  try {
    // get data
    let response = await fetch("/hospital/states");
    if (response.status != 200) { throwError(request, response); }

    // parse response
    let states = await response.json();
    states.map(state => {
      var option = document.createElement("option")
      option.value = state.stateId.toString()
      option.appendChild(document.createTextNode(state.stateDesc))
      document.getElementById("stateSelect").appendChild(option)
    })

  } catch (error) { throw error }
}

async function getTestStates() {
  states = [
    { stateId: 1, stateDesc: "Buenos Aires" },
    { stateId: 2, stateDesc: "Capital Federal" },
    { stateId: 3, stateDesc: "Catamarca" },
    { stateId: 4, stateDesc: "Chaco" },
    { stateId: 5, stateDesc: "Chubut" },
    { stateId: 6, stateDesc: "Córdoba" },
    { stateId: 7, stateDesc: "Corrientes" },
    { stateId: 8, stateDesc: "Entre Ríos" },
    { stateId: 9, stateDesc: "Formosa" },
    { stateId: 10, stateDesc: "Jujuy" },
  ];

  states.map(state => {
    var option = document.createElement("option")
    option.value = state.stateId.toString()
    option.appendChild(document.createTextNode(state.stateDesc))
    document.getElementById("stateSelect").appendChild(option)
  })
}

async function getLocations(stateId) {

  try {
    // get data
    let response = await fetch(`/hospital/locations/${parseInt(stateId)}`);
    if (response.status != 200) { throwError(request, response); }

    // parse response
    let locations = await response.json();
    return locations;

  } catch (error) { throw error }
}

function getTestLocations(stateId) {
  locations = [
    { locationId: 1, locationDesc: "Hurlingham" },
    { locationId: 2, locationDesc: "El Palomar" },
    { locationId: 3, locationDesc: "Palermo" },
    { locationId: 4, locationDesc: "Avellaneda" },
    { locationId: 5, locationDesc: "San Fernando" },
    { locationId: 6, locationDesc: "Caseros" },
    { locationId: 7, locationDesc: "Chacarita" },
    { locationId: 8, locationDesc: "San Miguel" },
    { locationId: 9, locationDesc: "Monserrat" },
  ];

  return locations;
}

async function renderJavascriptAPI(div, config) {

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
  window.initMap = function () {

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
    origMap = new google.maps.Map(div, mapOptions);

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

function selectState(state) {

  var selectedValue = state.value
  createLocationSelect(selectedValue)

}

function createLocationSelect(state) {
  
  let locations = this.getTestLocations(state); // Cambiar por getLocations
  var locationSelect = document.createElement("select")
  locationSelect.id = "locationSelect"
  locationSelect.classList.add("selectLocation")
  locationSelect.classList.add("fade-in")
  locationSelect.setAttribute("onchange", "selectLocation(this)")

  var defaultOption = document.createElement("option")
  defaultOption.value = ''
  defaultOption.disabled = true
  defaultOption.hidden = true
  defaultOption.selected = true
  defaultOption.appendChild(document.createTextNode("Seleccione su localidad"))
  locationSelect.appendChild(defaultOption)

  locations.map(location => {
    var option = document.createElement("option")
    option.value = location.locationId.toString()
    option.appendChild(document.createTextNode(location.locationDesc))
    locationSelect.appendChild(option)
  })

  var listResults = document.createElement("div")
  listResults.id = "listResults"

  document.getElementById("results").innerHTML = ""
  document.getElementById("results").appendChild(locationSelect)
  document.getElementById("results").appendChild(listResults)
}

function selectLocation(location) {

  let hospitals = this.getTestHospitals(location); // Cambiar por getHospitals

  var totalHospitals = document.createElement("span")
  totalHospitals.classList.add("totalHospitals")
  var hospitalList = document.createElement("ul")
  hospitalList.classList.add("hospitalList")
  var total = 0
  
  origMap.setZoom(hospitals.length > 1 ? 10 : 16)
  origMap.panTo({lat: hospitals[0].latitude, lng: hospitals[0].longitude})
  
  hospitals.map(hospital => {

    var element = document.createElement("li")
    element.id = hospital.name + " listElement"
    element.classList.add("listElement")
    element.tabIndex = 0
    element.addEventListener("click", () => {
      origMap.setZoom(16)
      markers = Object.values(origMap.__gm.Ka.j)
      marker = markers.find(marker => (marker.title && element.id.includes(marker.title)))
      origMap.panTo(marker.getPosition())
      
    })
    
    var hospName = document.createElement("p")
    hospName.appendChild(document.createTextNode(hospital.name))
    hospName.classList.add("hospitalName")
    element.appendChild(hospName)

    var hospAddress = document.createElement("p")
    hospAddress.appendChild(document.createTextNode(hospital.address))
    hospAddress.classList.add("hospitalAddress")
    element.appendChild(hospAddress)

    hospitalList.appendChild(element)
    total++
    
    let markerOptions = {
      map: origMap,
      position: { lat: hospital.latitude, lng: hospital.longitude },
      title: `${hospital.name}`
    };
    let marker = new google.maps.Marker(markerOptions);

    marker.addListener('click', function() {
      origMap.setZoom(16);
      origMap.panTo(marker.getPosition());
      document.getElementById(marker.title + " listElement").focus()
    });
  })
  totalHospitals.appendChild(document.createTextNode(total + " hospitales"))
  document.getElementById("listResults").innerHTML = ""
  document.getElementById("listResults").appendChild(totalHospitals)
  document.getElementById("listResults").appendChild(hospitalList)

  

}

window.onload = buildContent;