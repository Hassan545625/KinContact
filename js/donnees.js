let contacts = charger();

function creerContact(prenom, nom, telephone, email, etiquettes) {
    const contact = {
        id: Date.now(),
        prenom: prenom,
        nom: nom,
        telephone: telephone,
        email: email,
        favori: false,
        etiquettes: etiquettes || []
    };

    contacts.push(contact);
    sauvegarder(contacts);
    return contact;
}

function trouverContact(id) {
    return contacts.find(function (contact) {
        return contact.id === id;
    });
}

function supprimerContact(id) {
    contacts = contacts.filter(function (contact) {
        return contact.id !== id;
    });
    sauvegarder(contacts);
}

function modifierContact(id, prenom, nom, telephone, email, etiquettes) {
    const contact = trouverContact(id);

    if (contact === undefined) {
        return;
    }

    contact.prenom = prenom;
    contact.nom = nom;
    contact.telephone = telephone;
    contact.email = email;
    contact.etiquettes = etiquettes || [];
    sauvegarder(contacts);
}

function basculerFavori(id) {
    const contact = trouverContact(id);

    if (contact === undefined) {
        return;
    }

    contact.favori = !contact.favori;
    sauvegarder(contacts);
}

// sort : contacts triés par prénom
function contactsTries() {
    return [...contacts].sort(function (a, b) {
        return a.prenom.localeCompare(b.prenom);
    });
}

// filter : recherche par nom, téléphone ou e-mail
function rechercherContacts(texte) {
    const t = texte.trim().toLowerCase();
    const chiffres = t.replace(/[\s.-]/g, "");

    return contactsTries().filter(function (contact) {
        const nomComplet = (contact.prenom + " " + contact.nom).toLowerCase();
        const telContact = contact.telephone.replace(/[\s.-]/g, "");

        return nomComplet.includes(t)
            || (chiffres !== "" && telContact.includes(chiffres))
            || contact.email.toLowerCase().includes(t);
    });
}

// map + filter : "Travail, Amis" devient ["Travail", "Amis"] (sans doublon)
function texteVersEtiquettes(texte) {
    return texte
        .split(",")
        .map(function (etiquette) {
            return etiquette.trim();
        })
        .filter(function (etiquette, position, tableau) {
            return etiquette !== "" && tableau.indexOf(etiquette) === position;
        });
}

// some : ce contact porte-t-il cette étiquette ?
function aEtiquette(contact, nom) {
    return (contact.etiquettes || []).some(function (etiquette) {
        return etiquette === nom;
    });
}

// reduce : objet dictionnaire { "Travail": 2, "Amis": 1 }
function compterParEtiquette() {
    return contacts.reduce(function (dictionnaire, contact) {
        (contact.etiquettes || []).forEach(function (etiquette) {
            dictionnaire[etiquette] = (dictionnaire[etiquette] || 0) + 1;
        });
        return dictionnaire;
    }, {});
}