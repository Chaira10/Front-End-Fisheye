function photographerFactory(data) {
    const { name,id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/PhotographersID/${portrait}`;

    function getUserCardDOM() {
        // creation de l'élément article
        const article = document.createElement( 'article' );
        article.classList.add('photographer-card', 'card-photographer'); // Ajout d'une classe à l'élément <article>

        // creation div img
        const divImg = document.createElement('div');
        divImg.classList.add('img-container', 'container-img');
        // creation de la balise img
        const img = document.createElement( 'img' );
        img.classList.add('card-img', 'img'); // Ajout d'une classe à l'élément <img>
        // ajout de l'attribut scr + chemin
        img.setAttribute("src", picture);
        img.setAttribute('alt', name); // Ajout de l'attribut "alt" avec la même valeur que "name"
        img.setAttribute('data-id', id); // Ajout de l'attribut data-id 
        img.setAttribute('id', 'img-card'); // Ajout de l'attribut id 
        //ajout de l'image dans la balise article
        divImg.appendChild(img);
        article.appendChild(divImg);

        // creation de la div text
        const div = document.createElement('div');
        div.classList.add('card-text', 'text-card');
        // creation de l'élément h2
        const h2 = document.createElement( 'h2' );
        h2.classList.add('card-name', 'name-card'); // Ajout d'une classe à l'élément <h2>
        // ajout du nom dans le h2
        h2.textContent = name;
        // ajout du h2 dans la div
        div.appendChild(h2);
        //ajout du nom dans la balise article

        // article.appendChild(h2);

        // creation de la balise span
        const span1 = document.createElement( 'span' );
        span1.classList.add('card-city', 'city-card'); // Ajout d'une classe à l'élément <span>
        // ajout de la ville et du pays dans le span
        span1.textContent = ` ${city}, ${country}`;
        // ajout du span dans la balise article
        // article.appendChild( span1 );
        div.appendChild( span1 );

        // creation de la balise p
        const p1 = document.createElement( 'p' );
        p1.classList.add('card-tagline', 'tagline-card'); // Ajout d'une classe à l'élément <p>
        // ajout de la tagline dans le p
        p1.textContent = tagline;
        // ajout du p dans la balise article
        // article.appendChild(p1);
        div.appendChild(p1);

        // creation de la balise p
        const p2 = document.createElement( 'p' );
        p2.classList.add('card-price', 'price-card'); // Ajout d'une classe à l'élément <p>
        // ajout du prix dans le p
        p2.textContent = ` ${price}$ / jour`;
        // ajout du p dans la balise article
        // article.appendChild( p2 );
        div.appendChild( p2 );
        article.appendChild( div );

        // Ajout de l'événement de clic sur l'image pour naviguer vers la page du photographe
        img.addEventListener('click', () => {
        window.location.href = `photographer.html?id=${id}`;
        });

        return (article);
    }
    return { name,id, city, country, tagline, price, picture, getUserCardDOM }
}