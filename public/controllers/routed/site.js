(function(){
    global.modules.Site = function(){
        this.renderTo = function(target) {
            $(target).addClass("siteDefault");
            
            global.view("views/site-body.html")
                .render({}, target, null, function(){
                    
                    // holds reference to the current shown page
                    var currentPage = null;

                    var loadHeader=function(){
                        if(global.ui.phases)
                            global.ui.phases.destroy();
	                    global.repo("Phase").list({finished: false}, null, null, function(err, res) {
                            global.ui.phases = new global.modules.Phases(res.data);
                        	global.ui.phases.renderTo($(".phases"));
                        });
                    };

                    // load header
                    loadHeader();
                    
                    // load first page
                    currentPage = new (global.modules[global.data.config.pages[0].controller])(global.data.config.pages[0]);
                    currentPage.renderTo($(".content"));

                    // render all page buttons
                    global.view("/views/pageBtn.html")
                        .loadView(function(view){
                            global.data.config.pages = global.data.config.pages.reverse();
                            global.data.config.pages.forEach(function(page){
                                var btn = view.append({title: page.title}, $(".headerBtns"));
                                btn.click(function(){
                                    currentPage = new (global.modules[page.controller])(page);
                                    currentPage.renderTo($(".content"));
                                });
                            });    
                        });

                    // wireup realtime events
                    var now = window.now = nowInitialize(global.repo.endpoint, {});
                    now.handleEvent = function(type, data) {
                        switch(type) {
                            case "phase.active.changed":
                                loadHeader();
                            break;
                            case "phase.finished.changed":
                                loadHeader();
                            break;
                            default:
                                if(currentPage.handleEvent)
                                    currentPage.handleEvent(type, data);
                            break;
                        }
                    };
                });
        }
    }
})();
