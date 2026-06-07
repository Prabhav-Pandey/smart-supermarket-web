const products = [
    {
        product_id: 1,
        product_name: "Rice",
        price: 50
    },
    {
        product_id: 2,
        product_name: "Milk",
        price: 30
    },
    {
        product_id: 3,
        product_name: "Bread",
        price: 25
    }
];

function loadProducts()
{
    let select =
        document.getElementById(
            "productSelect"
        );

    if(!select)
        return;

    select.innerHTML = "";

    products.forEach(product =>
    {
        let option =
            document.createElement("option");

        option.value =
            product.product_id;

        option.text =
            product.product_name +
            " - ₹" +
            product.price;

        select.appendChild(option);
    });
}

function calculateBill()
{
    let selectedId =
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
            selectedId
        );

    let total =
        product.price *
        quantity;

    document.getElementById(
        "total"
    ).innerHTML =
        "Total: ₹" +
        total.toFixed(2);
}

loadProducts();