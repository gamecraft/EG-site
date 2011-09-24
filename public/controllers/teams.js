(function(){
    global.modules.Teams=function(teamsData){
        var teamView = null;

        var wireClickEvents = function(){
            $(".teams a.btn").click(function(e){
            	var stats = new global.modules.Stats(e.currentTarget.innerText);//team name
            	stats.renderTo($(".stats"));

            	//get team members
            	global.repo("TeamMember").list({teamId:e.currentTarget._id},null,null,function(err, response) {
	            	//create teamMembersView
	            	var teamMembers= new global.modules.TeamMembers(response.data,e.currentTarget.innerText);
	            	teamMembers.renderTo($(".members"));
       		 	});

           });
        };

        this.renderTo = function(target) {
            global.view("/views/teams-container.html")
                .render({}, target, null, function(){

                    global.view("/views/teams-item.html")
                        .loadView(function(view){
                            teamView = view;
                            for(var i in teamsData){
                            	var team=teamView.append({name: teamsData[i].name}, $("#teamsList"));
                            	$("a.btn",team)[i]._id=teamsData[i]._id;
                            }
                                
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
    };
})();
