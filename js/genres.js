/*REVISAR ESTO NO FUNCIONA*/

/*api_ley= a3c55e0abc72e6abaa573f83ee40635f*/
window.addEventListener('load', function (e) {
endpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`
fetch(endpoint)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        let container = document.querySelector(".containerHome");
        let pGeneros = "";
        info = data.genres
        //console.log(info)
        for (let i=0; i<=data.lenght; i++){
           genero = info[i].get("name")
           pGeneros += `<article class="pelicula">
                            <a href="genres.html?id=${info[i].id}">
                                <img class="poster" src=${img} alt='Poster de '${titulo}'/> </a>

                            <a class="nombre" href="genres.html?id=${info[i].id}">${titulo}</a>
                            
                            <a class="año" href="genres.html?id=${info[i].id}">${año}</a>
                        </article>`
            }
            container.innerHTML = pGeneros;

        })

    .catch(function(error){
        console.log(error);
    })
})