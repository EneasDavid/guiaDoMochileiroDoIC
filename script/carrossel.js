var mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 1,
  speed: 600,
  loop: true, 
  breakpoints: {
    640: {
      slidesPerView: 'auto',
      loop: true,
      speed: 600,
      freeMode: true, // Mantém o modo de rolagem livre em telas maiores
    }
  }
});