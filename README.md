# CAHP Nantes — Pas à pas CCF EPS

Application web progressive (PWA) présentant, phase par phase, les démarches
pour les référents Examens CCF EPS. Installable sur téléphone, tablette ou
ordinateur, et **modifiable sans coder** grâce à l'interface Administration
intégrée (bouton ⚙️).

---

## 📁 Structure du projet

```
├── index.html                    → l'application (interface + logique + contenu par défaut)
├── manifest.webmanifest          → nom, icônes, couleurs de la PWA
├── sw.js                         → service worker (fonctionnement hors-ligne, mises à jour)
├── assets/
│   ├── logo-cahpnantes.jpg       → logo CAHP Nantes (bandeau du haut, en permanence visible)
│   ├── intro-apps.png            → image d'accueil "Détail des applications..."
│   ├── logo-demarche-numerique.png → logo Démarche Numérique (icône + texte)
│   ├── logo-cyclades.png         → logo Cyclades
│   └── logo-santorin.png         → logo Santorin
└── icons/                        → icônes de l'application (192/512, standard + "maskable"),
                                     générées à partir du logo CAHP Nantes
```

Aucune dépendance externe, aucun serveur/back-end : tout tourne dans le
navigateur. Le contenu (textes, liens, dates) et la configuration (email de
contact, liens de la Banque de référentiels) sont modifiés via l'interface
Administration et enregistrés dans le navigateur de l'utilisateur
(`localStorage`).

---

## 🚀 Déployer sur GitHub Pages

1. Créez un dépôt GitHub (public ou privé avec Pages activé), par exemple
   `ccf-eps-guide`.
2. Copiez-y tout le contenu de ce dossier (`index.html`, `manifest.webmanifest`,
   `sw.js`, `assets/`, `icons/`) à la racine du dépôt.
3. Commit + push.
4. Dans le dépôt GitHub : **Settings → Pages**
   - Source : `Deploy from a branch`
   - Branch : `main` (ou `master`) — dossier `/ (root)`
   - Enregistrer.
5. Après 1 à 2 minutes, l'application est disponible à l'adresse :
   `https://<votre-compte-ou-organisation>.github.io/<nom-du-depot>/`

> L'application utilise uniquement des chemins **relatifs** (`assets/...`,
> `icons/...`, `sw.js`) : elle fonctionne aussi bien à la racine d'un domaine
> que dans un sous-dossier comme sur GitHub Pages.

### Mettre à jour le contenu par défaut (celui livré à tous les nouveaux utilisateurs)

Le contenu que voient les nouveaux visiteurs (avant toute modification de
leur part) est stocké dans `index.html`, dans la constante `DEFAULT_DATA`
(les phases/étapes) et `DEFAULT_CONFIG` (email de contact, liens Banque de
référentiels). Deux façons de le mettre à jour d'une année sur l'autre :

- **Le plus simple** : ouvrez l'app, faites vos modifications dans
  Administration, cliquez sur **Exporter (JSON)**, puis demandez à un⋅e
  développeur⋅se de remplacer le contenu de `DEFAULT_DATA` /
  `DEFAULT_CONFIG` dans `index.html` par ce JSON exporté, et republiez sur
  GitHub. Le fichier exporté contient désormais deux clés : `phases` et
  `config`.
- Vous pouvez aussi éditer `DEFAULT_DATA` / `DEFAULT_CONFIG` directement dans
  `index.html`.

Après publication d'une nouvelle version, pensez à changer `CACHE_VERSION`
dans `sw.js` (ex. `ccf-eps-2026-09-01`) pour forcer les navigateurs à
récupérer les nouveaux fichiers plutôt que de servir l'ancienne version mise
en cache.

---

## 🎨 Identité visuelle

- Le **logo CAHP Nantes** (fourni) est affiché en permanence dans le bandeau
  du haut, et sert également de base aux icônes de l'application (icône
  d'accueil, favicon, icône d'installation).
- Le fond de toute l'application (bandeau compris) est en **gris clair**
  avec une **police foncée**, pour un rendu propre et lisible.
- Les **5 étapes/phases** reprennent chacune une des **5 couleurs des
  bandes verticales du logo** (turquoise, orange, rose/rouge, violet, bleu),
  dans l'ordre des phases — bordures, dégradés et titres colorés.
- **Chaque clic sur un bouton** (boutons du bandeau, phases de la barre
  latérale, boutons Précédent/Suivant, boutons de l'Administration, liens de
  la Banque de référentiels…) déclenche un petit **effet visuel** (onde qui
  se propage depuis le point cliqué), pour un retour tactile immédiat.
- Chaque petit logo (Démarche Numérique, Cyclades, Santorin) est placé dans
  un **cadre blanc avec ombre légère** pour rester bien visible quel que soit
  le fond derrière lui.
- Le logo "Démarches Simplifiées" a été remplacé par le nouveau logo
  **Démarche Numérique** (icône colorée + texte, fournis et assemblés dans
  `assets/logo-demarche-numerique.png`), et toutes les mentions textuelles
  "Démarches Simplifiées" dans le contenu ont été renommées en
  "Démarche Numérique".
- Le titre affiché est **"Les Examens en EPS — Pas à pas CCF 2027"**.

---

## 📚 Banque de référentiels

Un bouton **📚 Consulter la Banque de référentiels** dans le bandeau ouvre
une fenêtre avec 3 liens, un par examen : **CAP**, **Bac Pro**, **Bac GT**.
Ces liens (vers vos pads / documents partagés) se configurent dans
**⚙️ Administration → Configuration générale**. Tant qu'un lien n'est pas
renseigné, le bouton correspondant apparaît grisé avec la mention "Lien non
configuré".

---

## 🩹 Nouveautés — Inaptitudes

Un bouton **🩹 Nouveautés concernant les Inaptitudes** dans le bandeau ouvre
une fenêtre listant les dernières actualités sur ce sujet — chaque entrée
affiche une date/période, un titre et un texte libre (HTML simple accepté :
paragraphes, listes, liens...).

Ce contenu se gère depuis **⚙️ Administration → 🩹 Nouveautés —
Inaptitudes** : bouton **➕ Ajouter une nouveauté** pour créer une entrée,
avec les mêmes outils que pour les phases (⬆️/⬇️ pour réordonner, 🗑️ pour
supprimer). Tant qu'aucune nouveauté n'est ajoutée, la fenêtre affiche
"Aucune nouveauté publiée pour le moment." Ces entrées sont incluses dans
l'Export/Import JSON, au même titre que les phases et la configuration.

Une première entrée y est déjà intégrée par défaut : le guide
d'accompagnement de la Commission Nationale des Examens EPS sur **les
inaptes partiels temporaires** (repères réglementaires, distinction
inapte partiel permanent/temporaire, les 7 leviers d'adaptation avec leurs
exemples par champ d'apprentissage CA1-CA5, et les points de repères sur le
certificat médical d'inaptitude partielle). Vous pouvez la modifier ou la
compléter depuis Administration comme n'importe quelle autre entrée.

---

## ✉️ Demande d'informations (formulaire de contact)

Un bouton **✉️ Demande d'infos** dans le bandeau ouvre un petit formulaire où
le déposant peut :
- cocher ce qu'il souhaite recevoir : **l'état des lieux de ses
  référentiels** et/ou **les statistiques de son établissement**,
- indiquer le **nom de son établissement** et son **email professionnel**.

Le formulaire fonctionne de deux façons possibles, selon que l'envoi
automatique (Web3Forms) est configuré ou non :

- **Envoi automatique et silencieux (recommandé)** : si la clé Web3Forms est
  renseignée dans Administration (voir ci-dessous), le clic sur **Envoyer**
  transmet la demande directement, sans ouvrir aucune application — ce qui
  fonctionne avec Zimbra, contrairement à `mailto:`. Le visiteur voit un
  message de confirmation **"✅ Votre demande a bien été envoyée"**.
- **Repli automatique (`mailto:`)** : si Web3Forms n'est pas configuré (ou
  si l'envoi automatique échoue), le bouton ouvre la messagerie par défaut
  du visiteur avec un message pré-rempli, comme précédemment. Un aperçu du
  message avec un bouton **📋 Copier le message** reste disponible en
  secours.

### Configurer l'envoi automatique et silencieux (Web3Forms)

[Web3Forms](https://web3forms.com) reçoit les soumissions du formulaire et
les relaie par email — sans back-end à héberger, et sans connecter de compte
Gmail personnel : vous enregistrez directement `examens.eps@ac-nantes.fr`
comme adresse de réception. Plan gratuit : 250 envois/mois, largement
suffisant pour ce formulaire.

1. Allez sur [web3forms.com](https://web3forms.com) → **"Create your Form —
   Free"**.
2. Renseignez **`examens.eps@ac-nantes.fr`** comme adresse email de
   réception (c'est l'adresse qui recevra toutes les demandes).
3. Confirmez via le lien reçu sur cette boîte mail.
4. Copiez la **clé d'accès (Access Key)** générée.
5. Dans l'app, **⚙️ Administration → 📧 Envoi automatique (Web3Forms)**,
   collez cette clé puis **Enregistrer et appliquer**.

Cette clé n'est pas un secret : Web3Forms la conçoit pour être visible dans
le code d'une page (elle fonctionne comme un alias vers l'adresse email
enregistrée, pas comme un mot de passe). Sur le plan payant, Web3Forms
propose en plus une restriction par domaine autorisé si vous souhaitez
durcir davantage.

Si le champ est laissé vide, l'application repasse automatiquement sur le
comportement `mailto:` décrit plus haut — rien ne casse si vous ne
configurez pas Web3Forms tout de suite.

---

## 📲 Installer l'application

- **Android / Chrome / Edge (ordinateur)** : un bouton **⬇️ Installer**
  apparaît automatiquement en haut de l'écran. Sinon : menu du navigateur →
  "Installer l'application" (ou icône dans la barre d'adresse).
- **iPhone / iPad (Safari)** : bouton Partager (le carré avec une flèche) →
  **Sur l'écran d'accueil**.

Une fois installée, l'application s'ouvre en plein écran comme une
application native, avec sa propre icône (logo CAHP Nantes), et fonctionne
**hors connexion** (le service worker met en cache la page et ses images).

---

## ✏️ Modifier le contenu (interface Administration)

Le bouton **⚙️ Administration** demande désormais un identifiant et un mot
de passe (**Admin** / **Quentin**) avant d'ouvrir le panneau.

⚠️ **À bien comprendre** : ce n'est **pas une sécurité réelle**. Le site
est statique (aucun serveur), donc ce contrôle est entièrement fait par le
navigateur — l'identifiant et le mot de passe sont visibles en clair dans le
code source de la page (`index.html`) pour quiconque saurait où regarder
("Afficher le code source"). Cela suffit à empêcher un visiteur ordinaire
d'ouvrir l'administration par curiosité ou par erreur, mais **ça ne protège
pas contre quelqu'un de déterminé à contourner le contrôle**. Pour du contenu
réellement sensible, il faudrait un vrai système d'authentification côté
serveur — hors de portée d'un site 100% statique comme celui-ci. Si vous
voulez changer l'identifiant ou le mot de passe, cherchez `ADMIN_USER` et
`ADMIN_PASS` dans `index.html`.

Une fois connecté, l'accès reste ouvert pour l'onglet du navigateur en cours
(il faudra se reconnecter après avoir fermé et rouvert l'onglet).

1. Ouvrez l'application et cliquez sur **⚙️ Administration**, connectez-vous.
2. En haut du panneau, la section **Configuration générale** permet de
   régler l'email de contact et les 3 liens de la Banque de référentiels.
3. Chaque bloc dépliable en dessous correspond à une **phase** (= un bouton
   de la barre latérale). Vous pouvez modifier :
   - le titre de la phase,
   - le logo associé,
   - un texte d'introduction (optionnel),
   - la liste des étapes (titre + contenu HTML de chacune — c'est ici que
     se trouvent les dates et les liens à changer chaque année).
4. Utilisez ⬆️/⬇️ pour réordonner, ⧉ pour dupliquer, 🗑️ pour supprimer.
5. Cliquez sur **💾 Enregistrer et appliquer**.

Pensez à faire régulièrement un **Export (JSON)** comme sauvegarde : les
modifications sont stockées uniquement dans le navigateur utilisé
(`localStorage`). Elles ne sont donc **pas partagées automatiquement** entre
appareils ou navigateurs différents — utilisez Export/Import pour transférer
votre contenu d'un poste à l'autre, ou pour publier une nouvelle version par
défaut (voir section précédente).

---

## 🔄 Mises à jour de l'application elle-même

Le bouton **🔄 Vérifier les mises à jour** (dans Administration) force le
navigateur à vérifier s'il existe une nouvelle version de l'application sur
GitHub Pages. Si c'est le cas, un bandeau **"Actualiser"** apparaît en bas de
l'écran.
