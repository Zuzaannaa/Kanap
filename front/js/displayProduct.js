const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID = urlParams.get("id");

let fetchOneProduct = fetch("http://localhost:3000/api/products/" + ID);

fetchOneProduct
  .then((response) => {
    return response.json();
  })
  .then((sofa) => {
    const one = sofa;

    document.getElementById("image").src = `${one.imageUrl}`;
    document.getElementById("title").textContent = `${one.name}`;
    document.getElementById("price").textContent = `${one.price}`;
    document.getElementById("description").textContent = `${one.description}`;

    document.getElementById("colors").textContent = `${one.colors}`;

    for (i in one.colors) {
      let sofa = document.createElement("option");
      sofa.text = ("value", one.colors[i]);
      colors.add(sofa);
    }
  });

function Item() {
  order = {
    id: ID,
    qty: document.getElementById("quantity").value,
    color: document.getElementById("colors").value,
  };

  let cart = [];

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  }
  cart.push(order);
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("addToCart").addEventListener(
  "click",
  function () {
    Item();
  },
  false
);
