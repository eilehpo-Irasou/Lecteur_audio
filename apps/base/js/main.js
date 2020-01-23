window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.inscriptionMVC = new MVC("inscriptionMVC", this, new InscriptionModel(), new InscriptionView(), new InscriptionController());
		await this.inscriptionMVC.initialize();

		this.lecteurMVC = new MVC("lecteurMVC", this, new LecteurModel(), new LecteurView(), new LecteurController());
		await this.lecteurMVC.initialize();

		this.connectionMVC = new MVC("connectionMVC", this, new ConnectionModel(), new ConnectionView(), new ConnectionController());
		await this.connectionMVC.initialize();


		//this.lecteurMVC.view.attach(document.body);
		//this.lecteurMVC.view.activate();

		//this.inscriptionMVC.view.attach(document.body);
		//this.inscriptionMVC.view.activate();

		this.connectionMVC.view.attach(document.body);
		this.connectionMVC.view.activate();
		
	}
}