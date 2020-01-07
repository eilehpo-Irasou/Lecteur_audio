window.addEventListener("load", event => new Base());

class Base {

	constructor() {
		console.log("loaded");

		this.initialize();
	}

	async initialize() {

		this.iospace = "baseapp"; // IO namespace for this app
		this.io = io.connect("http://localhost/" + this.iospace); // connect socket.io
		//this.io.on("connect", () => this.onIOConnect()); // listen connect event

		this.mvc = new MVC("myMVC", this, new MyModel(), new MyView(), new MyController()); // init app MVC
		await this.mvc.initialize(); // run init async tasks
		this.mvc.view.attach(document.body); // attach view
		this.mvc.view.activate(); // activate user interface

	}

	/**
	 * @method test : test server GET fetch
	 */
	async test() {
		console.log("test server hello method");
		let result = await Comm.get("hello/everyone"); // call server hello method with argument "everyone"
		console.log("result", result);
		console.log("response", result.response);
	}

	/**
	 * @method onIOConnect : socket is connected
	 *//*
	onIOConnect() {
		trace("yay IO connected");
		this.io.on("dummy", packet => this.onDummyData(packet)); // listen to "dummy" messages
		this.io.emit("dummy", {value: "dummy data from client"}) // send test message
	}*/

	/**
	 * @method onDummyData : dummy data received from io server
	 * @param {Object} data 
	 *//*
	onDummyData(data) {
		trace("IO data", data);
		this.mvc.controller.ioDummy(data); // send it to controller
	}*/
}

class MyModel extends Model {

	constructor() {
		super();
	}

	async initialize(mvc) {
		super.initialize(mvc);

	}

	async data() {
		trace("get data");
		// keep data in class variable ? refresh rate ?
		let result = await Comm.get("data"); // wait data from server
		return result.response; // return it to controller
	}

	async song() {
		
	}

}

class MyView extends View {

	constructor() {
		super();
		this.table = null;
	}

	initialize(mvc) {
		super.initialize(mvc);
		/*
		// create get test btn
		this.btn = document.createElement("button");
		this.btn.innerHTML = "get test";
		this.stage.appendChild(this.btn);

		// create io test btn
		this.iobtn = document.createElement("button");
		this.iobtn.innerHTML = "io test";
		this.stage.appendChild(this.iobtn);
		
		// io random value display
		this.iovalue = document.createElement("div");
		this.iovalue.innerHTML = "no value";
		this.stage.appendChild(this.iovalue);*/

		// get dataset display
		this.table = document.createElement("table");
		this.stage.appendChild(this.table);

		// pour le boutton precedent
        this.boutton_precedent = document.createElement("button");
		this.boutton_precedent.innerHTML="prev";
		this.boutton_precedent.id="precedent";
		this.btpprev.appendChild(this.boutton_precedent);

		// pour le boutton play 
        this.boutton_play = document.createElement("button");
		this.boutton_play.innerHTML="play";
		this.boutton_play.id="play";
        this.btpplay.appendChild(this.boutton_play);

        // pour le boutton pause
        this.boutton_pause = document.createElement("button");
		this.boutton_pause.innerHTML="pause";
		this.boutton_pause.id="pause";
		this.btppause.appendChild(this.boutton_pause);

		// pour le boutton suivant
        this.boutton_suivant = document.createElement("button");
		this.boutton_suivant.innerHTML="next";
		this.boutton_suivant.id="next";
		this.btpnext.appendChild(this.boutton_suivant);

		// pour le boutton volume +
        this.boutton_volume_plus = document.createElement("button");
		this.boutton_volume_plus.innerHTML="Vol+";
		this.boutton_volume_plus.id="vol+";
		this.volumep.appendChild(this.boutton_volume_plus);

		// pour le boutton volume -
        this.boutton_volume_moins = document.createElement("button");
		this.boutton_volume_moins.innerHTML="Vol-";
		this.boutton_volume_moins.id="vol-";
		this.volumem.appendChild(this.boutton_volume_moins);

		this.user = document.createElement("label");
		this.user.innerHTML="User Name";
		this.user.id="userl";
		this.username.appendChild(this.user);

		this.pass = document.createElement("label");
		this.pass.innerHTML="PassWord";
		this.pass.id="passl";
		this.password.appendChild(this.pass);
		
		this.userin = document.createElement("input");
		this.userin.innerHTML="User";
		this.userin.id="user"
		this.usernamein.appendChild(this.userin);

		this.passin = document.createElement("input");
		this.passin.innerHTML="Pass";
		this.passin.id="password"
		this.passwordin.appendChild(this.passin);

		this.valide = document.createElement("button");
		this.valide.innerHTML="Validé";
		this.ok.appendChild(this.valide);
		
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
		/*this.getBtnHandler = e => this.btnClick(e);
		this.btn.addEventListener("click", this.getBtnHandler);

		this.ioBtnHandler = e => this.ioBtnClick(e);
		this.iobtn.addEventListener("click", this.ioBtnHandler);*/

		this.playHandler = e => this.btnPlay(e);
		this.boutton_play.addEventListener("click", this.playHandler);

		this.pauseHandler = e => this.btnPause(e);
		this.boutton_pause.addEventListener("click", this.pauseHandler);

		this.suivantHandler = e => this.btnSuivant(e);
		this.boutton_suivant.addEventListener("click", this.suivantHandler);

		this.precedentHandler = e => this.btnPrecedent(e);
		this.boutton_precedent.addEventListener("click", this.precedentHandler);

		this.volumePHandler = e => this.btnVolumePlus(e);
		this.boutton_volume_plus.addEventListener("click", this.precedentHandler);

		this.volumeMHandler = e => this.btnVolumeMoins(e);
		this.boutton_volume_moins.addEventListener("click", this.precedentHandler);

		this.valideHandler = e => this.btnValide(e);
		this.valide.addEventListener("click", this.valideHandler);


	}

	removeListeners() {
		/*this.btn.removeEventListener("click", this.getBtnHandler);
		this.iobtn.removeEventListener("click", this.ioBtnHandler);*/
		this.boutton_play.removeEventListener("click", this.playHandler);
		this.boutton_pause.removeEventListener("click", this.pauseHandler);
		this.boutton_suivant.removeEventListener("click", this.suivantHandler);
		this.boutton_precedent.removeEventListener("click", this.precedentHandler);
		this.boutton_volume_plus.removeEventListener("click", this.volumePHandler);
		this.boutton_volume_moins.removeEventListener("click", this.volumeMHandler);
		this.boutton_volume_moins.removeEventListener("click", this.valideHandler);
	}
	/*
	btnClick(event) {
		this.mvc.controller.btnWasClicked("more parameters"); // dispatch
	}

	ioBtnClick(event) {
		this.mvc.controller.ioBtnWasClicked("io parameters"); // dispatch
	}*/
	btnPlay(event) {
		this.mvc.controller.songPlay(); // dispatch
	}
	btnPause(event) {
		this.mvc.controller.songPause(); // dispatch
	}
	btnSuivant(event) {
		this.mvc.controller.songNext(); // dispatch
	}
	btnPrecedent(event) {
		this.mvc.controller.songPrev(); // dispatch
	}
	btnVolumePlus(event) {
		this.mvc.controller.volumePlus(); // dispatch
	}
	btnVolumeMoins(event) {
		this.mvc.controller.volumeMoins(); // dispatch
	}

	btnValide(event) {
		this.mvc.controller.validation(); // dispatch
	}

	update(song) {
		while(this.table.firstChild) this.table.removeChild(this.table.firstChild); // empty table
		song.forEach(el => { // loop data
			let line = document.createElement("tr"); // create line
			Object.keys(el).forEach(key => { // loop object keys
				let cell = document.createElement("td"); // create cell
				cell.innerHTML = el[key]; // display
				line.appendChild(cell); // add cell
			});
			this.table.appendChild(line); // add line
		});
	}
/*
	updateIO(value) {
		this.iovalue.innerHTML = value.toString(); // update io display
	}*/

	source(){
		
	}

}

class MyController extends Controller {

	constructor() {
		super();
	}

	initialize(mvc) {
		super.initialize(mvc);

	}
	/*
	async btnWasClicked(params) {
		trace("btn click", params);
		this.mvc.view.update(await this.mvc.model.data()); // wait async request > response from server and update view table values
	}

	async ioBtnWasClicked(params) {
		trace("io btn click", params);
		this.mvc.app.io.emit("dummy", {message: "dummy io click"}); // send socket.io packet
	}
	*/

	async songPlay(){
		var songlist= new Howl({
			src:['audio/80s_vibe.mp3'],
			autoplay: true,
			loop: true,
			volume: 0.5,
			onend: function() {
				alert('Finished!');
			}
		});
		songlist.play();
	};

	async songPause(){
		songlist.pause();
	}

	async songNext(){
		
	}

	async songPrev(){

	}

	async volumePlus(){
		var volume = songlist.volume();
		volume += 0.1;
		if (volume>1)
			volume=1;
		songlist.volume(volume);
	}

	async VolumeMoins(){
		var volume = songlist.volume();
		volume -= 0.1;
		if (volume<0)
			volume=0;
		songlist.volume(volume);
	}

	async validation(){
		var username = document.getElementById("user").value;
		var password = document.getElementById("password").value;
		var tentative = 3;
		if (username == "test" && password == "test"){
			user.style.display = 'none';
			pass.style.display = 'none';
			userin.style.display = 'none';
			passin.style.display = 'none';
			valide.style.display = 'none';
		}
		else{
			tentative --;
			alert("mauvais mot de passe")
		}
	}

	/*
	ioDummy(data) {
		this.mvc.view.updateIO(data.value); // io dummy data received from main app
	}*/

}
