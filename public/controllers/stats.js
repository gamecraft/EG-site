(function(){
    global.modules.Stats = function(teamName,target){
    	var loadData = function(next) {
    		//generating dummy data
        	var phasesCount=8;
        	var teamsCount=5;
        	
        	var allTeams=[];
        	for(var teamIndex=0;teamIndex<teamsCount;teamIndex++){
        		var team={};
        		team.totalLevel=teamIndex*5;
        		team.name="kjsahdkjsa";
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
        	console.log(allTeams);
        	next(allTeams);
    	};
    	
    	var createLineChartData=function(allTeams, next){//totalPoints per phase
    		
        	var chartLines=[];
        	var chartSeries=[];
        	for(var i in allTeams){
        		var team = allTeams[i];
        		var teamLine = [];
        		chartSeries.push({
        			// Change our line width and use a diamond shaped marker.
                    lineWidth:2, 
                    markerOptions: { style:'dimaond' }
        		});
        		for(var phaseIndex in team.finishedPhases) {
        			teamLine.push([phaseIndex, team.finishedPhases[phaseIndex].totalPoints]);
        		}
        		chartLines.push(teamLine);
        	}
        	
        	next(chartLines, chartSeries);
    	};
    	
    	var createLineChart2Data=function(allTeams, next){//jury points per phase
    		
        	var chartLines=[];
        	var chartSeries=[];
        	for(var i in allTeams){
        		var team = allTeams[i];
        		var teamLine = [];
        		chartSeries.push({
        			// Change our line width and use a diamond shaped marker.
                    lineWidth:2, 
                    markerOptions: { style:'dimaond' }
        		});
        		for(var phaseIndex in team.finishedPhases) {
        			teamLine.push([phaseIndex, team.finishedPhases[phaseIndex].juryPoints]);
        		}
        		chartLines.push(teamLine);
        	}
        	
        	next(chartLines, chartSeries);
    	};
    	
    	var createBarChartData=function(allTeams, next){//final points
    		var line=[];
    		for(var i in allTeams){
        		var team = allTeams[i];
        		var teamLine = [team.name,team.totalLevel];
        		line.push(teamLine);
    		}
    		
        	next(line);
    	};
    	
    	var plotLineChart = function(target, title, chartLines, chartSeries) {
    		$("#"+target).html("");
            $.jqplot(target, chartLines, 
                { 
                  title:title, 
                  // Series options are specified as an array of objects, one object
                  // for each series.
                  series:chartSeries
                }
             );  
    	};
    	
    	var plotBarChart = function(target, title, chartLines){
    		console.log("lines");
    		console.log(chartLines);
    		
    		var plot1 = $.jqplot(target, [chartLines], {
    		    title: title,
    		    series:[{renderer:$.jqplot.BarRenderer}],
    		    axesDefaults: {
    		        tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
    		        tickOptions: {
    		          angle: -30,
    		          fontSize: '10pt'
    		        }
    		    },
    		    axes: {
    		      xaxis: {
    		        renderer: $.jqplot.CategoryAxisRenderer
    		      }
    		    }
    		});
    	};
    	
        this.renderTo = function(target, callback) {
            var plotcharts = ["TeamPointsPerPhase", "JuryPointsPerPhase"];
            var barcharts=["TeamsTotalLevelBarChart"];//sum of skill points for every team
            target.html("");

            global.view("/views/stats.html").render({title: teamName}, target, null, function(stats){
                loadData(function(allTeams){
                	createLineChartData(allTeams, function(chartLines, chartSeries){
                		plotLineChart("lineChart1Container", "TeamPointsPerPhase", chartLines, chartSeries);
                	});
                	createLineChart2Data(allTeams, function(chartLines, chartSeries){
                		plotLineChart("lineChart2Container", "JuryPointsPerPhase", chartLines, chartSeries);
                	});
                	createBarChartData(allTeams,function(chartlines){
                		plotBarChart("barChart1Container", "TeamsTotalLevelBarChart",chartlines);
                	});
                });
                $(".close", stats).click(function(){
                    target.html("");
                });
            });
        };
    
};
})();
