import { fetchData } from './apiModule.js';
import { createProductCard } from './productDetailsModule.js';

async function main() {
  try {
    const data = await fetchData();
    const productContainer = document.getElementById("product-container");

    data.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error in main module:", error);
  }

}
main();