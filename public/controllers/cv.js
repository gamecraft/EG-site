(function(){
    global.modules.CV = function(memberId){
        var charts = new global.modules.StatsCharts();
        var loadTeamsData = function(next) {
    		var allTeams=[];
    		global.repo("Team").list({},null,null,function(err, response) {
    			allTeams=response.data;
    			next(allTeams);
    		});
        	
    	};
    	
        var offsety = 760;
        var pageHeight = 1250;
        var nextPageHeaderHeight = 400;
        var pages = 1;
        
        var imgWidth = 170;
        var imgHeight = 250;
        var spacex = 10;
        var spacey = 10;

        var advanceCurrentOffsetY = function(target, height, check){
            if(!check) {
                offsety += height;
                if(offsety >= pageHeight*pages) {
                    pages += 1;
                    $(target).append("<img src='/img/cv/cv_next_pages.png' class='pageBackground'/>");
                    offsety += nextPageHeaderHeight;
                }
            } else {
                if(offsety+height >= pageHeight*pages) {
                    pages += 1;
                    $(target).append("<img src='/img/cv/cv_next_pages.png' class='pageBackground'/>");
                    offsety += nextPageHeaderHeight;
                }
            }
        }
        
        var renderItems = function(target, items, img) {
            var ox = 150;
            for(var i = 0; i<items.length; i++) {
                var cardImg = $("<img src='"+(items[i].image?items[i].image:img)+"' class='img' />")
                    .css("width", imgWidth+"px")
                    .css("height", imgHeight+"px")
                    .css("left",(ox)+"px")
                    .css("top",(offsety)+"px");
                $(target).append(cardImg);
                ox +=  cardImg.width()+10;
                if(ox>1000) {
                    ox = 150;
                    advanceCurrentOffsetY(target,imgHeight+spacey);
                }
            }
            if(items.length % 5 != 0)
                advanceCurrentOffsetY(target,imgHeight+spacey+30);
        }
        
        var renderSkills = function(target, member) {
            $(".cvDefault .skillsHeader").css("top", offsety).css("left", 100);
            advanceCurrentOffsetY(target, 100);
            renderItems(target, member.skills, "http://github.com/gamecraft/EG-admin/raw/master/images/new_skill.png");
        };
        
        var renderAchievements = function(target, member) {
            $(".cvDefault .achievementsHeader").css("top", offsety).css("left", 100);
            advanceCurrentOffsetY(target, 100);
            renderItems(target, member.achievements, "http://github.com/gamecraft/EG-admin/raw/master/images/modifier_x2.png");
        };
    
        this.renderTo = function(target) {
            global.repo("TeamMember").get("/"+memberId, null, function(err, res){
                $(target).addClass("cvDefault").removeClass("siteDefault");
                
                var member = res.data;
                
                loadTeamsData(function(allTeams){
                    global.repo("Team").get("/"+res.data.teamId, null, function(err, teamRes) {
                        var team = teamRes.data;
                        var sorted = allTeams.sort(function(a, b) {
                        	return b.totalPoints - a.totalPoints;
                        });
                        for(var teamScore = 1; teamScore<=sorted.length; teamScore++)
                            if(sorted[teamScore-1]._id == res.data.teamId)
                                break;
                                
                        global.view("/views/cv-body.html")
                            .render({ name: member.name, teamName: team.name, teamScore: teamScore}, target, null, function(view){
                                if(member.skills.length>0)
                                    renderSkills($(".cvDefault"),member);
                                else
                                    $(".cvDefault .skillsHeader").hide();
                                if(member.achievements.length>0)
                                    renderAchievements($(".cvDefault"),member);
                                else
                                    $(".cvDefault .achievementsHeader").hide();
                                
                               	charts.totalPointsPerPhase.chartData(allTeams, function(chartLines, chartSeries){
                               		charts.totalPointsPerPhase.plot("teamsPoints", "Отборни точки", 
                               		                                chartLines, chartSeries, "Отборни точки",true);
                               	});
                               	charts.juryPointsPerPhasse.chartData(allTeams, function(chartLines, chartSeries){
                               		charts.juryPointsPerPhasse.plot("juryPoints", "Отборни точки от журито",
                               		                                 chartLines, chartSeries,"Отборни точки от журито",false);
                               	});
                               	charts.finalPointsPerTeam.chartData(allTeams,function(chartlines){
                               		charts.finalPointsPerTeam.plot("skillLevels", "Общо класиране",chartlines);
                               	});
                            });
                    });
                });
            });
        };
    }
})();
