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
        this.renderTo = function(membersData,target) {
                
                $(target).html("");

                 global.view("/views/points-item.html")
                    .loadView(function(view){
                        pointsView = view;
                        var maxPoints=getMaxPoints(membersData);
                        for(var i in membersData){
                         pointsView.append({points: membersData[i].points,team: "Участник "+membersData[i].name,
                             progress:calculateProgress(maxPoints,membersData[i].points)}
                         , target);
                        }
                  });
        };
    };
})();