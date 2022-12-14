/*api_key= a3c55e0abc72e6abaa573f83ee40635f*/
/*MOVIE POPULAR*/
window.addEventListener('load', function (e){
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
    // ENDPOINT
    let endpointpp = `https://api.themoviedb.org/3/movie/popular?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&page=1`
    fetch(endpointpp)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let container = document.querySelector(".peliculasPopulares");
            let ppopulares = '';
            let info = data.results
            
            for (let i= 0; i<6; i++){
                let titulo = info[i].title
                let año = info[i].release_date.slice(0,4)
                let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                ppopulares += `<article class="pelicula">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                        <img class="poster posterEvento" src=${img} alt='Poster de '${titulo}'>
                                    </a>

                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                    ${titulo}
                                    </a>

                                    <a class="año" href="detail-movie.html?id=${info[i].id}">
                                    ${año}
                                    </a>
                                </article>`;
                }
                container.innerHTML = ppopulares;
            })

        .catch(function(error){
            console.log(error);
        })


    /*SERIES POPULAR*/
    // ENDPOINT
    let endpointsp = `https://api.themoviedb.org/3/tv/popular?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&page=1`
    fetch(endpointsp)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let container = document.querySelector(".seriesPopulares");
            let spopulares = '';
            let info = data.results
            
            for (let i= 0; i<6; i++){
                let titulo = info[i].name
                let año = info[i].first_air_date.slice(0,4)
                let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                spopulares += `<article class="pelicula">
                                    <a href="detail-series.html?id=${info[i].id}">
                                    <img class="poster posterEvento" src=${img} alt='Poster de '${titulo}'> </a>
                                    <a class="nombre" href="detail-series.html?id=${info[i].id}">${titulo}</a>
                                    <a class="año" href="detail-series.html?id=${info[i].id}">${año}</a>
                                </article>`
                }
                container.innerHTML = spopulares;
            })

        .catch(function(error){
            console.log(error);
        })


    /*PELÍCULAS MÁS VALORADAS*/
    // ENDPOINT
    let endpointpv = `https://api.themoviedb.org/3/movie/top_rated?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&page=1`
    fetch(endpointpv)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let container = document.querySelector(".peliculasValoradas");
            let pValoradas = '';
            let info = data.results
            
            for (let i= 0; i<6; i++){
                let titulo = info[i].title
                let año = info[i].release_date.slice(0,4)
                let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                pValoradas += `<article class="pelicula">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                    <img class="poster posterEvento" src=${img} alt='Poster de '${titulo}'/> </a>
                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">${titulo}</a>
                                    <a class="año" href="detail-movie.html?id=${info[i].id}">${año}</a>
                                </article>`
                }
                container.innerHTML = pValoradas;
            })

        .catch(function(error){
            console.log(error);
        })

})


