export async function ConsultaAPIforId() {
    const valores = location.search;
    const paramsUrl = new URLSearchParams(valores);
    console.log(paramsUrl.get("id"));
    const id = paramsUrl.get("id");
    const urlApi = `https://imdb-api.com/en/API/Title/k_ddtp65e3/${id}/Trailer,`;
    try {
        const response = await fetch(urlApi);
        const responseJson = await response.json();
        // console.log(responseJson);
        if (!response.ok) {
            throw "Error en respuesta de la API";
        }
        llenandoContenedorDetalles(responseJson);
    } catch (error) {
        console.log(error);
    }
}
function llenandoContenedorDetalles(respObj) {
    if (respObj.errorMessage) {
        alert("Limite de consultas alcanzado");
    }
    console.log(respObj);
    const titulo = document.querySelector("#titulo-main");
    titulo.textContent = respObj.title;

    const img = document.querySelector("#imagen-detalles");
    img.src = respObj.image;

    const parrafoSinopsis = document.querySelector("#parrafo-sinopsis");
    parrafoSinopsis.textContent = respObj.plot;

    const parrafoReparto = document.querySelector("#parrafo-reparto");
    parrafoReparto.textContent = respObj.stars;

    const parrafoCalificacion = document.querySelector("#calificacion p");
    parrafoCalificacion.textContent = respObj.imDbRating
        ? `${respObj.imDbRating}/10`
        : "No hay dato en API";

    const parrafoTipo = document.querySelector("#tipo p");
    parrafoTipo.textContent = respObj.type;

    const parrafoGenero = document.querySelector("#generos p");
    parrafoGenero.textContent = respObj.genres;

    const parrafoDuracion = document.querySelector("#duracion p");
    parrafoDuracion.textContent = respObj.runtimeStr || "No hay dato en API";

    const iframeTrailer = document.querySelector("#contenedor-trailer iframe");
    iframeTrailer.src = respObj.trailer.linkEmbed;
}
