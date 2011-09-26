(function(){
    global.modules.StatsCharts = function(){
        this.totalPointsPerPhase = {};
        this.juryPointsPerPhasse = {};
        this.finalPointsPerTeam = {};
        
        this.totalPointsPerPhase.chartData = function(allTeams, next){//totalPoints per phase
    		
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
    	
    	this.juryPointsPerPhasse.chartData=function(allTeams, next){//jury points per phase
    		
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
    	
    	this.finalPointsPerTeam.chartData=function(allTeams, next){//final points
    		var line=[];
    		for(var i in allTeams){
        		var team = allTeams[i];
        		var teamLine = [team.name,team.totalLevel];
        		line.push(teamLine);
    		}
    		
        	next(line);
    	};
    	
    	this.juryPointsPerPhasse.plot = this.totalPointsPerPhase.plot = function(target, title, chartLines, chartSeries,yaxesLabel,showLegend) {
    		//$("#"+target).html("");
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
  
    	
    	this.finalPointsPerTeam.plot = function(target, title, chartLines){
    		
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
    }
})();
