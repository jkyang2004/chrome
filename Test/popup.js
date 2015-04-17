function setChildTextNode(elementId, text) {
	document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendRequest().
function testRequest() {
	//setChildTextNode("resultsRequest", "running...");
	chrome.tabs.query({active: true, currentWindow: true}, 
		function(tabs) {
			//var timer = new chrome.Interval();
			//timer.start();
			
			var tab = tabs[0];
			
			chrome.tabs.sendRequest(tab.id, {counter: 1}, 
				function handler(response) {
					setChildTextNode("resultsRequest", "sended");
				}
			);
		}
	);
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#testRequest').addEventListener('click', testRequest);
});