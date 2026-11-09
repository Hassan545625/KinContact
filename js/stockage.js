const CLE_STOCKAGE ="kadea-contacts";

function sauvegarder(contacts) {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(contacts));
}

function charger() {
    const donnees = localStorage.getItem(CLE_STOCKAGE);
    if (donnees === null) {
        return [];
    }
    return JSON.parse(donnees);
}