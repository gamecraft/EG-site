(function(){
    global.modules.CV = function(memberId){
        this.renderTo = function(target) {
            global.repo("TeamMember").get("/"+memberId, null, function(err, res){
                $(target).addClass("cvFrame");
                global.view("/views/cv-frame.html")
                    .render(res.data, target, null, function(view){
                        
                    });
            });
        }
    }
})();
