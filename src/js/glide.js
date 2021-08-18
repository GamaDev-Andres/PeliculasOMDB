const config = {
    type: "slider",
    startAt: 0,
    perView: 3,
    focusAt: 0,
    gap: 14,
    autoplay: 3000,

    bound: true,
    breakpoints: {
        1100: {
            perView: 2,
        },
        768: {
            perView: 3,
        },
        480: {
            perView: 2,
        },
    },
};
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
        768: {
            perView: 4,
        },
        480: {
            perView: 2,
        },
    },
};
new Glide(".glide", config).mount();
new Glide(".slider-glide", config2).mount();
new Glide(".slider-glide-series", config2).mount();
