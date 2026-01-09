# Documentation API — Port Russell

API privée de l’application **Port de plaisance — Russell**.  
Elle permet de gérer les **catways**, les **réservations** et l’**authentification**.

👉 Les routes sont **protégées par session** (login obligatoire).  
👉 Pour obtenir des réponses JSON, ajouter l’en-tête :

## Accept: application/json

## Authentification

### Connexion

- **POST** `/login`
- Type : `form`

Champs :

- `email`
- `password`

Succès :

- Création d’une session
- Redirection vers `/dashboard`

---

### Déconnexion

- **GET** `/logout`
- Détruit la session utilisateur

---

## Catways

### Liste des catways

- **GET** `/catways`

Réponse :

- HTML : page avec tableau
- JSON : si `Accept: application/json`

---

### Détails d’un catway

- **GET** `/catways/:id`

Paramètre :

- `id` = numéro du catway

---

### Créer un catway

- **POST** `/catways`

Body (JSON ou form) :

```json
{
  "catwayNumber": 1,
  "catwayType": "long",
  "catwayState": "Bon état"
}


---

Modifier un catway
* PUT /catways/:id
Body identique à la création.

---

Supprimer un catway
* DELETE /catways/:id

---

Réservations (par catway)

Liste des réservations d’un catway
* GET /catways/:id/reservations
Paramètre :
*id = numéro du catway

----

Créer une réservation (par catway)
* POST /catways/:id/reservations
Body :
{
  "clientName": "Jean Dupont",
  "boatName": "Le Neptune",
  "startDate": "2026-01-10",
  "endDate": "2026-01-15"
}

---

Détails d’une réservation
* GET /catways/:id/reservations/:reservationId

---

Modifier une réservation
* PUT /catways/:id/reservations/:reservationId

---

Supprimer une réservation
* DELETE /catways/:id/reservations/:reservationId

---

Réservations (vue globale)

Liste de toutes les réservations
* GET /reservations
Affiche:
* Catway
* Client
* Bateau
* Dates
* Lien vers le catway concerne

---

Créer une réservation (globale)
* POST /reservations
Body:
{
  "catwayNumber": 1,
  "clientName": "Marie Martin",
  "boatName": "Océane",
  "startDate": "2026-02-01",
  "endDate": "2026-02-10"
}

---

Codes d’erreur
* 401 Unauthorized → utilisateur non authentifié
* 404 Not Found → ressource inexistante
* 400 Bad Request → données invalides

---

Notes
* L’API est privée et accessible uniquement après authentification
* Les pages HTML et l’API JSON utilisent les mêmes routes
* Le format de réponse dépend de l’en-tête Accept

```
