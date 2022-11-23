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
        } else if( campoAEvaluar.value.length < 3){
            alerta = alert("Please type more than 3 characters :b ");

        } else {
            this.submit();
        }
        })
    
    /* MOVIE GENRES */
    let endpointMovie = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
    let containerMovies = document.querySelector(".containerGenresMovies");
    let contenidoMovies = '';
    fetch(endpointMovie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            /* ORGANIZO LA INFO */
            let info = data.genres;
            console.log(info)
            

            for (let i= 0; i<16; i++){
                let titulo = info[i].name;
                let id = info[i].id;   
                contenidoMovies += `<article class="genresBox">
                                <a href="./detail-genres.html?idGeneroMov=${id}">
                                    ${titulo}
                                </a>
                            </article>`;  
        }
        containerMovies.innerHTML = contenidoMovies;
        }).catch(function(e){
            console.log(e);
    })


    /* SERIE GENRES */
    let endpointSeries = `https://api.themoviedb.org/3/genre/tv/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
    let containerSeries = document.querySelector(".containerGenresSeries");
    let contenidoSeries = '';
    fetch(endpointSeries)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            let infoSeries = info.genres;
            for (let i= 0; i<16; i++){
                let tituloSerie = infoSeries[i].name;
                let idSerie = infoSeries[i].id;   
                contenidoSeries += `<article class="genresBox">
                                <a href="./detail-genres.html?idGeneroSer=${idSerie}">
                                    ${tituloSerie}
                                </a>
                            </article>`;  
        }
        containerSeries.innerHTML = contenidoSeries;
        }).catch(function(e){
            console.log(e);
    })
})  