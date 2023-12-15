const display = (data) => {
    document.getElementById("box").innerHTML = "";
    data.map((ele) => {
      let img = document.createElement("img");
      img.src = ele.img;
      let title = document.createElement("h2");
      title.innerHTML = ele.title;
      let category = document.createElement("h3");
      category.innerHTML = ele.category;
      let price = document.createElement("p");
      price.innerHTML = ele.price;
      let size = document.createElement("span");
      size.innerHTML = ele.size;
      let stock = document.createElement("span");
      stock.innerHTML = ele.stock;
      let div = document.createElement("div");
      div.append(img, title, category, price, size, stock);
      document.getElementById("box").append(div);
    });
  };

  fetch("/product/adminProduct")
    .then((response) => response.json())
    .then((response) => display(response))
    .catch((error) => console.log(error));