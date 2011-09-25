(function(){
	global.modules.MemberInfo = function(memberData){
		
		var skillsItemView = null;	
		var achievementsItemView = null;
		this.renderTo=function(target,next){
				global.view("/views/member-info.html")
	            	.render({}, target, null, function(){
	            		$(target).html("");
	               	 	global.view("/views/skills-item.html")
	                    	.loadView(function(skillview){	
	                    		skillsItemView=skillview;
	                    		global.view("/views/achievements-item.html")
		                    		.loadView(function(achView){
		                    			achievementsItemView=achView;
		                    			
		                    			$(".memAchievementsList").html("");
		                    			$(".memSkillsList").html("");
		                    			console.log(achievementsItemView);
		                    			console.log(skillsItemView);
				   	                 	//var teamsDataSorted = teamsData.sort(compareTotals);
				   	                     for(var i in memberData.achievements){
				   	                    	achievementsItemView.append({achievement: memberData.achievements[i].achievementId}
				   	                    	 , $(".memAchievementsList"));
				   	                     }
					   	                  for(var i in memberData.skills){
					   	                	skillsItemView.append({skill: memberData.skills[i].skillId}
					   	                    	 , $(".memSkillsList"));
					   	                     }
					   	               next();
		                    		});
		   	                 	
	   	                     	

	                    	});
	            	});
	            
			};
		
	};
})();