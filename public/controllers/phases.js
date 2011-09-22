(function(){
    global.modules.Phases = function() {
        var currentPhase = null;
        var itemActiveView = null;
        var itemView = null;

        this.renderTo = function(target, callback) {
            var data = ["phase1", "phase2", "phase3"];

            global.view("/views/phases-container.html")
                .render({}, target, function(){

                    global.view("/views/phases-item.html")
                        .loadView(function(view1){
                            global.view("/views/phases-item-active.html")
                                .loadView(function(view2) {
                                    itemView = view1;
                                    itemActiveView = view2;
                                    
                                    for(var i in data)
                                        itemView.append({name: data[i]}, $(".phases"));

                                    if(callback)
                                        callback();
                                });
                        });
                });
        }

        this.setActive = function(phaseName, timeLeft, callback) {
            // set old phase as normal itemView
            if(currentPhase != null)
                itemView.render({name: currentPhase}, $(".phases ."+currentPhase));
            // remember which is current set as active
            currentPhase = phaseName;
            // render it as itemActiveView
            itemActiveView.render({name: phaseName, time: timeLeft},  $(".phases ."+phaseView));

            if(callback)
                callback();
        }
    }
})();
