function throwError(request, response) {
  error = Error(`Status: ${response.status}, URI: ${request}`); 
  throw error
}