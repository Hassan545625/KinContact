const creationContact = document.getElementById("creation-contact");
const contactForm = document.getElementById("contact-form");
const addButton = document.getElementById("add-button");
const cancelButton = document.getElementById("cancel-button");
const closeButton = document.getElementById("close-button");
const formTitre = document.getElementById("form-titre");
const formError = document.getElementById("form-error");
const popup = document.getElementById("popup");
const ficheDialog = document.getElementById("fiche-dialog");
const champRecherche = document.getElementById("recherche");

let idEnModification = null;


function ouvrirFormulaire() {
    idEnModification = null;
    formTitre.textContent = "Créer un contact";
    formError.textContent = "";
    contactForm.reset();
    popup.classList.add("active");
}

function fermerFormulaire() {
    idEnModification = null;
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
    const etiquettes = texteVersEtiquettes(document.getElementById("etiquettes").value);

    if (prenom === "") {
        formError.textContent = "Le prénom est obligatoire.";
        return;
    }

    const telephoneNettoye = telephone.replace(/[\s.-]/g, "");
    const regexTelephone = /^(\+243|00243|243|0)?[0-9]{9}$/;

    if (telephoneNettoye !== "" && !regexTelephone.test(telephoneNettoye)) {
        formError.textContent = "Téléphone invalide. Exemples : 0990000000, 099 000 00 00 ou +243 990 000 000.";
        return;
    }

    if (idEnModification === null) {
        creerContact(prenom, nom, telephone, email, etiquettes);
    } else {
        modifierContact(idEnModification, prenom, nom, telephone, email);
    }

    afficherContacts();
    fermerFormulaire();
});


document.getElementById("fiche-fermer").addEventListener("click", function () {
    ficheDialog.close();
});

document.getElementById("fiche-modifier").addEventListener("click", function () {
    const contact = trouverContact(Number(ficheDialog.dataset.id));

    if (contact === undefined) {
        return;
    }

    ficheDialog.close();
    idEnModification = contact.id;

    document.getElementById("prenom").value = contact.prenom;
    document.getElementById("nom").value = contact.nom;
    document.getElementById("telephone").value = contact.telephone;
    document.getElementById("email").value = contact.email;

    formTitre.textContent = "Modifier le contact";
    formError.textContent = "";
    popup.classList.add("active");
});


if (champRecherche) {
    champRecherche.addEventListener("input", afficherContacts);
}


const lienContacts = document.getElementById("lien-contacts");
const lienFavoris = document.getElementById("lien-favoris");
const titreListe = document.getElementById("titre-liste");

if (lienContacts && lienFavoris && titreListe) {
    lienContacts.addEventListener("click", function (event) {
        event.preventDefault();
        vueFavoris = false;
        lienContacts.classList.add("active");
        lienFavoris.classList.remove("active");
        titreListe.textContent = "Contacts";
        afficherContacts();
    });

    lienFavoris.addEventListener("click", function (event) {
        event.preventDefault();
        vueFavoris = true;
        lienFavoris.classList.add("active");
        lienContacts.classList.remove("active");
        titreListe.textContent = "Favoris";
        afficherContacts();
    });
}


afficherContacts();