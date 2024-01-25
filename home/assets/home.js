const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIwNDNmNGNlZjA0ODAwMTgxZGQ1Y2IiLCJpYXQiOjE3MDYwNTA1NDgsImV4cCI6MTcwNzI2MDE0OH0.hOw8a2XqcBA0CgNz8MmbrAlf3HC3b2xAA9cnHmBJBpI`;

async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const productContainer = document.getElementById("product-container");

    data.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("col-sm-6", "col-md-3", "col-lg-4", "mb-4");

  card.innerHTML = `
        <div class="col card shadow p-3 mb-5 bg-body-black h-100">
            <img src="${product.imageUrl}" id="imgcard"  class="card-img-top img-fluid" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title fw-bold">${product.name}</h5>
                <button type="button" class="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#productModal" 
                onclick="openModal('${product.name}', '${product.description}', '${product.brand}', '${product.price}')">
                  Details
                </button>
                <a class="btn btn-success mt-3 text-white" href="/back-office/admin.html" role="button">Edit</a>
                
            </div>
        </div>`;

  return card;
}

function openModal(name, description, brand, price) {
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Brand:</strong> ${brand}</p>
        <p><strong>Price:</strong> $${price}</p>`;
}
openModal()

// Chiamata alla funzione fetchData utilizzando async/await
fetchData();
