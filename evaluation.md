# 📊 Évaluation automatique — Projet de fin de module 6

> Générée le 2026-11-10 13:56 UTC · commit `a1a01ad` · **application sans nom** · sujet non reconnu · évaluation déterministe basée uniquement sur le brief, la fiche du sujet et le barème.

## Note : **1 / 18** · **1,1 / 20** · Débutant : Insuffisant

Fonctionnalités : **0 / 10** · Compétence ❌ **non validée** (moins de 12 / 18)

> ⚠️ Le dossier `.github/` a été modifié par l'apprenant (`6a70adb Initial commit`) : le coach vérifiera ce résultat.

> ⚠️ Contrat technique : `sujet` vaut "" : choisis parmi `notes`, `contacts`, `tableau`, `social`, `messagerie`, `streaming`. · `nom` est vide : donne un nom à ton application. · `pages` doit être l'adresse GitHub Pages de ton application (https://pseudo.github.io/depot/).

## 1. Fonctionnalités de la fiche

_Aucune fonctionnalité testée : le sujet de `projet.json` est absent ou inconnu._

## 2. Vérifications techniques

| Vérification | Résultat | Détail |
|---|:-:|---|
| Validation HTML | ✅ | Aucune erreur |
| Sémantique | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Labels | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Accessibilité Lighthouse | ➖ | Lighthouse n'a pas pu s'exécuter. |
| Responsive 375 px | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Responsive 768 px | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Responsive 1280 px | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Clavier | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Premier lancement : Données de démonstration | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Premier lancement : Clé | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Rechargement (F5) | ❌ | le sujet de `projet.json` est absent ou inconnu. |
| Injection HTML | ➖ | le sujet de `projet.json` est absent ou inconnu. |
| Console | ✅ | Aucune erreur |
| Méthodes de tableau | ✅ | find, filter, map, some, sort, reduce |
| Fonctions de donnees.js | ❌ | 0/1 : Sujet inconnu : renseigne `sujet` dans projet.json. |
| Commits | ❌ | 11 commit(s) sur 4 jour(s) (15 sur 6 jours attendus) |
| README | ❌ | Le README est encore celui du template : présente TON application. |
| GitHub Pages | ❌ | Adresse GitHub Pages absente de projet.json. |

## 3. Barème officiel (/18)

| Critère | Niveau | Points /3 | Feedback |
|---|---|:-:|---|
| Intégration HTML/CSS et responsive | Débutant : Insuffisant (24 %) | **0** | Page faite de div, aucune adaptation au mobile, débordement horizontal à toutes les largeurs.<br>_Lighthouse n/a · validation 0 erreur(s) · débordements 3/3_<br>À corriger : Accessibilité Lighthouse : null / 100 (90 attendu). le sujet de `projet.json` est absent ou inconnu. le sujet de `projet.json` est absent ou inconnu. |
| Interface (UI) et expérience utilisateur (UX) | Débutant : Insuffisant (20 %) | **0** | Interface brute, sans travail de design ; l'utilisateur reste bloqué ou perd des données sans avertissement.<br>_Tous les éléments d'UX sont présents · la ressemblance avec le produit est appréciée par le coach_<br>À corriger : `nom` est vide : donne un nom à ton application. Aucun logo (`<img>` ou `<svg>`) dans le `<header>`. Finitions CSS : 2/4 (:hover, :focus-visible, :active, transition). |
| Fonctionnalités et CRUD | Débutant : Insuffisant (0 %) | **0** | Moins de 5 fonctionnalités fonctionnent.<br>_0/10 fonctionnalités · CRUD incomplet ()_ |
| Données et logique JavaScript | En développement : À améliorer (50 %) | **1** | Données mal structurées (doublons, informations relues dans le DOM), logique mélangée à l'affichage, présence de var ou de ==.<br>_Méthodes 6/6 · fonctions de la fiche 0 % · modèle 0 %_<br>À corriger : Sujet inconnu : renseigne `sujet` dans projet.json. `let` jamais réassigné : `etat` → `const`. |
| DOM, événements et persistance | Débutant : Insuffisant (50 %) | **0** | Aucune persistance, ou l'application ne réagit pas aux actions.<br>_Clé ❌ · démo ❌ · rechargement ❌ · délégation ✅ · plafonné à 0 : aucune persistance_<br>À corriger : le sujet de `projet.json` est absent ou inconnu. le sujet de `projet.json` est absent ou inconnu. le sujet de `projet.json` est absent ou inconnu. |
| Bonnes pratiques, Git et documentation | Débutant : Insuffisant (44 %) | **0** | Faille d'injection, application pas en ligne, tout le code en un seul commit, ou incapable d'expliquer son propre code.<br>_11 commits · 4 jours · console 0 erreur(s) · la démo orale est évaluée par le coach · plafonné à 0 : application pas en ligne_<br>À corriger : 11 commit(s) sur 4 jour(s) : au moins 15 commits sur 6 jours attendus. Adresse GitHub Pages absente de projet.json. Le README est encore celui du template : présente TON application. |
| **Total** | Débutant : Insuffisant | **1 / 18** | Note sur 20 : **1,1** |

## Comment lire cette évaluation

| Statut | Signification |
|---|---|
| ⬜ Absente | Les éléments `data-test` de la fiche sont introuvables |
| ❌ Erreur JavaScript | Une exception s'est produite pendant le scénario |
| 🟠 Partielle | Au moins une vérification du scénario échoue (cas limites compris) |
| ✅ Fonctionne | Toutes les vérifications du scénario réussissent, sans rechargement de page |

Chaque scénario part d'un localStorage vide (données de démonstration). Barème : chaque critère est noté de 0 à 3 à partir des vérifications ci-dessus, puis plafonné selon les règles du barème (ex. `var` ou `==` → 1 au plus ; faille d'injection → 0). Note sur 20 = total sur 18 × 10 ÷ 9 ; compétence validée à partir de 12 / 18, sans aucun critère à 0.

> ℹ️ Le coach complète cette évaluation : ressemblance avec le produit d'origine, démo de 5 minutes et explication de ton code. Corrige, commit, merge sur `develop` et push : l'évaluation est relancée automatiquement.
