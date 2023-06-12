// Variables globales pour stocker les informations sur les médias et la lightbox
let mediaData = []; // Tableau contenant les données des médias
let currentMediaIndex = 0; // Index du média actuellement affiché dans la lightbox

// Fonction pour ouvrir la lightbox avec le média spécifié
function openLightbox(mediasData , e) {
    // console.log(e.target.parentElement.dataset.id);

    let index = e?.target ? mediasData.findIndex(m => m.id === parseInt(e.target.parentElement.dataset.id)) : e
    console.log(index);
  // Récupérer l'élément de la lightbox
  const lightbox = document.getElementById('lightbox');
  lightbox.setAttribute('aria-label', 'image closup view');
  lightbox.setAttribute('role', 'dialog');

  // Récupérer l'élément pour afficher le média
  const lightboxContent = document.querySelector('.lightbox-content');

  


  // Mettre à jour l'index du média actuellement affiché
  currentMediaIndex = index;

  // Récupérer les informations sur le média
  const media = mediaData[currentMediaIndex];
// const media = mediaFactory(mediaData[currentMediaIndex]);

  console.log(media);
  let lightboxMedia = document.createElement('div');
  lightboxMedia.classList.add('lightbox-medias');

  let title = document.createElement('h2');
  title.classList.add('lightbox-title');

//   Vérifier si la propriété 'image' existe dans l'objet 'media'
  if (media.image) {
  console.log(media.image);
    const image = document.createElement('img');
    image.setAttribute('src' , `assets/photographers/${media.photographerId}/${media.image}`);
    image.setAttribute('alt', media.title );
    image.setAttribute('width', '800' );
    image.setAttribute('height', '500' );
    image.classList.add('lightbox-media');
    lightboxMedia.appendChild(image);
    title.textContent = media.title;
    lightboxMedia.appendChild(title);
  } else if (media.video) {
    const video = document.createElement('video');
    video.setAttribute('src' , `assets/photographers/${media.photographerId}/${media.video}`);
    video.setAttribute('alt', media.title );
    video.setAttribute('controls', '');
    video.setAttribute('width', '800' );
    video.setAttribute('height', '500' );
    video.classList.add('lightbox-media');
    lightboxMedia.appendChild(video);
    title.textContent = media.title;
    lightboxMedia.appendChild(title);
  } 



  const closeButton = document.createElement('button');
  // closeButton.textContent = 'x';
  closeButton.classList.add('btn-close');
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.setAttribute('aria-label', 'Close dialog');

  const prevButton = document.createElement('a');
  // prevButton.textContent = '<';
  prevButton.classList.add('btn-prev');
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.setAttribute('aria-label', 'Previous image');
  prevButton.href = '#';

  const nextButton = document.createElement('a');
  // nextButton.textContent = '>';
  nextButton.classList.add('btn-next');
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.setAttribute('aria-label', 'Next image');
  nextButton.href = '#';

    // Vérifier la visibilité des boutons
    if (currentMediaIndex === 0) {
      prevButton.classList.add('hide');
    } else {
      prevButton.classList.remove('hide');
    }
  
    if (currentMediaIndex === mediaData.length - 1) {
      nextButton.classList.add('hide');
    } else {
      nextButton.classList.remove('hide');
    }

    // Fonction pour afficher le média précédent
    function showPreviousMedia() {
      if (currentMediaIndex > 0) {
        currentMediaIndex--;
        openLightbox(mediaData, currentMediaIndex)
      }
    }
    
    // Fonction pour afficher le média suivant
    function showNextMedia() {
      if (currentMediaIndex < mediaData.length - 1) {
        currentMediaIndex++;
        openLightbox(mediaData, currentMediaIndex)
      }
    }


    





  // Ajouter les écouteurs d'événements de clic aux boutons
  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', showPreviousMedia);
  nextButton.addEventListener('click', showNextMedia);

  // Vider le contenu existant de la lightbox
  lightboxContent.innerHTML = '';

  // Créer les conteneurs pour les éléments
  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  // titleContainer.appendChild(title);

  const lightboxMediaContainer = document.createElement('div');
  lightboxMediaContainer.classList.add('lightbox-container');
  lightboxMediaContainer.appendChild(lightboxMedia);
  // lightboxMediaContainer.appendChild(title);




  const closeButtonContainer = document.createElement('div');
  closeButtonContainer.appendChild(closeButton);

  const prevButtonContainer = document.createElement('div');
  prevButtonContainer.appendChild(prevButton);

  const nextButtonContainer = document.createElement('div');
  nextButtonContainer.appendChild(nextButton);



  // Ajouter les conteneurs à la lightbox
  lightboxContent.appendChild(lightboxMediaContainer);
  lightboxContent.appendChild(closeButtonContainer);
  lightboxContent.appendChild(prevButtonContainer);
  lightboxContent.appendChild(nextButtonContainer);
  // lightboxContent.appendChild(titleContainer);
  // Afficher la lightbox
  lightbox.style.display = 'block';

  // Fonction pour fermer la lightbox
function closeLightbox() {
  // Récupérer l'élément de la lightbox
  const lightbox = document.getElementById('lightbox');

  // Cacher la lightbox
  lightbox.style.display = 'none';
}


}



// Obtenir l'ID du photographe à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');



// Fonction pour charger les données des médias du photographe
async function loadPhotographerMedia(photographerId) {
  try {
    // Effectuer une requête HTTP GET pour récupérer les données des médias du photographe
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();
    console.log(data);
    // Récupérer le tableau des médias à partir des données
    const mediasData = data.media;
    console.log(mediasData);
    // Filtrer les médias pour récupérer uniquement ceux du photographe spécifié par son ID
    // mediaData = mediasData.filter(media => media.photographerId.toString() === photographerId.toString());
    mediaData = mediasData.filter(media => media.photographerId === parseInt(photographerId));
    // console.log(mediaData[index].photographerId);

    // mediaData = mediasData.filter(media => media.hasOwnProperty('photographerId') && media.photographerId.toString() === photographerId.toString());


    // Ajouter des écouteurs d'événements de clic sur les médias pour ouvrir la lightbox
    const mediaElements = document.querySelectorAll('.media');
    console.log(mediaElements, mediaData, mediasData);
    mediaElements.forEach((mediaElement,) => {
        // console.log(photographerId);
      mediaElement.addEventListener('click', (e) => openLightbox(mediaData, e));
    });
  } catch (error) {
    console.error(error);
  }
}
// Appeler la fonction pour charger les médias du photographe
loadPhotographerMedia(parseInt(photographerId));




