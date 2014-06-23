$(document).ready(function() {
  var pl = $('iframe').filter(function(i, e){
    return $(e).attr('src') ? $(e).attr('src').match(/soundcloud/) : false;
  });
  pl.each(function(i,e){
    SC.Widget(e).bind(
      SC.Widget.Events.FINISH, 
      function(event, data){
        SC.Widget(pl[(i+1) % pl.size()]).play();
      })
  });
});
