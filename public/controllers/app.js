$(document).ready(function(){
    global.repo.endpoint = "//178.79.173.17:3000";
    global.config.get("/config/current.json", function(err, data){
        global.data.config = data;

        //setup crossroads
        crossroads.addRoute('cv/teamsListing', function(memberId){
            var listing = new global.modules.TeamsListing(memberId);
            listing.renderTo($(document.body));        
        });
        crossroads.addRoute('cv/{memberId}', function(memberId){
            var cv = new global.modules.CV(memberId);
            cv.renderTo($(document.body));        
        });
        crossroads.addRoute('cv2/{memberId}', function(memberId){
            var cv = new global.modules.CV2(memberId);
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
});

