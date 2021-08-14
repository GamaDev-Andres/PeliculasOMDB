export function busquedaApi(form) {
    // console.log(form.search.value);
    let inputSearch = form.search;
    const arrRta = consultaApiBusqueda(inputSearch.value);
    return arrRta;

    // location.href = "./busqueda.html";
}
async function consultaApiBusqueda(busqueda) {
    const url = `https://imdb-api.com/en/API/SearchTitle/k_ddtp65e3/${busqueda}`;
    try {
        const rta = await fetch(url);
        const rtaJson = await rta.json();
        const arrRta = rtaJson.results;
        // console.log(arrRta);
        return arrRta;
    } catch (error) {
        console.log(error);
    }
}
