function throwError(request, response) {

  error = Error(`Status: ${response.status}, URI: ${request}`);
  // console.log(error);
  
  throw error
}