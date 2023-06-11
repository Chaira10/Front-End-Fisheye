/* ====================================================== */
/* ==============  header page photographe ============== */
/* ====================================================== */

function getParamFromUrl(param) {
    // Récupère la chaîne de requête de l'URL actuelle
    const queryString = window.location.search;
    // Crée un nouvel objet URLSearchParams à partir de la chaîne de requête
    const urlParams = new URLSearchParams(queryString);
    // Utilise la méthode get() de l'objet urlParams pour obtenir la valeur du paramètre spécifié
    // La valeur du paramètre est renvoyée en tant que résultat de la fonction
    return urlParams.get(param);
  }
  
  // 1. Récupérez l'ID du photographe à partir de l'URL
  const photographeId = getParamFromUrl('id');
  
  async function getPhotographers() {
    try {
      // Effectue une requête HTTP GET en utilisant la fonction fetch() pour récupérer les données des photographes à partir du fichier JSON
      const response = await fetch("../../data/photographers.json");
  
      // Attend que la réponse de la requête soit résolue et convertit la réponse en format JSON
      const data = await response.json();
  
      // Retourne un objet contenant les données des photographes
      return { photographers: data.photographers };
    } catch (error) {
      // En cas d'erreur, affiche l'erreur dans la console
      console.error(error);
    }
  }
  
  // 3. Filtrer les données pour récupérer le photographe dont l'ID correspond à celui de l'URL
  async function getPhotographerById(id) {
    // Récupère les données des photographes en utilisant la fonction getPhotographers()
    const { photographers } = await getPhotographers();
  
    // Utilise la méthode find() sur le tableau des photographes pour trouver le photographe correspondant à l'ID spécifié
    // La fonction de recherche retourne le premier photographe dont l'ID correspond à l'ID spécifié
    return photographers.find((photographer) => photographer.id == id);
  }
  
  // 4. Utilisez la fonction photographerFactory pour créer une carte de photographe à partir des données récupérées et insérez-la dans le DOM
  async function displayPhotographerData() {
    // Récupère le photographe en utilisant la fonction getPhotographerById() avec l'ID spécifié (photographeId)
    const photographer = await getPhotographerById(photographeId);
  
    // Récupère le nom du photographe à partir de l'objet photographer
    const photographerName = photographer.name;
  
    const photographerPrice = photographer.price;
  
    // Utilise la fonction photographerFactory() pour créer un modèle de photographe basé sur l'objet photographer
    const photographerModel = photographerFactory(photographer);
  
    // Récupère l'élément du DOM avec l'ID 'photographer-container'
    const photographerContainer = document.getElementById('photographer-container');
  
    // Obtient la carte utilisateur (élément <article>) du modèle de photographe en appelant la fonction getUserCardDOM()
    const photographerCard = photographerModel.getUserCardDOM();
  
    // Ajoute la carte utilisateur à l'élément 'photographer-container' dans le DOM
    photographerContainer.appendChild(photographerCard);
  
    // Récupère l'élément du DOM avec l'ID 'title-modal'
    const title = document.getElementById('title-modal');
  
    // Modifie le contenu textuel de l'élément 'title' avec le nom du photographe
    title.innerHTML = `Contactez moi <br> ${photographerName}`;
  }
  
  // Appelle la fonction displayPhotographerData() pour afficher les données du photographe
  displayPhotographerData();
  
  /* ====================================================== */
  /* ================  main page photographe  ============= */
  /* ====================================================== */
  
  // ...
  
  // 5. Récupérer les médias du photographe en utilisant sa fonctionnalité spécifique
  async function getPhotographerMedia(photographerId) {
    try {
      // Effectue une requête HTTP GET pour récupérer les données des photographes
      const response = await fetch("../../data/photographers.json");
      const data = await response.json();
  
      // Récupère le tableau des médias à partir des données
      const mediaData = data.media;
  
      // Filtrer les médias pour récupérer uniquement ceux du photographe spécifié par son ID
      const photographerMedia = mediaData.filter(
        (media) => media.photographerId == photographerId
      );
  
      return photographerMedia;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Tri des médias par date (du plus récent au plus ancien)
  function sortMediaByDate(media) {
    return media.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  
  // Tri des médias par nombre de likes (du plus élevé au plus bas)
  function sortMediaByLikes(media) {
    return media.sort((a, b) => b.likes - a.likes);
  }
  
  // Tri des médias par titre (par ordre alphabétique)
  function sortMediaByTitle(media) {
    return media.sort((a, b) => a.title.localeCompare(b.title));
  }
  
  // 7. Utilisez la fonction mediaFactory pour créer des cartes de médias à partir des données récupérées et insérez-les dans le DOM
async function displayPhotographerMedia() {
    // Récupère les médias du photographe en utilisant la fonction getPhotographerMedia() avec l'ID du photographe (photographeId)
    const photographerMedia = await getPhotographerMedia(photographeId);
  
    // Récupère l'élément du DOM dans lequel les médias doivent être affichés
    const mediaContainer = document.getElementById('media-container');
  
    // Efface le contenu précédent du conteneur des médias
    mediaContainer.innerHTML = '';
  
    // Tri des médias en fonction de la valeur sélectionnée dans le menu déroulant
    const sortFilterElement = document.getElementById("sort-filter");
    const selectedSortOption = sortFilterElement.value;
  
    let sortedMedia;
  
    switch (selectedSortOption) {
      case "popularity":
        sortedMedia = sortMediaByLikes(photographerMedia);
        break;
      case "date":
        sortedMedia = sortMediaByDate(photographerMedia);
        break;
      case "title":
        sortedMedia = sortMediaByTitle(photographerMedia);
        break;
      default:
        sortedMedia = photographerMedia;
        break;
    }
  
    // Parcours chaque média du photographe
    sortedMedia.forEach((mediaData) => {
      // Utilise la fonction mediaFactory pour créer un modèle de média basé sur les données du média
      const mediaModel = mediaFactory(mediaData);
  
      // Obtient la carte de média (élément <article>) du modèle de média en appelant la fonction getMediaCardDOM()
      const mediaCard = mediaModel.getMediaCardDOM();
  
      // Ajoute la carte de média à l'élément 'media-container' dans le DOM
      mediaContainer.appendChild(mediaCard);
    });
  
    // Mise à jour des détails du photographe (total de likes et prix journalier)
    // displayPhotographerDetails();
  }
  
  // Appelle la fonction displayPhotographerMedia() pour afficher les médias du photographe
  displayPhotographerMedia();
  
  // ...
  
  // 8. Ecouteur d'événement pour le changement de filtre
  const sortFilterElement = document.getElementById("sort-filter");
  sortFilterElement.addEventListener("change", displayPhotographerMedia);
  
  // ...
  
  // 10. Affiche les détails du photographe, y compris le tarif journalier et le nombre total de likes
  async function displayPhotographerDetails() {
    // Récupère l'élément du DOM dans lequel les détails du photographe doivent être affichés
    const footerElement = document.getElementById('footer');
  
    // Récupère les informations du photographe en utilisant la fonction getPhotographerById() avec l'ID spécifié (photographeId)
    const photographer = await getPhotographerById(photographeId);
  
    // Récupère le tarif journalier du photographe
    const photographerPrice = photographer.price;
  
    // Récupère le nombre total de likes
    const totalLikes = await calculateTotalLikes();
  
    // Affiche l'encart en bas de page avec le tarif journalier et le nombre total de likes
    // footerElement.innerHTML = `<p class="p-like">${totalLikes}<i class="fa-sharp fa-solid fa-heart"></i></p><p class="p-price">${photographerPrice}€ /jour</p> `;
    // Affiche l'encart en bas de page avec le tarif journalier et le nombre total de likes
footerElement.innerHTML = `<p class="p-like">${totalLikes}<i class="fa-sharp fa-solid fa-heart"></i></p><p class="p-price">${photographerPrice}€ /jour</p> `;

  }
  
// Calculer le nombre total de likes
async function calculateTotalLikes() {
    const mediaData = await getPhotographerMedia(photographeId);
    let totalLikes = 0;

    mediaData.forEach(media => {
        totalLikes += media.likes;
    });

    return totalLikes;
}

displayPhotographerDetails();


