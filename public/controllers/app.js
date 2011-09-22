$(document).ready(function(){
	global.repo.endpoint = "http://178.79.173.17:3000";
    global.repo('Skill').list({},1,null,function(err, data){
        console.log(data);
    });
	var teamsData=[{name:"a",totalPoints:39},{name:"b",totalPoints:89},{name:"c",totalPoints:87}];
	
	var phases = new global.modules.Phases();
	phases.renderTo($(".phases"));

	var teams = new global.modules.Teams();
	teams.renderTo($(".teams"));
   
	var points = new global.modules.Points(teamsData);
	points.renderTo($(".teamsProgress"));
   
});
