const orderNumber = window.location.search.split("=").at(-1);
const url = `http://127.0.0.1:5500/html/cart`;
fetch(url)
  .then((response) => {
    const json = response.json();
    return json;
  })
  .then((data) => {
    displayItem(data);
    orderNumber = data;
  })
  .catch((err) => console.log(err));

const orderId = data;
document.getElementById("orderId").textContent = `${orderNumber._id}`;
