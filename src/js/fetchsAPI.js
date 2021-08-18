export async function consultaApi() {
    let recomendados = [];
    try {
        const resultado = await fetch(
            "https://imdb-api.com/en/API/MostPopularTVs/k_ddtp65e3"
        );
        // resultados series populares
        const res = await resultado.json();
        if (res.errorMessage) throw alert("Peticiones a la API sobrepasadas");
        const arregloSeries = res.items;
        const [primero, segundo, tercero] = arregloSeries;
        recomendados = [...recomendados, primero, segundo, tercero];
        // resultado peliculas populares
        const resultadoMovies = await fetch(
            "https://imdb-api.com/en/API/MostPopularMovies/k_ddtp65e3"
        );
        const resMovies = await resultadoMovies.json();
        const arregloMovies = resMovies.items;
        const [cuarto, quinto, sexto] = arregloMovies;
        //recomendacion slider presentacion
        recomendados = [...recomendados, cuarto, quinto, sexto];
        //resultados top250 peliculas
        const top250Movies = await fetch(
            "https://imdb-api.com/en/API/Top250Movies/k_ddtp65e3"
        );
        const resJson250Movies = await top250Movies.json();
        const arreglo250Movies = resJson250Movies.items;
        //resultados estrenos peliculas
        const resEstrenos = await fetch(
            "https://imdb-api.com/en/API/ComingSoon/k_ddtp65e3"
        );
        const resJsonEstrenos = await resEstrenos.json();
        const arregloEstrenos = resJsonEstrenos.items;
        //resultados top250 series
        const top250Series = await fetch(
            "https://imdb-api.com/en/API/Top250TVs/k_ddtp65e3"
        );
        const resJson250Series = await top250Series.json();
        const arreglo250Series = resJson250Series.items;

        return {
            recomendados,
            arregloMovies,
            arregloSeries,
            arreglo250Movies,
            arreglo250Series,
            arregloEstrenos,
        };
    } catch (error) {
        console.log(error);
    }
}
export function llenandoSlider(arr, clase) {
    const ul = document.querySelector(clase);

    let listas = document.querySelectorAll(`${clase} li`);
    const listadoActualizado = Array.from(listas).slice(0, arr.length);
    listadoActualizado.forEach((el, index) => {
        el.innerHTML = `
        <div class="card">
            <div class="imagen">
              <img src="${arr[index].image}">
            </div>
             <div class="descripcion">
                <h3 title="${arr[index].title}" ><a href="detalles.html?id=${
            arr[index].id
        }">${
            arr[index].title.length > 15
                ? arr[index].title.slice(0, 12) + "..."
                : arr[index].title
        }</a></h3>
                <div class="generos">

                    <p>${arr[index].year}</p>
                    <button class="agregar" id="${
                        arr[index].id
                    }" title="ver mas tarde"><i class="fas fa-plus-circle"></i></button>
                </div>
            </div>
           
        </div>
        `;
    });
}
