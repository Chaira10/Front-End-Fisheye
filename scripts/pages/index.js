async function getPhotographers() {
    try {
        // Cette ligne utilise la fonction fetch pour envoyer une requête HTTP GET au fichier JSON des photographes
        const response = await fetch("../../data/photographers.json");

        // Cette ligne utilise la méthode json() pour extraire les données JSON de la réponse HTTP
        const data = await response.json();

        // Cette ligne retourne un objet contenant les photographes extraits du fichier JSON
        return { photographers: data.photographers };
    } catch (error) {
        // En cas d'erreur lors de la requête ou de l'extraction des données JSON, cette ligne affiche l'erreur dans la console
        console.error(error);
    }
}


async function displayData(photographers) {
    // Cette ligne utilise la méthode querySelector pour sélectionner l'élément HTML ayant la classe "photographer_section"
    const photographersSection = document.querySelector(".photographer_section");

    // Cette ligne utilise la méthode forEach pour itérer sur chaque élément du tableau des photographes
    photographers.forEach((photographer) => {
        // Cette ligne utilise une fonction appelée photographerFactory pour créer un modèle de photographe à partir des données du photographe actuel
        const photographerModel = photographerFactory(photographer);

        // Cette ligne utilise la méthode getUserCardDOM() du modèle de photographe pour obtenir l'élément DOM de la carte utilisateur
        const userCardDOM = photographerModel.getUserCardDOM();

        // Cette ligne ajoute l'élément DOM de la carte utilisateur à la section des photographes
        photographersSection.appendChild(userCardDOM);
    });
}


async function init() {
    // Récupère les données des photographes en appelant la fonction asynchrone getPhotographers()
    const { photographers } = await getPhotographers();

    // Appelle la fonction displayData() pour afficher les données des photographes
    displayData(photographers);
}

// Appelle la fonction init() pour initialiser l'affichage des données des photographes
init();

    
