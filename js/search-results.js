let query = location.search; //Obtengo la QS
let stringToObject = new URLSearchParams(query); //La trasnformo en OL
let aBuscar = stringToObject.get('q'); //Obtengo los datos de una propiedad con get()
console.log(aBuscar);


//let url = `https://rickandmortyapi.com/api/character/?name=${aBuscar}`
let endopointBuscar = `https://api.themoviedb.org/3/search/multi?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${aBuscar}&page=1&include_adult=false`

fetch(endopointBuscar)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let container = document.querySelector('.containerResults');
        let result = '';
        let info = data.results
// CAMBIAR DETAIL MOVIE Y TODOS LOS A HREF
        /* for(let i=0; i<info.length; i++){ */
            let año = info[0].release_date.slice(0,4)
            console.log(año);
            let img = `https://image.tmdb.org/t/p/original/${info[0].poster_path}`
            result += ` <article>
                        <a href="./detail-movie.html">
                        <img class="imgSearch" src="${img}"></a>
                        </article>
                        <article class="peliSearch">
                        <h3 class="tituloSearch">${info[0].title} - ${año}</h3>
                        
                        <article class="infoBox">

                        <div class="infoSearch">
                        <a href="./genres.html">
                        <h3 class="h3Search">Género <i class="fa-solid fa-masks-theater"></i></h3></a>
                        <a href="./detail-genres.html"><strong>Romance</strong></a>
                        </div>

                    <div class="infoSearch">
                        <a href="./detail-movie.html">
                        <h3 class="h3Search">Duración <i class="fa-solid fa-clock"></i></h3>
                        <p>195 min</p>
                        </a>
                    </div>

                    <div class="infoSearch">
                        <a href="./detail-movie.html">
                        <h3 class="h3Search">Calificación <i class="fa-solid fa-star"></i></h3>
                        <p> ${info[0].vote_average}/10</p>
                        </a>
                    </div>
                </article>
                <iframe class="trailerTitanic" src="${info[0].video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>            
                </iframe>
                <article class="favoritosSearch">
                <a class="botonFavorito" href="./favourite.html"> 🤍 Agregar a favoritos</a>
                </article>`
        
        container.innerHTML = result;

        
    })
        
    .catch(function(error){
        console.log(error);
    })