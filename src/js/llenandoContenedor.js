// import { eliminarVerMasTarde } from ".";
// HACE UNA GRILLA DE CARDS
export function llenandoContenedor(arr, id) {
    const contenedor = document.querySelector(`#${id}`);
    let fragmento = document.createDocumentFragment();
    arr.forEach((el) => {
        // console.log(arr);
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card"  id="${el.id}"  >
            <div class="imagen">
              <img src="${el.img}">
            </div>
             <div class="descripcion">
                <h3 title="${el.titulo}"><a href="index.html">${
            el.titulo.length > 10 ? el.titulo.slice(0, 7) + "..." : el.titulo
        }</a></h3>
                <div class="botones">                 
                    <button class="boton eliminar">Eliminar</button>
                    <button class="boton ver" >Ver</button>
                </div>
            </div>
           
        </div>
        `;
        fragmento.appendChild(div);
    });

    contenedor.appendChild(fragmento);
    console.log(fragmento);
}
