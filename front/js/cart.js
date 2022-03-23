const cartItemsArray = [];
for (i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const sofa = localStorage.getItem(key);
  cartItemsArray.push(JSON.parse(sofa));
}

let itemQuantity;
let totalQuantity = document.getElementById("totalQuantity");
let sumQuantity = 0;
let totalPrice = document.getElementById("totalPrice");
let sumPrice = 0;
let deleteItems;
let numToDelete;
let itemQuantityValue;

showItemsinCart();

//Show items in cart
function showItemsinCart() {
  for (let i = 0; i < cartItemsArray.length; i++) {
    let cartItems = document.getElementById("cart__items");
    if (cartItemsArray[i] != undefined) {
      cartItems.innerHTML += `
                                <article class="cart__item" data-id="${cartItemsArray[i]._id}" data-color="${cartItemsArray[i].selectedColor}">
                                                <div class="cart__item__img">
                                                <img src=${cartItemsArray[i].imageUrl} alt=${cartItemsArray[i].altTxt}>
                                                </div>
                                                <div class="cart__item__content">
                                                <div class="cart__item__content__description">
                                                    <h2>${cartItemsArray[i].name}</h2>
                                                    <p>${cartItemsArray[i].selectedColor}</p>
                                                    <p>${cartItemsArray[i].price}</p>
                                                </div>
                                                <div class="cart__item__content__settings">
                                                    <div class="cart__item__content__settings__quantity">
                                                    <p>Qté : </p>
                                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartItemsArray[i].selectedQuantity}>
                                                    </div>
                                                    <div class="cart__item__content__settings__delete">
                                                    <p class="deleteItem">Delete</p>
                                                    </div>
                                                </div>
                                                </div>
                                            </article>
                                `;

      deleteItems = document.querySelectorAll(".deleteItem");

      for (const deleteItem of deleteItems) {
        deleteItem.addEventListener("click", function (event) {
          console.log("cartItemsArray[i]._id " + cartItemsArray[i]._id);
          console.log("deleteItem[i] " + deleteItem[i]);
          console.log(deleteItem);
          this.style.backgroundColor = "red";
        });
      }

      itemQuantityValue = document.querySelectorAll(
        'input[name="itemQuantity"]'
      );

      let total =
        Number(cartItemsArray[i].selectedQuantity) *
        Number(cartItemsArray[i].price);
      sumPrice += total;
      totalPrice.innerHTML = sumPrice;

      sumQuantity += Number(cartItemsArray[i].selectedQuantity);
      totalQuantity.innerHTML = sumQuantity;

      for (const itemQuantityValues of itemQuantityValue) {
        itemQuantityValues.addEventListener("change", function (event) {
          sumQuantity += Number(event.target.value);
          totalQuantity.innerHTML = sumQuantity;

          let total =
            Number(event.target.value) * Number(cartItemsArray[i].price);
          sumPrice += total;
          totalPrice.innerHTML = sumPrice;
        });
      }
    }
  }
}

function deleteSofa() {
  deleteItems.addEventListener(
    "click",
    function () {
      alert("delete click");
    },
    { once: true }
  );
}

const contact = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  address: document.getElementById("address"),
  city: document.getElementById("city"),
  email: document.getElementById("email"),
};

document.getElementById("order").addEventListener("submit", () => {
  alert(contact);
  sendOrder();
});

function sendOrder() {
  let form = {
    firstName: firstNameInput.value,
    secondName: secondNameInput.value,
    address: addressInput.value,
    city: cityInput.value,
    email: emailInput.value,
  };

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
}
