(function(){
	global.modules.Rules=function(){
		this.renderTo=function(target){
			global.view("/views/rules.html")
            	.render({}, target, null, function(){
            	});
            };
	
		};
})();