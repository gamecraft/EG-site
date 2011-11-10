(function(){
    global.modules.MembersHomePage = function(page){
        var currentPagew = null;
        var topMembers = null;
        var competitors = new global.modules.Members();

        var fetchTopMembers = function(topCount, next) {
            console.log(topCount);
            global.repo('TeamMember').list({},null,null,function(err, response){
                if(err)
                    throw err;

                topMembers = response.data.sort(function(a, b) {
                    return b.points - a.points;
                });

                topMembers = topMembers.splice(0, topCount);

                competitors.renderTo(topMembers, $(".teams")); 

                if(currentPage instanceof global.modules.MembersPoints) 
                    currentPage.renderTo(topMembers, $(".dest"));

                if(next)
                    next();
            });
        }

        this.handleEvent = function(type, data){
            if(type == "team.totalPoints.changed" || type == "member.points.changed") {
                fetchTopMembers(page.membersCount);
            }
        }

        this.renderTo=function(target, after){
            global.view("/views/homePage.html")
            .render({}, target, null,function(){
                
                global.view("/views/homePageContainer.html")
                .render({}, $(".teamsProgress"), null, function(){

                    global.view("/views/homePageBtn.html")
                        .loadView(function(btnView){
                            page.pages.forEach(function(p){
                                var btn = btnView.append({title: p.title}, $(".pageBtns", target));
                                btn.click(function(){
                                   currentPage = new (global.modules[p.controller])();
                                   currentPage.renderTo(topMembers, $(".dest"));
                                });
                            });
                        });
                    
                    currentPage = new (global.modules[page.pages[0].controller])();
                    fetchTopMembers(page.membersCount);
                });
            });
        };
    };
})();
