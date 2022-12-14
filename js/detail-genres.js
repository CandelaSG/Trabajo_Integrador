window.addEventListener('load', function (e) {
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");
    
    /* BUSCADOR */
    let formulario = document.querySelector("form");
    let campoAEvaluar = document.querySelector("[name='busqueda']");
    let alerta = document.querySelector(".alert");

    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        let alerta = ""
        if(campoAEvaluar.value== ""){
            alerta = alert("Hey! We still can't read minds... Please fill out the form")
        } else if( campoAEvaluar.value.length <= 3){
            alerta = alert("Please type more than 3 characters :b ");

        } else {
            this.submit();
        }
        })

    let queryString = location.search;
    let queryStringToObject = new URLSearchParams(queryString);
    let genreIdMov = queryStringToObject.get('idGeneroMov');
    /* DETAIL GENRES SERIES */
    //ENDPOINT MOVIES
    let endpointMovie = `https://api.themoviedb.org/3/discover/movie?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreIdMov}&with_watch_monetization_types=flatrate`;
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
            let largo = 0
            if (info.length > 12){
                largo = 12
            }else if (6<info.length<12){
                largo = 6
            }else {
                largo = info.length
            }
            for (let i= 0; i<largo; i++){
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
                contenedorMovie.innerHTML = contenidoMovie
            })
        
    /* DETAIL GENRES SERIES */
    //ENDPOINT SERIES
    
    let queryStringSerie = location.search;
    let queryStringToObjectS = new URLSearchParams(queryStringSerie);
    let genreIdSer = queryStringToObjectS.get('idGeneroSer');
    let endpointSeries = `https://api.themoviedb.org/3/discover/tv?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${genreIdSer}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`;
    
    
    //QUERY SELECTOR
    let contenedorSeries = document.querySelector(".genreSeries");
    let contenidoSeries = "";

    //SECCIÓN SERIES
    fetch(endpointSeries)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let infoSeries = data.results;
            let largo = 0
            if (infoSeries.length > 12){
                largo = 12
            }else if (6<infoSeries.length<12){
                largo = 6
            }else {
                largo = infoSeries.length
            }
            for (let i= 0; i<largo; i++){
                let tituloSerie = infoSeries[i].name;
                let img = `https://image.tmdb.org/t/p/original/${infoSeries[i].poster_path}`
                contenidoSeries += `<article class="pelicula">
                                    <a href="detail-series.html?id=${infoSeries[i].id}">
                                        <img class="poster posterEvento" src=${img} alt='Poster de '${tituloSerie}'>
                                    </a>
    
                                    <a class="nombre" href="detail-series.html?id=${infoSeries[i].id}">
                                    ${tituloSerie}
                                    </a>
                                </article>`;
                }
                contenedorSeries.innerHTML = contenidoSeries
        }).catch(function(e){
            console.log(e);
        })
    
    })




  
