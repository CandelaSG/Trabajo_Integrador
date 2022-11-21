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
        //console.log(data);
        
        /* TÍTULO DE BÚSQUEDA */
        let titulo = document.querySelector('.tituloDetail');
        let nuevoTitulo = '';
        nuevoTitulo += `${data.title}`;
        titulo.innerHTML= nuevoTitulo;
        
        /* DETAIL MOVIE */

        //QUERY SELECTOR
        let contenedorDetail = document.querySelector('.infoContainer');
        let texto = '';
        
        //GÉNERO
        let genero1 = '';
        let genero2 = '';
        let genero3 = '';
        if (data.genres.length == 0){
            genero1 += "No hay generos disponibles"
        }else if (data.genres.length == 1){
            genero1 += `'${data.genres[0].name}'`
        }else if (data.genres.length == 2){
            genero1 += `'${data.genres[0].name}' `
            genero2 += `'${data.genres[1].name}' `
        }else{
            genero1 += `'${data.genres[0].name}' `
            genero2 += `'${data.genres[1].name}' `
            genero3 += `'${data.genres[2].name}'`
        };

        //POSTER
        let img = `https://image.tmdb.org/t/p/original/${data.poster_path}`;         

        //CARGO DATOS AL HTML      
        texto += `<article>
                    <img class="poster posterEvento" src=${img} alt='Poster de '${nuevoTitulo}'>
                </arcticle>
                <article class="infoDetail">
                    <ul class="listaDetail">
                        <li><strong class="decoracion">Fecha de estreno:</strong>   ${data.release_date.slice(0,4)}</li>
                        <li><strong class="decoracion">Genre:</strong> 
                        <a href="detail-genres.html?id=${data.genres[0].id}"><strong>${genero1}</a>
                        <a href="detail-genres.html?id=${data.genres[1].id}">${genero2}</a>
                        <a href="detail-genres.html?id=${data.genres[2].id}">${genero3}</strong></a></li>
                        <li><strong class="decoracion">Running time:</strong>   ${data.runtime} minutes</li>
                        <li><strong class="decoracion">Qualification:</strong>     ${data.vote_average}/10 <i class="fa-solid fa-star"></i></li> 
                    </ul> 

                    <h3>SINOPSIS</h3>
                    <p class="sinopsis">${data.overview}</p>   
                `;
        contenedorDetail.innerHTML = texto;
        
        /* TRAILER */
        //QUERY SELECTOR
        let contenedorTrailer = document.querySelector(".infoTrailer");
        let botonTrailer = "";
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
                        if (pregunta.includes("Trailer")||pregunta.includes("trailer")){
                            video = infoTrailer[i].key
                        }} ;
                    
                    
                    botonTrailer += `<article class="artFav">
                                        <a class="buttonFav" href="https://www.youtube.com/embed/${video}"_blanc> View Trailer 🎬</a>
                                    </article>`;
                    
                    contenedorTrailer.innerHTML = botonTrailer;
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
                    let info = dataProveedores.results;
                    for (let i=0; i<=5; i++){
                        let posterProvider = `https://image.tmdb.org/t/p/original/${info[i].logo_path}`;
                        let nombreProviders = info[i].provider_name;
                        proveedores += ` <article>
                            <img src=${posterProvider} alt='Poster de '${nombreProviders}'>
                            <p>${nombreProviders}</p>
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
                //console.log(dataRecomendaciones);
                let info = dataRecomendaciones.results;
                for (let i=0; i<=6; i++){
                    let posterRecomendaciones = `https://image.tmdb.org/t/p/original/${info[i].poster_path}`;
                    let nombreRecomendaciones = info[i].title;
                    contenidoRecomendaciones += ` <article>
                            <img class= "poster" src=${posterRecomendaciones} alt='Poster de '${nombreRecomendaciones}'>
                            <p>${nombreRecomendaciones}</p>
                            </article>`;
                containerRecomendaciones.innerHTML = contenidoRecomendaciones;
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
        link.innerText= "🤍 Agregar a favoritos";
    } else {
        favoritos.push(movieId);
        link.innerText= "❌ Eliminar de favoritos";
    }
    
    //VUELVO A CARGAR LOS DATOS AL LOCAL STORAGE
    let moviesFavToString = JSON.stringify(favoritos);
    localStorage.setItem("favoritos", moviesFavToString);
    })
})