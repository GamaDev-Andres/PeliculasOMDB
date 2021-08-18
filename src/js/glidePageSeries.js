const config2 = {
    type: "slider",
    startAt: 0,
    perView: 6,
    focusAt: 0,
    gap: 14,
    autoplay: 3000,

    bound: true,
    breakpoints: {
        1100: {
            perView: 6,
        },
        780: {
            perView: 4,
        },
        480: {
            perView: 2,
        },
    },
};
if (location.pathname === "/series.html") {
    new Glide(".slider-glide", config2).mount();
}
