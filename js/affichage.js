let vueFavoris = false;

function obtenirInitiales(contact) {
    const p = contact.prenom.charAt(0);
    const n = contact.nom ? contact.nom.charAt(0) : "";
    return (p + n).toUpperCase();
}

function obtenirCouleur(contact) {
    const couleurs = ["#1a73e8", "#e8710a", "#fbbc05", "#34a853", "#ff5252", "#9c27b0", "#00bcd4", "#ff9800", "#4caf50", "#2196f3"];
    let total = 0;

    for (let i = 0; i < contact.prenom.length; i++) {
        total += contact.prenom.charCodeAt(i);
    }
    return couleurs[total % couleurs.length];
}

function afficherFiche(contact) {
    const dialog = document.getElementById("fiche-dialog");
    const avatar = document.getElementById("fiche-avatar");

    avatar.textContent = obtenirInitiales(contact);
    avatar.style.backgroundColor = obtenirCouleur(contact);
    document.getElementById("fiche-titre").textContent = contact.prenom + " " + contact.nom;
    document.getElementById("fiche-telephone").textContent = contact.telephone || "Pas de téléphone";
    document.getElementById("fiche-email").textContent = contact.email || "Pas d'e-mail";

    dialog.dataset.id = contact.id;
    dialog.showModal();
}

function afficherContacts() {
    const liste = document.getElementById("contacts-list");
    liste.textContent = "";

    const champRecherche = document.getElementById("recherche");
    const texte = champRecherche ? champRecherche.value : "";

    let tous = rechercherContacts(texte);
    if (vueFavoris) {
        tous = tous.filter(function (contact) {
            return contact.favori;
        });
    }

    if (tous.length === 0) {
        const vide = document.createElement("p");
        if (vueFavoris) {
            vide.textContent = "Aucun favori pour le moment.";
        } else if (texte.trim() !== "") {
            vide.textContent = "Aucun contact trouvé.";
        } else {
            vide.textContent = "Aucun contact pour le moment.";
        }
        liste.appendChild(vide);
        return;
    }

    let lettreActuelle = "";

    tous.forEach(function (contact) {
        const lettre = contact.prenom.charAt(0).toUpperCase();
        if (lettre !== lettreActuelle) {
            lettreActuelle = lettre;
            const separateur = document.createElement("h3");
            separateur.className = "separateur-lettre";
            separateur.textContent = lettre;
            liste.appendChild(separateur);
        }

        const ligne = document.createElement("div");
        ligne.className = "contact-ligne";

        const avatar = document.createElement("span");
        avatar.className = "avatar";
        avatar.textContent = obtenirInitiales(contact);
        avatar.style.backgroundColor = obtenirCouleur(contact);

        const nomComplet = document.createElement("span");
        nomComplet.className = "contact-nom";
        nomComplet.textContent = contact.prenom + " " + contact.nom;
        nomComplet.tabIndex = 0;
        nomComplet.style.cursor = "pointer";
        nomComplet.addEventListener("click", function () {
            afficherFiche(contact);
        });
        nomComplet.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                afficherFiche(contact);
            }
        });

        const telephone = document.createElement("span");
        telephone.className = "contact-telephone";
        telephone.textContent = contact.telephone;

        const boutonFavori = document.createElement("button");
        boutonFavori.type = "button";
        boutonFavori.className = "btn-favori";
        boutonFavori.textContent = contact.favori ? "★" : "☆";
        boutonFavori.setAttribute("aria-label", "Marquer comme favori");
        boutonFavori.addEventListener("click", function () {
            basculerFavori(contact.id);
            afficherContacts();
        });

        const boutonSupprimer = document.createElement("button");
        boutonSupprimer.type = "button";
        boutonSupprimer.className = "btn-supprimer";
        boutonSupprimer.textContent = "Supprimer";
        boutonSupprimer.addEventListener("click", function () {
            if (confirm("Supprimer " + contact.prenom + " ?")) {
                supprimerContact(contact.id);
                afficherContacts();
            }
        });

        ligne.appendChild(avatar);
        ligne.appendChild(nomComplet);
        ligne.appendChild(telephone);
        ligne.appendChild(boutonFavori);
        ligne.appendChild(boutonSupprimer);
        liste.appendChild(ligne);
    });
}