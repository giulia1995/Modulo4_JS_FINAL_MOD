export { createProductCard };

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
  
  // Esportiamo la funzione openModal nel contesto globale
  window.openModal = function (name, description, brand, price) {
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Brand:</strong> ${brand}</p>
      <p><strong>Price:</strong> $${price}</p>`;
  };
  

  