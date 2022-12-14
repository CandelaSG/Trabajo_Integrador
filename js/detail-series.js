window.addEventListener('load', function (e) {
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");
    
    /* BUSCADOR */
    let formulario = document.querySelector("form");
    let campoAEvaluar = document.querySelector("[name='busqueda']");

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
    let serieId = queryStringToObject.get('id');

    // ENDPOINT SERIE
    let endpointSerie=`https://api.themoviedb.org/3/tv/${serieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;

    fetch(endpointSerie)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //TÍTULO DE BÚSQUEDA
            let titulo = document.querySelector('.detailSeries');
            let tituloSerie = '';
            tituloSerie += `${data.name}`;
            titulo.innerHTML=tituloSerie;
            
            //SECCION SERIES
            let section = document.querySelector('.infoSeries');
            let textoSerie = '';

            //TRAILER
            let endpointTrailer = `https://api.themoviedb.org/3/tv/${serieId}/videos?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;

            fetch(endpointTrailer)
                .then(function(response){
                    return response.json();
                })
                .then(function(dataTrailer){
                    infoTrailer = dataTrailer.results;
                    if (!infoTrailer.includes("key")){
                        console.log("No hay trailer");
                    }
                    let videoSerie = infoTrailer[0].key;
                    //SOURCE CUANDO HAY UN TRAILER EFECTIVAMENTE
                    for(let i=0; i<infoTrailer.length; i++){ 
                        let pregunta = infoTrailer[i].name;
                        if (pregunta.includes("Trailer")||pregunta.includes("trailer")||pregunta.includes("teaser")||pregunta.includes("Teaser")){
                            videoSerie = infoTrailer[i].key;
                            break
                        }};
                    
                    //POSTER
                    let img = ''
                        if (data.poster_path != null){
                            img += `https://image.tmdb.org/t/p/original/${data.poster_path}`;    
                        } else{
                            img += "./img/errores/errorPoster.png"; 
                        }
                    //DATOS SERIE
                    let date = data.first_air_date;
                    if (date == null){
                        date = "Not available :("
                    };    
                    let vote = data.vote_average + "/10";
                    if (data.vote_average == null){
                        vote = "Not available :("
                    };
                    let overview = data.overview;
                    if (overview == null){
                        overview = "Not available :("
                    };
                    //GÉNERO
                    let genero1 = '';
                    let genero2 = '';
                    let genero3 = '';
                    
                    if (data.genres.length == 0){
                        genero1 += "No genres available"
                        textoSerie += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${tituloSerie}'>
                                </article>

                                <article class="infoDetail">
                                    <ul class="listaDetail">
                                        <li><strong class="decoracion">First air date:</strong>   ${date}</li>
                                        <li><strong class="decoracion">Genres: ${genero1}</li>
                                        <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                    </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${videoSerie}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;}
                    else if (data.genres.length == 1){
                        genero1 += `'${data.genres[0].name}'`
                        textoSerie += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${tituloSerie}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">First air date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[0].id}">${genero1}</strong></a></li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 
                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${videoSerie}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;}
                    else if (data.genres.length == 2){
                        genero1 += `'${data.genres[0].name}' `
                        genero2 += `'${data.genres[1].name}' `
                        textoSerie += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${tituloSerie}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">First air date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[0].id}">${genero1}</strong></a>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[1].id}">${genero2}</strong></a></li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${videoSerie}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;}
                    else {
                        genero1 += `'${data.genres[0].name}' `
                        genero2 += `'${data.genres[1].name}' `
                        genero3 += `'${data.genres[2].name}'`
                        textoSerie += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${tituloSerie}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">First air date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[0].id}">${genero1}</strong></a>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[1].id}">${genero2}</strong></a>
                                    <strong><a href="detail-genres-ser.html?genreIdSer=${data.genres[2].id}">${genero3}</strong></a></li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${videoSerie}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;
                    };
                    
                    /* CARGO DATOS AL HTML*/ 
                        
                    section.innerHTML = textoSerie;
        
                }).catch(function(e){
                        console.log(e);
                })


            /* PROVIDERS */
            let endpointProveedoresSeries = `https://api.themoviedb.org/3/watch/providers/tv?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
            let contenedorProveedoresSeries = document.querySelector(".providers");
            let proveedores = "";
            fetch(endpointProveedoresSeries)
                    .then(function(response){
                        return response.json();
                    }).then(function(dataProveedoresSeries){
                        let info = dataProveedoresSeries.results;
                        for (let i=0; i<=5; i++){
                            let posterProvider = `https://image.tmdb.org/t/p/original/${info[i].logo_path}`;
                            let nombreProviders = info[i].provider_name;
                            proveedores += ` <article>
                                                <img class="imgProv" src=${posterProvider} alt='Poster of '${nombreProviders}'>
                                            </article>`;
                            contenedorProveedoresSeries.innerHTML = proveedores;
                        }
            }).catch(function(e){
                console.log(e);})
            
                    
            /* RECOMENDACIONES */
            // ENDPOINT
            let endpointRecomendaciones = `https://api.themoviedb.org/3/tv/${serieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;

            let containerRecom = document.querySelector(".recomendacionesSeries");
            let contenidoRecom = "";
            
            fetch(endpointRecomendaciones)
                .then(function(response){
                    return response.json();
                }).then(function(dataRecomendaciones){
                    let info = dataRecomendaciones;
                    for (let i=0; i<=6; i++){
                        let posterRecomendaciones = '';
                        let nombreRecomendaciones = info[i].name;
                        if (info[i].poster_path != null){  
                            posterRecomendaciones += `https://image.tmdb.org/t/p/original/${info[i].poster_path}`;
                        } else{
                            posterRecomendaciones += "./errorPoster.png"; 
                        }
                    contenidoRecom += `
                            <article class="pelicula">
                                <a href="detail-series.html?id=${info[i].id}">
                                    <img class="poster posterEvento" src='${posterRecomendaciones}' alt='Poster de '${nombreRecomendaciones}'>
                                </a>

                                <a class="nombre" href="detail-series.html?id=${info[i].id}">
                                ${nombreRecomendaciones}
                                </a>

                                <a class="año" href="detail-series.html?id=${info[i].id}">
                                ${info[i].release_date.slice(0,4)}
                                </a>
                            </article>`;
                        let buttonSeries= document.querySelector(".botonRecSeries");
                        buttonSeries.addEventListener("click", function(){
                            if(buttonSeries.innerText == "Discover related titles"){
                                this.innerText= "Hide titles";
                                containerRecom.innerHTML = contenidoRecom;

                            } else {
                                this.innerText= "Discover related titles";
                                containerRecom.innerHTML = "";
                            }

                            })
                        }                  
                }).catch(function(e){
                        console.log(e);
            }).catch(function(e){
                console.log(e);
            })
        

    /* FAVORITOS */

    //SERIES

    //CAPTURO DATOS DEL LOCAL STORAGE     
    let favoritosSeries = [];
    let recuperoStorage = localStorage.getItem("favoritosSeries");

    //TRANSFORMO DATOS DEL LOCAL STORAGE PARA MANIPULARLOS EN JS
    if (recuperoStorage != null){
        favoritosSeries= JSON.parse(recuperoStorage);
    }

    //CAPTURO BOTON FAVORITOS
    let link= document.querySelector(".clave");

    //EVENTO BOTON FAVORITOS
    link.addEventListener("click", function(e){
        e.preventDefault();
        if (favoritosSeries.includes(serieId)){
            let indice = favoritosSeries.indexOf(serieId);
            favoritosSeries.splice(indice, 1);
            link.innerText= "🤍 Favorites";
            link.style.color = "white";
        } else {
            favoritosSeries.push(serieId);
            link.innerText= "❌ Favorites";
            link.style.color = "red";

        }
        
        //VUELVO A CARGAR LOS DATOS AL LOCAL STORAGE
        let SeriesFavToString = JSON.stringify(favoritosSeries);
        localStorage.setItem("favoritosSeries", SeriesFavToString);
        })
    })
})
