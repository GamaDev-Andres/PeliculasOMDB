// import { eliminarVerMasTarde } from ".";
// HACE UNA GRILLA DE CARDS
export function llenandoContenedor(arr, id) {
    const contenedor = document.getElementById(id);
    let fragmento = document.createDocumentFragment();
    arr.forEach((el) => {
        // console.log(el);
        // console.log(arr);
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card"  id="${el.id}"  >
            <div class="imagen">
              <img src="${el.image}">
            </div>
             <div class="descripcion">
                <h3 title="${el.title}"><a href="index.html">${
            el.title.length > 15 ? el.title.slice(0, 12) + "..." : el.title
        }</a></h3>
        ${
            id.startsWith("250")
                ? `<div class="generos">

                    <p>${el.year}</p>
                    <button class="agregar" id="${el.id}" title="ver mas tarde"><i class="fas fa-plus-circle"></i></button>
                </div>`
                : `<div class="botones">                 
                    <button class="boton eliminar">Eliminar</button>
                    <button class="boton ver" >Ver</button>
                </div>`
        }
                
            </div>
           
        </div>
        `;
        fragmento.appendChild(div);
    });

    contenedor.appendChild(fragmento);
    // console.log(fragmento);
}
