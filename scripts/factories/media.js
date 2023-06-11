function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;

    function getMediaCardDOM() {
        const mediaContainer = document.createElement('div');
        mediaContainer.setAttribute('data-id', id);
        mediaContainer.classList.add('media-card');

        if (image) {
            const imageElement = document.createElement('img');
            imageElement.classList.add('media-image', 'media');
            imageElement.setAttribute('src', `assets/photographers/${photographerId}/${image}`);
            imageElement.setAttribute('alt', title);
            imageElement.setAttribute('width', '500');
            imageElement.setAttribute('height', '500');
            mediaContainer.appendChild(imageElement);
        } else if (video) {
            const videoElement = document.createElement('video');
            videoElement.classList.add('media-video', 'media');
            videoElement.setAttribute('src', `assets/photographers/${photographerId}/${video}`);
            videoElement.setAttribute('alt', title);
            videoElement.setAttribute('width', '500');
            videoElement.setAttribute('height', '500');
            videoElement.setAttribute('controls', '');
            mediaContainer.appendChild(videoElement);
        }


        const spanContainer = document.createElement('div');
        spanContainer.classList.add('span-title');


        const titleElement = document.createElement('h3');
        titleElement.classList.add('media-title');
        titleElement.textContent = title;
        spanContainer.appendChild(titleElement);

        const likesElement = document.createElement('p');
        likesElement.classList.add('media-likes');
        likesElement.innerHTML = `${likes}<i class="fa-sharp fa-solid fa-heart" id="hearth"></i>`;
        spanContainer.appendChild(likesElement);

        mediaContainer.appendChild(spanContainer);

        // const priceElement = document.createElement('span');
        // priceElement.classList.add('media-price');
        // priceElement.textContent = `$${price}`;
        // mediaContainer.appendChild(priceElement);

        return mediaContainer;
    }



    return {
        id,
        photographerId,
        title,
        image,
        likes,
        date,
        price,
        video,
        getMediaCardDOM
    };
}
