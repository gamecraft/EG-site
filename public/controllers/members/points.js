(function(){
    global.modules.MembersPoints = function(){
        var pointsView = null;
        
        var calculateProgress=function(maxPoints,points){
            if(maxPoints==0)
                maxPoints=1;
            var progress=points*100/maxPoints;
            progress=Math.round(progress);
            progress=500*progress/100;
            if(progress<=0||undefined)
                progress=1;
            return progress;
        };
        var getMaxPoints=function(membersData){
            var maxPoints=0;
            for(var i in membersData){
                if(membersData[i].points>maxPoints)
                    maxPoints=membersData[i].points;
            }
            return maxPoints;
        };
        var compareTotals = function(a, b) {
            return b.points - a.points;
        };
        this.renderTo = function(membersData,target) {
                
                $(target).html("");

                 global.view("/views/points-item.html")
                    .loadView(function(view){
                        pointsView = view;
                        var maxPoints=getMaxPoints(membersData);
                        var dataSorted = membersData.sort(compareTotals);
                         for(var i in dataSorted){
                             pointsView.append({points: dataSorted[i].points,team: "Участник "+dataSorted[i].name,
                                 progress:calculateProgress(maxPoints,dataSorted[i].points)}
                             , target);
                         }
                  });
        };
    };
})();