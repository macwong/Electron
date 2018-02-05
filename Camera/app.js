navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    var cam = document.getElementById('camera')
    cam.src = URL.createObjectURL(stream);
    cam.onloadedmetadata = function(e) {
      cam.play();
    };
  }).catch(function() {
    alert('could not connect stream');
  });