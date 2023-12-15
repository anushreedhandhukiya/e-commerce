const updateQty = (id, qty) => {
    fetch(`/product/cart/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty })
    })
        .then((res) => res.json())
        .then((response) => get())
        .catch((err) => console.log(err))
}

const handlePayment = async (amount) => {
    let res = await fetch("/product/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount })
    })
    let order = await res.json()
    let option = { key: "rzp_test_aseYwd9Lw0lp7m", amount: order.amount }
    let razorpay = new Razorpay(option)
    razorpay.open()
}

const display = (data) => {
    let totalprice = 0
    document.getElementById("box").innerHTML = "";
    console.log(data);
    data.map((element) => {
        let ele = element.productId
        totalprice += ele.price * element.qty

        let img = document.createElement("img");
        img.src = ele.img;
        let title = document.createElement("h1");
        title.innerHTML = ele.title;
        let category = document.createElement("h3");
        category.innerHTML = ele.category;
        let price = document.createElement("h2");
        price.innerHTML = ele.price;

        
        let btn1 = document.createElement("button")
        btn1.innerHTML = "-"
        btn1.addEventListener("click", () => {updateQty(element._id, -1)})
        let qty = document.createElement("span")
        qty.innerHTML = element.qty
        let btn2 = document.createElement("button")
        btn2.innerHTML = "+"
        btn2.addEventListener("click", () => {updateQty(element._id, +1)})

        let div = document.createElement("div");
        div.append(img, title, category, price, btn1, qty, btn2);
        document.getElementById("box").append(div);

    });
    let priceBtn = document.createElement("button")
    priceBtn.innerHTML = `Total Price: ${totalprice}`
    document.getElementById("box").append(priceBtn)
    priceBtn.addEventListener("click", () => handlePayment(totalprice))
};

const get=async () => {
    fetch("/product/cartdata")
        .then((response) => response.json())
        .then((response) => display(response))
        .catch((error) => console.log(error));
}
get()