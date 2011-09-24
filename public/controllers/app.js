$(document).ready(function(){
    global.repo.endpoint = "//178.79.173.17:3000";
    window.now = nowInitialize(global.repo.endpoint, {});

	//load the phases - header
	
	var loadHeader=function(){
		global.repo("Phase").list({}, null, null, function(err, res) {
	        var phases = new global.modules.Phases(res.data);
	    	phases.renderTo($(".phases"));
	    });
	};
	
	
	var loadTeamInfo=function(){
		global.repo('Team').list({},null,null,function(err, response){
	        var teams = new global.modules.Teams(response.data);
		    teams.renderTo($(".teams"));
	       
		    var points = new global.modules.Points(response.data);
		    points.renderTo($(".teamsProgress"));
	    });
	};
	
	var loadHomePage=function(){
		var homePage= new global.modules.HomePage();
		homePage.renderTo($(".content"));
		
		loadTeamInfo();
	};
	loadHeader();
	loadHomePage();
    
    $(".skillsBtn").click(function(){
    	global.repo('Skill').list({level:"0"},null,null,function(err, response){
    		if(response.data){
    			var skills = new global.modules.Skills(response.data);
                skills.renderTo($(".content"));
                $(".teamsInfo").show();//show the back button
    		}
            
    	});
    });
    $(".achievementsBtn").click(function(){
    	global.repo('Achievement').list({public:"yes"},null,null,function(err, response){
    		if(response.data){
    			var achs = new global.modules.Achievements(response.data);
                achs.renderTo($(".content"));
                $(".teamsInfo").show();//show the back button
    		}
            
    	});
    });
    
    $(".rulesBtn").click(function(){
    	var rules = new global.modules.Rules();
    	rules.renderTo($(".content"));
        $(".teamsInfo").show();//show the back button
    });
    
    $(".teamsInfo").click(function(){
    	loadHomePage();
    });
    
});

