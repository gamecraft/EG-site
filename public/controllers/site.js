(function(){
    global.modules.Site = function(){
        this.renderTo = function(target) {
            $(target).addClass("siteDefault");
            
            global.view("views/site-body.html")
                .render({}, target, null, function(){
                    var now = window.now = nowInitialize(global.repo.endpoint, {});
                    var currentPage = "";
                    now.handleEvent = function(type, data) {
                        switch(type) {
                            case "team.totalPoints.changed": 
                                if(currentPage == "" || currentPage == "home-stats") 
                                    loadTeamInfo(); 
                            break;
                            case "phase.finished.changed":
                                if(currentPage == "" || currentPage == "home-stats") 
                                    loadTeamInfo();
                            case "phase.active.changed":
                                loadHeader();
                            break;
                        }
                    }

                    var loadHeader=function(){
                        if(global.ui.phases)
                            global.ui.phases.destroy();
	                    global.repo("Phase").list({finished: false}, null, null, function(err, res) {
                            global.ui.phases = new global.modules.Phases(res.data);
                        	global.ui.phases.renderTo($(".phases"));
                        });
                    };
                    
                    var loadHomePage=function(){
                        currentPage = "";
	                    var homePage= new global.modules.HomePage();
	                    homePage.renderTo($(".content"), function(){
		                    //add event listeners to statistics and totalPoints btn clicking
		                    var addEventListeners=function(){
			                    $(".pointsBtn").click(function(){
			                        currentPage = "";
				                    renderTeamPoints(global.data.Teams);
			                    });
			                    $(".statisticsBtn").click(function(){
			                        currentPage = "home-stats";
				                    renderStatistics();
			                    });
			
		                    };
                            loadTeamInfo(addEventListeners);
                        });
                    };
                    
                    var loadTeamInfo=function(next){
	                    global.repo('Team').list({},null,null,function(err, response){
		                    global.data.Teams=response.data.sort(function(a, b) {
                            	return b.totalPoints - a.totalPoints;
                            });
		                    
                            var teams = new global.modules.Teams(global.data.Teams);
	                        teams.renderTo($(".teams"),function(){
                                $(".teams a.btn").click(function(e){
                                    loadTeamMembers(e.currentTarget._id,e.currentTarget.innerText);
                                });
                                
                                if(next)
                                    next();
                                    
                                if(currentPage == "")
                                    renderTeamPoints(global.data.Teams);
                                else
                                if(currentPage == "home-stats")
                                    renderStatistics();
		                    });
                        });
                    };
                    
                    var renderTeamPoints=function(data){
	                     var points = new global.modules.Points(data);
	                        points.renderTo($(".dest"));
                    };
                    
                    var renderStatistics=function(){
                    	var stats = new global.modules.Stats($(".dest"));//team name
                    	stats.renderTo($(".dest"));
                    };
                    
                    var loadTeamMembers=function(teamId,teamName){
                    	//get team members
                    	global.repo("TeamMember").list({teamId:teamId},null,null,function(err, response) {
                        	//create teamMembersView
                        	var teamMembers= new global.modules.TeamMembers(response.data,teamName);
                        	//remove teams
                        	$(".teams").html("");
                        	teamMembers.renderTo($(".teams"), function(){
                        		//add event listener for back button
                            	$(".backBtn").click(function(e){
                            		//remove team members
                                	$(".teams").html("");
                                	$(".title").remove();
                                	$(".tabs").remove();
                                	currentPage = "";
                                	loadTeamInfo();
                            	});
                            	
                            	/*$(".memberBtn").click(function(e){
                            	    currentPage = "home-member-stats";
                            		var selectedMemberName=e.currentTarget.innerText;
                            		//get the right teamMember
                            		var members=response.data;
                            		for(var i=0;i<members.length;i++){
                            			console.log(members[i].name);
                            			if(members[i].name==selectedMemberName){
                            				var memberInfo= new global.modules.MemberInfo(members[i]);
                            				memberInfo.renderTo($(".dest"), function(){
                            					console.log("done rendering member info");
                            				})
                            				break;
                            			}
                            		}
                            	});*/
                        	});
	                     });
                    };
                    
/* ----------------- EVENT HANDLERS */
                    
                    $(".skillsBtn").click(function(){
                        currentPage = "skills";
                    	global.repo('Skill').list({level:"0"},null,null,function(err, response){
                    		if(response.data){
                    			var skills = new global.modules.Skills(response.data);
                                skills.renderTo($(".content"));
                    		}
                            
                    	});
                    });
                    $(".achievementsBtn").click(function(){
                        currentPage = "achievements";
                    	global.repo('Achievement').list({public:"yes"},null,null,function(err, response){
                    		if(response.data){
                    			var achs = new global.modules.Achievements(response.data);
                                achs.renderTo($(".content"));
                    		}
                            
                    	});
                    });
                    
                    $(".rulesBtn").click(function(){
                        currentPage = "rules";
                    	var rules = new global.modules.Rules();
                    	rules.renderTo($(".content"));
                    });
                    
                    $(".teamsInfo").click(function(){
                    	loadHomePage();
                    });

                    // load header
                    loadHeader();
                    
                    // load home page
                    loadHomePage(true);
                });
        }
    }
})();
