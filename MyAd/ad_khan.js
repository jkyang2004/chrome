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
			iframe.width="650px";
			iframe.height="150px";
			iframe.id="randomid";
			iframe.setAttribute("src", link);
			
			return iframe; 			
		}
		
		function changeView(obj){
			if(!obj) return;
			obj.insertBefore(getResource(), obj.childNodes[0]);
			obj = null;
		}
		changeView(document.querySelector('.khwidgetWrap'));
	});
}
replace_view();