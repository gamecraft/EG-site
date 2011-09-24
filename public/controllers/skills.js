(function(){
	global.modules.Skills=function(skills){
		this.renderTo=function(target){
			global.view("/views/skills.html")
            .render({}, target, null, function(){

                global.view("/views/skills-item.html")
                    .loadView(function(view){
                        for(var i in skills){
                        	console.log("skills");
                    		console.log(skills[i]);
                    		view.append({skill: skills[i].name}, $(".skillsList"));
                        }
                        	
                    });
            });	
		};
	};
})();