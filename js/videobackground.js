var vid = document.getElementById("bg-video");
var pauseButton = document.getElementById("Button_Pausa");
var soundButton = document.getElementById("Button_Sonido");

if (window.matchMedia('(prefers-reduced-motion)').matches) {
    vid.removeAttribute("autoplay");
    vid.pause();
    pauseButton.innerHTML = "<i class='fa fa-pause'></i>";
}

function vidFade() {
  vid.classList.add("stopfade");
}

vid.addEventListener('ended', function()
{
// only functional if "loop" is removed 
vid.pause();
// to capture IE10
vidFade();
});

soundButton.addEventListener("click", function() {
	if (vid.muted){
		vid.muted = false;
		soundButton.innerHTML = "<i class='fa fa-volume-up'></i>";
	} else {
		vid.muted = true;
		soundButton.innerHTML = "<i class='fa fa-volume-off'></i>";
	}
})

pauseButton.addEventListener("click", function() {
  vid.classList.toggle("stopfade");
  if (vid.paused) {
    vid.play();
    pauseButton.innerHTML = "<i class='fa fa-play'></i>";
  } else {
    vid.pause();
    pauseButton.innerHTML = "<i class='fa fa-pause'></i>";
  }
})
