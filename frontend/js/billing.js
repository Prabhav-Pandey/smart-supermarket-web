let products = [];

async function loadProducts()
{
    try
    {
        const response =
            await fetch("http://localhost:5000/products");

        products = await response.json();

        let select =
            document.getElementById("productSelect");

        select.innerHTML = "";

        products.forEach(product =>
        {
            let option =
                document.createElement("option");

            option.value = product.product_id;

            option.text =
                product.product_name +
                " - ₹" +
                product.price;

            select.appendChild(option);
        });
    }
    catch(error)
    {
        console.error(error);

        document.getElementById("productSelect").innerHTML =
            "<option>Error Loading Products</option>";
    }
}

function calculateBill()
{
    let selectedId =
        document.getElementById("productSelect").value;

    let quantity =
        parseInt(
            document.getElementById("quantity").value
        );

    if(!quantity || quantity <= 0)
    {
        alert("Enter Valid Quantity");
        return;
    }

    let product =
        products.find(
            p => p.product_id == selectedId
        );

    let total =
        parseFloat(product.price) * quantity;

    document.getElementById("total").innerHTML =
        "Total: ₹" + total.toFixed(2);
}

loadProducts();