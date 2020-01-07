/**
* @export
*/
class MVC {
	
	constructor(name, app, model, view, controller) {
		/** @export */this.name = name;
		/** @export */this.app = app;
		/** @export */this.model = model || new Model();
		/** @export */this.view = view || undefined;
		/** @export */this.controller = controller || new Controller();
	}
	
	async initialize() {
		trace("init MVC");
		await this.model.initialize(this);
		await this.view.initialize(this);
		await this.controller.initialize(this);
	}
	
}

class ModelBase {
	
	constructor() {
		/** @export */this.name = undefined;
		/** @export */this.mvc = null;
	}
	
	initialize(mvc) {
		this.mvc = mvc;
		this.name = this.mvc.name + "-model";
	}
	
}

/**
* @export
*/
class Model extends ModelBase {
	
	constructor() {
		super();
	}
	
	/**
	* @export
	*/
	initialize(mvc) {
		super.initialize(mvc);
	}
}

class ViewBase {
	
	constructor() {
		//console.log("construct view :", name, bounds);
		/** @export */this.name = undefined;
		/** @export */this.mvc = null;
		/** @export */this.parent = null;
		/** @export */this.stage = null;
		/** @export */this.btpplay = null;
		/** @export */this.btppause = null;
		/** @export */this.btpnext = null;
		/** @export */this.btpprev = null;
		/** @export */this.volume = null;
		/** @export */this.username = null;
		/** @export */this.password = null;
		/** @export */this.usernamein = null;
		/** @export */this.passwordin = null;
		/** @export */this.ok = null;

		this._rect = null;
		this.attached = false;
		this.activated = false;
	}
	
	async initialize(mvc) {
		this.mvc = mvc;
		this.name = this.mvc.name + "-view";
		this.create();
		//this.user();
	}
	
	create() {
		trace("create", this.name);
		this.stage = document.createElement("div");
		this.stage.style.position = "absolute";
		this.stage.style.left = "0px";
		this.stage.style.top = "0px";
		this.stage.style.width = "100%";
		this.stage.style.height ="100%";
		this.stage.setAttribute("name", "view-" + this.name);

		this.btpplay = document.createElement("div");
		this.btpplay.style.position = "absolute";
		this.btpplay.style.left = "100px";
		this.btpplay.style.bottom = "40px";
		this.btpplay.setAttribute("name", "view-" + this.name);

		this.btppause = document.createElement("div");
		this.btppause.style.position = "absolute";
		this.btppause.style.left = "190px";
		this.btppause.style.bottom = "40px";
		this.btppause.setAttribute("name", "view-" + this.name);
		
		this.btpnext = document.createElement("div");
		this.btpnext.style.position = "absolute";
		this.btpnext.style.left = "290px";
		this.btpnext.style.bottom = "40px";
		this.btpnext.setAttribute("name", "view-" + this.name);

		this.btpprev = document.createElement("div");
		this.btpprev.style.position = "absolute";
		this.btpprev.style.left = "10px";
		this.btpprev.style.bottom = "40px";
		this.btpprev.setAttribute("name", "view-" + this.name);

		this.volumep = document.createElement("div");
		this.volumep.style.position = "absolute";
		this.volumep.style.left = "100px";
		this.volumep.style.bottom = "10px";
		this.volumep.setAttribute("name", "view-" + this.name);

		this.volumem = document.createElement("div");
		this.volumem.style.position = "absolute";
		this.volumem.style.left = "190px";
		this.volumem.style.bottom = "10px";
		this.volumem.setAttribute("name", "view-" + this.name);

		this.username = document.createElement("div");
		this.username.style.position = "absolute";
		this.username.style.left = "10px";
		this.username.style.top = "10px";
		this.username.setAttribute("name", "view-" + this.name);

		this.usernamein = document.createElement("div");
		this.usernamein.style.position = "absolute";
		this.usernamein.style.left = "10px";
		this.usernamein.style.top = "30px";
		this.usernamein.setAttribute("name", "view-" + this.name);

		this.password = document.createElement("div");
		this.password.style.position = "absolute";
		this.password.style.left = "10px";
		this.password.style.top = "70px";
		this.password.setAttribute("name", "view-" + this.name);

		this.passwordin = document.createElement("div");
		this.passwordin.style.position = "absolute";
		this.passwordin.style.left = "10px";
		this.passwordin.style.top = "90px";
		this.passwordin.setAttribute("name", "view-" + this.name);

		this.ok = document.createElement("div");
		this.ok.style.position = "absolute";
		this.ok.style.left = "10px";
		this.ok.style.top = "140px";
		this.ok.setAttribute("name", "view-" + this.name);


		this._rect = null;
		this.draw();
	}
	

	draw() {
		trace("draw", this.name);
	}
	
	resize() {
		if(this.attached) this._rect = this.stage.getBoundingClientRect();
		if(this.attached) this._rect = this.btpplay.getBoundingClientRect();
		if(this.attached) this._rect = this.btppause.getBoundingClientRect();
		if(this.attached) this._rect = this.btpnext.getBoundingClientRect();
		if(this.attached) this._rect = this.btpprev.getBoundingClientRect();
		if(this.attached) this._rect = this.volumep.getBoundingClientRect();
		if(this.attached) this._rect = this.volumem.getBoundingClientRect();
		if(this.attached) this._rect = this.username.getBoundingClientRect();
		if(this.attached) this._rect = this.password.getBoundingClientRect();
		if(this.attached) this._rect = this.usernamein.getBoundingClientRect();
		if(this.attached) this._rect = this.passwordin.getBoundingClientRect();
		if(this.attached) this._rect = this.ok.getBoundingClientRect();
	}
	
	destroy() {
		trace("destroy", this.name);
		if(this.attached) this.detach();
	}
	
	attach(parent) {
		if(this.attached) return;
		trace("attach", this.name);
		this.parent = parent;
		this.parent.appendChild(this.stage);
		this.parent.appendChild(this.btpplay);
		this.parent.appendChild(this.btppause);
		this.parent.appendChild(this.btpnext);
		this.parent.appendChild(this.btpprev);
		this.parent.appendChild(this.volumep);
		this.parent.appendChild(this.volumem);
		this.parent.appendChild(this.username);
		this.parent.appendChild(this.password);
		this.parent.appendChild(this.usernamein);
		this.parent.appendChild(this.passwordin);
		this.parent.appendChild(this.ok);
		this.attached = true;
		this._rect = this.stage.getBoundingClientRect();
		this.mvc.controller.attached();
	}
	
	detach() {
		if(!this.attached) return;
		trace("detach", this.name);
		this.parent.removeChild(this.stage);
		this.parent.removeChild(this.btpplay);
		this.parent.removeChild(this.btppause);
		this.parent.removeChild(this.btpnext);
		this.parent.removeChild(this.btpprev);
		this.parent.removeChild(this.volumep);
		this.parent.removeChild(this.volumem);
		this.parent.removeChild(this.username);
		this.parent.removeChild(this.password);
		this.parent.removeChild(this.usernamein);
		this.parent.removeChild(this.passwordin);
		this.parent.removeChild(this.ok);
		this.attached = false;
		this.mvc.controller.detached();
	}
	
	activate() {
		trace("activate", this.name);
		this.activated = true;
		this.mvc.controller.activated();
	}
	
	deactivate() {
		trace("deactivate", this.name);
		this.activated = false;
		this.mvc.controller.deactivated();
	}
	
}

/**
* @export
*/
class View extends ViewBase {
	
	constructor() {
		super();
	}
	
	/**
	* @export
	*/
	initialize(mvc) {
		super.initialize(mvc);
	}
	
	/**
	* @export
	*/
	create() {
		super.create();
	}
	
	/**
	* @export
	*/
	destroy() {
		super.destroy();
	}
	
	/**
	* @export
	*/
	draw() {
		super.draw();
	}
	
	/**
	* @export
	*/
	resize() {
		super.resize();
	}
	
	/**
	* @export
	*/
	attach(parent) {
		super.attach(parent);
	}
	
	/**
	* @export
	*/
	detach() {
		super.detach();
	}
	
	/**
	* @export
	*/
	activate() {
		super.activate();
	}
	
	/**
	* @export
	*/
	deactivate() {
		super.deactivate();
	}
	
}

class ControllerBase {
	
	constructor() {
		/** @export */this.name = undefined;
		/** @export */this.mvc = null;
	}
	
	initialize(mvc) {
		this.mvc = mvc;
		this.name = this.mvc.name + "-controller";
	}
	
	attached() {
		trace(this.name, "attached");
	}
	
	detached() {
		trace(this.name, "detached");
	}
	
	activated() {
		trace(this.name, "activated");
	}
	
	deactivated() {
		trace(this.name, "deactivated");
	}
}

/**
* @export
*/
class Controller extends ControllerBase {
	
	constructor() {
		super();
	}
	
	/**
	 * @export
	 */
	initialize(mvc) {
		super.initialize(mvc);
	}
	
	/**
	 * @export
	 */
	attached() {
		super.attached();
	}
	
	/**
	 * @export
	 */
	detached() {
		super.detached();
	}
	
	/**
	 * @export
	 */
	activated() {
		super.activated()
	}
	
	/**
	 * @export
	 */
	deactivated() {
		super.deactivated();
	}
}