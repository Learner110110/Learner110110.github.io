document.getElementById('upload').addEventListener('change', handleUpload);
document.getElementById('frame').addEventListener('change', applyFrame);
document.getElementById('download').addEventListener('click', downloadImage);

let uploadedImage = null;

function handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            uploadedImage = img;
            applyFrame(); // Apply the frame after uploading the image
        }
        img.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function applyFrame() {
    if (!uploadedImage) return;

    const frame = document.getElementById('frame').value;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(uploadedImage, 0, 0);

    if (frame !== 'none') {
        const frameImage = new Image();
        frameImage.onload = function() {
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        }
        frameImage.src = frame; // Using the selected frame's value as the source
    }
}

function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'processed-image.png';
    link.click();
}
