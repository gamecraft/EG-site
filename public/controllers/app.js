$(document).ready(function(){
	
	var teamsData=[{name:"a",totalPoints:39},{name:"b",totalPoints:89},{name:"c",totalPoints:87}];
	
	var phases = new global.modules.Phases();
	phases.renderTo($(".phases"));

	var teams = new global.modules.Teams();
	teams.renderTo($(".teams"));
   
	var points = new global.modules.Points(teamsData);
	points.renderTo($(".teamsProgress"));
   
});
