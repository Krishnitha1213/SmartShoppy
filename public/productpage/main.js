let shop = document.getElementById("shop");

let storage = JSON.parse(localStorage.getItem("data")) || [];

//function arrow
let generateItems = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, discountPercent, rating, price, desc, img } = x;
        let search = storage.find((x) => x.id === id) || [];
      return `
     <div id=product-id-${id} class="item">
     <a href="productdetails.html"><img class="cardimg" width="220" src=${img} alt=""></a>
        <div class="details">
        <a href="productdetails.html"><h3 class="title">${name}</h3></a>
        <a href="productdetails.html"><p class="desc">${desc}</p></a>
          <div class="price-quantity">
          <h2 class="for_price">₹ <s> ${ discountPercent } </s> </h2>
          <div id="discount"></div>
          <h2 class="starsflex">&#9733;</h2>
          <h2 class="starsflex">&#9733;</h2>
          <h2 class="starsflex">&#9733;</h2>
          <h2 class="starsflex">&#9733;</h2>
          <h2 class="starsflex">&#9734;</h2>
          <span id="starsss"> ${rating} </span> </a>
            <h2 class="from_price">₹  ${price} </h2>
            <div class="buttonss">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
          <button onclick="increment(${id})" class="addbutton">Add to Cart</button>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateItems();


