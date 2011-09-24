(function(){
	global.modules.TeamMembers= function(teamDataMembers,teamName){
		this.renderTo= function(target){
			
			global.view("/views/team-members.html")
            .render({teamName:teamName}, target, null, function(){

                global.view("/views/team-member.html")
                    .loadView(function(view){
                        for(var i in teamDataMembers)
                        	view.append({memberName: teamDataMembers[i].name}, $(".membersList"));
                    });
            });
		};
	};
})();
