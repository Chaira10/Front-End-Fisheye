function MediaFactory(media, photographeId) {
  // Récupère un tableau des clés des données du média
  const props = Object.keys(media);
  // Crée un élément <article> pour le média
  const article = document.createElement('article');
  article.setAttribute('class', 'photograph-article');
  // Obtient le type du média à partir des clés
  const TypeMedia = props[3];

  // Sélectionne l'élément DOM de la lightbox
  const lightbox = document.querySelector('.lightbox');

  // Vérifie le type du média
  if (TypeMedia == 'image') {
    // Crée un élément <img> pour l'image
    const img = document.createElement('img');
    img.setAttribute('class', 'media');
    img.setAttribute('tabindex', '7');
    img.setAttribute('width', '500');
    img.setAttribute('height', '500');
    // Définit le lien de l'image en fonction du photographe et du média
    const LinkImage = `assets/photographers/${photographeId}/${media.image}`;
    img.setAttribute('src', LinkImage);
    img.setAttribute('alt', `image de ${media.title}`);
    img.setAttribute('aria-label', 'ouvre la vue lightBox');
    article.appendChild(img);

    // Ajoute un écouteur d'événement pour ouvrir la lightbox lors du clic ou de la touche Entrée
    img.addEventListener('click', () => {
      lightbox.style.display = 'block';
      document.querySelector('.lightbox').focus();
      loadImage(TypeMedia, LinkImage, media.title);
    });
    img.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        lightbox.style.display = 'block';
        lightbox.focus();
        loadImage(TypeMedia, LinkImage, media.title);
      }
    });
  } else if (TypeMedia == 'video') {
    // Crée un élément <video> pour la vidéo
    const video = document.createElement('video');
    video.setAttribute('class', 'media');
    video.setAttribute('tabindex', '7');
    video.setAttribute('width', '500');
    video.setAttribute('height', '500');
    // Définit le lien de la vidéo en fonction du photographe et du média
    const LinkVideo = `assets/photographers/${photographeId}/${media.video}`;
    video.setAttribute('src', LinkVideo);
    video.setAttribute('aria-label',' ouvre la vue lightBox');
    article.appendChild(video);

    // Ajoute un écouteur d'événement pour ouvrir la lightbox lors du clic ou de la touche Entrée
    video.addEventListener('click', () => {
      lightbox.style.display = 'block';
      loadImage(TypeMedia, LinkVideo, media.title);
    });
    video.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        lightbox.style.display = 'block';
        loadImage(TypeMedia, LinkVideo, media.title);
      }
    });
  }
const spanContainer = document.createElement('span');
spanContainer.classList.add('span-container');

  // Crée un élément <div> pour le titre du média
  const div = document.createElement('div');
  div.setAttribute('class', 'media-title');

  // Crée un élément <p> pour le titre
  const pTitle = document.createElement('p');
  pTitle.setAttribute('class', 'title');
  pTitle.setAttribute('tabindex', '7');
  pTitle.textContent = media.title;
  div.appendChild(pTitle);
  // Crée un élément <div> pour les likes du média
  const divLikes = document.createElement('div');
  divLikes.setAttribute('class','media-likes');

  // Crée un élément <p> pour afficher le nombre de likes
  const pLikes = document.createElement('p');
  pLikes.setAttribute('class', 'likes');
  pLikes.setAttribute('id', 'AllLikes');
  pLikes.textContent = media.likes;
  divLikes.appendChild(pLikes);
  // Crée un élément <i> pour l'icône de like
  const iconHeart = document.createElement('i');
  iconHeart.setAttribute('class', 'fa-solid fa-heart');
  iconHeart.setAttribute('aria-label', 'likes');
  iconHeart.setAttribute('tabindex', '7');
  divLikes.appendChild(iconHeart);

  // Ajoute des écouteurs d'événement pour incrémenter les likes au clic ou à la touche Entrée
  iconHeart.addEventListener('click', () => {
    pLikes.innerHTML++;
    const AllLikes = document.getElementById('AllLikes');
    AllLikes.innerHTML++;
  });
  iconHeart.addEventListener('keydown', (e) => {
    if (e.key != 'Enter') {
      return;
    }
    pLikes.innerHTML++;
    const AllLikes = document.getElementById('AllLikes');
    AllLikes.innerHTML++;
  });

  // Ajoute des écouteurs d'événement pour modifier l'apparence de l'icône de like au survol
  iconHeart.addEventListener('mouseenter', () => {
    iconHeart.style.cursor = 'pointer';
    iconHeart.setAttribute('class', 'fa-solid fa-heart-circle-plus');
  });
  iconHeart.addEventListener('mouseleave', () => {
    iconHeart.setAttribute('class', 'fa-solid fa-heart');
  });
  spanContainer.appendChild(div);
  spanContainer.appendChild(divLikes);


  // Ajoute les éléments au DOM
  // divLikes.appendChild(pLikes);
  // divLikes.appendChild(iconHeart);
  // div.appendChild(pTitle);
  // div.appendChild(divLikes);
  article.appendChild(spanContainer);

  return article;
}
