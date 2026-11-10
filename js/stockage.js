const CLE_STOCKAGE = "kadea-contacts";

function sauvegarder(contacts) {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(contacts));
}

function donneesDemo() {
    return [
        { id: 1, prenom: "Amina", nom: "Kabongo", telephone: "0990000001", email: "amina@example.com", favori: true, etiquettes: ["Famille"] },
        { id: 2, prenom: "Bienvenu", nom: "Mukendi", telephone: "0810000002", email: "bienvenu@example.com", favori: false, etiquettes: ["Travail"] },
        { id: 3, prenom: "Chantal", nom: "Ilunga", telephone: "0970000003", email: "chantal@example.com", favori: false, etiquettes: ["Amis"] },
        { id: 4, prenom: "David", nom: "Tshimanga", telephone: "0850000004", email: "david@example.com", favori: true, etiquettes: ["Travail", "Amis"] }
    ];
}

function charger() {
    const donnees = localStorage.getItem(CLE_STOCKAGE);

    if (donnees === null) {
        const demo = donneesDemo();
        sauvegarder(demo);
        return demo;
    }

    return JSON.parse(donnees);
}