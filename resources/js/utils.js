async function loadConfig() {

  try {
    // get data
    const request = "../config.json";
    const response = await fetch(request);
    if (response.status != 200) { throwError(request, response); }

    // parse response
    const config = await response.json();
    return config;

  } catch (error) { throw error; }
}

function throwError(request, response) {
  error = Error(`Status: ${response.status}, URI: ${request}`); 
  throw error
}
