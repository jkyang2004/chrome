function replace_view(){
	chrome.runtime.sendMessage({
		'serv' : 'replace_view',
		'cmd'  : 'load'
	}, function(response){
		function getResource() {
			var link = "http://www.payco.com";
			var iframe = document.createElement('iframe');
			iframe.frameBorder=10;
			iframe.scrolling="no";
			iframe.width="705px";
			iframe.height="150px";
			iframe.id="randomid";
			iframe.setAttribute("src", link);
			
			return iframe; 			
		}
		
		function changeView(obj){
			if(!obj) return;
			obj.parentNode.appendChild(getResource());
			obj = null;
		}
		changeView(document.querySelector('.smartOutput'));
	});
}
replace_view();