/* ====================================================== */
/* ==============  header page photographe ============== */
/* ====================================================== */

function getParamFromUrl (id) {
  // Récupère la chaîne de requête de l'URL actuelle
  const queryString = window.location.search;
  console.log(window.location);
  console.log(queryString);
  // Crée un nouvel objet URLSearchParams à partir de la chaîne de requête
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get(id));
  // Utilise la méthode get() de l'objet urlParams pour obtenir la valeur du paramètre spécifié
  // La valeur du paramètre est renvoyée en tant que résultat de la fonction
  return parseInt(urlParams.get(id));
}

/* ====================================================== */
// Récupérez l'ID du photographe à partir de l'URL
const photographeId = getParamFromUrl('id');

async function getPhotographers () {
  try {
    // Effectue une requête HTTP GET en utilisant la fonction fetch() pour récupérer les données des photographes à partir du fichier JSON
    const response = await fetch('../../data/photographers.json');

    // Attend que la réponse de la requête soit résolue et convertit la réponse en format JSON
    const data = await response.json();

    // Retourne un objet contenant les données des photographes
    return { photographers: data.photographers };
  } catch (error) {
    // En cas d'erreur, affiche l'erreur dans la console
    console.error(error);
  }
}

/* ====================================================== */
// Filtrer les données pour récupérer le photographe dont l'ID correspond à celui de l'URL
async function getPhotographerById (id) {
  // Récupère les données des photographes en utilisant la fonction getPhotographers()
  const { photographers } = await getPhotographers();

  let foundPhotographer = null;
  photographers.forEach((photographer) => {
    if (photographer.id === id) {
      foundPhotographer = photographer;
    }
  });
  return foundPhotographer;
}

/* ====================================================== */
// Utilisez la fonction photographerFactory pour créer une carte de photographe à partir des données récupérées et insérez-la dans le DOM
async function displayPhotographerData () {
  // Récupère le photographe en utilisant la fonction getPhotographerById() avec l'ID spécifié (photographeId)
  const photographer = await getPhotographerById(photographeId);
  console.log(photographer);
  // Récupère le nom du photographe à partir de l'objet photographer
  const photographerName = photographer.name;
  // Utilise la fonction photographerFactory() pour créer un modèle de photographe basé sur l'objet photographer
  /* eslint-disable no-undef */
  const photographerModel = photographerFactory(photographer);
  // Récupère l'élément du DOM avec l'ID 'photographer-container'
  const photographerContainer = document.getElementById('photographer-container');
  // Obtient la carte utilisateur (élément <article>) du modèle de photographe en appelant la fonction getUserCardDOM()
  const photographerCard = photographerModel.getUserCardDOM();
  // Ajoute la carte utilisateur à l'élément 'photographer-container' dans le DOM
  photographerContainer.appendChild(photographerCard);
  const article = document.querySelector('.photographer-card');
  const image = article.querySelector('.img-container');
  const text = article.querySelector('.card-text');
  // selectionne le container à supprimer
  const imgNameDiv = article.querySelector('.img-name');
  // selectionne le name du photographe
  const name = article.querySelector('.card-name');
  text.insertBefore(name, text.firstChild);
  // Insérer le contenu de l'élément .img-container avant le conteneur .img-name
  imgNameDiv.parentNode.insertBefore(image, imgNameDiv);
  // Déplacez le texte avant l'image
  article.insertBefore(text, image);
  // Récupérer tous les éléments enfants du conteneur .img-name
  const children = Array.from(imgNameDiv.children);
  // Supprimer le conteneur .img-name et ses autres enfants
  children.forEach(function (child) {
    imgNameDiv.removeChild(child);
  });
  // Supprimer le conteneur .img-name lui-même
  imgNameDiv.parentNode.removeChild(imgNameDiv);
  /* ====================================================== */
  // Ajout du nom du photographe dans la modal
  // Récupère l'élément du DOM avec l'ID 'title-modal'
  const title = document.getElementById('title-modal');
  // Modifie le contenu textuel de l'élément 'title' avec le nom du photographe
  title.innerHTML = `Contactez moi <br> ${photographerName}`;
  // Récupère le bouton de contact à partir de son ID
  const btnContact = document.getElementById('btn-contact');
  // Définit l'attribut aria-label du bouton avec une valeur contenant le nom du photographe
  btnContact.setAttribute('aria-label', `Contact me ${photographerName}`);

  /* ====================================================== */
  // Remplacer le paragraphe du prix par le boutton contactz moi
  // Sélectionne l'élément du DOM avec la classe CSS 'card-price'
  const price = document.querySelector('.card-price');
  // Remplace l'élément 'price' par le bouton 'btnContact'
  price.replaceWith(btnContact);

  /* ====================================================== */
  /* ==========  ajout tabindex dynamiquement  ============ */
  /* ====================================================== */

  const navbarLinks = document.querySelectorAll('header nav a');
  const articleElements = document.querySelectorAll('.card-name, .card-city, .tagline-card, .contact_button, #img-card');
  const form = document.getElementById('contact-form');
  const formElements = form.querySelectorAll('input, textarea, button');
  const modalTitle = document.querySelector('.modal-title');
  const headerForm = modalTitle.querySelectorAll(' #title-modal, .close');
  navbarLinks.forEach((link, index) => {
    link.setAttribute('tabindex', index + 1);
  });

  articleElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + navbarLinks.length + 1);
  });

  headerForm.forEach((element, index) => {
    element.setAttribute('tabindex', index + navbarLinks.length + articleElements.length + 1);
  });

  formElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + 1);
  });
}

// Appelle la fonction displayPhotographerData() pour afficher les données du photographe
displayPhotographerData();

/* ====================================================== */
/* ================  main page photographe  ============= */
/* ====================================================== */

/* ====================================================== */
// Récupérer les médias du photographe en utilisant sa fonctionnalité spécifique
async function getPhotographerMedia (photographerId) {
  try {
    // Effectue une requête HTTP GET pour récupérer les données des photographes
    const response = await fetch('../../data/photographers.json');
    const data = await response.json();

    // Récupère le tableau des médias à partir des données
    const mediaData = data.media;

    // Filtrer les médias pour récupérer uniquement ceux du photographe spécifié par son ID
    const photographerMedia = mediaData.filter(
      (media) => media.photographerId === photographerId
    );

    return photographerMedia;
  } catch (error) {
    console.error(error);
  }
}

/* ====================================================== */
// fonctions pour trier les médias
// Tri des médias par date (du plus récent au plus ancien)
function sortMediaByDate (media) {
  return media.sort((a, b) => new Date(b.date) - new Date(a.date));
}
/* ====================================================== */
// Tri des médias par nombre de likes (du plus élevé au plus bas)
function sortMediaByLikes (media) {
  return media.sort((a, b) => b.likes - a.likes);
}
/* ====================================================== */
// Tri des médias par titre (par ordre alphabétique)
function sortMediaByTitle (media) {
  return media.sort((a, b) => a.title.localeCompare(b.title));
}

/* ====================================================== */
// Utilisez la fonction mediaFactory pour créer des cartes de médias à partir des données récupérées et insérez-les dans le DOM
async function displayPhotographerMedia () {
  // Récupère les médias du photographe en utilisant la fonction getPhotographerMedia() avec l'ID du photographe (photographeId)
  const photographerMedia = await getPhotographerMedia(photographeId);
  // Récupère l'élément du DOM dans lequel les médias doivent être affichés
  const mediaContainer = document.getElementById('media-container');
  // Efface le contenu précédent du conteneur des médias
  mediaContainer.innerHTML = '';
  // Tri des médias en fonction de la valeur sélectionnée dans le menu déroulant
  const sortFilterElement = document.getElementById('sort-filter');
  const selectedSortOption = sortFilterElement.value;
  let sortedMedia;
  switch (selectedSortOption) {
    case 'popularity':
      sortedMedia = sortMediaByLikes(photographerMedia);
      break;
    case 'date':
      sortedMedia = sortMediaByDate(photographerMedia);
      break;
    case 'title':
      sortedMedia = sortMediaByTitle(photographerMedia);
      break;
    default:
      sortedMedia = photographerMedia;
      break;
  }
  const selectElement = document.getElementById('sort-filter');
  selectElement.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      selectElement.click();
    }
  });
  selectElement.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      selectElement.classList.add('dropdown-open');
    } else if (event.key === 'Enter') {
      selectElement.click();
    }
  });
  // Parcours chaque média du photographe
  sortedMedia.forEach((mediaData) => {
    const mediaCard = MediaFactory(mediaData, photographeId);
    mediaCard.addEventListener('click', () => {
      loadImage(mediaData.image ? 'image' : 'video', `assets/photographers/${photographeId}/${mediaData.image || mediaData.video}`, mediaData.title);
    });
    mediaContainer.appendChild(mediaCard);
  });

  /* ====================================================== */
  /* ==========  ajout tabindex dynamiquement main ======== */
  /* ====================================================== */
  const navbarLinks = document.querySelectorAll('header nav a');
  const articleElements = document.querySelectorAll('.card-name, .card-city, .tagline-card, .contact_button, #img-card');
  const modalTitle = document.querySelector('.modal-title');
  const headerForm = modalTitle.querySelectorAll(' #title-modal, .close');
  const filterElements = document.querySelectorAll('#sort-filter');
  const mediaElements = document.querySelectorAll('.photograph-article img,.photograph-article video,.photograph-article .media-title p ,.photograph-article .fa-heart');
  const lightboxElements = document.querySelectorAll('.lightbox, .lightbox_img_container,.lightbox_img, .lightbox_video, .lightbox_description, .lightbox_prev, .lightbox_next, .lightbox_close   ');
  // ajouter tabindex lightbox,
  const footerLength = 2;

  filterElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + 1);
  });

  mediaElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + filterElements.length + 1);
  });

  lightboxElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + filterElements.length + mediaElements.length + footerLength + 1);
  });
}

// Appelle la fonction displayPhotographerMedia() pour afficher les médias du photographe
displayPhotographerMedia();

/* ====================================================== */
// Ecouteur d'événement pour le changement de filtre
const sortFilterElement = document.getElementById('sort-filter');
sortFilterElement.addEventListener('change', displayPhotographerMedia);

/* ====================================================== */
/* ===============  affichage de l'encart =============== */
/* ====================================================== */

//  Affiche les détails du photographe,  tarif journalier et  nombre total de likes
async function displayPhotographerDetails () {
  // Récupère l'élément du DOM dans lequel les détails du photographe doivent être affichés
  const footerElement = document.getElementById('footer');

  // Récupère les informations du photographe en utilisant la fonction getPhotographerById() avec l'ID spécifié (photographeId)
  const photographer = await getPhotographerById(photographeId);

  // Récupère le tarif journalier du photographe
  const photographerPrice = photographer.price;

  // Récupère le nombre total de likes
  const totalLikes = await calculateTotalLikes();

  // Affiche l'encart en bas de page avec le tarif journalier et le nombre total de likes
  footerElement.innerHTML = `<p class="p-like">${totalLikes}<i class="fa-sharp fa-solid fa-heart"></i></p><p class="p-price">${photographerPrice}€ /jour</p> `;

  const footerElements = document.querySelectorAll('.p-like, .p-price');
  const navbarLinks = document.querySelectorAll('header nav a');
  const articleElements = document.querySelectorAll('.card-name, .card-city, .tagline-card, .contact_button, #img-card');
  const modalTitle = document.querySelector('.modal-title');
  const headerForm = modalTitle.querySelectorAll(' #title-modal, .close');
  const filterElements = document.querySelectorAll('#sort-filter');
  const mediaElements = document.querySelectorAll('.photograph-article img,.photograph-article video,.photograph-article .media-title p ,.photograph-article .fa-heart');
  const lightboxElements = document.querySelectorAll('.lightbox, .lightbox_img_container,.lightbox_img, .lightbox_video, .lightbox_description, .lightbox_prev, .lightbox_next, .lightbox_close   ');
  console.log(footerElement.length);

  footerElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + filterElements.length + mediaElements.length + 1);
    console.log(element);
  });

  lightboxElements.forEach((element, index) => {
    element.setAttribute('tabindex', index + headerForm.length + navbarLinks.length + articleElements.length + filterElements.length + mediaElements.length + footerElements.length + 1);
    console.log(element);
  });
  console.log(footerElements.length);
}
/* ====================================================== */
// Calculer le nombre total de likes
async function calculateTotalLikes () {
  const mediaData = await getPhotographerMedia(photographeId);
  let totalLikes = 0;

  mediaData.forEach(media => {
    totalLikes += media.likes;
  });

  return totalLikes;
}

displayPhotographerDetails();
