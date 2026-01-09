# Port Russell — Application de gestion (Catways & Réservations)

Application interne de gestion d’un port de plaisance : **authentification**, **CRUD Catways**, **CRUD Réservations** (par catway + vue globale), et **API privée JSON** (via `Accept: application/json`).

---

## Liens (livrable)

- **GitHub** : https://github.com/Star404x/port-russell
- **Application déployée** : http://localhost:3000/

### Compte admin (pour accéder au dashboard)

- **Email** : admin@port-russell.fr
- **Mot de passe** : Admin123!

---

## Prérequis

- Node.js (v18+ recommandé)
- MongoDB (local ou MongoDB Atlas)

---

## Installation & lancement en local

1. Cloner le dépôt :

git clone https://github.com/Star404x/port-russell

cd port-russell

2. Installer les dépendances :

npm install

3. Créer le fichier .env (à partir du modèle) :

cp .env.example .env

4. Renseigner les variables d’environnement dans .env :

MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
SESSION_SECRET="une_phrase_secrete_longue"
NODE_ENV="development"
PORT=3000

5. Lancer le serveur :

npm start

---

Scripts utiles (seed / admin)

6. Un script permet de créer (ou recréer) un compte admin.

node scripts/createAdmin.js

7. Seeder les catways

node scripts/seedCatways.js

---

Technologies :

Node.js / Express

EJS (templates)

MongoDB + Mongoose

express-session + connect-mongo

method-override

Morgan (logs)
