export function scrollInfinito(entries) {
    // console.log(entries);
    let entrada = entries[0];
    // console.log(entries);

    if (entrada.isIntersecting) {
        // console.log("hola");

        // console.log(location.pathname);
        if (location.pathname === "/peliculas.html") {
            let arr250 = JSON.parse(
                sessionStorage.getItem("objConsultasAPI")
            ).arreglo250Movies;
            // console.log(arr250);
            return { arr250, id: "250Movies" };
        } else if (location.pathname === "/series.html") {
            let arr250 = JSON.parse(
                sessionStorage.getItem("objConsultasAPI")
            ).arreglo250Series;
            return { arr250, id: "250Series" };
            // llenandoContenedor(arr250,);
        }
    }
}
