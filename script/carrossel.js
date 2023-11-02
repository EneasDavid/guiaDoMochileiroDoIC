var mySwiper = new Swiper('.swiper-container', {
  slidesPerView: 2, // Número fixo de slides visíveis
  spaceBetween: 5, // Espaçamento entre os slides
  loop: true, // Habilitar o loop
  speed: 500, // Velocidade da animação
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 4, // Número de slides visíveis em telas maiores
      freeMode: false, // Desabilitar o modo de rolagem livre
    }
  }
});
