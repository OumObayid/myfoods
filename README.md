# MyFood

![Angular](https://img.shields.io/badge/Angular-13-red)
![Firebase](https://img.shields.io/badge/Firebase-Backend-orange)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-blue)
![CSS3](https://img.shields.io/badge/CSS3-Design-green)

---

## Aperçu  

- Voir en ligne : [https://myfoods.oumportfolio.com/](https://myfoods.oumportfolio.com/)  
- Voir la présentation sur Youtube : [https://www.youtube.com/watch?v=tC3BCyFKXMQ](https://www.youtube.com/watch?v=tC3BCyFKXMQ)  

---

## =================MyFood====================

MyFood est un projet développé avec **Angular 13**.  
Il comporte deux parties : une partie utilisateur et une partie administrateur.  

- Il s’agit d’une boutique de fruits en ligne. L’utilisateur peut acheter des fruits en spécifiant la quantité.  
- Le client peut voir et gérer son panier.  
- L’administrateur peut ajouter, supprimer, modifier ou afficher un ou plusieurs fruits.  
- Les données sont gérées par **Firebase**.  
- Le site inclut également un système d’authentification Firebase.  
- La connexion via **Google** ou **Facebook** est possible.  
- Il est possible de récupérer le mot de passe perdu en vérifiant l’adresse e-mail saisie.  

L’application contient **15 composants**, **5 services** et **1 guard**.  

---

## Tutoriel : Opérations CRUD Angular 13 + Firebase
===================================================

### A- INSTALLATION DE L’APPLICATION ANGULAR

1. Installer Angular CLI :  
```bash
npm install -g @angular/cli
```

2. Créer une nouvelle application (my-food) :
```
ng new my-food
```

3. Accéder au dossier du projet :
```
cd my-food
```

4. Installer ng-bootstrap :
```
npm i @ng-bootstrap/ng-bootstrap
```

5.Tester le projet :
```
ng serve --open
```

###B- CONFIGURATION DU COMPTE FIREBASE + INTÉGRATION ANGULARFIRE

1. Aller sur Firebase : https://console.firebase.google.com/
 et créer un projet.

2. Donner un nom au projet, accepter les conditions et cliquer sur Créer un projet.

3. Une fois dans le dashboard, aller sur Develop > Authentication > Web setup puis cliquer sur Web setup.

4. Copier les identifiants Firebase et les coller dans src/environments/environment.ts :
```
export const environment = {
  production: true,
  firebase: {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxx"
  },
};
```

5. Créer une base de données et mettre les règles de sécurité en mode test.

6. Modifier les règles dans Database > Rules puis publier.
   

###C- INSTALLATION DE FIREBASE ET ANGULARFIRE

1. Installer firebase et AngularFire :
```
npm install firebase @angular/fire --save
```

2. Dans app.module.ts, importer les modules Firebase et l’environnement :
```
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

###Licence

Ce projet est sous licence MIT
   
