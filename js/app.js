const modaleContact = el('modale-contact');
const formContact = el('contact-form');
const formEtiquette = el('form-etiquette');
const ficheDialog = el('fiche-dialog');

const zoneErreurContact = formContact.querySelector('[data-test="erreur"]');
const zoneErreurEtiquette = formEtiquette.querySelector('[data-test="erreur"]');

// ===== Formulaire de contact =====
const ouvrirFormulaire = (contact) => {
  formContact.reset();
  afficherErreur(zoneErreurContact, '');

  if (contact === undefined) {
    ui.idEnModification = null;
    el('form-titre').textContent = 'Nouveau contact';
    afficherCases([]);
  } else {
    ui.idEnModification = contact.id;
    el('form-titre').textContent = 'Modifier le contact';
    el('prenom').value = contact.prenom;
    el('nom').value = contact.nom;
    el('telephone').value = contact.telephone;
    el('email').value = contact.email;
    afficherCases(contact.etiquettes);
  }

  if (!modaleContact.open) {
    modaleContact.showModal();
  }
};

el('creation-contact').addEventListener('click', () => ouvrirFormulaire());
el('add-button').addEventListener('click', () => ouvrirFormulaire());
el('cancel-button').addEventListener('click', () => modaleContact.close());

formContact.addEventListener('submit', (event) => {
  event.preventDefault();

  const donnees = new FormData(formContact);
  const saisie = {
    prenom: String(donnees.get('prenom')).trim(),
    nom: String(donnees.get('nom')).trim(),
    telephone: String(donnees.get('telephone')).trim(),
    email: String(donnees.get('email')).trim(),
    etiquettes: donnees.getAll('etiquettes'),
  };

  const messages = Object.values(validerContact(saisie));

  if (messages.length > 0) {
    afficherErreur(zoneErreurContact, messages.join(' '));
    return;
  }

  if (ui.idEnModification === null) {
    const contact = ajouterContact(saisie);
    afficherNotification(`Contact ajouté : ${contact.prenom}.`);
  } else {
    const contact = modifierContact(ui.idEnModification, saisie);
    afficherNotification(`Contact modifié : ${contact.prenom}.`);
  }

  sauvegarder(etat);
  modaleContact.close();
  afficherTout();
});

// ===== Formulaire d'étiquette =====
formEtiquette.addEventListener('submit', (event) => {
  event.preventDefault();

  const nom = String(new FormData(formEtiquette).get('nom')).trim();
  const message = validerEtiquette(nom);

  if (message !== '') {
    afficherErreur(zoneErreurEtiquette, message);
    return;
  }

  creerEtiquette(nom);
  sauvegarder(etat);
  afficherErreur(zoneErreurEtiquette, '');
  formEtiquette.reset();
  afficherNotification(`Étiquette créée : ${nom}.`);
  afficherTout();
});

// ===== Actions sur la liste (favori, modifier, supprimer, fiche) =====
el('contacts-list').addEventListener('click', (event) => {
  const bouton = event.target.closest('button');

  if (bouton === null) {
    return;
  }

  const carte = bouton.closest('[data-test="contact"]');

  if (carte === null) {
    return;
  }

  const contact = trouverContact(carte.dataset.id);

  if (contact === undefined) {
    return;
  }

  const action = bouton.dataset.test;

  if (action === 'contact-ouvrir') {
    afficherFiche(contact);
  } else if (action === 'contact-modifier') {
    ouvrirFormulaire(contact);
  } else if (action === 'contact-favori') {
    basculerFavori(contact.id);
    sauvegarder(etat);
    afficherNotification(contact.favori
      ? `${contact.prenom} ajouté aux favoris.`
      : `${contact.prenom} retiré des favoris.`);
    afficherTout();
  } else if (action === 'contact-supprimer') {
    if (window.confirm(`Supprimer ${contact.prenom} ${contact.nom} ?`)) {
      supprimerContact(contact.id);
      sauvegarder(etat);
      afficherNotification(`Contact supprimé : ${contact.prenom}.`);
      afficherTout();
    }
  }
});

// ===== Fiche détaillée =====
el('fiche-fermer').addEventListener('click', () => ficheDialog.close());

el('fiche-modifier').addEventListener('click', () => {
  const contact = trouverContact(ficheDialog.dataset.id);

  if (contact === undefined) {
    return;
  }

  ficheDialog.close();
  ouvrirFormulaire(contact);
});

// ===== Recherche en direct =====
el('recherche').addEventListener('input', (event) => {
  ui.texte = event.target.value;
  afficherListe();
});

// ===== Vues Contacts / Favoris =====
el('lien-contacts').addEventListener('click', (event) => {
  event.preventDefault();
  ui.vue = 'tous';
  afficherTout();
});

el('lien-favoris').addEventListener('click', (event) => {
  event.preventDefault();
  ui.vue = 'favoris';
  afficherTout();
});

// ===== Filtre par étiquette =====
el('liste-etiquettes').addEventListener('click', (event) => {
  const bouton = event.target.closest('button');

  if (bouton === null) {
    return;
  }

  ui.etiquette = ui.etiquette === bouton.dataset.id ? null : bouton.dataset.id;
  afficherTout();
});

// ===== Menu latéral =====
el('menu-button').addEventListener('click', () => {
  const ouvert = el('menu-lateral').classList.toggle('open');
  el('menu-button').setAttribute('aria-expanded', String(ouvert));
});

// ===== Démarrage =====
const demarrer = () => {
  const charge = charger();

  if (charge !== null && Array.isArray(charge.contacts) && charge.etiquettes !== undefined) {
    etat = charge;
  } else {
    etat = creerDonneesDemo();
    sauvegarder(etat);
  }

  afficherTout();
};

demarrer();