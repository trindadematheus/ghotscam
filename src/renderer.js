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
  .catch(function () {
    console.log("Não há permissões para acessar a webcam");
  });

navigator.mediaDevices.enumerateDevices().then(function (devices) {
  for (var i = 0; i < devices.length; i++) {
    var device = devices[i];

    if (device.kind === "videoinput") {
      var option = document.createElement("option");
      option.value = device.deviceId;
      option.text = device.label || "camera " + (i + 1);
      document.querySelector("#video-source").appendChild(option);
    }
  }
});

const selectElement = document.querySelector("#video-source");

selectElement.addEventListener("change", (event) => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        deviceId: event.target.value,
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
});
