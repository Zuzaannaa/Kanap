const cart = createCart();
showItemsinCart();
order();

function createCart() {
  const cart = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const sofa = localStorage.getItem(key);
    cart.push(JSON.parse(sofa));
  }
  return cart;
}

function showItemsinCart() {
  const cartItems = document.getElementById("cart__items");
  if (cartItems == null) return;
  for (const sofa of cart) {
    const item = createItem(sofa);
    cartItems.appendChild(item);

    totalListener(item, sofa);
    deleteButton(item);
  }
  total(cart);
}

function createItem(sofa) {
  const item = document.createElement("item");
  item.classList.add("cart__item");
  item.setAttribute("data-id", sofa._id);
  item.setAttribute("data-color", sofa.selectedColor);
  item.innerHTML = `
                    <div class="cart__item__img">
                    <img src=${sofa.imageUrl} alt=${sofa.altTxt}>
                    </div>
                    <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${sofa.name}</h2>
                        <p>${sofa.selectedColor}</p>
                        <p>${sofa.price}</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${sofa.selectedQuantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Delete</p>
                        </div>
                    </div>
                    </div>
                </article>
    `;
  return item;
}

function total(sofa) {
  let numberOfSofas = 0;
  let totalPriceSofas = 0;

  sofa.forEach((sofa) => {
    numberOfSofas += sofa.selectedQuantity;
    totalPriceSofas += sofa.selectedQuantity * sofa.price;
  });

  updateTotal(numberOfSofas, totalPriceSofas);
}

function updateTotal(numberOfSofas, totalPriceSofas) {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");

  totalQuantity.innerHTML = numberOfSofas;
  totalPrice.innerHTML = totalPriceSofas;
}

function totalListener(item, sofa) {
  item.querySelector(".itemQuantity").addEventListener("change", (event) => {
    sofa.selectedQuantity = Number(event.target.value);
    cart.selectedQuantity = sofa.selectedQuantity;
    total(cart);
  });
}

function deleteButton(item) {
  const deleteButton = item.querySelector(".deleteItem");
  deleteButton.addEventListener("click", () => {
    const key = article.dataset.id + ":" + article.dataset.color;
    window.localStorage.removeItem(key);
    window.location.reload();
  });
}

const contact = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  address: document.getElementById("address"),
  city: document.getElementById("city"),
  email: document.getElementById("email"),
};

function sendForm() {
  const firstName = document.getElementById("firstName");
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  const noNumbers = new RegExp(/^[a-z]*$/);
  firstName.addEventListener("change", () => {
    checkInput(firstName, noNumbers, firstNameErrorMsg, "first name");
  });

  const lastName = document.getElementById("lastName");
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  lastName.addEventListener("change", () => {
    checkInput(lastName, noNumbers, lastNameErrorMsg, "name");
  });
  const address = document.getElementById("address");

  address.addEventListener("change", () => {});
  const city = document.getElementById("city");
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  city.addEventListener("change", () => {
    checkInput(city, noNumbers, cityErrorMsg, "city");
  });
  const email = document.getElementById("email");
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  const emailReg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  email.addEventListener("change", () => {
    checkInput(email, emailReg, emailErrorMsg, "email");
  });
}

function checkInput(name, reg, err, text) {
  if (reg.test(name.value) == false) {
    console.log(reg.test(name.value));
    err.innerHTML = "Please add correct " + text;
  } else {
    err.innerHTML = " ";
  }
}

function order() {
  document.getElementById("order").addEventListener("click", (event) => {
    sendOrder();
  });
}

function sendOrder() {
  let body = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
  };
  const url = `http://127.0.0.1:3000/api/products/order`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      const orderId = Math.floor(Math.random() * 100);
      window.location.href = "../html/confirmation.html?orderId=" + orderId;
    })
    .catch((err) => alert(err));
}
