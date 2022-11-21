
window.addEventListener('load', function (e) {
    
    endpoint1 = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;

    fetch(endpoint1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            /* ORGANIZO LA INFO */
            let info = data.genres;
            let container = document.querySelector(".containerGenres");
            let contenido = "";

            /* COMPLETO EL H2 */
            for (let i= 0; i<=info.length; i++){
                let titulo = info[i].name;
                let id = info[i].id ;   
                contenido += `<article class="genresBox">
                                    <h2><a href="./detail-genres.html?id=${id}">${titulo}</a></h2>
                                </article>`;
                container.innerHTML = contenido;  
        }
        }).catch(function(e){
            console.log(e);
    })
})  