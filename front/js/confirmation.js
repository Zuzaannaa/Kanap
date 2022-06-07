const params = new URL(window.location.href).searchParams.get("orderId");
console.log(params);

document.getElementById("orderId").innerHTML = params;
localStorage.clear();
