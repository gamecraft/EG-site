$(document).ready(function(){
    global.repo.endpoint = "//178.79.173.17:3000";
    
    //setup crossroads
    crossroads.addRoute('cv/{memberId}', function(memberId){
        var cv = new global.modules.CV(memberId);
        cv.renderTo($(document.body));        
    });
    crossroads.addRoute("",function(){
        var site = new global.modules.Site();
        site.renderTo($(document.body));
    });
     
    //setup hasher
    hasher.initialized.add(crossroads.parse, crossroads); //parse initial hash
    hasher.changed.add(crossroads.parse, crossroads); //parse hash changes
    hasher.init(); //start listening for history change
});

