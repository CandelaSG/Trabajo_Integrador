/*api_ley= a3c55e0abc72e6abaa573f83ee40635f*/
endpoint = `https://api.themoviedb.org/3/genre/movie/list?api_key=a3c55e0abc72e6abaa573f83ee40635f&language=en-US`
fetch(endpoint)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        info = data.genres
        //console.log(info)
        for (let i=0; i<=data.lenght; i++){
           genero = info[i].get("name")
           console.log(genero)
        }
        })

    .catch(function(error){
        console.log(error);
    })