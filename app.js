const $startButton = document.querySelector("#start");
const $stopButton = document.querySelector("#stop");

$startButton.addEventListener("click", async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } }
    });

    const mediaRecorder = new MediaRecorder(media, {
        mimeType: 'video/webm;codecs=vp8,opus'
    });

    mediaRecorder.start();
    $startButton.style.display = "none"; // Ocultar botón de grabar
    $stopButton.style.display = "inline"; // Mostrar botón de detener

    const [video] = media.getVideoTracks();
    video.addEventListener("ended", () => {
        mediaRecorder.stop();
    });

    mediaRecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(e.data);
        link.download = "captura.webm";
        link.click();
    });

    $stopButton.addEventListener("click", () => {
        mediaRecorder.stop();
        media.getTracks().forEach(track => track.stop()); // Detener la captura
        $stopButton.style.display = "none"; // Ocultar botón de detener
        $startButton.style.display = "inline"; // Volver a mostrar botón de grabar
    });
});

