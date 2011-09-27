(function(){
    global.modules.TeamsListing = function(){
        var loadAllTeams = function(next){
            global.repo("Team").list({},null,null,function(err, response) {
    			next(response.data);
    		});
        }
        var loadTeamMembers = function(teamId, next){
            global.repo("TeamMember").list({teamId: teamId},null,null,function(err, response) {
    			next(response.data);
    		});
        }
        this.renderTo = function(target) {
            global.view("/views/teamsListing-body.html")
                .render({}, target, null, function(body){
                    global.view("/views/teamsListing-item.html")
                        .loadView(function(view) {
                            loadAllTeams(function(teams) {
                                var proecssNextTeam = function() {
                                    var team = teams.shift();
                                    if(!team)
                                        return;
                                    loadTeamMembers(team._id, function(members){
                                        for(var i in members)
                                            view.append({
                                                name: members[i].name,
                                                teamName: team.name,
                                                link: "/#cv/"+members[i]._id
                                            }, body);
                                        proecssNextTeam();
                                    });
                                }
                                proecssNextTeam();
                           });
                       });
                });
        };
    }
})();
