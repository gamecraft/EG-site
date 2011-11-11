(function(){
    global.modules.Teams = function(){
        
        var loadTeamMembers=function(target, teamId, teamName){
            //get team members
            global.repo("TeamMember").list({teamId:teamId},null,null,function(err, response) {
                global.view("/views/team-members.html")
                .render({teamName:teamName}, target, null, function(){

                    global.view("/views/team-member.html")
                    .loadView(function(view){
                        for(var i in response.data){
                            view.append({memberName: response.data[i].name.substr(0,20)}, $(".membersList"));
                        }
                        $(".backBtn").click(function(e){
                            $(target).html("");
                            $(".title").remove();
                            $(".tabs").remove();
                            loadTeamInfo(target);
                        });
                    });
                });
             });
        };

        this.renderTo = function(teamsData, target, next) {
            global.view("/views/teams-container.html")
            .render({}, target, null, function(){
                global.view("/views/teams-item.html")
                .loadView(function(teamView){

                    for(var i in teamsData){
                        var team=teamView.append({name: teamsData[i].name.substr(0,20)}, $("#teamsList", target));
                        $("a.btn", team)[0]._id=teamsData[i]._id;
                    }
                    $("a.btn", target).click(function(e){
                        loadTeamMembers(target, e.currentTarget._id,e.currentTarget.innerText);
                    }); 
                    if(next)
                        next();
                });
            });
        };
    }
})();