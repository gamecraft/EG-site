(function(){
	global.modules.Achievements=function(achievements){
		this.renderTo=function(target){
			global.view("/views/achievements.html")
            .render({}, target, null, function(){

                global.view("/views/achievements-item.html")
                    .loadView(function(view){
                        for(var i in achievements){
                        	console.log("achievements");
                    		console.log(achievements[i]);
                    		view.append({achievement: achievements[i].name}, $(".achList"));
                        }
                        	
                    });
            });	
		};
	};
})();