(function(){
    global.modules.Teams=function(teamsData){
        var teamView = null;

        

        this.renderTo = function(target,callback) {
            global.view("/views/teams-container.html")
                .render({}, target, null, function(){

                    global.view("/views/teams-item.html")
                        .loadView(function(view){
                            teamView = view;
                            for(var i in teamsData){
                            	var team=teamView.append({name: teamsData[i].name}, $("#teamsList"));
                            	$("a.btn",team)[i]._id=teamsData[i]._id;
                            }
                            callback();    
                            
                        });
                });
        };

        this.updateTeamsData = function(data){
            $("#dest").html("");
            for(var i in data)
                    teamView.append({name: data[i].name}, $("#dest"));
            $('#teamsList').quicksand( $('#dest li'), function(){
               wireClickEvents();
            } );
            e.preventDefault();
        };
    };
})();
