# **Projet Countries - Partie 2**

## **Introduction**
Cette partie du projet se concentre sur la manipulation du **DOM** pour afficher les données à l’écran.  
Elle repose sur la partie 1, où les objets **Country, Currency et Language** ont été créés à partir d’une source JSON.  

⚠️ **Consignes générales** :
- ✔ Commentez votre code.
- ✔ Respectez les noms indiqués.
- ✔ Lisez bien les instructions avant de coder.

---

## **1. Modèle : Création d’un template statique**
### **Objectif**
Créer une page **template.html** avec une table affichant un seul pays en dur (HTML brut, sans JSON).

### **Données affichées**
- Nom en français
- Population
- Surface
- Densité de population
- Continent
- Drapeau (taille mini)

Cette page sert de **modèle** pour la suite.

---

## **2. Affichage de tous les pays (countries_v1.html)**
### **Objectif**
Créer une page **countries_v1.html** et un script **script_v1.js** pour afficher dynamiquement tous les pays en **manipulant le DOM**.

### **Consignes**
- Charger les données JSON dans une variable **all_countries**.
- Générer les `<tr>` de la table avec une **map()** (plutôt qu’une boucle).

---

## **3. Pagination (countries_v2.html)**
### **Objectif**
Créer **countries_v2.html** et **script_v2.js** pour **afficher 25 pays par page** avec navigation.

### **Fonctionnalités**
- Afficher 25 pays à la fois.
- Ajouter les boutons **"PRÉC"** et **"SUIV"**.
- Conserver le numéro de page et l’afficher.
- Un refresh manuel **remet à zéro la pagination** (optionnel : stocker dans un cookie).

---

## **4. Détails d’un pays (countries_v3.html)**
### **Objectif**
Créer **countries_v3.html** et **script_v3.js** pour afficher une zone de détails au clic sur un pays.

### **Fonctionnalités**
- Clic sur une ligne **affiche les détails** du pays (overlay).
- Un bouton permet de fermer la zone de détails.
- **Exception :** Clic sur un drapeau affiche **seulement l’image en grand**.

### **Conseil**
Ajouter un attribut personnalisé sur chaque `<tr>` pour identifier le pays cliqué.

---

## **5. Filtrage (countries_v4.html)**
### **Objectif**
Créer **countries_v4.html** et **script_v4.js** pour ajouter un **filtrage dynamique**.

### **Filtres disponibles**
- **Continent** (liste déroulante générée dynamiquement).
- **Langue** (liste déroulante dynamique).
- **Nom du pays** (champ texte, recherche insensible à la casse et aux accents).

### **Contraintes**
- Le filtrage doit être **instantané** (mise à jour au fur et à mesure de la saisie).
- Les **filtres doivent être combinables**.
- Compatible avec la **pagination** (25 pays/page).

---

## **6. Tri des colonnes (countries_v5.html)**
### **Objectif**
Créer **countries_v5.html** et **script_v5.js** pour **trier la table** sur clic d’un en-tête de colonne.

### **Fonctionnalités**
- Clic sur un en-tête trie par **ordre croissant**.
- Deuxième clic **inverse** l’ordre du tri.
- Priorité : En cas d’égalité, tri secondaire par **nom français**.
- Mettre l’en-tête trié en **gras**.

🚫 **Exception :** Le tri ne s’applique pas à la colonne "Drapeau".

---

## **7. Participation**
Fichier **participation.txt** mentionnant le pourcentage de contribution de chaque membre.

---

## **8. Livrables**
### **Structure du projet**

```
html/
├── data/
│   ├── class_country.js
│   ├── class_currency.js
│   ├── class_language.js
│   ├── countries.js
├── jquery-3.6.3.min.js
├── test/
│   ├── test.html
│   ├── test.js
├── v1/
│   ├── countries_v1.html
│   ├── script_v1.js
├── v2/
│   ├── countries_v2.html
│   ├── script_v2.js
├── v3/
│   ├── countries_v3.html
│   ├── script_v3.js
├── v4/
│   ├── countries_v4.html
│   ├── script_v4.js
├── v5/
│   ├── countries_v5.html
│   ├── script_v5.js
participation.txt
```

---

## **Résumé des étapes à suivre**
✅ 1. **Créer un modèle statique** (template.html).  
✅ 2. **Générer dynamiquement tous les pays** (countries_v1.html).  
✅ 3. **Ajouter une pagination** (countries_v2.html).  
✅ 4. **Afficher les détails d’un pays** (countries_v3.html).  
✅ 5. **Intégrer un filtrage dynamique** (countries_v4.html).  
✅ 6. **Mettre en place un tri des colonnes** (countries_v5.html).  
✅ 7. **Renseigner le fichier de participation** (participation.txt).  

---
