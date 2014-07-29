function _w_attach(type, i, e) {
  switch(type) {
    case 'sc':
      SC.Widget(e).bind(
        SC.Widget.Events.FINISH,
        function (event, data) {
          MPL.pl[(i+1) % MPL.pl.size()].play();
        }
      )
      break;
    case 'yt':
      break;
  }
}
function _w_play(type, i) {
  var obj = MPL.pl[i].object;
  switch(type) {
    case 'sc':
      SC.Widget(obj).play();
      break;
    case 'yt':
      obj.playVideo();
      break;
  }
}
$(document).ready(function() {
  // give every yt-video an id

  window.MPL = {};

  var ypl = $('iframe').filter(function(i, e){    return $(e).attr('src') ? $(e).attr('src').match(/youtube/) : false;  });
  ypl.each(function(i, e) {
    $(e).attr('id', 'yt-player-'+i);
  });
  
  MPL.pl = $('iframe').filter(function(i, e){
    return $(e).attr('src') ? $(e).attr('src').match(/soundcloud|youtube/) : false;
  });
  MPL.pl = MPL.pl.map(function(i,e){
    var type;
    if ($(e).attr('src').match(/soundcloud/))
      type = 'sc';
    if ($(e).attr('src').match(/youtube/))
      type = 'yt';
    return {
      type: type,
      object: e,
      play: function() {
        _w_play(type, i);
      }
    }
  });
  MPL.pl.each(function(i,e){
    _w_attach(e.type, i, e.object);
  });
  function onYouTubeIframeAPIReady() {
    MPL.pl.each(function(i,p){
      if (p.type == 'yt') {
        p.object = new YT.Player($(p.object).attr('id'), {events: {
          onStateChange: function (ev) {
            if (ev.data == YT.PlayerState.ENDED) {
              MPL.pl[(i+1) % MPL.pl.size()].play();
            }
          }
        }});
      }
    });
  }
});

