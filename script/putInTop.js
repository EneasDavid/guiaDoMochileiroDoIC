//pull in top
window.addEventListener('scroll', function() {
    /**
     * Botão que leva o usuário de volta ao topo da página.
     * @type {HTMLElement}
     */
    var backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY >= 100) { // Exibir o botão quando a página é rolada para baixo 100 pixels
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  document.getElementById('back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Rolagem suave de volta ao topo
  });
  