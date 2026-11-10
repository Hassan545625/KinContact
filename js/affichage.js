// ===== VARIABLES =====
let vueFavoris = false;        
let etiquetteActive = null;  


function obtenirInitiales(contact) {
    const premiereLettrePrenom = contact.prenom.charAt(0);
    let premiereLettreNom = "";

    if (contact.nom) {
        premiereLettreNom = contact.nom.charAt(0);
    }

    return (premiereLettrePrenom + premiereLettreNom).toUpperCase();
}

function obtenirCouleur(contact) {
    const couleurs = ["#1a73e8", "#e8710a", "#fbbc05", "#34a853", "#ff5252", "#9c27b0", "#00bcd4", "#ff9800", "#4caf50", "#2196f3"];
    let total = 0;

    for (let i = 0; i < contact.prenom.length; i++) {
        total += contact.prenom.charCodeAt(i);
    }

    return couleurs[total % couleurs.length];
}


// ===== 2. FICHE DÉTAILLÉE =====
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


// ===== 3. UNE LIGNE DE CONTACT =====
function creerLigneContact(contact) {
    const ligne = document.createElement("div");
    ligne.className = "contact-ligne";

    // Avatar
    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = obtenirInitiales(contact);
    avatar.style.backgroundColor = obtenirCouleur(contact);

    // Nom (cliquable pour ouvrir la fiche)
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

    // Téléphone
    const telephone = document.createElement("span");
    telephone.className = "contact-telephone";
    telephone.textContent = contact.telephone;

    // Étiquettes
    const etiquettes = document.createElement("span");
    etiquettes.className = "contact-etiquettes";
    etiquettes.textContent = (contact.etiquettes || []).join(", ");

    // Bouton favori
    const boutonFavori = document.createElement("button");
    boutonFavori.type = "button";
    boutonFavori.className = "btn-favori";
    boutonFavori.setAttribute("aria-label", "Marquer comme favori");
    if (contact.favori) {
        boutonFavori.textContent = "★";
    } else {
        boutonFavori.textContent = "☆";
    }
    boutonFavori.addEventListener("click", function () {
        basculerFavori(contact.id);
        afficherContacts();
    });

    // Bouton supprimer (avec confirmation)
    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.className = "btn-supprimer";
    boutonSupprimer.textContent = "Supprimer";
    boutonSupprimer.addEventListener("click", function () {
        const confirme = confirm("Supprimer " + contact.prenom + " ?");
        if (confirme) {
            supprimerContact(contact.id);
            afficherContacts();
        }
    });

    // Assemblage de la ligne
    ligne.appendChild(avatar);
    ligne.appendChild(nomComplet);
    ligne.appendChild(telephone);
    ligne.appendChild(etiquettes);
    ligne.appendChild(boutonFavori);
    ligne.appendChild(boutonSupprimer);

    return ligne;
}


// ===== 4. ÉTIQUETTES (barre latérale) =====
function afficherEtiquettes() {
    const zone = document.getElementById("liste-etiquettes");

    if (!zone) {
        return;
    }

    zone.textContent = "";

    const compteurs = compterParEtiquette();
    const noms = Object.keys(compteurs).sort();

    noms.forEach(function (nom) {
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "btn-etiquette";
        if (nom === etiquetteActive) {
            bouton.classList.add("etiquette-active");
        }
        bouton.textContent = nom + " (" + compteurs[nom] + ")";
        bouton.addEventListener("click", function () {
            if (etiquetteActive === nom) {
                etiquetteActive = null;
            } else {
                etiquetteActive = nom;
            }
            afficherContacts();
        });
        zone.appendChild(bouton);
    });
}


// ===== 5. LA LISTE COMPLÈTE =====
function afficherContacts() {
    const liste = document.getElementById("contacts-list");
    liste.textContent = "";

    // Texte de la recherche
    const champRecherche = document.getElementById("recherche");
    let texte = "";
    if (champRecherche) {
        texte = champRecherche.value;
    }

    // Contacts à montrer : recherche, puis favoris, puis étiquette
    let tous = rechercherContacts(texte);

    if (vueFavoris) {
        tous = tous.filter(function (contact) {
            return contact.favori;
        });
    }

    if (etiquetteActive !== null) {
        tous = tous.filter(function (contact) {
            return aEtiquette(contact, etiquetteActive);
        });
    }

    // Barre latérale et compteur
    afficherEtiquettes();

    const compteurTotal = document.getElementById("compteur-total");
    if (compteurTotal) {
        let message = tous.length + " contact(s) affiché(s) sur " + contacts.length;
        if (etiquetteActive !== null) {
            message = message + " (étiquette : " + etiquetteActive + ")";
        }
        compteurTotal.textContent = message;
    }

    // État vide
    if (tous.length === 0) {
        const vide = document.createElement("p");

        if (vueFavoris) {
            vide.textContent = "Aucun favori pour le moment.";
        } else if (texte.trim() !== "" || etiquetteActive !== null) {
            vide.textContent = "Aucun contact trouvé.";
        } else {
            vide.textContent = "Aucun contact pour le moment.";
        }

        liste.appendChild(vide);
        return;
    }

    // Séparateur à chaque nouvelle lettre, puis la ligne du contact
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

        liste.appendChild(creerLigneContact(contact));
    });
}