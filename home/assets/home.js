import { apiUrl, apiKey } from './api.js';
import { fetchData, createProductCard, openModal } from './product.js';

async function main() {
  try {
    const data = await fetchData(apiUrl, apiKey);
    const productContainer = document.getElementById("product-container");

    data.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);

     
      const detailsButton = card.querySelector('.btn-primary');
      detailsButton.addEventListener('click', () => {
        openModal(product.name, product.description, product.brand, product.price);
      });
    });
  } catch (error) {
    console.error("Error in main function:", error);
  }
}
document.addEventListener("DOMContentLoaded", main);
