const id = window.location.search.split("=").at(-1);

const url = `http://127.0.0.1:3000/api/products/${id}`;
fetch(url)
  .then((response) => {
    const json = response.json();
    return json;
  })
  .then((sofa) => {
    const one = sofa;
    pickedSofa = sofa;

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

document.getElementById("addToCart").addEventListener("click", () => {
  const quantityNumber = Number(quantity.value);
  if (quantityNumber == 0) return alert("Please select a minimum quantity");

  pickedSofa.selectedColor = colors.value;
  pickedSofa.selectedQuantity = quantityNumber;
  const key = pickedSofa._id + ":" + colors.value;
  const sofa = JSON.parse(localStorage.getItem(key));
  if (sofa == null) return addSofaToCart(key, pickedSofa);
  updateSofaQuantity(quantityNumber, sofa, pickedSofa);

  function addSofaToCart(key, pickedSofa) {
    localStorage.setItem(key, JSON.stringify(pickedSofa));
  }

  function updateSofaQuantity(quantityNumber, sofa, pickedSofa) {
    const newQuantity = quantityNumber + sofa.selectedQuantity;
    pickedSofa.selectedQuantity = newQuantity;
    addSofaToCart(key, pickedSofa);
  }
});
