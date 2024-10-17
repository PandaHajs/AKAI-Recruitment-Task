//Zadanie należy wykonać w typescript i skompilować później na javascript

// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.
const imageUploadButton = document.querySelector('#convertGrayscale');
const imageElement = document.querySelector('#uploadedImage');
const canvasElement: HTMLCanvasElement | null = document.querySelector('#grayscaleImage');
const inputElement: HTMLInputElement | null = document.querySelector('input[type="file"]');

// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.

if (inputElement) {
    inputElement.addEventListener('change', loadImage);
}

function loadImage(event: Event) {
    const file: File = (inputElement?.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        if (imageElement) {
            imageElement.setAttribute('src', e.target?.result as string);
        }
    }
    reader.readAsDataURL(file);
}

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.

// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.

if (imageUploadButton) {
	imageUploadButton.addEventListener('click', turnToGrayScale);
}

function turnToGrayScale() {
    const context = canvasElement?.getContext('2d');
    const file: File = (inputElement?.files as FileList)[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const image = new Image();
        image.src = e.target?.result as string;
        image.onload = () => {
            if (canvasElement && context) {
                canvasElement.width = image.width;
                canvasElement.height = image.height;
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, image.width, image.height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }
                context.putImageData(imageData, 0, 0);
            }
        }
    }
    reader.readAsDataURL(file);
}

