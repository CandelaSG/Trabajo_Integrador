let query = location.search; //Obtengo la QS
let stringToObject = new URLSearchParams(query); //La trasnformo en OL
let aBuscar = stringToObject.get('q'); //Obtengo los datos de una propiedad con get() 
console.log(aBuscar);

