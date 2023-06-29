function photographerFactory (data, index) {
  const { name, id, city, country, tagline, price, portrait } = data;

  const picture = `assets/photographers/PhotographersID/${portrait}`;

  function getUserCardDOM () {
    // Crée un élément <article> pour représenter la carte du photographe
    const article = document.createElement('article');
    article.classList.add('photographer-card', 'card-photographer'); // Ajoute des classes à l'élément <article>
    // article.setAttribute('tabindex', '1'); // Ajoute l'attribut "tabindex" pour permettre le focus  // Utilise l'index comme valeur tabindex
    // Crée une div pour contenir l'image du photographe
    const divImg = document.createElement('div');
    divImg.classList.add('img-container', 'container-img');

    // Crée un élément <img> pour l'image du photographe
    const img = document.createElement('img');
    img.classList.add('card-img', 'img'); // Ajoute des classes à l'élément <img>
    img.setAttribute('src', picture); // Définit l'attribut "src" avec le chemin de l'image
    img.setAttribute('alt', name); // Définit l'attribut "alt" avec la valeur du nom
    img.setAttribute('data-id', id); // Définit l'attribut "data-id" avec la valeur de l'ID
    img.setAttribute('id', 'img-card'); // Définit l'attribut "id" avec la valeur "img-card"
    // img.setAttribute('tabindex', '2'); // Ajoute l'attribut "tabindex" pour permettre le focus
    divImg.appendChild(img); // Ajoute l'image à la div d'images
    article.appendChild(divImg); // Ajoute la div d'images à l'élément <article>

    // Crée une div pour le texte des informations du photographe
    const div = document.createElement('div');
    div.classList.add('card-text', 'text-card');

    // Crée un élément <h2> pour le nom du photographe
    const h2 = document.createElement('h2');
    h2.classList.add('card-name', 'name-card'); // Ajoute des classes à l'élément <h2>
    h2.textContent = name; // Définit le contenu textuel avec le nom du photographe
    // h2.setAttribute('tabindex', '3'); // Ajoute l'attribut "tabindex" pour permettre le focus
    div.appendChild(h2); // Ajoute le <h2> à la div de texte

    // Crée un élément <span> pour la ville et le pays du photographe
    const span1 = document.createElement('span');
    span1.classList.add('card-city', 'city-card'); // Ajoute des classes à l'élément <span>
    span1.textContent = ` ${city}, ${country}`; // Définit le contenu textuel avec la ville et le pays
    // span1.setAttribute('tabindex', '4'); // Ajoute l'attribut "tabindex" pour permettre le focus
    div.appendChild(span1); // Ajoute le <span> à la div de texte

    // Crée un élément <p> pour la tagline du photographe
    const p1 = document.createElement('p');
    p1.classList.add('card-tagline', 'tagline-card'); // Ajoute des classes à l'élément <p>
    p1.textContent = tagline; // Définit le contenu textuel avec la tagline
    // p1.setAttribute('tabindex', '5'); // Ajoute l'attribut "tabindex" pour permettre le focus
    div.appendChild(p1); // Ajoute le <p> à la div de texte

    // Crée un élément <p> pour le prix du photographe
    const p2 = document.createElement('p');
    p2.classList.add('card-price', 'price-card'); // Ajoute des classes à l'élément <p>
    p2.textContent = ` ${price}$ / jour`; // Définit le contenu textuel avec le prix
    // p2.setAttribute('tabindex', '6'); // Ajoute l'attribut "tabindex" pour permettre le focus
    div.appendChild(p2); // Ajoute le <p> à la div de texte

    article.appendChild(div); // Ajoute la div de texte à l'élément <article>

    // Ajoute un événement de clic sur l'image pour naviguer vers la page du photographe
    img.addEventListener('click', () => {
      window.location.href = `photographer.html?id=${id}`;
    });

    img.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        window.location.href = `photographer.html?id=${id}`;
      }
    });
    function toggleFocus (element) {
      element.addEventListener('focus', () => {
        element.classList.add('focused');
      });

      element.addEventListener('blur', () => {
        element.classList.remove('focused');
      });
    }

    toggleFocus(img);
    toggleFocus(h2);
    toggleFocus(span1);
    toggleFocus(p1);
    toggleFocus(p2);

    return article; // Retourne l'élément <article> représentant la carte du photographe
  }

  // Retourne un objet contenant les informations du photographe et la fonction getUserCardDOM()
  return { name, id, city, country, tagline, price, picture, getUserCardDOM };
}
