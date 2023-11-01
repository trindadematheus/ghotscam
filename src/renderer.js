navigator.mediaDevices
  .getUserMedia({
    video: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  })
  .then(function (mediaStream) {
    const video = document.querySelector("#video");
    video.srcObject = mediaStream;
    video.play();
  })
  .catch(function (err) {
    console.log("Não há permissões para acessar a webcam");
  });
