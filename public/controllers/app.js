$(document).ready(function(){
    global.repo.endpoint = "//178.79.173.17:3000";
    var now = window.now = nowInitialize(global.repo.endpoint, {});
    var currentPage = "";
    now.handleEvent = function(type, data) {
        console.log(arguments);
        switch(type) {
            case "team.totalPoints.changed": 
                if(currentPage == "") 
                    loadTeamInfo(true); 
            break;
            case "phase.finished.changed":
            case "phase.active.changed":
                loadHeader();
            break;
        }
    }

	//load the phases - header
    var wireClickEvents = function(){
        $(".teams a.btn").click(function(e){
        	var stats = new global.modules.Stats(e.currentTarget.innerText,$(".teamsProgress"));//team name
        	$(".teamsProgress").html="";
        	stats.renderTo($(".teamsProgress"));
        	loadTeamMembers(e.currentTarget._id,e.currentTarget.innerText);
       });
    };
    var loadTeamMembers=function(teamId,teamName){
    	//get team members
    	global.repo("TeamMember").list({teamId:teamId},null,null,function(err, response) {
        	//create teamMembersView
        	var teamMembers= new global.modules.TeamMembers(response.data,teamName);
        	//remove teams
        	$(".teams").html="";
        	var callback=function(){
        		//add event listener for back button
            	$(".backBtn").click(function(e){
            		//remove team members
                	$(".teams").html="";
                	$(".title").remove();
                	$(".tabs").remove();
                	$(".charts").remove();
                	//$(".teamsProgress").html="";
                	loadTeamInfo(true);
            	});
        	};
        	teamMembers.renderTo($(".teams"),callback);
        	
        	
		 });
    };
	var loadHeader=function(){
	    if(global.ui.phases)
	        global.ui.phases.destroy();
		global.repo("Phase").list({finished: false}, null, null, function(err, res) {
	        global.ui.phases = new global.modules.Phases(res.data);
	    	global.ui.phases.renderTo($(".phases"));
	    });
	};
	
	
	var loadTeamPoints=function(data){
		 var points = new global.modules.Points(data);
		    points.renderTo($(".teamsProgress"));
	};
	var loadTeamInfo=function(withPoints){
		global.repo('Team').list({},null,null,function(err, response){
			global.data.Teams=response.data;
			var callback=function(){
				wireClickEvents();
			};
	        var teams = new global.modules.Teams(global.data.Teams);
		    teams.renderTo($(".teams"),callback);
	       if(withPoints==true){
	    	   loadTeamPoints(global.data.Teams);
	       }
		    
		   
	    });
	};
	
	var loadHomePage=function(withPoints){
	    currentPage = "";
		var homePage= new global.modules.HomePage();
		homePage.renderTo($(".content"), function(){
            loadTeamInfo(withPoints);
        });
	};
	loadHeader();
	loadHomePage(true);
    
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
    	loadHomePage(true);
    });
    
});

