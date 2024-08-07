document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let pngImage = null;
    let backgroundImage = null;

    document.getElementById('png-upload').addEventListener('change', handlePngUpload);
    document.getElementById('bg-upload').addEventListener('change', handleBgUpload);
    document.querySelectorAll('.background-option img').forEach(img => {
        img.addEventListener('click', handleBgSelect);
    });
    document.getElementById('download-btn').addEventListener('click', downloadImage);

    function handlePngUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'image/png') {
            const reader = new FileReader();
            reader.onload = function(e) {
                pngImage = new Image();
                pngImage.onload = () => {
                    drawCanvas();
                };
                pngImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function handleBgUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                backgroundImage = new Image();
                backgroundImage.onload = () => {
                    drawCanvas();
                };
                backgroundImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    function handleBgSelect(event) {
        backgroundImage = new Image();
        backgroundImage.onload = () => {
            drawCanvas();
        };
        backgroundImage.src = event.target.src;
    }

    function drawCanvas() {
        if (backgroundImage) {
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        if (pngImage) {
            ctx.drawImage(pngImage, 0, 0, canvas.width, canvas.height);
        }
    }

    function downloadImage() {
        const link = document.createElement('a');
        link.download = 'image_with_background.png';
        link.href = canvas.toDataURL();
        link.click();
    }
});
