var imageUploadButton = document.querySelector('#convertGrayscale');
var imageElement = document.querySelector('#uploadedImage');
var canvasElement = document.querySelector('#grayscaleImage');
var inputElement = document.querySelector('input[type="file"]');
if (inputElement && imageElement) {
    inputElement.addEventListener('change', function () { loadImage(imageElement, canvasElement); });
}
function loadImage(imageEl, grayScaled) {
    var file = (inputElement === null || inputElement === void 0 ? void 0 : inputElement.files)[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        if (imageElement) {
            imageEl.setAttribute('src', (_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
        }
    };
    reader.readAsDataURL(file);
    if (grayScaled.toDataURL() !== '') {
        var ctx = grayScaled.getContext('2d');
        ctx.clearRect(0, 0, grayScaled.width, grayScaled.height);
    }
}
if (imageUploadButton && canvasElement) {
    imageUploadButton.addEventListener('click', function () { turnToGrayScale(canvasElement.getContext('2d'), canvasElement); });
}
function turnToGrayScale(ctx, canvas) {
    var file = (inputElement === null || inputElement === void 0 ? void 0 : inputElement.files)[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var image = new Image();
            image.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            image.onload = function () {
                if (canvas && ctx) {
                    canvas.height = image.height;
                    canvas.width = image.width;
                    ctx.drawImage(image, 0, 0);
                    var imageData = ctx.getImageData(0, 0, image.width, image.height);
                    var data = imageData.data;
                    for (var i = 0; i < data.length; i += 4) {
                        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                        data[i] = avg;
                        data[i + 1] = avg;
                        data[i + 2] = avg;
                    }
                    ctx.putImageData(imageData, 0, 0);
                }
            };
        };
        reader.readAsDataURL(file);
    }
}
