let query = location.search; //Obtengo la QS
let stringToObject = new URLSearchParams(query); //La trasnformo en OL
let aBuscar = stringToObject.get('q'); //Obtengo los datos de una propiedad con get() 
console.log(aBuscar);

let endopointBuscar = `https://api.themoviedb.org/3/search/multi?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${aBuscar}&page=1&include_adult=false`;

fetch(endopointBuscar)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let pBusqueda = document.querySelector('.resultText')
        let textoBusqueda = ''
        let containerResult = document.querySelector('.containerResults');
        let result = '';
        
        let info = data.results;
        /* for(let i=0; i<info.length; i++){
            if (!(aBuscar in info.title)){
                result += ` <article>
                <p>No hay resultado para su búsqueda, pi, pi, pi</p>
                    </article>`
                containerResult.innerHTML = result; */
        
        

// CAMBIAR DETAIL MOVIE Y TODOS LOS A HREF
  
        let año = info[0].release_date.slice(0,4)
        console.log(año);
        let img = `https://image.tmdb.org/t/p/original/${info[0].poster_path}`
        let id = info[0].id
        let endpointTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`
        
    fetch(endpointTrailer)
        .then(function(response){
            return response.json();
        })
        .then(function(infoTrailer){
            let video = infoTrailer.results[0].key
            console.log(infoTrailer);
            for(let i=0; i<infoTrailer.results.length; i++){ 
                let pregunta = infoTrailer.results[i].name
                if (pregunta.includes("Trailer")||pregunta.includes("trailer")){
                    video = infoTrailer.results[i].key
                }
                }

        textoBusqueda+= `<p class="resultText"> Tu búsqueda fue: "${aBuscar}"</p>`
        pBusqueda.innerHTML = textoBusqueda
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
                            <h3 class="h3Search">GÉNERO <i class="fa-solid fa-masks-theater"></i></h3></a>
                            <a href="./detail-genres.html"><strong>Romance</strong></a>
                        </div>

                        <div class="infoSearch">
                            <a href="./detail-movie.html">
                            <h3 class="h3Search">DURACIÓN <i class="fa-solid fa-clock"></i></h3>
                            <p>195 min</p>
                            </a>
                        </div>

                        <div class="infoSearch">
                            <a href="./detail-movie.html">
                            <h3 class="h3Search">CALIFICACIÓN <i class="fa-solid fa-star"></i></h3>
                            <p> ${info[0].vote_average}/10</p>
                            </a>
                        </div>
                    </article>

                    <iframe class="trailerSearch" src="https://www.youtube.com/embed/${video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    <article class="favoritosSearch">
                    <a class="botonFavorito" href="./favourite.html"> 🤍 Agregar a favoritos</a>
                    </article>`
    
        containerResult.innerHTML = result;

        })
        .catch(function(error){
            console.log(error);
        })
    })
        
    .catch(function(error){
        console.log(error);
    })