(function(){
    global.modules.Members = function(){
        this.renderTo = function(membersData, target, next) {
            global.view("/views/teams-container.html")
            .render({}, target, null, function(){
                global.view("/views/teams-item.html")
                .loadView(function(teamView){

                    for(var i in membersData){
                        var team=teamView.append({name: membersData[i].name.substr(0,20)}, $("#teamsList", target));
                        $("a.btn", team)[0]._id=membersData[i]._id;
                    }
                    
                    if(next)
                        next();
                });
            });
        };
    }
})();