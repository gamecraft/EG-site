(function(){
    global.modules.Stats = function(){
        var charts = new global.modules.StatsCharts();
      	
      	var loadRealData = function(next) {
      		var allTeams=[];
      		global.repo("Team").list({},null,null,function(err, response) {
      			allTeams=response.data;
      			next(allTeams);
      		});
          	
      	};
    	
        this.renderTo = function(topTeams, target, callback) {
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
