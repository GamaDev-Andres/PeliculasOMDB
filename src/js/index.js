import "../styles/style.scss";
import { consultaApi, llenandoSlider } from "./fetchsAPI";
import abrirCerrarMenu from "./abrirCerrarMenu";

document.addEventListener("DOMContentLoaded", () => {
  abrirCerrarMenu();
  // FETCH PRESENTACION
  let objConsultasAPI = localStorage.getItem("objConsultasAPI");
  let resultadosAPI = null;
  //guardando en localStorage , para minimizar consultas
  if (!objConsultasAPI) {
    resultadosAPI = consultaApi();
    resultadosAPI.then((rta) => {
      llenadoGeneralSliders(rta);
      localStorage.setItem("objConsultasAPI", JSON.stringify(rta));
    });
  } else {
    resultadosAPI = JSON.parse(objConsultasAPI);
    llenadoGeneralSliders(resultadosAPI);
  }
});

function llenadoGeneralSliders(rta) {
  if (location.pathname === "/" || location.pathname === "/index.html") {
    llenandoSlider(rta.recomendados, ".slider-presentacion");
    llenandoSlider(rta.arregloMovies.slice(0, 10), ".slider-peliculas");
    llenandoSlider(rta.arregloSeries.slice(0, 10), ".slider-series");
  } else if (location.pathname === "/peliculas.html") {
    llenandoSlider(rta.arregloMovies.slice(0, 10), ".slider-peliculas-page");
    llenandoSlider(rta.arregloEstrenos, ".slider-estrenos");
  } else if (location.pathname === "/series.html") {
    llenandoSlider(rta.arregloSeries.slice(0, 10), ".slider-popu-series");
  }
}
