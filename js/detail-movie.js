let query = location.search; //Obtengo la QS
let stringToObject = new URLSearchParams(query); //La trasnformo en OL
let id = stringToObject.get('id'); //Obtengo los datos de una propiedad con get() 

let url = `https://api.themoviedb.org/3/search/multi?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US&query=${id}&page=1&include_adult=false`



{/* <article>
            <iframe class="trailer"  src="https://www.youtube.com/embed/IioBZ0rJdyI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </article>

        <article class="infoDetail">
            <ul class="listaDetail">
                <li><strong class="decoracion">Fecha de estreno:</strong>   2014</li>
                <li><strong class="decoracion">Género:</strong> <a href="./detail-genres.html">  <u>acción</u></a></li>
                <li><strong class="decoracion">Duracion:</strong>   140 minutos</li>
                <li><strong class="decoracion">Calificación:</strong>     9.2/10 <i class="fa-solid fa-star"></i></li> 
                <li><strong class="decoracion">Elenco:</strong>   Shailine Woodley, Theo James, Miles Teller, Kate Winslet, Ansel Elgort y Zoë Kravitz</li>
            </ul> 

            <h3>SINOPSIS</h3>

            <p class="sinopsis">En un mundo dividido y devastado por la guerra, Tris descubre sus habilidades y se une a Cuatro para resistir una conspiración siniestra contra otros como ellos </p>        
            <a class="favoritos" href="./favourite.html"> 🤍 Agregar a favoritos</a>
        </article> */}