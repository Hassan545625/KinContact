
// Récupération des éléments HTML
const creationContact = document.getElementById("creation-contact");
const contactList = document.getElementById("contacts-list");
const contactForm = document.getElementById("contact-form");

const addButton = document.getElementById("add-button");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");
const closeButton = document.getElementById("close-button");

const formTitre = document.getElementById("form-titre");
const popup = document.getElementById("popup");
const emptyMessage = document.getElementById("empty-message");

// Ouvrir le formulaire
function ouvrirFormulaire() {
    formTitre.textContent = "Créer un contact";
    popup.style.display = "block";
}

// Fermer le formulaire
function fermerFormulaire() {
    popup.style.display = "none";
    contactForm.reset();
}

// Bouton créer un contact
creationContact.addEventListener("click", ouvrirFormulaire);

// Bouton +
addButton.addEventListener("click", ouvrirFormulaire);

// Bouton fermer
closeButton.addEventListener("click", fermerFormulaire);

// Bouton annuler
cancelButton.addEventListener("click", fermerFormulaire);

// Enregistrer un contact
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupérer les valeurs
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const email = document.getElementById("email").value.trim();

    // Créer le contact
    const contact = document.createElement("li");

    contact.innerHTML = `
        <strong>${prenom} ${nom}</strong>
        <p>${telephone}</p>
        <p>${email}</p>
    `;

    // Ajouter à la liste
    contactList.appendChild(contact);

    // Cacher le message si la liste contient un contact
    emptyMessage.style.display = "none";

    // Réinitialiser et fermer
    contactForm.reset();
    fermerFormulaire();
});

// Afficher le message si aucun contact
if (contactList.children.length === 0) {
    emptyMessage.style.display = "block";
}
