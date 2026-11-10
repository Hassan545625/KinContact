const CLE_STOCKAGE = 'kadea-contacts';

const charger = () => {
  const texte = localStorage.getItem(CLE_STOCKAGE);

  if (texte === null) {
    return null;
  }

  try {
    return JSON.parse(texte);
  } catch (erreur) {
    return null;
  }
};

const sauvegarder = (etat) => {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(etat));
};