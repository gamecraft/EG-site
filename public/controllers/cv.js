(function(){
    global.modules.CV = function(memberId){
        this.renderTo = function(target) {
            global.repo("TeamMember").get("/"+memberId, null, function(err, res){
                $(target).addClass("cvFrame").removeClass("siteDefault");
                global.view("/views/cv-body.html")
                    .render(res.data, target, null, function(view){
                        
                    });
            });
        }
    }
})();
