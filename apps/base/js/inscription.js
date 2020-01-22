class InscriptionModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

	}

}

class InscriptionView extends View {

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
		this.mainDiv.style.alignItems = "center";
		this.mainDiv.style.display = "flex";
		this.mainDiv.style.justifyContent = "center";
		this.mainDiv.style.flexDirection = "column";
		this.mainDiv.style.border= "double orange";
		this.mainDiv.style.backgroundColor = "#222222";
		this.stage.appendChild(this.mainDiv);

		//logo Cpatify
		this.titre = document.createElement("h1");
		this.titre.innerHTML = "Cpatify";
		this.titre.style.marginLeft = "190px";
		this.titre.style.fontSize = "60px";
		this.titre.style.color = "orange"
		this.stage.style.alignItems = "center";
		this.mainDiv.appendChild(this.titre);

		this.form = document.createElement("form");
		this.form.setAttribute("action", "register/");
		this.form.setAttribute("method", "POST");
		this.form.style.overflow = "auto";
		this.form.style.display = "flex";
		this.form.style.alignItems = "center";
		this.form.style.flexDirection = "column";
		this.form.style.marginBottom = "15px";
		this.form.style.fontSize = "20px";

		//division pour le pseudo
		this.pseudoDiv = document.createElement("div");
		this.pseudoDiv.style.display = "flex";
		this.pseudoDiv.style.marginLeft = "253px";
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

		this.form.appendChild(this.pseudoDiv);

		
		//division pour le password
		this.passwordDiv = document.createElement("div");
		this.passwordDiv.style.display = "flex";
		this.passwordDiv.style.marginLeft = "176px";
		this.passwordDiv.style.marginRight = "10px";
		this.passwordDiv.style.marginBottom = "10px";


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

		this.form.appendChild(this.passwordDiv);


		//division pour la confirmation password
		this.confirmPasswordDiv = document.createElement("div");
		this.confirmPasswordDiv.style.display = "flex";
		this.confirmPasswordDiv.style.marginLeft = "10px";
		this.confirmPasswordDiv.style.marginRight = "10px";

		this.confirmPasswordLabel = document.createElement("label");
		this.confirmPasswordLabel.setAttribute("for","password");
		this.confirmPasswordLabel.innerHTML = "Confirmer le mot de passe :";
		this.confirmPasswordLabel.style.fontSize = "25px";
		this.confirmPasswordLabel.style.color = "white";
		this.confirmPasswordDiv.appendChild(this.confirmPasswordLabel);

    	this.confirmPasswordInput = document.createElement("input");
    	this.confirmPasswordInput.setAttribute("type","password");
		this.confirmPasswordInput.setAttribute("name","password");
		this.confirmPasswordInput.setAttribute("minlength","8");
		this.confirmPasswordInput.setAttribute("maxlength","32");
		this.confirmPasswordInput.placeholder = "entrer a nouveau le mot de passe"
		this.confirmPasswordInput.style.marginLeft = "10px";
		this.confirmPasswordDiv.appendChild(this.confirmPasswordInput);

		this.form.appendChild(this.confirmPasswordDiv);
		
		// message erreur
		this.erreur = document.createElement("span");
		this.erreur.style.display = "none";
		this.erreur.style.color = "red";
		this.form.appendChild(this.erreur);

		//boutton creation
		this.creationBtn = document.createElement("button");
		this.creationBtn.setAttribute("type", "submit");
		this.creationBtn.innerHTML = "Créer un compte";
		this.creationBtn.style.fontSize = "25px";
		this.creationBtn.style.marginTop = "10px";
		this.creationBtn.style.marginLeft = "100px";
		this.creationBtn.style.marginRight = "100px";
		this.creationBtn.style.marginBottom = "10px";
		this.form.appendChild(this.creationBtn);

		this.mainDiv.appendChild(this.form);

		this.connectionBtn = document.createElement("button");
		this.connectionBtn.innerHTML = "Connexion";
		this.connectionBtn.style.marginLeft = "100px";
		this.connectionBtn.style.marginRight = "100px";
		this.connectionBtn.style.marginBottom = "10px";
		this.mainDiv.appendChild(this.connectionBtn);
	}


	activate() {
		super.activate();
		this.addListeners(); // listen to events
	}

	deactivate() {
		super.deactivate();
		this.removeListeners();
	}

	addListeners() {
		this.creationButtonHandler = e => {
			e.preventDefault();
	    this.creationButtonClick();
		}
		this.form.addEventListener("submit", this.creationButtonHandler);

		this.connectionBtnHandler = e => this.connectionBtnClick();
		this.connectionBtn.addEventListener("click", this.connectionBtnHandler);
		
	}

	removeListeners() {

		this.form.removeEventListener("submit", this.creationButtonHandler);

		this.creationBtn.removeEventListener("click", this.connectionBtnHandler);

	}

	refreshListeners(){
		this.removeListeners();
		this.addListeners();
	}

	creationButtonClick(){
		if (this.passwordInput.value == this.confirmPasswordInput.value){
			const FD = new FormData(this.form);
			trace(FD, FD.password);
			FD.set("password", sha512(this.passwordInput.value));
			this.mvc.controller.creationButtonWasClicked(FD);
		}
		else{
			this.fillErrorDisplay("Mot de passe qui ne correspondent pas ");
		}
	}

	connectionBtnClick() {
		this.mvc.controller.connectionBtnWasClicked();
	}


	fillErrorDisplay(message){
		this.erreur.style.display = "";
		this.erreur.innerHTML = message;
	}

}

class InscriptionController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	
	}


	async creationButtonWasClicked(FD){
		let result = await fetch('register/', {
		  method: 'POST',
		  body: FD
		});
		result["response"] = await result["json"]();

		if(result.response.return == 500){
			trace("error: "+result.response.message);
			this.mvc.view.fillErrorDisplay(result.response.message);
		}
		else {
			trace(result.response);
			this.mvc.view.fillErrorDisplay(result.response.message);
			this.mvc.view.destroy();
			this.mvc.app.connectionMVC.view.erreurPassword(result.response.message);
			this.mvc.app.connectionMVC.view.attach(document.body);
			this.mvc.app.connectionMVC.view.activate();
		}
	}

	connectionBtnWasClicked(){
		this.mvc.view.destroy();
		this.mvc.app.connectionMVC.view.attach(document.body);
		this.mvc.app.connectionMVC.view.activate();
	}

}