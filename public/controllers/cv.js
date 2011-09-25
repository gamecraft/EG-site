(function(){
    global.modules.CV = function(memberId){
        var appendPage = function(target){
            $(target).append("<img src='/img/cv/cv_next_pages.png' class='pageBackground'/>");
        };
        
        var renderSkills = function(offsety, target, member) {
            var offsetx = 50;
            $(target).css("left", offsetx);
            $(target).css("top", offsety);
            
            var width = 170;
            var height = 250;
            var spacex = 10;
            var spacey = 10;
            var oy = 50;
            var ox = 100;
            for(var r = 0; r<1; r++) 
                for(var i = 0; i<5; i++){
                    var card = $("<div class='img' />")
                        .css("width", width+"px")
                        .css("height", height+"px")
                        .css("left",(i*(width+spacex)+ox)+"px")
                        .css("top",(r*(height+spacey)+oy)+"px");
                    $(target).append(card);
                }
            return offsety+(r*(height+spacey)+oy);
        };
        
        var renderAchievements = function(offsety, target, member) {
            var offsetx = 50;
            offsety += 50;
            $(target).css("left", offsetx);
            $(target).css("top", offsety);
            
            var width = 170;
            var height = 250;
            var spacex = 10;
            var spacey = 10;
            var oy = 50;
            var ox = 100;
            for(var r = 0; r<1; r++) 
                for(var i = 0; i<5; i++){
                    var card = $("<div class='img' />")
                        .css("width", width+"px")
                        .css("height", height+"px")
                        .css("left",(i*(width+spacex)+ox)+"px")
                        .css("top",(r*(height+spacey)+oy)+"px");
                    $(target).append(card);
                }
        };
    
        this.renderTo = function(target) {
            global.repo("TeamMember").get("/"+memberId, null, function(err, res){
                $(target).addClass("cvDefault").removeClass("siteDefault");
                
                var member = res.data;
                member.name = "Борис Ангелов Филипов";
                
                global.repo("Team").get("/"+res.data.teamId, null, function(err, teamRes) {
                    var team = teamRes.data;
                    team.name = "TESTOV NAME";
                    
                    global.view("/views/cv-body.html")
                        .render({ name: member.name, teamName: team.name}, target, null, function(view){
                            var offsety = renderSkills(670, $(".cvDefault .skills"),member);
                            if(offsety > 1000) {
                                appendPage($(".cvDefault .cvContent"));
                                offsety += 600;
                            }
                            renderAchievements(offsety, $(".cvDefault .achievements"),member);
                        });
                });
            });
        };
    }
})();
