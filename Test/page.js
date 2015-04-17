
chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(request.counter);
		alert(document.title);
		//sendResponse({counter: request.counter+1});
	}
);
