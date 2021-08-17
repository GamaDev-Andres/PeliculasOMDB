import "../styles/style.scss";
import { consultaApi, consultaApiBusqueda, llenandoSlider } from "./fetchsAPI";
import abrirCerrarMenu from "./abrirCerrarMenu";
import { llenandoContenedor } from "./llenandoContenedor";
import { scrollInfinito } from "./scrollInfinito";
import { busquedaApi } from "./busqueda";

document.addEventListener("DOMContentLoaded", () => {
    abrirCerrarMenu();
    // FETCH PRESENTACION
    let objConsultasAPI = sessionStorage.getItem("objConsultasAPI");
    let resultadosAPI = null;
    //guardando en sessionStorage , para minimizar consultas
    if (!objConsultasAPI) {
        resultadosAPI = consultaApi();
        resultadosAPI.then((rta) => {
            llenandoContenido(rta);
            sessionStorage.setItem("objConsultasAPI", JSON.stringify(rta));
        });
    } else {
        resultadosAPI = JSON.parse(objConsultasAPI);
        llenandoContenido(resultadosAPI);
    }
    //agregando funcionalidad de busqueda
    const formSearch = document.querySelector("#search-presentacion");
    const botonSearch = document.querySelector("#boton-busqueda");

    //evento al formulario
    if (formSearch && botonSearch) {
        const sectionBusquedas = document.querySelector(".contenedor-busqueda");
        const contenedorBusquedas = document.querySelector(
            "#contenedor-busqueda"
        );

        //evento al submit
        formSearch.addEventListener("submit", (e) => {
            e.preventDefault();
            const resultadosBusqueda = busquedaApi(formSearch);
            resultadosBusqueda.then((rta) => {
                if (rta === null) {
                    alert("Se sobrepaso el limite de consultas de la API");
                } else if (rta.length === 0) {
                    alert("No hay resultado relacionado con su busqueda-");
                }

                llenandoContenedor(rta, "contenedor-busqueda");

                verMasTardeLS();
            });
            formSearch.reset();
            sectionBusquedas.style.display = "block";
            contenedorBusquedas.innerHTML = "";
            if (sectionBusquedas.childElementCount === 1) {
                sectionBusquedas.insertAdjacentHTML(
                    "afterbegin",
                    `<h2>Resultados de tu busqueda.</h2>
                        `
                );
            }
            let urlOrigin = location.origin;
            let urlPathname = location.pathname;
            location.href = `${urlOrigin}${urlPathname}#contenedor-busqueda`;
        });
    }

    //SCROLL INFINITO

    const footer = document.querySelector("#footer");
    const options = {
        treshold: 0.01,
    };
    let auxInicio = 0;
    let auxFinal = 25;
    const observer = new IntersectionObserver((entries) => {
        if (auxInicio === 225) {
            return;
        }
        const objArr = scrollInfinito(entries);
        if (objArr) {
            llenandoContenedor(
                objArr.arr250.slice(auxInicio, auxFinal),
                objArr.id
            );
            verMasTardeLS();
            auxInicio += 25;
            auxFinal += 25;
        }
    }, options);
    observer.observe(footer);
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
            objVerMasTarde.image =
                el.parentElement.parentElement.previousElementSibling.children[0].src;

            objVerMasTarde.title =
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
//ELIMINA ELEMENTOS DEL localStorage DEL ARR DE VER MAS TARDE y AGREGA EVENTOS
function eliminarVerMasTarde() {
    const nodeListBtnsEliminar = document.querySelectorAll(".eliminar");
    nodeListBtnsEliminar.forEach((el) => {
        el.addEventListener("click", (e) => {
            const arregloVerMasTarde =
                JSON.parse(localStorage.getItem("arrayListVerMasTarde")) || [];

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
