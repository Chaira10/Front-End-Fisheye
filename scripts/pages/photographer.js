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

    // Utilise la fonction photographerFactory() pour créer un modèle de photographe basé sur l'objet photographer
    const photographerModel = photographerFactory(photographer);

    // Récupère l'élément du DOM avec l'ID 'photographer-container'
    const photographerContainer = document.getElementById('photographer-container');

    // Obtient la carte utilisateur (élément <article>) du modèle de photographe en appelant la fonction getUserCardDOM()
    const photographerCard = photographerModel.getUserCardDOM();

    // Ajoute la carte utilisateur à l'élément 'photographer-container' dans le DOM
    photographerContainer.appendChild(photographerCard);

    // Récupère l'élément du DOM avec l'ID 'title-modal'
    const title = document.querySelector('#title-modal');

    // Modifie le contenu textuel de l'élément 'title' avec le nom du photographe
    title.textContent = `Contactez moi ${photographerName}`;
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
        const photographerMedia = mediaData.filter(media => media.photographerId == photographerId);

        // Retourne les médias du photographe
        return photographerMedia;
    } catch (error) {
        console.error(error);
    }
}


// ...

// 7. Utilisez la fonction mediaFactory pour créer des cartes de médias à partir des données récupérées et insérez-les dans le DOM
async function displayPhotographerMedia() {
    // Récupère les médias du photographe en utilisant la fonction getPhotographerMedia() avec l'ID du photographe (photographeId)
    const photographerMedia = await getPhotographerMedia(photographeId);

    // Récupère l'élément du DOM dans lequel les médias doivent être affichés
    const mediaContainer = document.getElementById('media-container');

    // Parcours chaque média du photographe
    photographerMedia.forEach(mediaData => {
        // Utilise la fonction mediaFactory pour créer un modèle de média basé sur les données du média
        const mediaModel = mediaFactory(mediaData);

        // Obtient la carte de média (élément DOM) en appelant la fonction getMediaCardDOM() du modèle de média
        const mediaCard = mediaModel.getMediaCardDOM();

        // Ajoute la carte de média à l'élément 'media-container' dans le DOM
        mediaContainer.appendChild(mediaCard);
    });
}

// Appelle la fonction displayPhotographerMedia() pour afficher les médias du photographe
displayPhotographerMedia();

// ...







