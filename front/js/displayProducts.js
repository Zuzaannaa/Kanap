let fetchAllProducts = fetch("http://localhost:3000/api/products");

fetchAllProducts
  .then((response) => {
    return response.json();
  })
  .then((sofas) => {
    const sof = sofas;
    let display = "";

    for (let i in sofas) {
      display += `<section class="items">
      <a href = "./product.html?id=${sofas[i]._id}">
      <article>
                        <img src="${sofas[i].imageUrl}"
                        alt = ${sofas[i].altTxt}>
                        <div>
                            <h3>${sofas[i].name}</h3>
                            <p>${sofas[i].description}</p>
                        </div>
                        </article>
                        </a>
                </section>`;
      document.getElementById("items").innerHTML = display;
    }
  })
  .catch((error) => {
    document.getElementById("items").innerHTML = `
        <div>
            <h2>Sorry, something went wrong...(${error})</h2>
            <p>Please refresh your page or come back later while we fix the problem.</p>
        </div>`;
    console.log("Error: Fetch request failed!");
  });
