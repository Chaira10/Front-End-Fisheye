function displayModal() {
      const modal = document.getElementById("contact_modal");
      modal.style.display = "block";
  }


function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm(event) {
    event.preventDefault(); // Empêche le rechargement de la page après la soumission du formulaire
    
    // Récupère les valeurs des champs du formulaire
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("msg").value;
    
    // Affiche les données dans la console
    console.log("Prénom:", prenom);
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Message:", message);
    
    // Réinitialise le formulaire
    document.getElementById("contact-form").reset();
    
    // Ferme la modal après la soumission
    closeModal();
    }

    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener("click", submitForm);
