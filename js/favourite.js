//lista de favoritos
let recuperoStorage= localStorage.getItem("favoritos");
console.log(recuperoStorage);

let seleccionados = JSON.parse(recuperoStorage);
console.log(seleccionados);

let lista= document.querySelector (".favoritos");

if (seleccionados == null || seleccionados.length == 0){
    lista.innerHTML = `<p> No hay favoritos seleccionados </p>`
} else {
    for (let i= 0; i<seleccionados.length; i++){
        buscarYMostrarFavoritos(seleccionados[i])
    }
}
function buscarYMostrarFavoritos (id){
    //fetch
    let url = ``

    fetch (url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            lista.innerHTML += `<article>

                            </article>`
        })
        .catch(function(e){
            console.log(e);
        })


}