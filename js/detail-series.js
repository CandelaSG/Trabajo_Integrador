window.addEventListener('load', function (e) {
let queryString = location.search; //Obtengo la QS
let queryStringToObject = new URLSearchParams(queryString); //La trasnformo en OL
let movieId = queryStringToObject.get('id');
//console.log(movieId);

let endpointSerie=`https://api.themoviedb.org/3/tv/${movieId}?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`
let endpointTrailer = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;

fetch(endpointSerie)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let section = document.querySelector('.infoSeries');
        let textoSerie = '';
        let titulo = document.querySelector('.detailSeries');
        let tituloSerie = '';

    fetch(endpointTrailer)
        .then(function(response){
            return response.json();
        })
        .then(function(infoTrailer){
            console.log(infoTrailer);
            let videoSerie = infoTrailer.results[0].key
            for(let i=0; i<infoTrailer.results.length; i++){ 
                let pregunta = infoTrailer.results[i].name;
                if (pregunta.includes("Trailer")||pregunta.includes("trailer")||pregunta.includes("teaser")||pregunta.includes("Teaser")){
                    videoSerie = infoTrailer.results[i].key;
                }
            }

            let genero1 = '';
            let genero2 = '';
            let genero3 = '';
            if (data.genres.length == 0){
                genero1 += `No hay generos disponibles `;
            }else if (data.genres.length == 1){
                genero1 += `'${data.genres[0].name}'`;
            }else if (data.genres.length == 2){
                genero1 += `'${data.genres[0].name}' `;
                genero2 += `'${data.genres[1].name}' `;
            }else{
                genero1 += `'${data.genres[0].name}' `;
                genero2 += `'${data.genres[1].name}' `;
                genero3 += `'${data.genres[2].name}'`;
            }
            
            tituloSerie += `${data.name}`
            titulo.innerHTML=tituloSerie
            textoSerie += `<article>
                        <iframe class="trailerSearch" src="https://www.youtube.com/embed/${videoSerie}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </article>

                    <article class="infoDetail">
                        <ul class="listaDetail">
                            <li><strong class="decoracion">Fecha de estreno:</strong>   ${data.first_air_date}</li>
                            <li><strong class="decoracion">Género:</strong> 
                            <a href="detail-genres.html?id=${data.genres[0].id}"><strong>${genero1}</a>
                            <a href="detail-genres.html?id=${data.genres[1].id}">${genero2}</a>
                            <a href="detail-genres.html?id=${data.genres[2].id}">${genero3}</strong></a></li>
                            <li><strong class="decoracion">Calificación:</strong>     ${data.vote_average}/10 <i class="fa-solid fa-star"></i></li> 
                            <li><strong class="decoracion">Elenco:</strong>   Shailine Woodley, Theo James, Miles Teller, Kate Winslet, Ansel Elgort y Zoë Kravitz</li>
                            <li><strong class="decoracion"> <a href="https://www.youtube.com/embed/${videoSerie}">Otros trailers y videos</strong></a>  </li>
                        </ul> 

                        <h3>SINOPSIS</h3>
                        <p class="sinopsis">${data.overview}</p>   
                        
                    </article>`
            section.innerHTML = textoSerie
            })
            .catch(function(error){
                console.log(error);
            })
    })
    
.catch(function(error){
    console.log(error);
})


let favoritosSeries = [];
let recuperoStorage = localStorage.getItem("favoritosSeries");

if (recuperoStorage != null){
    favoritosSeries= JSON.parse(recuperoStorage);
    //console.log(favoritos);
}


let link= document.querySelector(".clave");

if (favoritosSeries.includes(movieId)){
    link.innerText = "❌ Eliminar de favoritos";
};

link.addEventListener("click", function(e){
    e.preventDefault();
    if (favoritosSeries.includes(movieId)){
        let indice = favoritosSeries.indexOf(movieId);
        favoritosSeries.splice(indice, 1);
        link.innerText= "🤍 Agregar a favoritos";
    } else {
        favoritosSeries.push(movieId);
        //console.log(favoritos)
        link.innerText= "❌ Quitar de favoritos";
    }
    
    let SeriesFavToString = JSON.stringify(favoritosSeries);
    localStorage.setItem("favoritosSeries", SeriesFavToString);
    //console.log(localStorage);
})

})