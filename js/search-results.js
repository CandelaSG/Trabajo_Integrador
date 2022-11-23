window.addEventListener('load', function (e) {    
    /* LOADER */
    console.log("'Todos los recursos terminaron de cargar!");
    document.getElementById("loader").classList.toggle("loader2");
    /* QUERY STRING */
    let query = location.search; 
    let stringToObject = new URLSearchParams(query); 
    let aBuscar = stringToObject.get('busqueda');
    console.log(aBuscar);
    

    /* QUERY SELECTOR HTML */
    //P 
    let pBusqueda = document.querySelector('.resultText');
    let textoBusqueda = '';
    textoBusqueda= `Tu búsqueda fue: "${aBuscar}"`;
    pBusqueda.innerText += textoBusqueda;
    
    // CONTAINER
    let containerResult = document.querySelector('.containerResults');
    let result = '';
    
    
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

    /* URL */
    let endopointBuscar = `https://api.themoviedb.org/3/search/multi?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${aBuscar}&page=1&include_adult=false`;
    fetch(endopointBuscar)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            if (data.results.length!==0){
                for (let i= 0; i<data.results.length; i++){
                    let info = data.results
                    let titulo = info[i].title
                    if (titulo == null){
                        titulo = info[i].name
                    }
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
                        containerResult.innerHTML = result;
                
                
            }else{
                containerResult.innerHTML =  `<img class="errorSearch" src="./img/errores/errorSearch.png">`
                }
                
            
        }).catch (function(e){
            console.log(e);})
        })