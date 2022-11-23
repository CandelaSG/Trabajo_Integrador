
window.addEventListener('load', function (e) {
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");
    endpoint1 = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`;
    
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
    fetch(endpoint1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            /* ORGANIZO LA INFO */
            let info = data.genres;
            console.log(info)
            let container = document.querySelector(".containerGenres");
            let contenido = '';

            for (let i= 0; i<info.length; i++){
                let titulo = info[i].name;
                let id = info[i].id;   
                contenido += `<article class="genresBox">
                                <a href="./detail-genres.html?idGenero=${id}">
                                    ${titulo}
                                </a>
                            </article>`;  
        }
        container.innerHTML = contenido;
        }).catch(function(e){
            console.log(e);
    })
})  