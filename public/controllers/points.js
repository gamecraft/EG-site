(function(){
	global.modules.Points = function(teamsData){
        var pointsView = null;
        
        var calculateProgress=function(maxPoints,points){
        	if(maxPoints==0)
        		maxPoints=1;
        	var progress=points*100/maxPoints;
        	progress=Math.round(progress);
        	progress=500*progress/100;
        	if(progress<=0||undefined)
        		progress=1;
        	console.log("progress"+progress);
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
        var compareTotals = function(a, b) {
        	return b.totalPoints - a.totalPoints;
        };
        this.renderTo = function(target) {
        	
            	
            	 global.view("/views/points-item.html")
                 	.loadView(function(view){
	                 	pointsView = view;
	                 	var maxPoints=getMaxPoints(teamsData);
	                 	var teamsDataSorted = teamsData.sort(compareTotals);
	                     for(var i in teamsDataSorted){
	                    	 pointsView.append({points: teamsDataSorted[i].totalPoints,team: teamsDataSorted[i].name,progress:calculateProgress(maxPoints,teamsDataSorted[i].totalPoints)}
	                    	 , target);
	                     }
	                     	

                  });
      
            
        };
    };
})();