(function(){
    global.modules.Phases = function(phasesData) {
        var currentPhase = null;
        var itemActiveView = null;
        var itemView = null;
        
        // used for Timer
        var timerID = null;
        
        var formatTimeLeft = function(timeLeft) {
            var hours = Math.round(timeLeft / (1000*60*60));
            if(hours<10)
                hours = "0"+hours;
            var minutes = Math.round((timeLeft % (1000*60*60)) / (1000*60));
            if(minutes<10)
                minutes = "0"+minutes;
            var seconds = Math.round(((timeLeft % (1000*60*60)) % (1000*60)) / 1000);
            if(seconds<10)
                seconds = "0"+seconds;
            return "Време:&nbsp;"+hours+":"+minutes+":"+seconds;
        }
        
        var clearCurrentPhase = function(){
            if(timerID != null)
                clearInterval(timerID);
            timerID = null;
            $(".timer").html(formatTimeLeft(0));
        }
        
        var setCurrentPhase = function(phaseId, timeLeft) {
            $(".phase").removeClass("activePhase");
            $("#"+phaseId).addClass("activePhase");
            $(".timer").html(formatTimeLeft(timeLeft));
            
            timerID = setInterval(function(){
                timeLeft -= 1000;
                
                // self clean when timeLeft elpases...
                if(timeLeft <= 0) {
                    clearCurrentPhase();
                    return;
                }
                
                // update the timer value 
                $(".timer").html(formatTimeLeft(timeLeft));
            }, 1000);
        }
        
        var loadCurrentPhase = function() {
            $(".timer").html(formatTimeLeft(0));
            global.repo("Phase").get("/current", null, function(err, res) {
                if(err == null && res.data.timeLeft > 0) {
                    setCurrentPhase(res.data._id, res.data.timeLeft);
                } else {
                    clearCurrentPhase();
                }
            });
        }

        this.renderTo = function(target, callback) {

            global.view("/views/phases-container.html")
                .render({}, target, function(){

                    global.view("/views/phases-item.html")
                        .loadView(function(itemView){
                                    
                            for(var i in phasesData)
                                itemView.append({name: phasesData[i].name, id: phasesData[i]._id}, $(".phases"));

                            if(callback)
                                callback();
                                
                            // load the current active Phase timeLeft 
                            loadCurrentPhase();
                        });
                });
        }
    }

})();
