export function scrollInfinito(entries) {
    let entrada = entries[0];

    if (entrada.isIntersecting) {
        if (location.pathname === "/peliculas.html") {
            let arr250 = JSON.parse(
                sessionStorage.getItem("objConsultasAPI")
            ).arreglo250Movies;
            return { arr250, id: "250Movies" };
        } else if (location.pathname === "/series.html") {
            let arr250 = JSON.parse(
                sessionStorage.getItem("objConsultasAPI")
            ).arreglo250Series;
            return { arr250, id: "250Series" };
        }
    }
}
