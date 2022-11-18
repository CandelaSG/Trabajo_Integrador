//lista de favoritos
let recuperoStorage= localStorage.getItem("fav");
console.log(recuperoStorage);

let seleccionados = JSON.parse(recuperoStorage);
console.log(seleccionados);

let lista= document.querySelector (".fav");

if (seleccionados == null || seleccionados.length == 0){
    lista.innerHTML = `<p> No hay favoritos seleccionados </p>` // Agregar imagen
} else {
    for (let i= 0; i<seleccionados.length; i++){
        buscarYMostrarFavoritos(seleccionados[i])
    }
}

function buscarYMostrarFavoritos (id)
    let endpointMovie=`https://api.themoviedb.org/3/movie/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`

    fetch (endpointMovie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            let info = data.results
            let año = info[i].release_date.slice(0,4)
            let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
            lista.innerHTML += `<article class="pelicula">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                        <img class="poster" src=${img} alt='Poster de '${titulo}'>
                                    </a>

                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                    ${titulo}
                                    </a>

                                    <a class="año" href="detail-movie.html?id=${info[i].id}">
                                    ${año}
                                    </a>
                                </article>`
        })
        .catch(function(e){
            console.log(e);
        })

