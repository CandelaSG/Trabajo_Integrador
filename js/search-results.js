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
        
    campoAEvaluar.addEventListener('input', function(e){
            alerta.innerText = ''
        })

    /* QUERY STRING */
    let query = location.search; 
    let stringToObject = new URLSearchParams(query); 
    let aBuscar = stringToObject.get('busqueda');
    

    /* QUERY SELECTOR HTML */
    //P 
    let pBusqueda = document.querySelector('.resultText');
    let textoBusqueda = '';
    textoBusqueda= `Tu búsqueda fue: "${aBuscar}"`;
    pBusqueda.innerText += textoBusqueda;
    

    /* SEARCH MOVIES */

    // URL
    let endopointBuscarMovie = `https://api.themoviedb.org/3/search/movie?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${aBuscar}&page=1&include_adult=false`;
     // CONTAINER
    let resultMovies = document.querySelector('.resultMovies');
    let result = '';
    fetch(endopointBuscarMovie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if (data.results.length !== 0){
                for (let i= 0; i<12; i++){
                    let info = data.results;
                    let titulo = info[i].title;
                    let img = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`
                    result += ` <article class="peliculaSearch">
                                    <a href="detail-movie.html?id=${info[i].id}">
                                        <img class="poster posterEvento" src=${img} alt='Poster de '${titulo}'>
                                    </a>

                                    <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                    ${titulo}
                                    </a>
                                </article>`;
                        }
                        resultMovies.innerHTML = result;
            }else{
                resultMovies.innerHTML =  `<img class="errorSearch" src="./img/errores/errorSearch.png">`;
                }
            
        }).catch (function(e){
            console.log(e);})


    /* SEARCH SERIES */

    // URL
    let endopointBuscarSerie = `https://api.themoviedb.org/3/search/tv?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&page=1&query=${aBuscar}&include_adult=false`;
    
    // CONTAINER
    let resultSeries = document.querySelector('.resultSeries');
    let resultSer = '';
    fetch(endopointBuscarSerie)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            if (info.results.length !== 0){
                for (let i= 0; i<12; i++){
                    let dataSerie = info.results;
                    let tituloSerie = dataSerie[i].name;
                    let img = `https://image.tmdb.org/t/p/original/${dataSerie[i].poster_path}`;
                    resultSer += ` <article class="peliculaSearch">
                                    <a href="detail-series.html?id=${dataSerie[i].id}">
                                        <img class="poster posterEvento" src=${img} alt='Poster de '${tituloSerie}'>
                                    </a>

                                    <a class="nombre" href="detail-series.html?id=${dataSerie[i].id}">
                                    ${tituloSerie}
                                    </a>
                                </article>`;
                        }
                    resultSeries.innerHTML = resultSer;
            }else{
                resultSeries.innerHTML =  `<img class="errorSearch" src="./img/errores/errorSearch.png">`;
                }
            
        }).catch (function(e){
            console.log(e);})
    
    /* FAVORITOS */
    
    //MOVIES

    //CAPTURO DATOS DEL LOCAL STORAGE
    let favoritos = [];
    let recuperoStorage = localStorage.getItem("favoritos");
    //TRANSFORMO DATOS DEL LOCAL STORAGE PARA MANIPULARLOS EN JS
    if (recuperoStorage != null){
        favoritos= JSON.parse(recuperoStorage);
        //console.log(favoritos);
        }

    //CAPTURO BOTON FAVORITOS
    let link= document.querySelector(".clave");

    //EVENTO BOTON FAVORITOS
    link.addEventListener("click", function(e){
        e.preventDefault();
        if (favoritos.includes(movieId)){
            let indice= favoritos.indexOf(movieId);
            favoritos.splice(indice, 1);
            link.innerText= "🤍 Favorites";
            link.style.color = "white";
        } else {
            favoritos.push(movieId);
            link.innerText= "❌ Favorites";
            link.style.color = "red";
        }
    })
        
    //VUELVO A CARGAR LOS DATOS AL LOCAL STORAGE
    let moviesFavToString = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", moviesFavToString);
    
    //SERIES

    //CAPTURO DATOS DEL LOCAL STORAGE     
    let favoritosSeries = [];
    let recuperoStorageSerie = localStorage.getItem("favoritosSeries");

    //TRANSFORMO DATOS DEL LOCAL STORAGE PARA MANIPULARLOS EN JS
    if (recuperoStorageSerie != null){
        favoritosSeries= JSON.parse(recuperoStorageSerie);
        //console.log(favoritos);
    }

    //CAPTURO BOTON FAVORITOS
    let linkSerie= document.querySelector(".clave");

    //EVENTO BOTON FAVORITOS
    linkSerie.addEventListener("click", function(e){
        e.preventDefault();
        if (favoritosSeries.includes(serieId)){
            let indice = favoritosSeries.indexOf(serieId);
            favoritosSeries.splice(indice, 1);
            linkSerie.innerText= "🤍 Favorites";
            linkSerie.style.color = "white";
        } else {
            favoritosSeries.push(serieId);
            //console.log(favoritos)
            linkSerie.innerText= "❌ Favorites";
            linkSerie.style.color = "red";

        }
        
        //VUELVO A CARGAR LOS DATOS AL LOCAL STORAGE
        let SeriesFavToString = JSON.stringify(favoritosSeries);
        localStorage.setItem("favoritosSeries", SeriesFavToString);
        //console.log(localStorage);
        })


})