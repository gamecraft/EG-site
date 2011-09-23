$(document).ready(function(){
	global.repo.endpoint = "http://178.79.173.17:3000";

    global.repo('Team').list({},null,null,function(err, response){
        var teams = new global.modules.Teams(response.data);
	    teams.renderTo($(".teams"));
       
	    var points = new global.modules.Points(response.data);
	    points.renderTo($(".teamsProgress"));
    });
	
    global.repo("Phase").list({}, null, null, function(err, res) {
        var phases = new global.modules.Phases(res.data);
    	phases.renderTo($(".phases"));
    });
    
    
});
