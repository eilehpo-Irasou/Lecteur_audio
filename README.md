# hello-node
a basic nodeJS http server

run it :

	- install npm / nodejs
	- clone repo
	- cd to repo directory
	- run > npm install
	- run > node index

test it :

	- navigate to http://localhost/hello/everyone

understand it :

	- This project contains a basic HTTP server (NOT SECURED && NON PRODUCTION READY)
	
	- Server :
		. The main index.js file runs the HTTP server and loads an app, which is a simple ES6 class
		. All methods from this app class are exposed as HTTP routes (first URL part) : http://localhost/{method}/some/arguments
			- these methods must take at least two arguments : req and res, passed on from main server class
			- all remaining url parts are passed as arguments to the method
			- methods that begin with a "_" (i.e. _myMethod(){}) are not exposed (kept private)
		. file URLs matching /some/dir/file.ext (something followed by a dot and more chars) are served directly from the main server
		. urls not handled as method or file are redirected to index.html file if it exists
		. The default app (base) is located in apps/base directory
		. It extends ModuleBase class to easily respond to clients requests with various HTTP status codes
	
	- Apps :
		. directory structure :
			- _server : this directory must contain a file named "index.js", which is the entry point of the app (exposed methods)
			- all other files and directories are made available to public requests
			
	- Base app
		. this app is a simple template :
			- index.html : basic index file
			- css/style.css : main stylesheet file
			- js/main.js : app entry point
			- js/utils/comm.js : wrappers for fetch API to exec async GET/POST requests to server
			- js/utils/merge.js : deep merge object util
			- js/utils/mvc.js : MVC utils
			
		. MVC :
			- extend Model / View / Controller classes to create your own classes
			- call new MVC("myAwesomeMVC", new MyModel(), new MyView(), new MyController());
			- this will initialize mvc components and give cross references between each other :
				. this.mvc.model / this.mvc.view / this.mvc.controller


Projet programmation web 

	Contraintes:

		- avec aurora ou howler
		- comptes utilisateurs
		- base de données de morceaux
		- créer des playlists
		- lecture des playlists
		- contrôles classiques (play pause stop previous next volume)
		- mode shuffle et repeat

		- mvc :
		view classique (player et playlist en dessous),
		le controller gère la lecture des morceaux et les contrôles utilisateur
		le model fait l’intermédiaire avec la base de données

		- base de données
		users (id name password)
		songs (id, file)
		playlists (userid songs)

	installation: 

	Comme mnote projet a besoin de la libraire howler pour fonctionner l'installation de celui ci ce
fais via un submodule pour simplififer le clonage du projet voila la ligne de commande à mettre sur le
terminale

	-git clone https://github.com/eilehpo-Irasou/Lecteur_audio.git ; cd Lecteur_audio ; git submodule update --init --recursive

	Notre projet:

	Notre projet avait pour base la création d'un lecteur de musique gerant des utilisateur pour la 
création de playliste de musique selectionner par l'utilisateur sur le site.

	Choix et techno de l'API:

	1- Le code fournie pour la gestion d'un serveur nodejs.
	
	2- Howler: Librairie utiliser et gérer les données audio sur navigateur.

	3- js-sh512: code d'encodage utiliser pour les mots de passe.

	4- 

	Architecture du code:

	- Une fenetre de connection contenant 2 input 1 pour entrer de speudo et un autre pour le mot de 
passe ainsi que 2 bouttons 1 de connection relié au au input pour valider la connection, et un autre pour
acceder a la fenettre de creation de compte.
	
	- Une fenetre de création de compte contenant 2 imput 1 pour entre un speudo, un pour entre un
mot de passe, et un pour confirmer le mot de passe. Il contient aussi 2 bouton un de validation de compte
et un qui permet de revenir a la fenetre de connection.

	- Une fenetre de lecteur contenant 1 input pour la deconnection une div d'affichage des piste, et
une div contenant des div servant pour le controle des musique.

	- Chaque page a son architecture MVC.

	Problèmes rencontrés:
	
	Nous avons eu de gros problèmes pour la réalistion de notre projet en premier nous avions
commencé le projet en reprenant les exemple de howler pour commencer notre projet mais peut de temps
avant de rendre notre projet nous nous somme rendu compte que le programme que nous avions fait n'étais 
pas dutous en accord avec le travail demandé. Nous avons aussi pas reussi a lire les fichier audio nous 
avons constament une erreur 404 meme en donnant directement la source du fichier en paramettre de la 
source de howler. 
	

