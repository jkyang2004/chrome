function setChildTextNode(elementId, text) {
	document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendRequest().
function testRequest() {
	setChildTextNode("resultsRequest", "running...");
	chrome.tabs.query({active: true, currentWindow: true}, 
		function(tabs) {
			var timer = new chrome.Interval();
			timer.start();
			
			var tab = tabs[0];
			
			chrome.tabs.sendRequest(tab.id, {counter: 1}, 
				function handler(response) {
					if (response.counter < 1000) {
						chrome.tabs.sendRequest(tab.id, {counter: response.counter}, handler);
					} else {
						timer.stop();
						var usec = Math.round(timer.microseconds() / response.counter);
						setChildTextNode("resultsRequest", usec + "usec");
					}
				}
			);
		}
	);
}

// Tests the roundtrip time of Port.postMessage() after opening a channel.
function testConnect() {
	setChildTextNode("resultsConnect", "running...");

	chrome.tabs.query({active: true, currentWindow: true}, 
		function(tabs) {
			var timer = new chrome.Interval();
			timer.start();
			var port = chrome.tabs.connect(tabs[0].id);

			port.postMessage({counter: 1});
			port.onMessage.addListener(
				function getResp(response) {
					if (response.counter < 1000) {
						port.postMessage({counter: response.counter});
						setChildTextNode("resultsConnect", response.counter + " ea");
					} else {
						timer.stop();
						var usec = Math.round(timer.microseconds() / response.counter);
						setChildTextNode("resultsConnect", usec + "usec");
					}
				}
			);
		}
	);
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#testRequest').addEventListener('click', testRequest);
	document.querySelector('#testConnect').addEventListener('click', testConnect);
});