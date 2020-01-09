class LecteurModel extends Model {

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


class LecteurView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);


		//this.stage.style.display = "flex";
		this.stage.style.backgroundColor = "black";
		this.stage.style.width = "100%";
		this.stage.style.height = "100%";


		this.deconnectionDiv = document.createElement("div");
		

		this.deconnectionBtn = document.createElement("button");
		this.deconnectionBtn.innerHTML = "Déconnection";
		this.deconnectionBtn.style.fontSize = "20px";
		this.stage.appendChild(this.deconnectionBtn);

		//div pour la liste des musiques
		this.musiqueDiv = document.createElement("div");
		this.musiqueDiv.style.position = "absolute";
		this.musiqueDiv.style.border= "double orange";
		this.musiqueDiv.style.backgroundColor = "white";
		this.musiqueDiv.style.height = "80%";
		this.musiqueDiv.style.width = "80%";

		this.musiqueDiv.style.marginLeft = "10%";
		this.musiqueDiv.style.marginRight = "10%";
		this.stage.appendChild(this.musiqueDiv);

		//liste musique
		this.titre = document.createElement("h1");
		this.titre.innerHTML = "Liste";
		this.titre.style.fontSize = "30px";
		this.titre.style.margin = "10px";
		this.titre.style.color = "orange"
		this.musiqueDiv.appendChild(this.titre);


		//div pour le lecteur
		this.lecteurDiv = document.createElement("footer")
		this.lecteurDiv.style.position = "absolute";
		this.lecteurDiv.style.borderTop= "double orange";
		this.lecteurDiv.style.height = "130px";
		this.lecteurDiv.style.width = "100%";
		this.lecteurDiv.style.bottom = "0px";
		this.lecteurDiv.style.backgroundColor = "#222222";
		this.stage.appendChild(this.lecteurDiv)

		this.btnDiv = document.createElement("div")
		this.btnDiv.style.position = "absolute";
		this.btnDiv.style.height = "70px";
		this.btnDiv.style.width = "300px";
		this.btnDiv.style.backgroundColor = "#222222";
		this.btnDiv.style.marginLeft = "5%"
		this.lecteurDiv.appendChild(this.btnDiv)

		this.playBtn = document.createElement("div");
		this.playBtn.setAttribute("class","btn");
		this.playBtn.setAttribute("id","playBtn");
		this.playBtn.style.width = "96px";
		this.playBtn.style.height = "96px";
		this.playBtn.style.left = "102px";
		this.btnDiv.appendChild(this.playBtn);

		this.pauseBtn = document.createElement("div");
		this.pauseBtn.setAttribute("class","btn");
		this.pauseBtn.setAttribute("id","pauseBtn");
		this.pauseBtn.style.width = "96px";
		this.pauseBtn.style.height = "96px";
		this.pauseBtn.style.left = "102px";
		this.pauseBtn.style.display = "none";
		this.btnDiv.appendChild(this.pauseBtn);

		this.nextBtn = document.createElement("div");
		this.nextBtn.setAttribute("class","btn");
		this.nextBtn.setAttribute("id","nextBtn");
		this.nextBtn.style.width = "96px";
		this.nextBtn.style.height = "96px";
		this.nextBtn.style.left = "204px";
		this.btnDiv.appendChild(this.nextBtn);

		this.prevBtn = document.createElement("div");
		this.prevBtn.setAttribute("class","btn");
		this.prevBtn.setAttribute("id","prevBtn");
		this.prevBtn.style.width = "96px";
		this.prevBtn.style.height = "96px";
		this.prevBtn.style.left = "0px";
		this.btnDiv.appendChild(this.prevBtn);

		//div pour le volume
		this.volumeDiv = document.createElement("div");
		this.volumeDiv.style.position = "absolute";
		this.volumeDiv.style.marginTop = "90px";
		this.volumeDiv.style.marginLeft = "5%";


		this.lecteurDiv.appendChild(this.volumeDiv);


		this.volumePlusBtn = document.createElement("button");
		this.volumePlusBtn.style.position = "absolute";
		this.volumePlusBtn.innerHTML = "Vol+";
		this.volumePlusBtn.style.fontSize = "20px";
		//this.volumePlusBtn.style.marginLeft= "90px";
		this.volumeDiv.appendChild(this.volumePlusBtn);

		this.volumeMoinsBtn = document.createElement("button");
		this.volumeMoinsBtn.style.position = "absolute";
		this.volumeMoinsBtn.innerHTML = "Vol-";
		this.volumeMoinsBtn.style.fontSize = "20px";
		this.volumeMoinsBtn.style.marginLeft = "210px";


		this.volumeDiv.appendChild(this.volumeMoinsBtn);

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

		this.decoHandler = e => this.decoClick(e);
		this.deconnectionBtn.addEventListener("click", this.decoHandler);

		this.playHandler = e => this.playClick(e);
		this.playBtn.addEventListener("click", this.playHandler);

		this.pauseHandler = e => this.pauseClick(e);
		this.pauseBtn.addEventListener("click", this.pauseHandler);

		this.nextHandler = e => this.nextClick(e);
		this.nextBtn.addEventListener("click", this.nextHandler);

		this.prevHandler = e => this.prevClick(e);
		this.prevBtn.addEventListener("click", this.prevHandler);

		this.volumeHandler = e => this.volumeClick(e);
		this.volumePlusBtn.addEventListener("change", this.volumeHandler);
		this.volumeMoinsBtn.addEventListener("change", this.volumeHandler);

		
	}

	removeListeners() {
		this.deconnectionBtn.removeEventListener("click", this.decoHandler);
		this.playBtn.removeEventListener("click", this.playHandler);
		this.pauseBtn.removeEventListener("click", this.pauseHandler);
		this.nextBtn.removeEventListener("click", this.nextHandler);
		this.prevBtn.removeEventListener("click", this.prevHandler);
		this.volumePlusBtn.removeEventListener("change", this.volumeHandler);
		this.volumeMoinsBtn.removeEventListener("change", this.volumeHandler);

	}

	decoClick(event){
		this.mvc.controller.decoClicked();
	}

	playClick(event){
		this.mvc.controller.playClicked();
	}

	pauseClick(event){
		this.mvc.controller.pauseClicked();
	}

	nextClick(event){
		this.mvc.controller.nextClicked();
	}

	prevClick(event){
		this.mvc.controller.prevClicked();
	}

	volumeClick(event){
		this.mvc.controller.volumeClicked();
	}

	refreshListeners(){
		this.removeListeners();
		this.addListeners();
	}



	fillErrorDisplay(message){
		this.erreur.style.display = "";
		this.erreur.innerHTML = message;
	}

}

class LecteurController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	
	}

	async decoClicked(params) {

	}

	async playClicked(params) {

	}

	async pauseClicked(params) {

	}

	async nextClicked(params) {

	}

	async prevClicked(params) {

	}

	async volumeClicked(params) {

	}


}