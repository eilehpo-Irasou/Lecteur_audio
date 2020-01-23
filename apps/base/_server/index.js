const ModuleBase = load("com/base"); // import ModuleBase class

const fs = 			require("fs");			// file system
const Busboy = require("busboy");

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, new Map([["name", "baseapp"], ["io", true]]));

		this.musiques= JSON.parse(fs.readFileSync('database/musique.json', 'utf8'));
		this.users = JSON.parse(fs.readFileSync('database/user.json', 'utf8'));
		this.sessions = new Map();
		this.sessionIds = new Map();

	}

	getmusiqueDatabase(req, res){
				let data = this.titresMusique;
				this.sendJSON(req, res, 200, {return:data});
	}

	 getSessionId(sessionId) {
 		let id = this.sessionIds.get(sessionId);
 		if (id === undefined) {
 			id = -1;
 		}
 		return id;
 	}


	getProfileFromSessionId(req, res, ...param) {
		trace(param)
		let ssId = [...param].join(" ");
		let id = this.getSessionId(ssId); // profile id of session id
		let profile = 404; // error case
		if (id != -1) {
			profile = this.users[id];
			profile.password = "Nice Try ;)"
		}
		let data = profile; // object profile of user id
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
	}


	getProfileFromId(req, res, ...param) {
		trace(param)
		let id = [...param].join(" ");
		let profile = 404; // error case
		if (id != -1) {
			profile = this.users[id];
			profile.password = "Nice Try ;)"
		}
		let data = profile; // object profile of user id
		this.sendJSON(req, res, 200, {return: data}); // answer JSON
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
			this.sendJSON(req, res, 401, {return: "Erreur mot de passe/ speudo"});
		}
	}

	async register(req, res) {

		let data = await this._getDataFromRequest(req);
		let newProfile = {};
		let errorMessage = "";

		if (data.length < 11) error = 1;

		data.forEach(elem => {

			if(elem[0] == "speudo"){
				if (this._isUsernameTaken(elem[1])) {
					errorMessage = "Speudo deja utilisé";
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
			this.sendJSON(req, res, 200, {return: 200, message: "Compte Crée"});
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

	_createSessionId() {
		let sessionId = "" + Math.random();
		while (this.sessionIds.get(sessionId) != undefined) {
			sessionId = "" + Math.random();
		}
		return sessionId;
	}


	hello(req, res, ... params) {
		let answer = ["hello", ...params, "!"].join(" "); // say hello
		trace(answer); // say it
		this.sendJSON(req, res, 200, {message: answer}); // answer JSON
	}

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
