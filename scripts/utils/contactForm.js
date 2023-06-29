function setInitialFocus () {
  const firstField = document.getElementById('prenom');
  firstField.focus();
}

function displayModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
  setInitialFocus();
}

function closeModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

function submitForm (event) {
  event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire

  // Récupère les valeurs des champs du formulaire
  const prenom = document.getElementById('prenom').value;
  const nom = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('msg').value;
  const modalbg = document.querySelector('.modal');
  // Vérifie que les champs ne sont pas vides
  if (prenom.trim() === '' || nom.trim() === '' || email.trim() === '' || message.trim() === '') {
    const errorMessage = document.createElement('p');
    // Affiche un message de validation
    errorMessage.setAttribute('role', 'alert');
    errorMessage.setAttribute('aria-live', 'assertive');
    errorMessage.focus();
    errorMessage.textContent = 'Veuillez remplir tous les champs du formulaire.';
    errorMessage.classList.add('error-message');
    modalbg.appendChild(errorMessage);
    return; // Arrête l'exécution de la fonction si les champs sont vides
  }

  // Affiche les données dans la console
  console.log('Prénom:', prenom);
  console.log('Nom:', nom);
  console.log('Email:', email);
  console.log('Message:', message);

  // Réinitialise le formulaire
  document.getElementById('contact-form').reset();

  // Ferme la modal après la soumission
  closeModal();

  // Affiche un message de validation
  const validationMessage = document.createElement('p');
  validationMessage.setAttribute('role', 'alert');
  validationMessage.setAttribute('aria-live', 'assertive');
  validationMessage.focus();
  validationMessage.textContent = 'Le formulaire a été soumis avec succès!';
  validationMessage.classList.add('validation-message');
  document.body.appendChild(validationMessage);

  // Supprime le message de validation après quelques secondes
  setTimeout(() => {
    validationMessage.remove();
  }, 3000);
}

const btnSubmit = document.getElementById('btn-submit');
btnSubmit.addEventListener('click', submitForm);

const modal = document.getElementById('contact_modal');
const formElements = modal.querySelectorAll('input, textarea, button, img');

let currentFocus = 0; // Indice de l'élément actuellement en focus

modal.addEventListener('keydown', function (event) {
  if (event.key === 'Tab') {
    // Met à jour l'indice de focus en fonction de l'élément actuellement en focus
    currentFocus = Array.from(formElements).indexOf(event.target);
  }
});

// Ajoute une classe pour mettre en évidence l'élément actuellement en focus
function highlightCurrentElement () {
  formElements.forEach((element, index) => {
    if (index === currentFocus) {
      element.classList.add('focus');
    } else {
      element.classList.remove('focus');
    }
  });
}

// Gère la navigation au clavier
function handleKeyboardNavigations (event) {
  if (event.key === 'Tab') {
    // Touche Tab pressée
    if (event.shiftKey) {
      // Si la touche Shift est enfoncée, naviguer vers le champ précédent
      currentFocus = (currentFocus - 1 + formElements.length) % formElements.length;
    } else {
      // Sinon, naviguer vers le champ suivant
      currentFocus = (currentFocus + 1) % formElements.length;
    }
    formElements[currentFocus].focus(); // Mettre le focus sur le champ de formulaire actuel
    event.preventDefault();
  } else if (event.key === 'Enter') {
    // Touche Entrée pressée
    const currentElement = formElements[currentFocus];
    if (currentElement.tagName === 'BUTTON') {
      // Si l'élément actuel est un bouton, soumettre le formulaire
      submitForm(event);
    } else if (currentElement.tagName === 'IMG') {
      closeModal(event);
    }
    event.preventDefault();
  }
}

// Écoute l'événement de touche clavier sur le formulaire
modal.addEventListener('keydown', handleKeyboardNavigations);

// Mettre en évidence l'élément initial
highlightCurrentElement();
