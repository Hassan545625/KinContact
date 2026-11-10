const el = (id) => document.getElementById(id);

const ui = {
  vue: 'tous',          // 'tous' ou 'favoris'
  etiquette: null,      // id de l'étiquette filtrée
  texte: '',            // texte de la recherche
  idEnModification: null,
  minuterie: null,
};

// ===== Messages =====
const afficherNotification = (message) => {
  const zone = el('notification');
  zone.textContent = message;
  clearTimeout(ui.minuterie);
  ui.minuterie = setTimeout(() => {
    zone.textContent = '';
  }, 5000);
};

const afficherErreur = (zone, message) => {
  zone.textContent = message;
};

// ===== Une ligne de contact =====
const creerBouton = (texte, test, classe) => {
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.textContent = texte;
  bouton.dataset.test = test;
  bouton.className = classe;
  return bouton;
};

const creerLigneContact = (contact) => {
  const carte = document.createElement('article');
  carte.className = 'contact-ligne';
  carte.dataset.test = 'contact';
  carte.dataset.id = contact.id;

  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.dataset.test = 'avatar';
  avatar.textContent = initiales(contact);
  avatar.style.backgroundColor = couleurAvatar(contact);
  avatar.setAttribute('aria-hidden', 'true');

  const ouvrir = document.createElement('button');
  ouvrir.type = 'button';
  ouvrir.className = 'contact-ouvrir';
  ouvrir.dataset.test = 'contact-ouvrir';
  const nom = document.createElement('span');
  nom.dataset.test = 'contact-nom';
  nom.textContent = `${contact.prenom} ${contact.nom}`.trim();
  ouvrir.appendChild(nom);

  const telephone = document.createElement('span');
  telephone.className = 'contact-telephone';
  telephone.textContent = contact.telephone;

  const etiquettes = document.createElement('span');
  etiquettes.className = 'contact-etiquettes';
  etiquettes.textContent = nomsEtiquettes(contact).join(', ');

  const actions = document.createElement('div');
  actions.className = 'contact-actions';

  const favori = creerBouton(contact.favori ? '★' : '☆', 'contact-favori', 'btn-favori');
  favori.setAttribute('aria-pressed', String(contact.favori));
  favori.setAttribute('aria-label', contact.favori
    ? `Retirer ${contact.prenom} des favoris`
    : `Ajouter ${contact.prenom} aux favoris`);

  const modifier = creerBouton('Modifier', 'contact-modifier', 'btn-action');
  modifier.setAttribute('aria-label', `Modifier ${contact.prenom}`);

  const supprimer = creerBouton('Supprimer', 'contact-supprimer', 'btn-action btn-supprimer');
  supprimer.setAttribute('aria-label', `Supprimer ${contact.prenom}`);

  actions.appendChild(favori);
  actions.appendChild(modifier);
  actions.appendChild(supprimer);

  carte.appendChild(avatar);
  carte.appendChild(ouvrir);
  carte.appendChild(telephone);
  carte.appendChild(etiquettes);
  carte.appendChild(actions);

  return carte;
};

// ===== Barre latérale : filtres d'étiquettes avec compteurs =====
const afficherEtiquettes = () => {
  const zone = el('liste-etiquettes');
  zone.textContent = '';

  const compteurs = compterParEtiquette(etat.contacts);
  const etiquettes = Object.values(etat.etiquettes).sort(
    (a, b) => a.nom.localeCompare(b.nom, 'fr', { sensitivity: 'base' })
  );

  etiquettes.forEach((etiquette) => {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'btn-etiquette';
    bouton.dataset.test = 'filtre-etiquette';
    bouton.dataset.id = etiquette.id;
    bouton.setAttribute('aria-pressed', String(ui.etiquette === etiquette.id));

    if (ui.etiquette === etiquette.id) {
      bouton.classList.add('etiquette-active');
    }

    const nom = document.createElement('span');
    nom.textContent = etiquette.nom;

    const compteur = document.createElement('span');
    compteur.className = 'compteur-etiquette';
    compteur.dataset.test = 'compteur-etiquette';
    compteur.textContent = String(compteurs[etiquette.id] || 0);

    bouton.appendChild(nom);
    bouton.appendChild(compteur);
    zone.appendChild(bouton);
  });
};

// ===== Formulaire : cases à cocher des étiquettes =====
const afficherCases = (selection) => {
  const zone = el('cases-etiquettes-liste');
  zone.textContent = '';

  const etiquettes = Object.values(etat.etiquettes);

  if (etiquettes.length === 0) {
    const info = document.createElement('p');
    info.textContent = 'Aucune étiquette. Créez-en une dans le menu.';
    zone.appendChild(info);
    return;
  }

  etiquettes.forEach((etiquette) => {
    const ligne = document.createElement('div');
    ligne.className = 'case-etiquette';

    const caseCochee = document.createElement('input');
    caseCochee.type = 'checkbox';
    caseCochee.name = 'etiquettes';
    caseCochee.value = etiquette.id;
    caseCochee.id = `case-${etiquette.id}`;
    caseCochee.checked = selection.includes(etiquette.id);

    const libelle = document.createElement('label');
    libelle.htmlFor = caseCochee.id;
    libelle.textContent = etiquette.nom;

    ligne.appendChild(caseCochee);
    ligne.appendChild(libelle);
    zone.appendChild(ligne);
  });
};

// ===== La liste des contacts =====
const afficherListe = () => {
  const conteneur = el('contacts-list');
  conteneur.textContent = '';

  let visibles = rechercherContacts(etat.contacts, ui.texte);

  if (ui.vue === 'favoris') {
    visibles = visibles.filter((contact) => contact.favori === true);
  }

  if (ui.etiquette !== null) {
    visibles = visibles.filter(
      (contact) => contact.etiquettes.some((id) => id === ui.etiquette)
    );
  }

  visibles = trierContacts(visibles);
  const groupes = grouperParLettre(visibles);

  Object.keys(groupes).forEach((lettre) => {
    const separateur = document.createElement('h3');
    separateur.className = 'separateur-lettre';
    separateur.dataset.test = 'separateur-lettre';
    separateur.textContent = lettre;
    conteneur.appendChild(separateur);

    groupes[lettre].forEach((contact) => {
      conteneur.appendChild(creerLigneContact(contact));
    });
  });

  // Compteur
  const nombre = visibles.length;
  el('compteur').textContent = `${nombre} contact${nombre > 1 ? 's' : ''}`;

  // État vide
  let message = 'Aucun contact pour le moment.';
  if (ui.vue === 'favoris') {
    message = 'Aucun favori pour le moment.';
  }
  if (ui.texte.trim() !== '' || ui.etiquette !== null) {
    message = 'Aucun contact trouvé.';
  }
  const vide = el('etat-vide');
  vide.textContent = message;
  vide.hidden = nombre > 0;
};

// ===== Vues Contacts / Favoris =====
const afficherVues = () => {
  const tous = el('lien-contacts');
  const favoris = el('lien-favoris');
  const vueFavoris = ui.vue === 'favoris';

  tous.classList.toggle('active', !vueFavoris);
  favoris.classList.toggle('active', vueFavoris);

  if (vueFavoris) {
    favoris.setAttribute('aria-current', 'page');
    tous.removeAttribute('aria-current');
  } else {
    tous.setAttribute('aria-current', 'page');
    favoris.removeAttribute('aria-current');
  }

  el('titre-liste').textContent = vueFavoris ? 'Favoris' : 'Contacts';
};

// ===== Fiche détaillée =====
const afficherFiche = (contact) => {
  const dialogue = el('fiche-dialog');
  const avatar = el('fiche-avatar');
  const noms = nomsEtiquettes(contact);

  avatar.textContent = initiales(contact);
  avatar.style.backgroundColor = couleurAvatar(contact);
  el('fiche-titre').textContent = `${contact.prenom} ${contact.nom}`.trim();
  el('fiche-telephone').textContent = contact.telephone;
  el('fiche-email').textContent = contact.email !== '' ? contact.email : 'Non renseigné';
  el('fiche-etiquettes').textContent = noms.length > 0 ? noms.join(', ') : 'Aucune';
  dialogue.dataset.id = contact.id;

  if (!dialogue.open) {
    dialogue.showModal();
  }
};

// ===== Tout redessiner =====
const afficherTout = () => {
  afficherEtiquettes();
  afficherListe();
  afficherVues();
};