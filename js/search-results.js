window.addEventListener('load', function (e) {    
    /* QUERY STRING */
    let query = location.search; //Obtengo la QS
    let stringToObject = new URLSearchParams(query); //La trasnformo en OL
    let aBuscar = stringToObject.get('busqueda'); //Obtengo los datos de una propiedad con get() 
    console.log(aBuscar);
    

    /* QUERY SELECTOR HTML */
    //P 
    let pBusqueda = document.querySelector('.resultText');
    let textoBusqueda = '';
    // CONTAINER
    let containerResult = document.querySelector('.containerResults');
    let result = '';
    
    
    //FORMULARIO
    let buscador= document.querySelector(".buscar");
    let formulario = document.querySelector("form");
    let campoAEvaluar = document.querySelector("[name='busqueda']");
    let alerta = document.querySelector(".alert");

    formulario.addEventListener('submit', function(e){
        e.preventDefault();
        if(campoAEvaluar.value== "" /*|| campoAEvaluar.value== "null"*/){
            alerta.innerHTML = "Hey! I still can't read minds... Please fill out the form"
            //ver cómo hacer para que no aparezca muchas veces
        } else if( campoAEvaluar.value.length < 3){
            alerta.innerHTML = "Please type more than 3 characters :b ";

        } else {
            this.submit();
        }
        })
        
    //limpiar el mensaje de error cuando el usario modifique el contenido del campo input.
    campoAEvaluar.addEventListener('input', function(e){
            alerta.innerText = ''
        })
    

    /* RESULTADO BÚSQUEDA */
    textoBusqueda= `<p class="resultText"> Tu búsqueda fue: "${aBuscar}"</p>`;
    pBusqueda.innerHTML += textoBusqueda;
    

    /* URL */
    let endopointBuscar = `https://api.themoviedb.org/3/search/multi?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${aBuscar}&page=1&include_adult=false`;
    fetch(endopointBuscar)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            /* DATOS PARA PRINT TRAILER */
            let info = data.results;
            let año = info[0].release_date.slice(0,4);
            let img = `https://image.tmdb.org/t/p/original/${info[0].poster_path}`;
            let id = info[0].id;
            /* URL */
            let endpointTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
            
            fetch(endpointTrailer)
                .then(function(response){
                    return response.json();
                })
                .then(function(infoTrailer){
                    infoTrailer = infoTrailer.results;
                    let video = infoTrailer[0].key;            
                    for(let i=0; i<infoTrailer.length; i++){ 
                        let pregunta = infoTrailer[i].name;
                        if (pregunta.includes("Trailer")||pregunta.includes("trailer")){
                            video = infoTrailer[i].key;
                        } else {
                            video = video;
                        }};

        // cambiar la ruta de los a href
                    result += ` <article>
                                <a href="./detail-movie.html">
                                <img class="imgSearch" src="${img}">
                                </a>
                            </article>

                            <article class="peliSearch">
                                <h3 class="tituloSearch">${info[0].title} - ${año}</h3>
                            
                                <article class="infoBox">

                                <div class="infoSearch">
                                    <a href="./genres.html">
                                    <h3 class="h3Search">GENRE</h3></a>
                                    <a href="./detail-genres.html"><strong>Romance</strong></a>
                                </div>

                                <div class="infoSearch">
                                    <a href="./detail-movie.html">
                                    <h3 class="h3Search">RUNNING TIME</h3>
                                    <p>195 min</p>
                                    </a>
                                </div>

                                <div class="infoSearch">
                                    <a href="./detail-movie.html">
                                    <h3 class="h3Search">QUALIFICATION</i></h3>
                                    <p> ${info[0].vote_average}/10</p>
                                    </a>
                                </div>
                            </article>

                            <iframe class="trailerSearch" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                        
                    containerResult.innerHTML += result;

                }).catch (function(e){
                    console.log(e);}) 
        }).catch (function(e){
            console.log(e);})
})