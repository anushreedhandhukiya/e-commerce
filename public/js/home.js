
const handlecart = (id) => {
    console.log(id);
    fetch("/product/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    })
  }
  const display = (data) => {
    document.getElementById("box").innerHTML = "";
    data.map((ele) => {
      let img = document.createElement("img");
      img.src = ele.img;
      let title = document.createElement("h1");
      title.innerHTML = `Tilte : ${ele.title}`;
      let category = document.createElement("h3");
      category.innerHTML = `Category : ${ele.category}`;
      let desc = document.createElement("h3")
      desc.innerHTML = `Description : ${ele.desc}`
      let colour = document.createElement("h3");
      colour.innerHTML = `Colour : ${ele.colour}`;
      let size = document.createElement("h3");
      size.innerHTML = `Size : ${ele.size}`;
      let price = document.createElement("h3");
      price.innerHTML = `Product Price : ${ele.price}`;
      let stock = document.createElement("h3");
      stock.innerHTML = `Stock : ${ele.stock}`;

      let btn1 = document.createElement("button");
      btn1.innerHTML = "Buy";

      btn1.addEventListener("click", () => {
        handlecart(ele._id);
      })
      let div = document.createElement("div");
      div.append(img, title, category,desc,colour,size, price,stock, btn1);
      document.getElementById("box").append(div);
    });
  };

  fetch("/product")
    .then((response) => response.json())
    .then((response) => display(response))
    .catch((error) => console.log(error));