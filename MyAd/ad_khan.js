var manifest = chrome.runtime.getManifest();
var AD_URL_PAYCO = manifest.author;

function getResource() {
	var link = AD_URL_PAYCO;
	var iframe = document.createElement('iframe');
	iframe.frameBorder=10;
	iframe.scrolling="yes";
	iframe.width="650px";
	iframe.height="150px";
	iframe.id="ad_url_payco_if";
	iframe.setAttribute("src", link);
	return iframe; 			
}

function changeView(){
	var obj = document.querySelector('.khwidgetWrap');
	if(!obj) return;
	
	obj.insertBefore(getResource(), obj.childNodes[0]);
	obj = null;
}

function replace_view(){
	chrome.runtime.sendMessage({
		'serv' : 'replace_view',
		'cmd'  : 'load'
	}, function(response){
		changeView();
	});
}
replace_view();

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		var target = document.getElementById("ad_url_payco_if");
		target.setAttribute("src", request.url);
	}
);