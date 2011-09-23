(function(){
	global.modules.HomePage=function(){
		this.renderTo=function(target){
			global.view("/views/homePage.html")
				.render({}, target, null, function(){
            });	
		}
	};
})();