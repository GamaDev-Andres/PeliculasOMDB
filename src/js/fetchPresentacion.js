export async function consultaApiPresentacion() {
  let recomendados = [];
  try {
    const resultado = await fetch(
      "https://imdb-api.com/en/API/MostPopularTVs/k_ddtp65e3"
    );
    const res = await resultado.json();
    // console.log(res);
    if (res.errorMessage) throw alert("Peticiones a la API sobrepasadas");
    const arreglo = res.items;
    const [primero, segundo, tercero] = arreglo;
    recomendados = [...recomendados, primero, segundo, tercero];
    const resultadoMovies = await fetch(
      "https://imdb-api.com/en/API/MostPopularMovies/k_ddtp65e3"
    );
    const resMovies = await resultadoMovies.json();
    const arregloMovies = resMovies.items;
    const [cuarto, quinto, sexto] = arregloMovies;
    recomendados = [...recomendados, cuarto, quinto, sexto];
    // console.log(recomendados, cuarto);
    return recomendados;
  } catch (error) {
    console.log(error);
  }
}
export function llenandoSlider(arr, clase) {
  const listas = document.querySelectorAll(`${clase} li`);

  listas.forEach((el, index) => {
    // console.log(arr);
    el.innerHTML = `
        <div class="card">
            <div class="imagen">
              <img src="${arr[index].image}">
            </div>
             <div class="descripcion">
                <a href="index.html"><h3>${arr[index].title}</h3></a>
                <div class="generos">

                    <p>${arr[index].year}</p>
                    <button class="agregar" id="${arr[index].id}" title="agregar"><i class="fas fa-plus-circle"></i></button>
                </div>
            </div>
           
        </div>
        `;
  });
  //   console.log(listas);
}
