export function suite(description, fn) {
	let ul = document.createElement("ul");
	ul.appendChild(document.createTextNode(description));
	document.body.appendChild(ul);
	fn();
}

export function assert(description, value) {
	var li = document.createElement("li");
	li.className = value ? "pass" : "fail";
	li.appendChild(document.createTextNode(description));
	//document.getElementById("results").appendChild(li);
	document.body.lastElementChild.appendChild(li);
}
