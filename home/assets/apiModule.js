export { fetchData };

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
      throw new Error(`HTTP error! Status: ${response.status}. URL: ${apiUrl}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data from the API:", error);
    throw error;
  }
}
