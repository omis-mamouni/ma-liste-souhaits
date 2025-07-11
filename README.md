#  Ma Liste de Souhaits Intelligente

Application mobile développée en React Native (Expo) permettant de créer, gérer et suivre une liste d'articles souhaités avec leurs images, prix, description et lien d'achat.

> Développée par **Mamouni Mohamed** – [LinkedIn](https://www.linkedin.com/in/mohamed-mamouni/)  
> Étudiant en Master SID (Sciences et Ingénierie des Données)

---

## Fonctionnalités
- Ajout d’un article (nom, description, prix, URL du produit, image).
- Affichage de la liste des articles.
- Tri des articles par prix (croissant/décroissant).
- Recherche d'article en temps réel.
- Consultation détaillée de chaque article.
- Modification et suppression d'articles.
- Calcul automatique du total.
- Persistance des données (stockage local).
- Interface sombre moderne et intuitive.

---

## Technologies & Bibliothèques Utilisées
- [Expo (React Native)](https://expo.dev/) – Framework mobile
- TypeScript – Langage
- [@react-navigation/native](https://reactnavigation.org/) – Navigation
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/) – Stockage local
- `Animated` & `Pressable` – Animations et interactions

---

## Installation et Lancement
```bash
git clone https://github.com/omis-mamouni/ma-liste-souhaits.git
cd ma-liste-souhaits
npm install
npx expo start
