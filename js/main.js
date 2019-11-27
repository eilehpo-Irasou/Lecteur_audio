window.addEventListener("load", event => {
	console.log("loaded");
	main();
});

const main = event => {
	
	console.log("MAIN");
	
	let component = new MyComponent("dummy");
	
}

class MyComponent {
	
	constructor(name) {
		console.log("my name is", name);
	}
	
}