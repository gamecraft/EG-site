(function(){
    global.modules.CV = function(memberId){
        this.renderTo = function(target) {
            global.repo("TeamMember").get("/"+memberId, null, function(err, res){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                $(target).addClass("cvFrame");
                global.view("/views/cv-frame.html")
=======
                $(target).addClass("cvFrame").removeClass("siteDefault");
                global.view("/views/cv-body.html")
>>>>>>> e808c3779b6601858a897c0e13bc65113e470d81
=======
                $(target).addClass("cvFrame").removeClass("siteDefault");
                global.view("/views/cv-body.html")
>>>>>>> e808c3779b6601858a897c0e13bc65113e470d81
=======
                $(target).addClass("cvFrame").removeClass("siteDefault");
                global.view("/views/cv-body.html")
>>>>>>> e808c3779b6601858a897c0e13bc65113e470d81
                    .render(res.data, target, null, function(view){
                        
                    });
            });
        }
    }
})();
