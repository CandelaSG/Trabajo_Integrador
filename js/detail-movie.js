window.addEventListener('load', function (e) {
let queryString = location.search; //Obtengo la QS
let queryStringToObject = new URLSearchParams(queryString); //La trasnformo en OL
let movieId = queryStringToObject.get('id');
//console.log(movieId);

let endpointMovie=`https://api.themoviedb.org/3/movie/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;


fetch(endpointMovie)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        /* TÍTULO DE BÚSQUEDA */
        let titulo = document.querySelector('.tituloDetail');
        let nuevoTitulo = '';
        nuevoTitulo += `${data.title}`;
        titulo.innerHTML= nuevoTitulo;
        
        /* DETAIL MOVIE */

        //QUERY SELECTOR
        let contenedorDetail = document.querySelector('.infoContainer');
        let texto = '';
        
        let endpointTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
        
        
        fetch(endpointTrailer)
                .then(function(response){
                    return response.json();
                })
                .then(function(dataTrailer){
                    //console.log(infoTrailer);
                    infoTrailer = dataTrailer.results;
                    //SOURCE POR DEFAULT
                    let video = infoTrailer[0].key;
                    //SOURCE CUANDO HAY UN TRAILER EFECTIVAMENTE
                    for(let i=0; i<infoTrailer.length; i++){ 
                        let pregunta = infoTrailer[i].name
                        if (pregunta.includes("Trailer")||pregunta.includes("trailer")||pregunta.includes("teaser")||pregunta.includes("Teaser")){
                            video = infoTrailer[i].key
                        }} ;

                    //POSTER
                    let img = ''
                    if (data.poster_path != null){
                        img += `https://image.tmdb.org/t/p/original/${data.poster_path}`;    
                    } else{
                        img += "/Users/Cande_1/Desktop/Integrador_progra/Trabajo_Integrador/img/noDisponible.png"; 
                    }
                    //DATOS MOVIE
                    let date = data.release_date
                    if (date == null){
                        date = "Not available :("
                    }
                    let runtime = data.runtime
                    if (runtime == null){
                        runtime = "Not available :("
                    }
                    let vote = data.vote_average + "/10"
                    if (data.vote_average == null){
                        vote = "Not available :("
                    }
                    let overview = data.overview
                    if (overview == null){
                        overview = "Not available :("
                    }
                    //GÉNERO
                    let genero1 = '';
                    let genero2 = '';
                    let genero3 = '';
                    
                    if (data.genres.length == 0){
                        genero1 += "No genres available"
                        texto += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${nuevoTitulo}'>
                                </article>

                                <article class="infoDetail">
                                    <ul class="listaDetail">
                                        <li><strong class="decoracion">Release date:</strong>   ${date}</li>
                                        <li><strong class="decoracion">Genres: ${genero1}</li>
                                        <li><strong class="decoracion">Running time:</strong>   ${runtime} minutes</li>
                                        <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                    </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${video}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;
                    }else if (data.genres.length == 1){
                        genero1 += `'${data.genres[0].name}'`
                        texto += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${nuevoTitulo}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">Release date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres.html?id=${data.genres[0].id}">${genero1}</strong></a></li>
                                    <li><strong class="decoracion">Running time:</strong>   ${runtime} minutes</li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${video}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;

                    }else if (data.genres.length == 2){
                        genero1 += `'${data.genres[0].name}' `
                        genero2 += `'${data.genres[1].name}' `
                        texto += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${nuevoTitulo}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">Release date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres.html?id=${data.genres[0].id}">${genero1}</strong></a>
                                    <strong><a href="detail-genres.html?id=${data.genres[1].id}">${genero2}</strong></a></li>
                                    <li><strong class="decoracion">Running time:</strong>   ${runtime} minutes</li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${video}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;
                    }else{
                        genero1 += `'${data.genres[0].name}' `
                        genero2 += `'${data.genres[1].name}' `
                        genero3 += `'${data.genres[2].name}'`
                        texto += `<article class="conteinerPoster">
                                <img class="posterDetail" src=${img} alt='Poster of '${nuevoTitulo}'>
                                
                                </article>

                            <article class="infoDetail">
                                <ul class="listaDetail">
                                    <li><strong class="decoracion">Release date:</strong>   ${date}</li>
                                    <li><strong class="decoracion">Genres: </strong>
                                    <strong><a href="detail-genres.html?id=${data.genres[0].id}">${genero1}</strong></a>
                                    <strong><a href="detail-genres.html?id=${data.genres[1].id}">${genero2}</strong></a>
                                    <strong><a href="detail-genres.html?id=${data.genres[2].id}">${genero3}</strong></a></li>
                                    <li><strong class="decoracion">Running time:</strong>   ${runtime} minutes</li>
                                    <li><strong class="decoracion">Qualification:</strong>     ${vote} <i class="fa-solid fa-star"></i></li> 
                                </ul> 

                                <p class="sinopsis">${overview}</p>   
                                <div class="buttonTrailer">
                                <a class="verTrailer" href="https://www.youtube.com/embed/${video}"_blanc> ▶️ Ver Trailer </a> 
                                </div>
                            </arcticle>`;
                    };
                    //CARGO DATOS AL HTML     
                    
                    contenedorDetail.innerHTML = texto;
      
                }).catch(function(error){
                        console.log(error);
                })

        /* PROVIDERS */
        let endpointProveedores = `https://api.themoviedb.org/3/watch/providers/movie?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
        let contenedorProveedores = document.querySelector(".providers");
        let proveedores = "";
        fetch(endpointProveedores)
                .then(function(response){
                    return response.json();
                }).then(function(dataProveedores){
                    console.log(dataProveedores);
                    let info = dataProveedores.results;
                    for (let i=0; i<=5; i++){
                        let posterProvider = `https://image.tmdb.org/t/p/original/${info[i].logo_path}`;
                        let nombreProviders = info[i].provider_name;
                        proveedores += ` <article>
                                            <img class="imgProv" src=${posterProvider} alt='Poster of '${nombreProviders}'>
                                        </article>`;
                        contenedorProveedores.innerHTML = proveedores;
                    }
                }).catch(function(error){
                    console.log(error);})
        
        /* RECOMENDACIONES */
        let containerRecomendaciones = document.querySelector(".recomendaciones");
        let contenidoRecomendaciones = ""
        let endpointRecomendaciones = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&page=1`
        fetch(endpointRecomendaciones)
            .then(function(response){
                return response.json();
            }).then(function(dataRecomendaciones){
                console.log(dataRecomendaciones);
                let info = dataRecomendaciones.results;
                for (let i=0; i<=6; i++){
                    let posterRecomendaciones = '';
                    let nombreRecomendaciones = info[i].title;
                    if (info[i].poster_path != null){  
                        posterRecomendaciones += `https://image.tmdb.org/t/p/original/${info[i].poster_path}`;
                    } else{
                        posterRecomendaciones += "/Users/Cande_1/Desktop/Integrador_progra/Trabajo_Integrador/img/noDisponible.png"; 
                    }
                    contenidoRecomendaciones += `
                            <article class="pelicula">
                                <a href="detail-movie.html?id=${info[i].id}">
                                    <img class="poster posterEvento" src='${posterRecomendaciones}' alt='Poster de '${nombreRecomendaciones}'>
                                </a>

                                <a class="nombre" href="detail-movie.html?id=${info[i].id}">
                                ${nombreRecomendaciones}
                                </a>

                                <a class="año" href="detail-movie.html?id=${info[i].id}">
                                ${info[i].release_date.slice(0,4)}
                                </a>
                            </article>`;
                    containerRecomendaciones.innerHTML = contenidoRecomendaciones
                        }                  
            }).catch(function(error){
                    console.log(error);})
            }).catch(function(error){
                console.log(error);
            }) 
        



/* FAVORITOS */

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
        link.style.color = "white"
    } else {
        favoritos.push(movieId);
        link.innerText= "❌ Favorites";
        link.style.color = "red"
    }
    
    //VUELVO A CARGAR LOS DATOS AL LOCAL STORAGE
    let moviesFavToString = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", moviesFavToString);
    })
})