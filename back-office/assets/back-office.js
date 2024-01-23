function sendPostRequest() {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    const productName = document.querySelector('#productName').value;
    const productDescription = document.querySelector('#productDescription').value;
    const productBrand = document.querySelector('#productBrand').value;
    const productImageURL = document.querySelector('#productImageURL').value;
    const productPrice = document.querySelector('#productPrice').value;

    const productData = {
        name: productName,
        description: productDescription,
        brand: productBrand,
        imageUrl: productImageURL,
        price: parseFloat(productPrice)
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Prodotto aggiunto con successo:', data);
        })
        .catch(error => {
            console.error('Errore durante l\'aggiunta del prodotto:', error);
        });
}

function sendGetRequest() {
    const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const productList = document.createElement('ul');
            data.forEach(product => {
                const listItem = document.createElement('li');
                productList.style.padding = '0';
                listItem.style.margin = '5px 0px'
                const simplifiedProduct = {
                    _id: product._id,
                    name: product.name
                };
                listItem.textContent = JSON.stringify(simplifiedProduct);
                productList.appendChild(listItem);
            });
            const productListContainer = document.getElementById('productListContainer');
            productListContainer.innerHTML = '';
            productListContainer.appendChild(productList);

            console.log('Dati ottenuti con successo:', data);
        })
        .catch(error => {
            console.error('Errore durante la richiesta GET:', error);
        });
}
function showEditForm() {
    const productIdInput = document.createElement('input');
    productIdInput.type = 'text';
    productIdInput.placeholder = 'Inserisci l\'ID del prodotto da modificare';
    productIdInput.style.display = 'block';
    productIdInput.style.margin = '0 auto';
    productIdInput.style.maxWidth = '400px';
    productIdInput.style.width = '100%';
    productIdInput.style.marginBottom = '10px';

    const searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.textContent = 'CERCA';
    searchButton.style.display = 'block';
    searchButton.style.margin = 'auto';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'CANCELLA';
    deleteButton.style.display = 'block';
    deleteButton.style.margin = '10px auto';
    deleteButton.style.backgroundColor = "red"

    deleteButton.onclick = () => {
        const productId = productIdInput.value;
        if (productId && confirm('Sei sicuro di voler eliminare il prodotto?')) {
            sendDeleteRequest(productId);
        } else {
            alert('Inserisci un ID valido.');
        }
    };

    searchButton.onclick = () => {
        const productId = productIdInput.value;
        if (productId) {
            const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
            const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            })
                .then(response => response.json())
                .then(product => {
                    const editForm = document.createElement('form');
                    editForm.id = 'editProductForm';

                    const fieldsToShow = ["name", "description", "brand", "imageUrl", "price"];

                    fieldsToShow.forEach(key => {
                        const label = document.createElement('label');
                        label.setAttribute('for', key);
                        label.textContent = `${key}:`;

                        const input = document.createElement('input');
                        input.setAttribute('type', 'text');
                        input.setAttribute('id', key);
                        input.setAttribute('name', key);
                        input.value = product[key];

                        editForm.appendChild(label);
                        editForm.appendChild(input);
                    });

                    const updateButton = document.createElement('button');
                    updateButton.setAttribute('type', 'button');
                    updateButton.textContent = 'Aggiorna';
                    updateButton.onclick = () => sendPutRequest(productId, fieldsToShow);

                    editForm.appendChild(updateButton);

                    document.body.appendChild(editForm);
                })
                .catch(error => {
                    console.error('Errore durante la richiesta GET per la modifica:', error);
                });
        } else {
            alert('Inserisci un ID valido.');
        }
    };

    document.body.appendChild(productIdInput);
    document.body.appendChild(searchButton);
    document.body.appendChild(deleteButton);

}

function sendPutRequest(productId, fields) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    const updatedProductData = {};

    fields.forEach(field => {
        updatedProductData[field] = document.querySelector("#field").value;
    });

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(updatedProductData)
    })
        .then(response => {
            if (response.ok) {
                console.log('Prodotto aggiornato con successo.');
            } else {
                console.error('Errore durante l\'aggiornamento del prodotto.');
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta PUT:', error);
        });
}
function sendDeleteRequest(productId) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Prodotto eliminato con successo.');
            } else {
                console.error('Errore durante l\'eliminazione del prodotto.');
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta DELETE:', error);
        });
}

function resetPage() {
    // Ricarica la pagina
    location.reload();
}