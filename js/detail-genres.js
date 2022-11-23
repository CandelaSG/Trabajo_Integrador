window.addEventListener('load', function (e) {
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");

    let queryString = location.search;
    let queryStringToObject = new URLSearchParams(queryString);
    let genreId = queryStringToObject.get('idGenero');

    //ENDPOINT
    let endpointMovie = `https://api.themoviedb.org/3/discover/movie?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`;
    
    //QUERY SELECTOR
    let contenedorMovie = document.querySelector(".genreMovies");
    let contenidoMovie = "";

    //SECCIÓN PELÍCULAS 
    fetch(endpointMovie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let info = data.results;
            for (let i= 0; i<6; i++){
                let titulo = info[i].title;
                let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                contenidoMovie += `<article class="pelicula">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                        <img class="poster posterEvento" src=${img} alt='Poster de '${titulo}'>
                                    </a>
    
                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                    ${titulo}
                                    </a>
                                </article>`;
                }
                contenedorMovie.innerHTML = contenidoMovie;
            
        }).catch(function(e){
            console.log(e);
        })
    
    

    //ENDPOINT
    let endpointSerie = `https://api.themoviedb.org/3/discover/tv?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    
    //QUERY SELECTOR
    let contenedorSerie = document.querySelector(".genreSeries");
    let contenidoSerie = "";

    //SECCIÓN PELÍCULAS 
    fetch(endpointSerie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let info = data.results;
            for (let i= 0; i<info.lenght; i++){
                let tituloSerie = info[i].name;
                let imgSerie = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                contenidoSerie += `<article class="pelicula">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                        <img class="poster posterEvento" src=${imgSerie} alt='Poster de '${tituloSerie}'>
                                    </a>
    
                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                    ${tituloSerie}
                                    </a>
                                </article>`;
                }
                contenedorSerie.innerHTML = contenidoSerie;
            
        }).catch(function(e){
            console.log(e);
        })

})





  
