
chrome.runtime.onConnect.addListener(
	function(port) {
		port.onMessage.addListener(
			function(msg) {
				port.postMessage({counter: msg.counter+1});
				console.log(msg.counter);
			}
		);
	}
);

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(request.counter);
		sendResponse({counter: request.counter+1});
	}
);
