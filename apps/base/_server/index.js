const ModuleBase = load("com/base"); // import ModuleBase class

const fs = require('fs');
const busboy = require('busboy');

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, new Map([["name", "baseapp"], ["io", true]]));

		this.musiques= JSON.parse(fs.readFileSync('apps/base/_server/json/musique.json', 'utf8'));
		this.users= JSON.parse(fs.readFileSync('apps/base/_server/json/user.json', 'utf8'));

		this.sessions = new Map();
		this.sessionIds = new Map();

		this.titresMusique = new Array();
		this.musiques.map(musique => {this.titresMusique.push(musique.titre)});

	}

	getSessionId(sessionId){
			let id = this.session.get(sessionId);
			if(id === undefined)
				id = -1;
			return id;
	}

	getmusiqueDatabase(req, res){
			let data = this.titresMusique;
			this.sendJSON(req, res, 200, {return:data});
	}

	getProfileFromSessionId(req, res, ...param) {
		trace(param)
		let ssId = [...param].join(" ");
		let id = this.getSessionId(ssId);
		let profile = 404;
		if (id != -1) {
			profile = this.users[id];
			profile.password = "Nice Try ;)"
		}
		let data = profile;
		this.sendJSON(req, res, 200, {return: data});
	}

	login(req, res, speudo, password){
		trace(speudo, password);
		let profil = this.users.find(profil => profil.speudo == speudo);
		if (profil != undefined) {
			let sessionId = this._createSessionId();
			this.sessionIds.set(sessionId, profil.id);
			trace(sessionId);
			this.sendJSON(req, res, 200, {return: sessionId});
		}else{
			this.sendJSON(req, res, 401, {return: "Mot de passe ou speudo incorrect"});
		}
	}

	_createSessionId() {
		let sessionId = "" + Math.random();
		while (this.sessionIds.get(sessionId) != undefined) {
			sessionId = "" + Math.random();
		}
		return sessionId;
	}

	async register(req, res) {

		let data = await this._getDataFromRequest(req);
		let newProfile = {};
		let errorMessage = "";

		if (data.length < 11) error = 1;

		data.forEach(elem => {

			if(elem[0] == "speudo"){
				if (this._isUsernameTaken(elem[1])) {
					errorMessage = "speudo déja utilisé";
				}
				else{
					newProfile[elem[0]] = elem[1];
				}
			}
			else{
				newProfile[elem[0]] = elem[1];
			}
		});

		if(errorMessage != ""){
			this.sendJSON(req, res, 200, {return: 500, message: errorMessage});
		}
		else{
			this.sendJSON(req, res, 200, {return: 200, message: "Compte crée"});
			newProfile.id = this.users.length;
			trace(newProfile);
			this.users.push(newProfile);
		}
	}

	async _getDataFromRequest(req){
		let busboy = new Busboy({ headers: req.headers });
		let result, prom = new Promise(resolve => result = resolve);
		let form = new Array();
		busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
				form.push([fieldname, val]);
		});
		busboy.on('finish', function() {
				result(form);
		  trace('Done parsing form!');
		});
		req.pipe(busboy);
			return prom;
	}

	_isUsernameTaken(speudo){
		let taken = false;
		this.users.map(profil => {
			if (profil.speudo == speudo) taken = true;
		});
		return taken;
	}

	/**
	 * @method hello : world
	 * @param {*} req 
	 * @param {*} res 
	 * @param  {...*} params : some arguments
	 */
	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" "); // say hello
		trace(answer); // say it
		this.sendJSON(req, res, 200, {message: answer}); // answer JSON
	}

	/**
	 * @method data : random data response
	 * @param {*} req 
	 * @param {*} res 
	 */
	data(req, res) {
		let data = [ // some random data
			{id: 0, name: "data0", value: Math.random()},
			{id: 1, name: "data1", value: Math.random()},
			{id: 2, name: "data2", value: Math.random()}
		];
		this.sendJSON(req, res, 200, data); // answer JSON
	}

	/**
	 * @method _onIOConnect : new IO client connected
	 * @param {*} socket 
	 */
	_onIOConnect(socket) {
		super._onIOConnect(socket); // do not remove super call
		socket.on("dummy", packet => this._onDummyData(socket, packet)); // listen to "dummy" messages
	}

	_onDummyData(socket, packet) { // dummy message received
		trace(socket.id, "dummy", packet); // say it
		socket.emit("dummy", {message: "dummy indeed", value: Math.random()}); // answer dummy random message
	}

}

module.exports = Base; // export app class
