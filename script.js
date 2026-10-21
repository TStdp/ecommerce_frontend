// set up initial data for each product
let initialData = [
    {
        id: 1,
        name: "Camera",
        price: 199.99,
        description: "Looking for a high-quality, easy-to-use, and affordable retro camera? Look no further than the Kodak Instamatic 133!",
        image: "https://app.bsd.education/resources/sandbox_templates/ecommerce-website/camera.jpg"
    },
    {
        id: 2,
        name: "Mouse",
        price: 25.50,
        description: "Need a lightweight, durable, comfortable, and portable wireless mouse? This Logitech mouse may be the perfect option!",
        image: "https://app.bsd.education/resources/sandbox_templates/ecommerce-website/mouse.jpg"
    },
    {
        id: 3,
        name: "Headphones",
        price: 29.99,
        description: "Are you searching for incredible audio quality at an affordable price? Lightweight and comfortable, these wireless Bluetooth headphones are a great option wherever you go.",
        image: "https://app.bsd.education/resources/sandbox_templates/ecommerce-website/headphone.jpg"
    }
];

// variable to reference <div class="row"> nested inside <section id="shop">
let shopRow = document.querySelector("#shop .row");

// variable to reference <div id="overlay">
let overlay = document.getElementById("overlay");

// variable to reference <div id="modal">
let modal = document.getElementById("modal");

// variable to reference the sidebar <div id="sidebar1">
let sidebar1 = document.getElementById("sidebar-1");

// variable to reference <div id="sidebar-2">
let sidebar2 = document.getElementById("sidebar-2");

// variable to reference the sidebar content
let sidebar1Content = document.querySelector("#sidebar-1 .sidebar-content");

// variable to reference the <span> inside <div class="summary">
let subtotalSpan = document.querySelector(".summary span");

// variable to reference the <span> inside the shipping sidebar
let subtotalSpan2 = document.querySelector("#sidebar-2 .summary span");

// variable for the shipping fees
let shippingFee = 0;

// reference the input field for the customer name
let buyerName = document.getElementById("buyerName");

// reference the input field for the customer email
let buyerEmail = document.getElementById("buyerEmail");

// reference the <textarea> for the customer address
let buyerAddress = document.getElementById("buyerAddress");

// array to keep track of the orders in the shopping cart
let orders = [];

async function initDB() {
    // open connection to database
    db = await $BSD.db.open("ecommerce");
    
    // save data to the database as a key-value pair
    db.set("allProducts", initialData).then(function() {
        //alert("Data saved.");

        // call getAllProducts function
        getAllProducts();
    });
}

function getAllProducts() {
    // get data from the database
    db.get("allProducts").then(function(data) {
        
        // loop through retrieved data
        data.forEach(function(productData) {
            
            // create a container for the product card
            let productDiv = document.createElement("div");
            productDiv.className = "col-lg-3 col-md-4 col-6 mb-4";
            shopRow.appendChild(productDiv);
            
            // create a product card
            let card = document.createElement("div");
            card.className = "card h-100";
            productDiv.appendChild(card);
            
            // add the product image to the product card
            let img = document.createElement("img");
            img.src = productData.image;
            // call a function when the product image is clicked
            img.onclick = function() {
                showDetail(productData);
            };
            card.appendChild(img);
            
            // create a card body for the text content
            let body = document.createElement("div");
            body.className = "card-body d-flex flex-column";
            card.appendChild(body);
            
            // create the product heading
            let title = document.createElement("h4"); 
            title.innerText = productData.name;
            title.onclick = function () { 
                showDetail(productData);
            }
            title.className = "card-title"; 
            body.appendChild(title);
            
            // create the heading for the product price
            let price = document.createElement("h6");
            price.innerText = "$" + productData.price.toFixed(2);
            body.appendChild(price);
            
            // add the product description
            let desc = document.createElement("p"); 
            desc.innerText = productData.description.substring(0, 70); 
            body.appendChild(desc);
            
            // create an "add to cart" button
            let btn = document.createElement("a");
            btn.innerText = "Add to cart";
            btn.className = "btn btn-sm btn-outline-success mt-auto";
            btn.onclick = function() {
                addToCart(productData);
            }
            body.appendChild(btn);
         });
    });
}

// function to add an item to the shopping cart
function addToCart(productData) {

    let existingIndex = -1;

    // loop through the "orders" array to find if there is an existing order
    orders.forEach(function(order, index) {
        if (order.id == productData.id) {
            existingIndex = index;
        }
    });

    // check if product already exists in the shopping cart
    if (existingIndex > -1) {
        orders[existingIndex].quantity++;
        console.log(orders);
    }

    // if product doesn't exist, add the product to the shopping cart
    else {

        // object to store the product info when it is added to the shopping cart
        let newOrder = {
            id: productData.id,
            name: productData.name,
            price: productData.price,
            image: productData.image,
            quantity: 1
        };

        // add newOrder object to the "orders" array
        orders.push(newOrder);
        console.log(orders);
    }

    // show the products in the shopping cart
    showOrdersInCart();
    
    // update the subtotal at the bottom of the sidebar
    showSubtotal();

    // show the sidebar and overlay 
    sidebar1.classList.add("active");
    overlay.classList.add("active");
}

function freeShipping() {
    shippingFee = 0;
    showSubtotal();
}

function sameDayShipping() {
    shippingFee = 30;
    showSubtotal();
}

// function to calcualte the subtotal in the shopping cart
function showSubtotal() {
    let subtotal = 0;
    orders.forEach(function(order) {
        subtotal += order.price * order.quantity;
    });
    
    // calculate total cost with shipping
    subtotal += shippingFee;
    
    // update the <span> text to display the subtotal
    subtotalSpan.innerText = subtotal.toFixed(2);
    subtotalSpan2.innerText = subtotal.toFixed(2);
    
    return subtotal;
}

// function to show the products in the shopping cart sidebar
function showOrdersInCart() {
    // clear the sidebar content
    sidebar1Content.innerHTML = "";

    orders.forEach(function(order, index) {
        // create a new <li>
        let orderListItem = document.createElement("li");

        // append <li> to the sidebar content container
        sidebar1Content.appendChild(orderListItem);

        // create a <div> row
        let row = document.createElement("div");
        row.className = "row";
        orderListItem.appendChild(row);
        
        //create the left column in the row
        let col4 = document.createElement("div"); 
        col4.className = "col-4"; 
        row.appendChild(col4);
        
        // add the product image to the left column
        let orderImg = document.createElement("img");
        orderImg.className = "img-fluid";
        orderImg.src = order.image;
        col4.appendChild(orderImg);
        
        // create the right column
        let col8 = document.createElement("div");
        col8.className = "col-8";
        row.appendChild(col8);
        
        // add the product name to the right column
        let orderTitle = document.createElement("span");
        orderTitle.className = "product-name";
        orderTitle.innerText = order.name;
        col8.appendChild(orderTitle);
        
        // create the "delete" button to remove an item from the cart
        let deleteImg = document.createElement("img"); 
        deleteImg.className = "trash float-right"; 
        deleteImg.src = "https://app.bsd.education/resources/sandbox_templates/ecommerce-website-with-firestore/trash.svg"; 
        deleteImg.onclick = function () { 
            orders.splice(index, 1);
            showOrdersInCart(); 
            showSubtotal();    
        }
        col8.appendChild(deleteImg);
        
        // create a <p> element
        let paragraph = document.createElement("p");
        col8.appendChild(paragraph);
        
        // create a <span> for the product price
        let priceSpan = document.createElement("span");
        priceSpan.className = "price"; 
        priceSpan.innerText = "$" + order.price.toFixed(2) + " x "; 
        paragraph.appendChild(priceSpan);
        
        // create an <input> for users to change the quantity of the selected product in the cart
        let quantityInput = document.createElement("input"); 
        quantityInput.type = "number"; 
        quantityInput.value = order.quantity; 
        quantityInput.className = "form-control quantity";
        quantityInput.min = 0;
        quantityInput.onchange = function () { 
            order.quantity = quantityInput.value;
            totalSpan.innerText = "$" + (order.price * order.quantity).toFixed(2);
            
            // if user sets the quantity to 0, remove it from the shopping cart
            if (quantityInput.value <= 0) {
                orders.splice(index, 1);
                showOrdersInCart();
            }
            
            showSubtotal();        
        }
        paragraph.appendChild(quantityInput);
        
        // <span> to display the price of an item in the shopping cart multiplied by the quantity 
        let totalSpan = document.createElement("span");
        totalSpan.className = "total";
        totalSpan.innerText = "$" + (order.price * order.quantity).toFixed(2);
        paragraph.appendChild(totalSpan);
    });
}

// function that removes the overlay and modal whenever users click the overlay to close the modal window
function overlayClicked() {
    sidebar1.classList.remove("active");
    sidebar2.classList.remove("active");
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

// function that is run when user clicks the "place order" button
function placeOrder() {
    sidebar1.classList.remove("active");
    sidebar2.classList.add("active");
}

// function that is called whenever the product image or title is clicked
function showDetail(productData) {
    // reference the image in the modal window
    let modalImg = document.querySelector("#modal img");

    // change the image shown in the modal
    modalImg.src = productData.image;

    // reference the price shown in the modal
    let modalPrice = document.querySelector("#modal .price");

    // change the price shown in the modal
    modalPrice.innerText = "$" + productData.price.toFixed(2);

    // reference the product title in the modal
    let modalTitle = document.querySelector("#modal .card-title");

    // change the product title shown in the modal
    modalTitle.innerText = productData.name;

    // reference the product description in the modal
    let modalDesc = document.querySelector("#modal .card-text");

    // change the description shown in the modal
    modalDesc.innerText = productData.description;
    
    // reference the "add to cart" button in the modal window
    let addToCartBtn = document.querySelector("#modal .btn");
    
    // add product to cart and close the modal window
    addToCartBtn.onclick = function() {
        addToCart(productData);
        modal.classList.remove("active");
    };

    // add "active" class to the overlay and modal 
    overlay.classList.add("active");
    modal.classList.add("active");
}

function checkout() {
    //alert("checkout");    
    if (buyerName.value != "" && buyerEmail.value != "" && buyerAddress.value != "") {
        saveToDatabase();
    }
    
    else {
        alert("Please fill in your shipping information.");
    }
}

function saveToDatabase() {
    let newOrder = {
        buyerName: buyerName.value,
        buyerEmail: buyerEmail.value,
        buyerAddress: buyerAddress.value,
        totalPrice: showSubtotal(),
        shippingFee: shippingFee,
        orders: orders,
        timestamp: Date.now()
    };
    
    // set up the key in the key-value pair
    let orderKey = "order" + Date.now();
    
    // save data to the database - orderKey is the key, newOrder object is the value
   db.set(orderKey, newOrder).then(function() {      
       alert("Order saved.");
        
       // close the shipping sidebar
       overlayClicked();
       
       // call the resetSidebar function
       resetSidebar();
    });
}

// reset the input fields in the sidebars
function resetSidebar() {    
    // reset the content in the shopping cart sidebar
    sidebar1Content.innerHTML = "";
    
    // reset the orders array
    orders = [];
    
    // reset content in the shipping sidebar
    buyerName.value = "";
    buyerEmail.value = "";
    buyerAddress.value = "";
    
    // reset the shipping method
    shippingFee = 0;
    document.getElementById("freeShipping").checked = true;
}

// show the shopping cart sidebar when users click "Cart" in the navigation menu
function showShoppingCart() {
    sidebar1.classList.add("active");
    overlay.classList.add("active");
}


initDB();

