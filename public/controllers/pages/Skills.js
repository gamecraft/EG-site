(function(){
	global.modules.Skills=function(){
        this.loadData = function(next){
            global.repo('Skill').list({level:"0"},null,null,function(err, response){
                if(response.data){
                    next(response.data);
                } else
                    throw err;
            });
        };

		this.renderTo=function(target){
            this.loadData(function(skills){
                global.view("/views/skills.html")
                    .render({}, target, null, function(){

                        global.view("/views/skills-item.html")
                            .loadView(function(view){
                                for(var i in skills){
                                    view.append({skill: skills[i].name, description: skills[i].description}, $(".skillsList"));
                                }
                        });
                    });
            })	
		};
	};
})();
