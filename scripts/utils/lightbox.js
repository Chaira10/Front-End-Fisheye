// DOM Lightbox
const lightboxImage = document.querySelector('.lightbox_img');
const lightboxVideo = document.querySelector('.lightbox_video');
const lightboxDescription = document.querySelector('.lightbox_description');
const lightboxNext = document.querySelector('.lightbox_next');
const lightboxPrev = document.querySelector('.lightbox_prev');
const lightboxClose = document.querySelector('.lightbox_close');
const lightbox = document.querySelector('.lightbox');

// Je garde une trace du dernier média affiché
let LastTypeMedia = '';
let LastLinkMedia = '';
// eslint-disable-next-line no-unused-vars
let LastTitleMedia = '';
let IsLightboxOpen = false;

// Ajoute un écouteur d'événement pour passer au média suivant
lightboxNext.addEventListener('click', () => {
  NextMedia();
});

// Ajoute un écouteur d'événement pour passer au média précédent
lightboxPrev.addEventListener('click', () => {
  PreviousMedia();
});

// Ajoute un écouteur d'événement pour fermer la lightbox
lightboxClose.addEventListener('click', () => {
  CloseLightbox();
});

// Ajoute un écouteur d'événement pour fermer la lightbox en appuyant sur la touche Entrée
lightboxClose.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    CloseLightbox();
  }
  if (e.key === 'Tab') {
    lightbox.focus();
  }
});

// Ajoute un écouteur d'événement pour les touches clavier dans la lightbox
lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && IsLightboxOpen) {
    CloseLightbox();
  }
  if (e.key === 'ArrowRight' && IsLightboxOpen) {
    NextMedia();
  }
  if (e.key === 'ArrowLeft' && IsLightboxOpen) {
    PreviousMedia();
  }
});

// Fonction pour charger le média dans la lightbox
function loadImage (TypeMedia, LinkMedia, TitleMedia) {
  switch (TypeMedia) {
    case 'image':
    case 'IMG':
      lightboxVideo.style.display = 'none';
      lightboxImage.style.display = 'block';
      lightboxImage.src = LinkMedia;
      lightboxImage.setAttribute('alt', `image de ${TitleMedia}`);
      break;
    case 'video':
    case 'VIDEO':
      lightboxImage.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = LinkMedia;
      break;
    default:
      console.log('veuillez vérifier le type du Media');
  }
  lightboxDescription.textContent = TitleMedia;

  LastTypeMedia = TypeMedia;
  LastLinkMedia = LinkMedia;
  LastTitleMedia = TitleMedia;
  IsLightboxOpen = true;
  console.log(LastLinkMedia);
}

// Fonction pour passer au média suivant
function NextMedia () {
  // Je récupère un tableau contenant tous les liens des médias
  const AllMediaImg = Array.from(document.querySelectorAll('.media'));
  console.log(AllMediaImg);
  const ArrayLink = AllMediaImg.map(link => link.getAttribute('src'));
  console.log(ArrayLink);
  // Définit l'index de l'image en cours
  let pos = ArrayLink.findIndex(i => i === LastLinkMedia);
  if (pos === ArrayLink.length - 1) {
    pos = -1;
  }

  // Je récupère un tableau contenant tous les titres
  const data = document.querySelectorAll('.title');

  console.log(AllMediaImg[pos + 1].tagName); // Renvoie IMG ou VIDEO

  loadImage(AllMediaImg[pos + 1].tagName, ArrayLink[pos + 1], data[pos + 1].textContent);
}

// Fonction pour passer au média précédent
function PreviousMedia () {
  const AllMediaImg = Array.from(document.querySelectorAll('.media'));
  const ArrayLink = AllMediaImg.map(link => link.getAttribute('src'));
  let pos = ArrayLink.findIndex(i => i === LastLinkMedia);
  console.log(LastLinkMedia);
  if (pos === 0) {
    pos = ArrayLink.length;
    console.log(pos);
  }
  const data = document.querySelectorAll('.title');

  loadImage(AllMediaImg[pos - 1].tagName, ArrayLink[pos - 1], data[pos - 1].textContent);
}

// Fonction pour fermer la lightbox
function CloseLightbox () {
  lightbox.style.display = 'none';
  IsLightboxOpen = false;
  document.querySelector('.media').focus();
}
