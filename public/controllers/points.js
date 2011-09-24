(function(){
	global.modules.Points = function(teamsData){
        var pointsView = null;
        
        var calculateProgress=function(maxPoints,points){
        	var progress=points*100/maxPoints;
        	progress=Math.round(progress);
        	progress=500*progress/100;
        	if(progress==0)
        		progress=1;
        	return progress;
        };
        var getMaxPoints=function(teamsData){
        	var maxPoints=0;
        	for(var i in teamsData){
        		if(teamsData[i].totalPoints>maxPoints)
        			maxPoints=teamsData[i].totalPoints;
        	}
        	return maxPoints;
        };
        this.renderTo = function(target) {
        	global.view("/views/points.html")
            .render({}, target, null, function(){
            	
            	 global.view("/views/points-item.html")
                 	.loadView(function(view){
	                 	pointsView = view;
	                 	var maxPoints=getMaxPoints(teamsData);
	                     for(var i in teamsData){
	                    	 pointsView.append({points: teamsData[i].totalPoints,team: teamsData[i].name,progress:calculateProgress(maxPoints,teamsData[i].totalPoints)}
	                    	 , target);
	                     }
	                     	

                  });
            });
            
        };
    };
})();