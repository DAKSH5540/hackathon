document.getElementById('promoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const productImages = document.getElementById('productImages').files;
    const promoText = document.getElementById('promoText').value;
    const colorPalette = document.getElementById('colorPalette').value;
    const theme = document.getElementById('theme').value;
    const outputType = document.getElementById('outputType').value;

    // Prepare form data for upload
    const formData = new FormData();
    for (let i = 0; i < productImages.length; i++) {
        formData.append('productImages', productImages[i]);
    }
    formData.append('promoText', promoText);
    formData.append('colorPalette', colorPalette);
    formData.append('theme', theme);
    formData.append('outputType', outputType);

    // Send data to the server
    fetch('/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Log response for debugging
        
        if (data.success) {
            const preview = document.getElementById('outputPreview');
            preview.innerHTML = `
                <p><strong>Theme:</strong> ${theme}</p>
                <p><strong>Promo Text:</strong> ${promoText}</p>
                <p><strong>Color Palette:</strong> <span style="background-color:${colorPalette}; padding:5px 15px;"></span></p>
                <p><strong>Output Type:</strong> ${outputType}</p>
                <p><strong>Uploaded Images:</strong> ${data.images.map(img => `<img src="${img}" width="100">`).join('')}</p>
            `;
        } else {
            console.error('Error:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
