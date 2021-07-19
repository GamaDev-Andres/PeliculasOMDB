function abirCerrarMenu() {
    const botonCerrar = document.querySelector(".boton-cerrar");
    const botonAbrir = document.querySelector(".boton-abrir");
    const contenedorMenu = document.querySelector(".contenedor-menu");
    document.addEventListener("click", (e) => {
        if (e.target === botonAbrir || botonAbrir.contains(e.target)) {
            contenedorMenu.classList.toggle("menu-activo");
            return;
        }
        if (e.target === botonCerrar || botonCerrar.contains(e.target)) {
            contenedorMenu.classList.toggle("menu-activo");
            return;
        }

        if (!contenedorMenu.contains(e.target)) {
            const menuResponsivo = document.querySelector(".menu-activo");

            if (menuResponsivo) {
                contenedorMenu.classList.toggle("menu-activo");
            }
        }
    });
}
export default abirCerrarMenu;
