var audio;
var $playlist;
var $tracks;

init();
function init(){
  var $audioList = $('audio');
  audio = $audioList[0];
  $playlist = $('#playlist');
  $tracks = $playlist.find('li a');
  len = $tracks.length - 1;
  audio.volume = .50;
  audio.play();
  $playlist.find('a').on("click", function(e){
    e.preventDefault();
    link = $(this);
    run(link, audio);
  });
}
function run(link, player){
  player.src = link.attr('href');
  par = link.parent();
  par.addClass('active').siblings().removeClass('active');
  audio.load();
  audio.play();
}