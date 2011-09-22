(function(){
    global.modules.Teams = function(teamsData){
        var teamView = null;

        var wireClickEvents = function(){
            $(".teams a.btn").click(function(e){
               var stats = new global.modules.Stats(e.currentTarget.innerText);
              stats.renderTo($(".stats"));
           });
        };

        this.renderTo = function(target) {
            global.view("/views/teams-container.html")
                .render({}, target, null, function(){

                    global.view("/views/teams-item.html")
                        .loadView(function(view){
                            teamView = view;
                            for(var i in teamsData)
                                teamView.append({name: teamsData[i].name}, $("#teamsList"));

                            wireClickEvents();
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
    }
})();
