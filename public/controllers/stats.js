(function(){
    global.modules.Stats = function(){
        var charts = new global.modules.StatsCharts();
    	var loadMockUpData = function(next) {
    		//generating dummy data
        	var phasesCount=8;
        	var teamsCount=5;
        	
        	var allTeams=[];
        	for(var teamIndex=0;teamIndex<teamsCount;teamIndex++){
        		var team={};
        		team.totalLevel=teamIndex*5;
        		team.name="kjsahdkjsa"+teamIndex;
        		team.finishedPhases=[];
        		
        		for(var i=0;i<phasesCount;i++){
        			team.finishedPhases.push(
        					{
        			            phaseId: i,
        			            name: "phase"+i,
        			            totalPoints: (teamIndex+16)*i,
        			            juryPoints: (teamIndex+50)*i
        			        }
        			)
            	}
        		allTeams.push(team);
        	}
        	next(allTeams);
    	};
    	var loadRealData = function(next) {
    		var allTeams=[];
    		global.repo("Team").list({},null,null,function(err, response) {
    			allTeams=response.data;
    			next(allTeams);
    		});
        	
    	};
    	
        this.renderTo = function(target, callback) {
            var plotcharts = ["Отборни точки", "Отборни точки от журито"];
            var barcharts=["Общо класиране"];//sum of skill points for every team
            
		    global.view("/views/stats.html").render({title: ""}, target, null, function(stats){
               loadRealData(function(allTeams){
                   	charts.totalPointsPerPhase.chartData(allTeams, function(chartLines, chartSeries){
                   		charts.totalPointsPerPhase.plot("lineChart1Container", "Отборни точки", 
                   		                                chartLines, chartSeries, "Отборни точки",true);
                   	});
                   	charts.juryPointsPerPhasse.chartData(allTeams, function(chartLines, chartSeries){
                   		charts.juryPointsPerPhasse.plot("lineChart2Container", "Отборни точки от журито",
                   		                                 chartLines, chartSeries,"Отборни точки от журито",false);
                   	});
                   	charts.finalPointsPerTeam.chartData(allTeams,function(chartlines){
                   		charts.finalPointsPerTeam.plot("barChart1Container", "Общо класиране",chartlines);
                   	});
                });
           });
        };
    
    };
})();
