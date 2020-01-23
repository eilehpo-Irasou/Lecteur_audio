class LecteurModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		console.log("loaded");

		super.initialize(mvc);

		let musiqueList = await Comm.get("musiqueDatabase");
		this.musique = musiqueList.response.return;
		
	}

	async getProfile(){
		trace("get session id");
		let result = await Comm.get("getProfileFromSessionId/"+this.mvc.app.connectionMVC.model.sessionId);
		trace(result);
		this.id = result.response.return.id;
		return result.response.return;
	}

	async loadMusique(musique){
		let sound = new Howl({
			src:['audio/80svibe.mp3'],
			volume: 0.5,
		});
		return sound;
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
		this.stage.style.display = "flex";
		// axe y
		this.stage.style.alignItems = "center";
		// axe x
		this.stage.style.justifyContent = "center";


		this.deconnectionDiv = document.createElement("div");
		
		//di pour le lecteur
		this.headerDiv = document.createElement("header")
		this.headerDiv.style.position = "absolute";
		this.headerDiv.style.borderBottom= "double orange";
		this.headerDiv.style.height = "100px";
		this.headerDiv.style.width = "100%";
		this.headerDiv.style.top = "0px";
		this.headerDiv.style.backgroundColor = "#222222";
		this.stage.appendChild(this.headerDiv);

		this.deconnectionDiv = document.createElement("div");
		this.deconnectionDiv.style.display = "flex";
		this.deconnectionDiv.style.justifyContent = "center";
		this.deconnectionDiv.style.marginTop = "5px";
		this.headerDiv.appendChild(this.deconnectionDiv);

		this.deconnectionBtn = document.createElement("button");
		this.deconnectionBtn.style.position = "absolute";
		this.deconnectionBtn.innerHTML = "Déconnection";
		this.deconnectionBtn.style.fontSize = "20px";
		this.deconnectionDiv.appendChild(this.deconnectionBtn);
		
		this.nameDiv = document.createElement("div");
		this.nameDiv.style.display = "flex";
		this.nameDiv.style.justifyContent = "center";
		this.nameDiv.style.marginTop = "20px";
		this.headerDiv.appendChild(this.nameDiv);

		this.profileName = document.createElement("h1");
		this.profileName.style.fontSize = "35px";
		this.profileName.style.color = "orange";
		this.nameDiv.appendChild(this.profileName);

		//div pour la liste des musiques
		this.musiqueDiv = document.createElement("div");
		this.musiqueDiv.style.position = "absolute";
		this.musiqueDiv.style.border= "double orange";
		this.musiqueDiv.style.backgroundColor = "white";
		this.musiqueDiv.style.marginBottom = "10px";
		this.musiqueDiv.style.height = "60%";
		this.musiqueDiv.style.width = "70%";
		this.musiqueDiv.style.justifyContent = "center";

		this.musiqueDiv.style.marginLeft = "10%";
		this.musiqueDiv.style.marginRight = "10%";
		this.stage.appendChild(this.musiqueDiv);


		this.titreDiv = document.createElement("div");
		this.titreDiv.style.display = "flex";
		this.titreDiv.style.justifyContent = "center";
		this.titreDiv.style.marginTop = "10px";
		this.musiqueDiv.appendChild(this.titreDiv);

		//liste musique
		this.titre = document.createElement("h1");
		this.titre.innerHTML = "Liste";
		this.titre.style.fontSize = "30px";
		//this.titre.style.margin = "10px";
		this.titre.style.color = "orange"
		this.titreDiv.appendChild(this.titre);

		//div pour le lecteur
		this.lecteurDiv = document.createElement("footer")
		this.lecteurDiv.style.display = "flex";
		this.lecteurDiv.style.justifyContent = "center";
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
		//this.btnDiv.style.marginLeft = "5%"
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
		this.volumeDiv.style.display = "flex";
		this.volumeDiv.style.justifyContent = "center";
		this.volumeDiv.style.position = "absolute";
		this.volumeDiv.style.marginTop = "90px";


		this.lecteurDiv.appendChild(this.volumeDiv);


		this.volumePlusBtn = document.createElement("button");
		this.volumePlusBtn.style.position = "absolute";
		this.volumePlusBtn.innerHTML = "Vol+";
		this.volumePlusBtn.style.fontSize = "20px";
		this.volumePlusBtn.style.left= "0px";
		this.volumeDiv.appendChild(this.volumePlusBtn);

		this.volumeMoinsBtn = document.createElement("button");
		this.volumeMoinsBtn.style.position = "absolute";
		this.volumeMoinsBtn.innerHTML = "Vol-";
		this.volumeMoinsBtn.style.fontSize = "20px";
		this.volumeMoinsBtn.style.right = "0px";


		this.volumeDiv.appendChild(this.volumeMoinsBtn);

	}

	attach(parent){
		super.attach(parent);
		trace("init profile");
		this.mvc.controller.initProfile();
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

		this.nextHandler = e => this.nextClick(e);
		this.nextBtn.addEventListener("click", this.nextHandler);

		this.prevHandler = e => this.prevClick(e);
		this.prevBtn.addEventListener("click", this.prevHandler);

		this.volumePlusHandler = e => this.volumePlusClick(e);
		this.volumePlusBtn.addEventListener("click", this.volumePlusHandler);
		

		this.volumeMoinsHandler = e => this.volumeMoinsClick(e);
		this.volumeMoinsBtn.addEventListener("click", this.volumeMoinsHandler);

		this.controleHandler = e => this.controleClick(e);
		this.playBtn.addEventListener("click", this.controleHandler);
		this.pauseBtn.addEventListener("click", this.controleHandler);
	}

	removeListeners() {
		this.deconnectionBtn.removeEventListener("click", this.decoHandler);
		this.nextBtn.removeEventListener("click", this.nextHandler);
		this.prevBtn.removeEventListener("click", this.prevHandler);
		this.volumePlusBtn.removeEventListener("change", this.volumeHandler);
		this.volumeMoinsBtn.removeEventListener("change", this.volumeHandler);
		this.controleBtn.removeEventListener("change", this.controleHandler);

	}

	decoClick(event){
		this.mvc.controller.decoClicked();
	}

	nextClick(event){
		this.mvc.controller.nextClicked();
	}

	prevClick(event){
		this.mvc.controller.prevClicked();
	}

	volumePlusClick(event){
		this.mvc.controller.volumePlusClicked();
	}

	volumeMoinsClick(event){
		this.mvc.controller.volumeMoinsClicked();
	}

	controleClick(event){
		this.mvc.controller.controleClicked();
	}

	refreshListeners(){
		this.removeListeners();
		this.addListeners();
	}

	updateProfil(data){
		console.log(data);
		this.profileName.innerHTML = data.username;
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
		this.mvc.view.destroy();
		this.mvc.app.connectionMVC.view.attach(document.body);
		this.mvc.app.connectionMVC.view.activate();
	}


	async nextClicked(params) {

	}

	async prevClicked(params) {

	}

	async volumePlusClicked(musique) {
		var volumeP = await this.mvc.model.loadMusique(musique)
		volumeP += 0.1;
		if (volumeP>1)
			volumeP=1;
		volumeP.volume();
	}

	async volumeMoinsClicked(musique){
		var volumeM = await this.mvc.model.loadMusique(musique)
		volumeM -= 0.1;
		if (volumeM<0)
			volumeM=0;
		volumeM.volume();
	}

	async controleClicked(musique) {
		let music = await this.mvc.model.loadMusique(musique)
		let musicplay = music.play;
		let pause = false;
		let seekplay;
		if(pause){
			this.mvc.view.playBtn.style.display = "none";
			this.mvc.view.pauseBtn.style.display = "block";
			music.play(musicplay);
			music.seek(seekplay,musicplay);
			pause = true;
		}
		else{
			this.mvc.view.playBtn.style.display = "block";
			this.mvc.view.pauseBtn.style.display = "none";
			music.pause();
			seekplay=music.seek(seekplay,musicplay);
			pause=false;

		}
	}

	async initProfile(){
		this.mvc.view.updateProfil(await this.mvc.model.getProfile());
	}


}