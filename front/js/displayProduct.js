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
      sofa.text = one.colors[i];
      colors.add(sofa);
    }

    /* let dropDown = document.getElementById("colors");
    dropDown.lenght = 0;

    for (i in one.colors) {
      let sofa = document.createElement("option");
      sofa.text = one.colors[i];
      dropDown.add(sofa);
    } */

    /*let imgContainer = document.getElementsByClassName("item__img")[0];
    imgContainer.getElementsByTagName("img");

    /*`${one.imageUrl}`;*/
  });
