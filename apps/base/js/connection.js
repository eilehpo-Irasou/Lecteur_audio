class ConnectionModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		console.log("loaded");
		super.initialize(mvc);
		this.sessionId = undefined;
	}

	async erreurPassword(){

	}

	async login(pseudo, password) {
		let result = await Comm.get("login/"+pseudo+"/"+password);
		trace(result);
		if (result.status == 200) {
			this.sessionId = result.response.return;
		}
		trace(this.sessionId);
		return result.response;
	}

}

class ConnectionView extends View {

	constructor() {
		super();
		this.table = null;
	}
	initialize(mvc) {
		super.initialize(mvc);

		this.stage.style.display = "flex";
		this.stage.style.alignItems = "center";
		this.stage.style.justifyContent = "center";
		this.stage.style.backgroundColor = "black";
		

		this.mainDiv = document.createElement("div");
		this.mainDiv.style.display = "flex";
		this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.flexDirection = "column";
		this.mainDiv.style.border= "double orange";
		this.mainDiv.style.backgroundColor = "#222222";

		//logo Cpatify
		this.titre = document.createElement("h1");
		this.titre.innerHTML = "Cpatify";
		this.titre.style.marginLeft = "100px";
		this.titre.style.fontSize = "60px";
		this.titre.style.color = "orange"
		this.stage.style.alignItems = "center";
		this.mainDiv.appendChild(this.titre);

		//division pour le pseudo
		this.pseudoDiv = document.createElement("div");
		this.pseudoDiv.style.display = "flex";
		this.pseudoDiv.style.marginLeft = "87.5px";
		this.pseudoDiv.style.marginRight = "10px";
		this.pseudoDiv.style.marginBottom = "10px";


		this.pseudoLabel = document.createElement("label");
		this.pseudoLabel.innerHTML = "Pseudo :";
		this.pseudoLabel.style.fontSize = "25px";
		this.pseudoLabel.style.color = "white";
		this.pseudoDiv.appendChild(this.pseudoLabel);

		this.pseudoInput = document.createElement("input");
		this.pseudoInput.setAttribute("type","text");
		this.pseudoInput.setAttribute("name","username");
		this.pseudoInput.style.marginLeft = "10px";
		this.pseudoInput.placeholder = "entrer pseudo";
		this.pseudoDiv.appendChild(this.pseudoInput);

		this.mainDiv.appendChild(this.pseudoDiv);

		//division pour le password
		this.passwordDiv = document.createElement("div");
		this.passwordDiv.style.display = "flex";
		this.passwordDiv.style.marginLeft = "10px";
		this.passwordDiv.style.marginRight = "10px";

		this.passwordLabel = document.createElement("label");
		this.passwordLabel.setAttribute("for","password");
		this.passwordLabel.innerHTML = "Mot de passe :";
		this.passwordLabel.style.fontSize = "25px";
		this.passwordLabel.style.color = "white";
		this.passwordDiv.appendChild(this.passwordLabel);

    	this.passwordInput = document.createElement("input");
    	this.passwordInput.setAttribute("type","password");
		this.passwordInput.setAttribute("name","password");
		this.passwordInput.setAttribute("minlength","8");
		this.passwordInput.setAttribute("maxlength","32");
		this.passwordInput.placeholder = "entrer mot de passe"
		this.passwordInput.style.marginLeft = "10px";
		this.passwordDiv.appendChild(this.passwordInput);

		this.mainDiv.appendChild(this.passwordDiv);

		//message error
		this.erreur = document.createElement("p");
		this.erreur.style.color = "red";
		this.erreur.style.display = "none";
		this.mainDiv.appendChild(this.erreur);

		//button connection
		this.connectionBtn = document.createElement("button");
		this.connectionBtn.innerHTML = "Connexion";
		this.connectionBtn.style.margin = "10px";
		this.connectionBtn.style.marginLeft = "100px";
		this.connectionBtn.style.marginRight = "100px";
		this.connectionBtn.style.marginBottom = "10px";
   		this.mainDiv.appendChild(this.connectionBtn);

		//button creation
		this.creationBtn = document.createElement("button");
		this.creationBtn.innerHTML = "Créer un compte";
		this.creationBtn.style.marginTop = "10px";
		this.creationBtn.style.marginLeft = "100px";
		this.creationBtn.style.marginRight = "100px";
		this.creationBtn.style.marginBottom = "50px";
		this.mainDiv.appendChild(this.creationBtn);

		this.stage.appendChild(this.mainDiv);

	}

	// activate UI
	activate() {
		super.activate();
		this.addListeners(); // listen to events
	}

	// deactivate
	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners() {
		this.connectionBtnHandler = e => this.connectionClick(e);
		this.connectionBtn.addEventListener("click", this.connectionBtnHandler);

		this.creationBtnHandler = e => this.creationClick(e);
		this.creationBtn.addEventListener("click", this.creationBtnHandler);
	}

	removeListeners() {
		this.connectionBtn.removeEventListener("click", this.connectionBtnHandler);
		this.creationBtn.removeEventListener("click", this.creationBtnHandler);
	}

	connectionClick(event) {
		this.mvc.controller.connectionBtnWasClicked(this.pseudoInput.value,this.passwordInput.value);
	}

	creationClick(event) {
		this.mvc.controller.creationBtnWasClicked();
  	}

	erreurPassword(message){
		this.erreur.innerHTML = message
	}

}

class ConnectionController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}

  	async connectionBtnWasClicked(pseudo, password) {
		trace("btn click", pseudo, password);
		if (this.verifPassword(password)) {
			let cryptPassword = sha512(password);
			let response = await this.mvc.model.login(pseudo,cryptPassword)
			if (this.mvc.model.sessionId == undefined) {
				this.mvc.view.erreurPassword(response.return);
			}
			else{
				this.mvc.view.destroy();
		    	this.mvc.app.lecteurMVC.view.attach(document.body);
				this.mvc.app.initSocket(this.mvc.app.lecteurMVC.model.id);
		    	this.mvc.app.lecteurMVC.view.activate();
			}
		}
 	}

	async creationBtnWasClicked() {
		this.mvc.view.destroy();
		this.mvc.app.inscriptionMVC.view.attach(document.body);
		this.mvc.app.inscriptionMVC.view.activate();
 	}

	verifPassword(password){
		if (password.length < 8 || password.length > 32) {
			return false;
		}
		return true
	}

}
