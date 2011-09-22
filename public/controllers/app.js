$(document).ready(function(){
   var stats = require("/controllers/stats.js");

   Array.prototype.shuffle = function() {
    this.sort(function(){
        return Math.random()*100>50?-1:1;
    });
    return this;
   };

   var ordered = true;
   var orderedList = '<li data-id="1"><a href="javascript: void(0);" class="btn">Team a</a></li>\n'+
            '<li data-id="2"><a href="javascript: void(0);" class="btn">Team c</a></li>\n'+
            '<li data-id="3"><a href="javascript: void(0);" class="btn">Team b</a></li>\n'+
            '<li data-id="4"><a href="javascript: void(0);" class="btn">Team d</a></li>\n'+
            '<li data-id="5"><a href="javascript: void(0);" class="btn">Team e</a></li>\n'+
            '<li data-id="6"><a href="javascript: void(0);" class="btn">Team f</a></li>';
   $("#demoHighscoreAnim").click(function(e){
        $("#dest").html(orderedList.split("\n").shuffle().join("\n"));
        $('#source').quicksand( $('#dest li'), function(){
            $(".teams a.btn").click(function(e){
              stats.plot("chart", e.currentTarget.innerText);
              stats.plot("chart2", e.currentTarget.innerText);
              stats.plot("chart3", e.currentTarget.innerText);
            });
        } );
        ordered = !ordered;
        e.preventDefault();
   });
   $("#source").html(orderedList);
   $(".teams a.btn").click(function(e){
      stats.plot("chart", e.currentTarget.innerText);
      stats.plot("chart2", e.currentTarget.innerText);
      stats.plot("chart3", e.currentTarget.innerText);
   });
});
