(function(){
    global.modules.Teams = function(){
        var teamsData = ["a","b", "c"];
        var randData = ["b","a", "c"];
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
                                teamView.append({name: teamsData[i]}, $("#teamsList"));

                            wireClickEvents();
                        });

                    $("#demoHighscoreAnim").click(function(e){
                        $("#dest").html("");
                        for(var i in randData)
                                teamView.append({name: randData[i]}, $("#dest"));
                        $('#teamsList').quicksand( $('#dest li'), function(){
                           wireClickEvents();
                        } );
                        e.preventDefault();
                    });
                });
        };
    }
})();
