const config = {
  type: "slider",
  startAt: 0,
  perView: 3,
  focusAt: 0,
  gap: 14,
  autoplay: 3000,
  // size: {
  //     width: 1,
  // },
  bound: true,
  breakpoints: {
    1100: {
      perView: 2,
    },
    780: {
      perView: 3,
    },
    480: {
      perView: 1,
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
  // size: {
  //     width: 1,
  // },
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
new Glide(".glide", config).mount();
new Glide(".slider-glide", config2).mount();
new Glide(".slider-glide-series", config2).mount();
