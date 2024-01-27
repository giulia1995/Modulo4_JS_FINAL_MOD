const sendPost = document.getElementById("sendPost");
sendPost.addEventListener("click", sendPostRequest);

async function sendPostRequest() {
    try {
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

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        console.log('UPLOAD PRODUCT SUCCESS:', data);
    } catch (error) {
        console.error('FAILED ADD PRODUCT:', error);
    }
}

const sendGet = document.getElementById("sendGet");
sendGet.addEventListener("click", sendGetRequest);

async function sendGetRequest() {
    try {
        const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const data = await response.json();

        const productList = document.createElement('ul');
        data.forEach(product => {
            const listItem = document.createElement('li');
            productList.style.padding = '0';
            listItem.style.margin = '5px 0px';
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

        console.log('DATA SUCCESS:', data);
    } catch (error) {
        console.error('ERROR DURING GET REQUEST:', error);
    }
}

const modify = document.getElementById("modify");
modify.addEventListener("click", showEditForm);

function showEditForm() {
    const productIdInput = document.createElement('input');
    productIdInput.type = 'text';
    productIdInput.placeholder = 'GET > INSERT ID PRODUCT TO EDIT';
    productIdInput.style.display = 'block';
    productIdInput.style.margin = '0 auto';
    productIdInput.style.maxWidth = '400px';
    productIdInput.style.width = '100%';
    productIdInput.style.marginBottom = '10px';

    const searchButton = document.createElement('button');
    searchButton.type = 'button';
    searchButton.textContent = 'SEARCH';
    searchButton.style.display = 'block';
    searchButton.style.margin = 'auto';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'DELETE';
    deleteButton.style.display = 'block';
    deleteButton.style.margin = '10px auto';
    deleteButton.style.backgroundColor = "red";

    deleteButton.onclick = async () => {
        const productId = productIdInput.value;
        if (productId && confirm('Are you sure to delete product?')) {
            try {
                await sendDeleteRequest(productId);
            } catch (error) {
                alert('Delete Failed.');
            }
        } else {
            alert('Please insert a valid ID.');
        }
    };

    searchButton.onclick = async () => {
        const productId = productIdInput.value;
        if (productId) {
            const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
            const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    }
                });

                const product = await response.json();

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
                updateButton.textContent = 'Upload';
                updateButton.onclick = async () => {
                    try {
                        await sendPutRequest(productId, fieldsToShow);
                    } catch (error) {
                        console.error('Error during product upload:', error);
                    }
                };

                editForm.appendChild(updateButton);

                document.body.appendChild(editForm);
            } catch (error) {
                console.error('Error during PUT request to edit:', error);
            }
        } else {
            alert('Insert Valid ID.');
        }
    };

    document.body.appendChild(productIdInput);
    document.body.appendChild(searchButton);
    document.body.appendChild(deleteButton);
}

async function sendPutRequest(productId, fields) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    const updatedProductData = {};

    fields.forEach(field => {
        updatedProductData[field] = document.querySelector(`#${field}`).value;
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(updatedProductData)
        });

        if (response.ok) {
            console.log('Success Upload.');
        } else {
            console.error('Error during Upload.');
        }
    } catch (error) {
        console.error('Error PUT:', error);
    }
}

async function sendDeleteRequest(productId) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI';

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (response.ok) {
            console.log('Product Delete success.');
        } else {
            console.error('Error Delete.');
        }
    } catch (error) {
        console.error('Error Delete request:', error);
    }
}

const reset = document.getElementById("resetAll");
reset.addEventListener("click", resetPage);

function resetPage() {
    location.reload();
}

