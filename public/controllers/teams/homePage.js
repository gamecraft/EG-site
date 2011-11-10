(function(){
    global.modules.TeamsHomePage = function(page){
        var currentPagew = null;
        var topTeams = null;
        var competitors = new global.modules.Teams();

        var fetchTopTeams = function(topCount, next) {
            global.repo('Team').list({},topCount,null,function(err, response){
                if(err)
                    throw err;

                topTeams = response.data.sort(function(a, b) {
                    return b.totalPoints - a.totalPoints;
                });

                competitors.renderTo(topTeams, $(".teams")); 

                if(currentPage instanceof global.modules.TeamsPoints) 
                    currentPage.renderTo(topTeams, $(".dest"));

                if(next)
                    next();
            });
        }

        this.handleEvent = function(type, data){
            if(type == "team.totalPoints.changed") {
                fetchTopTeams(5);
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
                                   currentPage.renderTo(topTeams, $(".dest"));
                                });
                            });
                        });
                    
                    currentPage = new (global.modules[page.pages[0].controller])();
                    fetchTopTeams(5);
                });
            });
        };
    };
})();
