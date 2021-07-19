import "../styles/style.scss";
import { glide, glidePelis, glideSeries } from "./glide";
import { consultaApiPresentacion, llenandoSlider } from "./fetchPresentacion";
import abrirCerrarMenu from "./abrirCerrarMenu";
import { consultaApi } from "./fetchPelisPoulares";

document.addEventListener("DOMContentLoaded", () => {
  // FETCH PRESENTACION
  let resultadosPresentacion = consultaApiPresentacion();
  resultadosPresentacion.then((rta) =>
    llenandoSlider(rta, ".slider-presentacion")
  );

  // FETCH DE PELICULAS
  let resultadosPeliculas = consultaApi(
    "https://imdb-api.com/en/API/MostPopularMovies/k_ddtp65e3"
  );
  resultadosPeliculas.then((rta) => {
    console.log(rta);
    llenandoSlider(rta, ".slider-peliculas");
  });
  let resultadosSeries = consultaApi(
    "https://imdb-api.com/en/API/MostPopularTVs/k_ddtp65e3"
  );
  resultadosSeries.then((rta) => llenandoSlider(rta, ".slider-series"));

  abrirCerrarMenu();
});
