(function(){
    global.modules.MembersListing = function(){
        var loadAllMemberrs = function(next){
            global.repo("TeamMember").list({},null,null,function(err, response) {
                next(response.data);
            });
        }
        this.renderTo = function(target) {
            global.view("/views/membersListing-body.html")
                .render({}, target, null, function(body){
                    global.view("/views/membersListing-item.html")
                        .loadView(function(view) {
                            loadAllMemberrs(function(members) {
                                members = members.sort(function(a, b) {
                                    return b.points - a.points;
                                });
                                for(var i in members)
                                    view.append({
                                        name: members[i].name,
                                        points: members[i].points
                                    }, 
                                    $(".membersList", body) );
                           });
                       });
                });
        };
    }
})();
