window.addEventListener('load', function (e) {
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");
let queryString = location.search; //Obtengo la QS
let queryStringToObject = new URLSearchParams(queryString); //La trasnformo en OL
let movieId = queryStringToObject.get('id');

/* LISTA DE FAVORITOS */
/* PELICULAS */
let recuperoStorage= localStorage.getItem("favoritos");

//console.log(recuperoStorage);

let seleccionados = JSON.parse(recuperoStorage);
console.log(seleccionados);


let seccionFav = document.querySelector (".favoritos");


if (seleccionados == null || seleccionados.length == 0){
    seccionFav.innerHTML = `<p> No hay favoritos seleccionados </p>` // Agregar imagen
} else {
    for (let i= 0; i<seleccionados.length; i++){
         buscarYMostrarFavoritospeli(seleccionados[i])
    }
}

function buscarYMostrarFavoritospeli (movieId){
let endpointMovie=`https://api.themoviedb.org/3/movie/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`
console.log(endpointMovie)
fetch (endpointMovie)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let año = data.release_date.slice(0,4)
        let img = `https://image.tmdb.org/t/p/original/${data.poster_path}`
        seccionFav.innerHTML += `<article class="pelicula peliFav">
                                <a href="detail-movie.html?id=${data.id}">
                                    <img class="poster" src=${img} alt='Poster de '${data.title}'>
                                </a>

                                <a class="nombre" href="detail-movie.html?id=${data.id}">
                                ${data.title}
                                </a>

                                <a class="año" href="detail-movie.html?id=${data.id}">
                                ${año}
                                </a>
                            </article>`
    })
    .catch(function(e){
        console.log(e);
    })
}


/* SERIES */
let recuperoS= localStorage.getItem("favoritosSeries");
//console.log(recuperoStorage);

let seleccionadosSeries = JSON.parse(recuperoS);
//console.log(seleccionados);

let seccionFavSeries = document.querySelector (".favSeries");


if (seleccionadosSeries == null || seleccionadosSeries.length == 0){
seccionFavSeries.innerHTML = `<p> No hay favoritos seleccionados </p>` // Agregar imagen
} else {
for (let i= 0; i<seleccionadosSeries.length; i++){
    buscarYMostrarFavoritos(seleccionadosSeries[i])
}
}

function buscarYMostrarFavoritos (movieId){
let endpointSerie=`https://api.themoviedb.org/3/tv/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`

fetch (endpointSerie)
    .then(function(response){
        return response.json();
    })
    .then(function(info){
        console.log(info);
        let año = info.first_air_date.slice(0,4)
        let img = `https://image.tmdb.org/t/p/original/${info.poster_path}`
        seccionFavSeries.innerHTML += `<article class="pelicula peliFav">
                                <a href="detail-series.html?id=${info.id}">
                                    <img class="poster" src=${img} alt='Poster de '${info.name}'>
                                </a>

                                <a class="nombre" href="detail-series.html?id=${info.id}">
                                ${info.name}
                                </a>

                                <a class="año" href="detail-series.html?id=${info.id}">
                                ${año}
                                </a>
                            </article>`
    })
    .catch(function(e){
        console.log(e);
    })
}

})