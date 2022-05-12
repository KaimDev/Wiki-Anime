document.onkeydown = function(e) {
    if(e.keyCode == 13){
        aniApi();
    }
}
async function aniApi() {
     let word = document.querySelector(".palabra");

    if(!word.value.trim()){
        alert("Ingrese una palabra");
        word.value = '';
        word.focus()
        return;
    };  
    try{
        //connect api
        const resp = await fetch(`https://api.aniapi.com/v1/anime?title=${word.value}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1OTgiLCJuYmYiOjE2NDk4Nzg4ODksImV4cCI6MTY1MjQ3MDg4OSwiaWF0IjoxNjQ5ODc4ODg5fQ.BkgIIjmQPN8xeI-clhC8zQPjXPQi4M1tBleHAjDGj6k',
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          //show results
        //   console.log(resp);

          //validation
          if(resp.status === 200){
            //   console.log("ok");   
              
              const datos = await resp.json();

              if(!resp.json){
                  console.log("json not found");
              }

              console.log(datos);
  
              console.log(datos.data.documents[0]);

              let anime = datos.data.documents[0];
              
              document.getElementById("Card-Main").removeAttribute("hidden");
              document.getElementById("titulo").innerHTML = anime.titles.en;
              document.getElementById("portada").setAttribute("src", anime.banner_image);
              document.getElementById("desc").innerHTML = anime.descriptions.en

          }else if(resp.status === 400){
              console.log("Bad request");

          }else if(resp.status === 401){
              console.log("Unauthorized");

          }else if(resp.status === 404){
              console.log("The user doesn't have permissions to perform the request");

          }else if(resp.status === 429){
              console.log("Too many requests hit the API too quickly from the same origin");

          }else if(resp.status === 500){
              console.log("Sever error");

          }else{
              console.log("Unknow error");
          }
    }catch(error){
        console.log(error);
    }
};
