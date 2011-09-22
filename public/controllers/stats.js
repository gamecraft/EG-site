(function(){
    global.modules.Stats = function(teamName){

        var plotChartContent = function(target){
          // Some simple loops to build up data arrays.
          var cosPoints = [];
          for (var i=0; i<2*Math.PI; i+=0.4){ 
            cosPoints.push([i, Math.cos(i)*Math.random()*10]); 
          }
            
          var sinPoints = []; 
          for (var i=0; i<2*Math.PI; i+=0.4){ 
             sinPoints.push([i, 2*Math.sin(i-.8)*Math.random()*5]); 
          }
            
          var powPoints1 = []; 
          for (var i=0; i<2*Math.PI; i+=0.4) { 
              powPoints1.push([i, 2.5 + Math.pow(i/4, 2)*Math.random()*100]); 
          }
            
          var powPoints2 = []; 
          for (var i=0; i<2*Math.PI; i+=0.4) { 
              powPoints2.push([i, -2.5 - Math.pow(i/4, 2)*Math.random()*50]); 
          } 
          $("#"+target).html("");
          $.jqplot(target, [cosPoints, sinPoints, powPoints1, powPoints2], 
            { 
              title:(teamName+' per team members'), 
              // Series options are specified as an array of objects, one object
              // for each series.
              series:[ 
                  {
                    // Change our line width and use a diamond shaped marker.
                    lineWidth:2, 
                    markerOptions: { style:'dimaond' }
                  }, 
                  {
                    // Don't show a line, just show markers.
                    // Make the markers 7 pixels with an 'x' style
                    showLine:false, 
                    markerOptions: { size: 7, style:"x" }
                  },
                  { 
                    // Use (open) circlular markers.
                    markerOptions: { style:"circle" }
                  }, 
                  {
                    // Use a thicker, 5 pixel line and 10 pixel
                    // filled square markers.
                    lineWidth:1, 
                    markerOptions: { style:"filledSquare", size:10 }
                  }
              ]
            }
          );  
            
        };

        this.renderTo = function(target, callback) {
            var charts = ["chart1", "chart2", "chart3"];
            target.html("");

            global.view("/views/stats.html").render({title: teamName}, target, null, function(stats){
                global.view("/views/stats-chart.html")
                    .loadView(function(view){
                        for(var i in charts) {
                            view.append({id: charts[i]}, $(".charts", stats));
                            plotChartContent("stats-chart-"+charts[i]);
                        }
                    });
            });
        };
    };
})();
