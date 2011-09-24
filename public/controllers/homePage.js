(function(){
	global.modules.HomePage=function(){
		this.renderTo=function(target, after){
			global.view("/views/homePage.html")
				.render({}, target, null, after);	
		}
	};
})();
