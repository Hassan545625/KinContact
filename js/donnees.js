let contacts = charger();

function creerContact(prenom, nom, telephone,email) {
    const contact = {
        id: Date.now(),
        prenom: prenom,
        nom: nom,
        telephone: telephone,
        email: email,
        favori: false,
        etiquettes: []
    };
    contacts.push(contact);
    sauvegarder(contacts);
    return contact;
}

function trouverContact(id) {
    return contacts.find(function(contact) {
        return contact.id === id;
    })
}

function supprimerContact(id) {
    contacts = contacts.filter(function(contact) {
        return contact.id !== id;
    });
    sauvegarder(contacts);
}

function modifierContact(id, prenom, nom, telephone, email) {
    const contact = trouverContact(id);
    if (contact === undefined) {
        return;
    }
    contact.prenom = prenom;
    contact.nom = nom;
    contact.telephone = telephone;
    contact.email = email;
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

function contactsTries() {
    return [...contacts].sort(function (a, b) {
        return a.prenom.localeCompare(b.prenom);
    });
}