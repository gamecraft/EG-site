(function(){
	global.modules.Points = function(teamsData){
        var pointsView = null;
        
        var calculateProgress=function(maxPoints,points,callback){
        	var progress=points*100/maxPoints;
        	callback(progress);
        };
        var getMaxPoints=function(teamsData,callback){
        	var maxPoints=0;
        	for(var i in teamsData){
        		if(teamsData[i].totalPoints>maxPoints)
        			maxPoints=teamsData[i].totalPoints;
        	}
        	callback(maxPoints);
        };
        this.renderTo = function(target) {
             global.view("/views/points-item.html")
                    .loadView(function(view){
                    	pointsView = view;
                            for(var i in teamsData)
                            	pointsView.append({points: teamsData[i].totalPoints,team: teamsData[i].name}, target);

                        });
        };
    };
})();