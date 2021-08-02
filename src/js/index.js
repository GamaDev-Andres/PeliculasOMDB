import "../styles/style.scss";
import { consultaApi, llenandoSlider } from "./fetchsAPI";
import abrirCerrarMenu from "./abrirCerrarMenu";
import { llenandoContenedor } from "./llenandoContenedor";

document.addEventListener("DOMContentLoaded", () => {
    abrirCerrarMenu();
    // FETCH PRESENTACION
    let objConsultasAPI = localStorage.getItem("objConsultasAPI");
    let resultadosAPI = null;
    //guardando en localStorage , para minimizar consultas
    if (!objConsultasAPI) {
        resultadosAPI = consultaApi();
        resultadosAPI.then((rta) => {
            llenandoContenido(rta);
            localStorage.setItem("objConsultasAPI", JSON.stringify(rta));
        });
    } else {
        resultadosAPI = JSON.parse(objConsultasAPI);
        llenandoContenido(resultadosAPI);
    }
    // funcion agregado de ver mas tarde
    verMasTardeLS();
    //funcion eliminado ver mas tarde
    eliminarVerMasTarde();
});
//PRESENTA TODAS LAS FUNCIONES QUE LLENAN LOS SLIDERS
function llenandoContenido(rta) {
    if (location.pathname === "/" || location.pathname === "/index.html") {
        llenandoSlider(rta.recomendados, ".slider-presentacion");
        llenandoSlider(rta.arregloMovies.slice(0, 10), ".slider-peliculas");
        llenandoSlider(rta.arregloSeries.slice(0, 10), ".slider-series");
    } else if (location.pathname === "/peliculas.html") {
        llenandoSlider(
            rta.arregloMovies.slice(0, 10),
            ".slider-peliculas-page"
        );
        llenandoSlider(rta.arregloEstrenos, ".slider-estrenos");
    } else if (location.pathname === "/series.html") {
        llenandoSlider(rta.arregloSeries.slice(0, 10), ".slider-popu-series");
    } else if (location.pathname === "/listado.html") {
        const arregloListado = JSON.parse(
            localStorage.getItem("arrayListVerMasTarde")
        );
        llenandoContenedor(arregloListado, "contenedor-listado");
    }
}
// AGREGA LA FUNCIONALIDAD DE AGREGAR AL LOCAL STORAGE LAS PELICULAS A VER MAS TARDE
function verMasTardeLS() {
    const nodeListBtnsAgregar = document.querySelectorAll(".agregar");

    let arrayListVerMasTarde =
        JSON.parse(localStorage.getItem("arrayListVerMasTarde")) || [];

    nodeListBtnsAgregar.forEach((el) => {
        el.addEventListener("click", () => {
            let objVerMasTarde = {};
            objVerMasTarde.img =
                el.parentElement.parentElement.previousElementSibling.children[0].src;

            objVerMasTarde.titulo =
                el.parentElement.parentElement.children[0].children[0].textContent;
            objVerMasTarde.id = el.id;
            if (!arrayListVerMasTarde.some((obj) => obj.id == el.id)) {
                arrayListVerMasTarde.push(objVerMasTarde);
            }

            localStorage.setItem(
                "arrayListVerMasTarde",
                JSON.stringify(arrayListVerMasTarde)
            );
        });
    });
}
//ELIMINA ELEMENTOS DEL LOCALSTORAGE DEL ARR DE VER MAS TARDE y AGREGA EVENTOS
function eliminarVerMasTarde() {
    const nodeListBtnsEliminar = document.querySelectorAll(".eliminar");
    console.log(nodeListBtnsEliminar);
    nodeListBtnsEliminar.forEach((el) => {
        el.addEventListener("click", (e) => {
            const arregloVerMasTarde =
                JSON.parse(localStorage.getItem("arrayListVerMasTarde")) || [];
            console.log("gola");
            console.log(e.target);
            let nuevoArr = arregloVerMasTarde.filter(
                (obj) =>
                    obj.id !==
                    e.target.parentElement.parentElement.parentElement.id
            );

            localStorage.setItem(
                "arrayListVerMasTarde",
                JSON.stringify(nuevoArr)
            );
            const contenedor = document.querySelector("#contenedor-listado");
            contenedor.removeChild(e.path[4]);
        });
    });
}
