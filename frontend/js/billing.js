const products = [

{
    product_id:1,
    product_name:"Rice",
    price:50
},

{
    product_id:2,
    product_name:"Milk",
    price:30
},

{
    product_id:3,
    product_name:"Bread",
    price:25
},

{
    product_id:4,
    product_name:"Sugar",
    price:45
},

{
    product_id:5,
    product_name:"Tea",
    price:120
},

{
    product_id:6,
    product_name:"Coffee",
    price:180
}

];

let cart = [];

function loadProducts()
{
    let select =
        document.getElementById(
            "productSelect"
        );

    select.innerHTML = "";

    products.forEach(product =>
    {
        let option =
            document.createElement(
                "option"
            );

        option.value =
            product.product_id;

        option.text =
            product.product_name +
            " - ₹" +
            product.price;

        select.appendChild(option);
    });
}

function addToCart()
{
    let productId =
        document.getElementById(
            "productSelect"
        ).value;

    let quantity =
        parseInt(
            document.getElementById(
                "quantity"
            ).value
        );

    if(
        !quantity ||
        quantity <= 0
    )
    {
        alert(
            "Enter Valid Quantity"
        );
        return;
    }

    let product =
        products.find(
            p =>
            p.product_id ==
            productId
        );

    cart.push({
        name:
            product.product_name,
        price:
            product.price,
        quantity:
            quantity
    });

    renderCart();
}

function renderCart()
{
    let html = "";

    cart.forEach(item =>
    {
        html += `
        <div class="cart-item">

            <span>
                ${item.name}
            </span>

            <span>
                Qty:
                ${item.quantity}
            </span>

            <span>
                ₹${item.price * item.quantity}
            </span>

        </div>
        `;
    });

    document.getElementById(
        "cartItems"
    ).innerHTML =
        html;
}

function generateBill()
{
    if(cart.length === 0)
    {
        alert("Cart Empty");
        return;
    }

    let subtotal = 0;

    let receipt =

    `
    <div class="receipt">

    <h2>
    SMART SUPERMARKET
    </h2>

    <p style="text-align:center">
    ------------------------
    </p>
    `;

    cart.forEach(item =>
    {
        let amount =
            item.price *
            item.quantity;

        subtotal += amount;

        receipt +=
        `
        <div class="receipt-row">

            <span>
            ${item.name}
            x${item.quantity}
            </span>

            <span>
            ₹${amount}
            </span>

        </div>
        `;
    });

    let gst =
        subtotal * 0.18;

    let total =
        subtotal + gst;

    receipt +=
    `
    <hr>

    <div class="receipt-row">

        <span>
        Subtotal
        </span>

        <span>
        ₹${subtotal.toFixed(2)}
        </span>

    </div>

    <div class="receipt-row">

        <span>
        GST (18%)
        </span>

        <span>
        ₹${gst.toFixed(2)}
        </span>

    </div>

    <hr>

    <div class="receipt-total">

        <span>
        Grand Total
        </span>

        <span>
        ₹${total.toFixed(2)}
        </span>

    </div>

    <p class="thanks">
    Thank You For Shopping
    </p>

    </div>
    `;

    document.getElementById(
        "billResult"
    ).innerHTML =
        receipt;
}

loadProducts();