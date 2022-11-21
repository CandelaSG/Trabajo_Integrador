let queryString = location.search; //Obtengo la QS
let queryStringToObject = new URLSearchParams(queryString); //La trasnformo en OL
let movieId = queryStringToObject.get('id');
console.log(movieId);





















    
