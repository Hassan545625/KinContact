// État de l'application : rempli au démarrage par app.js
let etat = { contacts: [], etiquettes: {} };

// ===== Données de démonstration =====
const creerDonneesDemo = () => ({
  contacts: [
    { id: 'c-1', prenom: 'Grâce', nom: 'Mbuyi', telephone: '+243 812 345 678', email: 'grace@exemple.cd', favori: true, etiquettes: ['e-1'], notes: '' },
    { id: 'c-2', prenom: 'Patrick', nom: 'Kasongo', telephone: '0991 234 567', email: 'patrick@exemple.cd', favori: false, etiquettes: ['e-2'], notes: '' },
    { id: 'c-3', prenom: 'Aimé', nom: 'Tshibola', telephone: '0812 000 111', email: 'aime@exemple.cd', favori: false, etiquettes: ['e-1'], notes: '' },
    { id: 'c-4', prenom: 'Bénédicte', nom: 'Lukusa', telephone: '+243 998 765 432', email: 'benedicte@exemple.cd', favori: true, etiquettes: ['e-2'], notes: '' },
    { id: 'c-5', prenom: 'Clément', nom: 'Ilunga', telephone: '0853 222 333', email: '', favori: false, etiquettes: [], notes: '' },
    { id: 'c-6', prenom: 'Divine', nom: 'Kalala', telephone: '0974 555 666', email: 'divine@exemple.cd', favori: false, etiquettes: ['e-1'], notes: '' },
    { id: 'c-7', prenom: 'Espoir', nom: 'Mukendi', telephone: '+243 825 111 222', email: '', favori: false, etiquettes: [], notes: '' },
    { id: 'c-8', prenom: 'Fiston', nom: 'Banza', telephone: '0900 123 456', email: 'fiston@exemple.cd', favori: false, etiquettes: ['e-2'], notes: '' },
  ],
  etiquettes: {
    'e-1': { id: 'e-1', nom: 'Famille' },
    'e-2': { id: 'e-2', nom: 'Travail' },
  },
});

// ===== Validation =====
const estTelephoneCongolais = (telephone) => {
  const nettoye = String(telephone).replace(/[\s.-]/g, '');
  return /^(\+243|0)[89][0-9]{8}$/.test(nettoye);
};

const estEmailValide = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Renvoie uniquement les champs invalides : {} si tout est valide
const validerContact = (saisie) => {
  const erreurs = {};
  const prenom = String(saisie.prenom || '').trim();
  const telephone = String(saisie.telephone || '').trim();
  const email = String(saisie.email || '').trim();

  if (prenom === '') {
    erreurs.prenom = 'Le prénom est obligatoire.';
  }

  if (telephone === '') {
    erreurs.telephone = 'Le téléphone est obligatoire.';
  } else if (!estTelephoneCongolais(telephone)) {
    erreurs.telephone = 'Téléphone invalide. Exemples : +243 812 345 678, 0812345678 ou 0991 234 567.';
  }

  if (email !== '' && !estEmailValide(email)) {
    erreurs.email = 'E-mail invalide. Exemple : nom@exemple.cd.';
  }

  return erreurs;
};

const validerEtiquette = (nom) => {
  const texte = String(nom || '').trim();

  if (texte === '') {
    return `Le nom de l'étiquette est obligatoire.`;
  }

  if (etiquetteExiste(texte)) {
    return 'Cette étiquette existe déjà.';
  }

  return '';
};

// ===== Avatar =====
const initiales = (contact) => {
  const p = contact.prenom ? contact.prenom.charAt(0) : '';
  const n = contact.nom ? contact.nom.charAt(0) : '';
  return `${p}${n}`.toUpperCase();
};

// Couleur calculée : toujours la même pour le même contact
const couleurAvatar = (contact) => {
  const texte = `${contact.prenom}${contact.nom}`;
  let total = 0;

  for (let i = 0; i < texte.length; i += 1) {
    total += texte.charCodeAt(i) * (i + 1);
  }

  return `hsl(${total % 360}, 55%, 32%)`;
};

// ===== Tri, groupes, recherche, compteurs =====
const comparer = (a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' });

// sort : renvoie une copie triée par prénom puis nom
const trierContacts = (contacts) => [...contacts].sort(
  (a, b) => comparer(a.prenom, b.prenom) || comparer(a.nom, b.nom)
);

const premiereLettre = (contact) => {
  const lettre = contact.prenom
    .charAt(0)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  return lettre === '' ? '#' : lettre;
};

// reduce : { G: [...], P: [...] }
const grouperParLettre = (contacts) => contacts.reduce((groupes, contact) => {
  const lettre = premiereLettre(contact);

  if (groupes[lettre] === undefined) {
    groupes[lettre] = [];
  }

  groupes[lettre].push(contact);
  return groupes;
}, {});

// filter : nom, téléphone (espaces ignorés) ou e-mail
const rechercherContacts = (contacts, texte) => {
  const recherche = String(texte || '').trim().toLowerCase();

  if (recherche === '') {
    return [...contacts];
  }

  const chiffres = recherche.replace(/[\s.-]/g, '');

  return contacts.filter((contact) => {
    const nomComplet = `${contact.prenom} ${contact.nom}`.toLowerCase();
    const telephone = contact.telephone.replace(/[\s.-]/g, '');

    return nomComplet.includes(recherche)
      || (chiffres !== '' && telephone.includes(chiffres))
      || contact.email.toLowerCase().includes(recherche);
  });
};

// reduce : { 'e-1': 3, 'e-2': 1 }
const compterParEtiquette = (contacts) => contacts.reduce((compteurs, contact) => {
  contact.etiquettes.forEach((id) => {
    compteurs[id] = (compteurs[id] || 0) + 1;
  });
  return compteurs;
}, {});

// ===== Actions sur l'état =====
const genererId = (prefixe) => `${prefixe}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;

// find
const trouverContact = (id) => etat.contacts.find((contact) => contact.id === id);

const ajouterContact = (saisie) => {
  const contact = {
    id: genererId('c'),
    prenom: saisie.prenom.trim(),
    nom: saisie.nom.trim(),
    telephone: saisie.telephone.trim(),
    email: saisie.email.trim(),
    favori: false,
    etiquettes: saisie.etiquettes || [],
    notes: '',
  };

  etat.contacts.push(contact);
  return contact;
};

const modifierContact = (id, saisie) => {
  const contact = trouverContact(id);

  if (contact === undefined) {
    return null;
  }

  contact.prenom = saisie.prenom.trim();
  contact.nom = saisie.nom.trim();
  contact.telephone = saisie.telephone.trim();
  contact.email = saisie.email.trim();
  contact.etiquettes = saisie.etiquettes || [];
  return contact;
};

const supprimerContact = (id) => {
  etat.contacts = etat.contacts.filter((contact) => contact.id !== id);
};

const basculerFavori = (id) => {
  const contact = trouverContact(id);

  if (contact === undefined) {
    return null;
  }

  contact.favori = !contact.favori;
  return contact;
};

// some : ce nom d'étiquette existe-t-il déjà ?
const etiquetteExiste = (nom) => Object.values(etat.etiquettes).some(
  (etiquette) => etiquette.nom.toLowerCase() === nom.trim().toLowerCase()
);

const creerEtiquette = (nom) => {
  const id = genererId('e');
  etat.etiquettes[id] = { id, nom: nom.trim() };
  return id;
};

// map : les noms des étiquettes d'un contact
const nomsEtiquettes = (contact) => contact.etiquettes
  .filter((id) => etat.etiquettes[id] !== undefined)
  .map((id) => etat.etiquettes[id].nom);