const ModuleBase = load("com/base"); // import ModuleBase class

const fs = require('fs');
const busboy = require('busboy');

class Base extends ModuleBase {

	constructor(app, settings) {
		super(app, new Map([["name", "baseapp"], ["io", true]]));

		this.musiques= JSON.parse(fs.readFileSync('apps/base/_server/json/musique.json', 'utf8'));
		this.users= JSON.parse(fs.readFileSync('apps/base/_server/json/user.json', 'utf8'));

		this.titresMusique = new Array();
		this.musiques.map(musique => {this.titresMusique.push(musique.titre)});

	}

	getmusiqueDatabase(req, res){
		let data = this.titresMusique;
		this.sendJSON(req, res, 200, {return:data});
	}

	getSessionId(sessionId){
			let id = this.session.get(sessionId);
			if(id === undefined)
				id = -1;
			return id;
	}

	login(req, res, speudo, password){
		trace(username, password);
		let profil = this.users.find(profil => profil.speudo == speudo);
		if (profil != undefined) {
			this.sessionIds.set(sessionId, profil.id);
			trace(sessionId);
			this.sendJSON(req, res, 200, {return: sessionId});
		}else{
			this.sendJSON(req, res, 401, {return: "Mot de passe ou speudo incorrect"});
		}
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
