const imageUploadButton = document.querySelector('#convertGrayscale');
const imageElement: HTMLImageElement | null = document.querySelector('#uploadedImage');
const canvasElement: HTMLCanvasElement | null = document.querySelector('#grayscaleImage');
const inputElement: HTMLInputElement | null = document.querySelector('input[type="file"]');

if (inputElement && imageElement) {
    inputElement.addEventListener('change', () => {loadImage(imageElement, canvasElement as HTMLCanvasElement)});
}

function loadImage(imageEl: HTMLImageElement, grayScaled: HTMLCanvasElement) {
    const file: File = (inputElement?.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        if (imageElement) {
            imageEl.setAttribute('src', e.target?.result as string);
        }
    }
    reader.readAsDataURL(file);
    if(grayScaled.toDataURL() !== ''){
        const ctx = grayScaled.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, grayScaled.width, grayScaled.height);
    }
}

if (imageUploadButton && canvasElement) {
	imageUploadButton.addEventListener('click', () => 
        {turnToGrayScale(canvasElement.getContext('2d') as CanvasRenderingContext2D, canvasElement)});
}

function turnToGrayScale(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const file: File = (inputElement?.files as FileList)[0];
    if(file){
    const reader = new FileReader();
    reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;
        image.onload = () => {
            if (canvas && ctx) {
                canvas.height = image.height;
                canvas.width = image.width;
                ctx.drawImage(image, 0, 0);
                const imageData = ctx.getImageData(0, 0, image.width, image.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                ctx.putImageData(imageData, 0, 0);
            }
        }
        
    }
    reader.readAsDataURL(file);
    }
}