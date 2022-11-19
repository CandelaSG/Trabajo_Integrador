//lista de favoritos
let recuperoStorage= localStorage.getItem("favoritos");
//console.log(recuperoStorage);

let seleccionados = JSON.parse(recuperoStorage);
//console.log(seleccionados);

let seccionFav = document.querySelector (".favoritos");


if (seleccionados == null || seleccionados.length == 0){
    seccionFav.innerHTML = `<p> No hay favoritos seleccionados </p>` // Agregar imagen
} else {
    for (let i= 0; i<seleccionados.length; i++){
        buscarYMostrarFavoritos(seleccionados[i])
    }
}


function buscarYMostrarFavoritos (movieId){
    let endpointMovie=`https://api.themoviedb.org/3/movie/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`

    fetch (endpointMovie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let año = data.release_date.slice(0,4)
            let img = `https://image.tmdb.org/t/p/original/${data.poster_path}`
            seccionFav.innerHTML += `<article class="pelicula">
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
