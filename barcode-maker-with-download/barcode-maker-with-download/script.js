function generateBarcode() {
    let barcodeValue = document.getElementById('barcodeValue').value;

    document.getElementById('barcode').innerHTML = "";

    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let downloadButton = document.createElement("button");
    downloadButton.innerHTML = "Download Barcode as PNG";
    downloadButton.setAttribute("id", "downloadButton");

    document.getElementById('barcode').appendChild(svgElement);
    document.getElementById('barcode').appendChild(downloadButton);

    // Generate the barcode
    JsBarcode(svgElement, barcodeValue, {
        format: "CODE128",
        displayValue: true
    });

    // Add event listener to download the barcode as PNG
    downloadButton.addEventListener("click", function () {
        svgToPng(svgElement, barcodeValue);
    });
}

function svgToPng(svgElement, barcodeValue) {
    // Create an image from the SVG content
    let svgData = new XMLSerializer().serializeToString(svgElement);
    let svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    let url = URL.createObjectURL(svgBlob);

    let img = new Image();
    img.onload = function () {
        // Create a canvas element and draw the image onto it
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a PNG and trigger the download
        let pngData = canvas.toDataURL("image/png");
        let link = document.createElement('a');
        link.href = pngData;
        link.download = 'barcode_' + barcodeValue + '.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        URL.revokeObjectURL(url);
    };

    img.src = url;
}