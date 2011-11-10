(function(){
	global.modules.Achievements=function(){
        this.loadData = function(next){
            global.repo('Achievement').list({public:"yes"},null,null,function(err, response){
                if(response.data)
                    next(response.data);
                else
                    throw err;
            });
        };

		this.renderTo=function(target){
            this.loadData(function(achievements){
                global.view("/views/achievements.html")
                .render({}, target, null, function(){

                    global.view("/views/achievements-item.html")
                        .loadView(function(view){
                            for(var i in achievements){
                                view.append({achievement: achievements[i].name, description: achievements[i].description}, $(".achList"));
                            }
                        });
                }); 
            });
		};
	};
})();
