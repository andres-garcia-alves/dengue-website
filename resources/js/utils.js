function throwError(request, response) {
  error = Error(`Status: ${response.status}, URI: ${request}`); 
  throw error
}

async function loadConfig() {

  try {
    // get data
    let response = await fetch("/config.json");
    if (response.status != 200) { throwError(request, response); }

    // parse response
    let config = await response.json();
    return config;

  } catch (error) { throw error }
}
