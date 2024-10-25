document.getElementById('barcodeInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgSrc = e.target.result;
            const previewImage = document.getElementById('previewImage');
            previewImage.src = imgSrc;
            previewImage.classList.remove('hidden');
            
            decodeBarcode(imgSrc);
        };

        reader.readAsDataURL(file);
    }
});

function decodeBarcode(imageSrc) {
    Quagga.decodeSingle({
        src: imageSrc,
        numOfWorkers: 0,  // needs to be 0 when used in node
        inputStream: {
            size: 800  // restrict input-size to be 800px in width (long-side)
        },
        decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'upc_reader']  // Specify your barcode types
        }
    }, function(result) {
        if (result && result.codeResult) {
            const barcodeValue = result.codeResult.code;
            document.getElementById('barcodeValue').innerText = barcodeValue;
            document.getElementById('barcodeResult').classList.remove('hidden');
        } else {
            alert('Could not detect a valid barcode. Try another image.');
        }
    });
}