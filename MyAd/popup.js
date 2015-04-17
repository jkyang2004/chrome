function getUrl() {
	var url = document.getElementById('url').value;
	console.log(url);
	return url;
}

function sendUrl() {
	chrome.tabs.query({active: true, currentWindow: true}, 
		function(tabs) {
			var tab = tabs[0];
			var target_url = getUrl();
			chrome.tabs.sendRequest(tab.id, {url: target_url}, 
				function handler(response) {
					//setChildTextNode("resultsRequest", "sended");
				}
			);
		}
	);
}

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#send').addEventListener('click', sendUrl);
});