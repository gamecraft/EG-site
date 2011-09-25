(function(){
	global.modules.HomePage=function(){
		this.renderTo=function(target, after){
			global.view("/views/homePage.html")
				.render({}, target, null,function(){
					
					global.view("/views/homePageContainer.html")
		            	.render({}, $(".teamsProgress"), null, after)
		            });
				};
	};
})();
