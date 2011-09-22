$(document).ready(function(){
   var phases = new global.modules.Phases();
   phases.renderTo($(".phases"));

   var teams = new global.modules.Teams();
   teams.renderTo($(".teams"));
});
