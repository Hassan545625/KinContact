const creationContact = document.getElementById("creation-contact");
const contactForm = document.getElementById("contact-form");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const closeButton = document.getElementById("close-button");
const formTitre = document.getElementById("form-titre");
const formError = document.getElementById("form-error");
const popup = document.getElementById("popup");

function ouvrirFormulaire() {
    formTitre.textContent = "Créer un contact";
    formError.textContent = "";
    popup.classList.add("active");
}

function fermerFormulaire() {
    popup.classList.remove("active");
    formError.textContent = "";
    contactForm.reset();
}

creationContact.addEventListener("click", ouvrirFormulaire);
addButton.addEventListener("click", ouvrirFormulaire);
closeButton.addEventListener("click", fermerFormulaire);
cancelButton.addEventListener("click", fermerFormulaire);

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (prenom === "") {
        formError.textContent = "Le prénom est obligatoire.";
        return;
    }

    const regexTelephone = /^(\+243|0)[0-9]{9}$/;
    if (telephone !== "" && !regexTelephone.test(telephone)) {
        formError.textContent = "Téléphone invalide. Exemple : 0990000000 ou +243990000000.";
        return;
    }

    creerContact(prenom, nom, telephone, email);
    afficherContacts();
    fermerFormulaire();
});

afficherContacts();