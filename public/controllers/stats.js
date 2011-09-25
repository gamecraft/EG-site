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
        		for(var phaseIndex=0;phaseIndex<team.finishedPhases.length;phaseIndex++) {
        			teamLine.push([phaseIndex+1, team.finishedPhases[phaseIndex].totalPoints]);
        		}
        		chartLines.push(teamLine);
        	}
        	var series=[ 
        	          {
        	            // Change our line width and use a diamond shaped marker.
        	            lineWidth:2, 
        	            markerOptions: { style:'dimaond' },
        	            label:allTeams[0].name
        	          }, 
        	          {
        	            // Don't show a line, just show markers.
        	            // Make the markers 7 pixels with an 'x' style
        	            markerOptions: { size: 7, style:"x" },
        	            label:allTeams[1].name
        	          },
        	          { 
        	            // Use (open) circlular markers.
        	            markerOptions: { style:"circle" },
        	            label:allTeams[2].name
        	          }, 
        	          {
        	            // Use a thicker, 5 pixel line and 10 pixel
        	            // filled square markers.
        	            lineWidth:5, 
        	            markerOptions: { style:"filledSquare", size:10 },
        	            label:allTeams[3].name
        	          }, 
        	          {
        	            // Use a thicker, 5 pixel line and 10 pixel
        	            // filled o markers.
        	            lineWidth:5, 
        	            markerOptions: { style:"o", size:10 },
        	            label:allTeams[4].name
        	          }
        	      ]
        	next(chartLines, series);
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
        		for(var phaseIndex=0;phaseIndex<team.finishedPhases.length;phaseIndex++) {
        			teamLine.push([phaseIndex+1, team.finishedPhases[phaseIndex].juryPoints]);
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
    	
    	var plotLineChart = function(target, title, chartLines, chartSeries,yaxesLabel,showLegend) {
    		$("#"+target).html("");
            $.jqplot(target, chartLines, 
                { 
                  title:title, 
                  // Series options are specified as an array of objects, one object
                  // for each series.
                  series:chartSeries
                ,   		    
                axes: {
      		      xaxis: {
      		        renderer: $.jqplot.CategoryAxisRenderer,
      		        label:"Фази"
      		      },
      		      yaxis:{
      		    	  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
      		    	  label:yaxesLabel,
      		    	  min: 0,
      		      tickOptions:{
      		            formatString:'%.0f'
      		      		}
      		      },
      		      highlighter: {
      		        show: true,
      		        sizeAdjust: 7.5
      		      },
      		      cursor: {
      		        show: false
      		      }
            	
      		    },
      		    legend: { show:showLegend, location: 'e' }
               }
             ); 
         };
  
    	
    	var plotBarChart = function(target, title, chartLines){
    		
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
    		        renderer: $.jqplot.CategoryAxisRenderer,
    		        label:"Отбори"
    		      },
    		      yaxis:{
      		    	  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
      		    	  label:"Общо точки",
      		    	  min: 0,
        		      tickOptions:{
          		         formatString:'%.0f'
        		      }
    		      },
      		      highlighter: {
      		        show: true,
      		        sizeAdjust: 7.5
      		      },
      		      cursor: {
      		        show: false
      		      }
    		    }
    		});
    	};
    	
        this.renderTo = function(target, callback) {
            var plotcharts = ["Отборни точки", "Отборни точки от журито"];
            var barcharts=["Общо класиране"];//sum of skill points for every team
            target.html("");

            global.view("/views/stats.html").render({title: teamName}, target, null, function(stats){
                loadRealData(function(allTeams){
                	createLineChartData(allTeams, function(chartLines, chartSeries){
                		plotLineChart("lineChart1Container", "Отборни точки", chartLines, chartSeries, "Отборни точки",true);
                	});
                	createLineChart2Data(allTeams, function(chartLines, chartSeries){
                		plotLineChart("lineChart2Container", "Отборни точки от журито", chartLines, chartSeries,"Отборни точки от журито",false);
                	});
                	createBarChartData(allTeams,function(chartlines){
                		plotBarChart("barChart1Container", "Общо класиране",chartlines);
                	});
                });
                $(".close", stats).click(function(){
                    target.html("");
                });
            });
        };
    
};
})();
