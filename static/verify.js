document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    document.getElementById('start-camera').addEventListener('click', function() {
        console.log('Start camera button clicked');
        const video = document.getElementById('camera-stream');
        const qrReader = document.getElementById('qr-reader');

        qrReader.style.display = 'block';

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                console.log('Camera stream started');
                video.srcObject = stream;
            })
            .catch(function(err) {
                console.error('Error accessing camera: ', err);
            });
    });

    document.getElementById('stop-camera').addEventListener('click', function() {
        console.log('Stop camera button clicked');
        const video = document.getElementById('camera-stream');
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
        video.srcObject = null;
        document.getElementById('qr-reader').style.display = 'none';
    });
});
