//Zadanie należy wykonać w typescript i skompilować później na javascript
// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.
var imageUploadButton = document.querySelector('#convertGrayscale');
var imageElement = document.querySelector('#uploadedImage');
var canvasElement = document.querySelector('#grayscaleImage');
var inputElement = document.querySelector('input[type="file"]');
// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.
if (inputElement) {
    inputElement.addEventListener('change', loadImage);
}
function loadImage(event) {
    var file = (inputElement === null || inputElement === void 0 ? void 0 : inputElement.files)[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        if (imageElement) {
            imageElement.setAttribute('src', (_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
        }
    };
    reader.readAsDataURL(file);
}
// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.
if (imageUploadButton) {
    imageUploadButton.addEventListener('click', turnToGrayScale);
}
function turnToGrayScale() {
    var context = canvasElement === null || canvasElement === void 0 ? void 0 : canvasElement.getContext('2d');
    var file = (inputElement === null || inputElement === void 0 ? void 0 : inputElement.files)[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var image = new Image();
        image.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        image.onload = function () {
            if (canvasElement && context) {
                canvasElement.width = image.width;
                canvasElement.height = image.height;
                context.drawImage(image, 0, 0);
                var imageData = context.getImageData(0, 0, image.width, image.height);
                var data = imageData.data;
                for (var i = 0; i < data.length; i += 4) {
                    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                context.putImageData(imageData, 0, 0);
            }
        };
    };
    reader.readAsDataURL(file);
}
// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.
// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.
// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.
