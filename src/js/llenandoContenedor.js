// HACE UNA GRILLA DE CARDS
export function llenandoContenedor(arr, id) {
    const contenedor = document.getElementById(id);
    let fragmento = document.createDocumentFragment();
    arr.forEach((el) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <div class="card"  id="${el.id}"  >
            <div class="imagen">
              <img src="${el.image}">
            </div>
             <div class="descripcion">
                <h3 title="${el.title}"><a href="detalles.html?id=${el.id}">${
            el.title.length > 15 ? el.title.slice(0, 12) + "..." : el.title
        }</a></h3>
        ${
            id.startsWith("250") || id === "contenedor-busqueda"
                ? `<div class="generos">

                    <p>${el.year || el.description}</p>
                    <button class="agregar" id="${
                        el.id
                    }" title="ver mas tarde"><i class="fas fa-plus-circle"></i></button>
                </div>`
                : `<div class="botones">                 
                    <button class="boton eliminar">Eliminar</button>
                    <button class="boton ver" verId=${el.id} >Ver</button>
                </div>`
        }
                
            </div>
           
        </div>
        `;
        fragmento.appendChild(div);
    });

    contenedor.appendChild(fragmento);
}
