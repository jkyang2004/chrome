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
			iframe.width="640px";
			iframe.height="150px";
			iframe.id="randomid";
			iframe.setAttribute("src", link);
			
			return iframe; 			
		}
		
		function changeView(obj, obj2){
			if(obj) {
				obj.insertBefore(getResource(), obj.childNodes[0]);
				obj = null;
			} else if (obj2) {
				obj2.appendChild(getResource());
				obj2 = null;
			}	
		}
		changeView(document.querySelector('.art_wrap'), document.querySelector('.news_content'));
	});
}
replace_view();