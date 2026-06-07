async function registerUser()
{
    let name =
        document.getElementById("name").value;

    let email =
        document.getElementById("email").value;

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if(
        name === "" ||
        email === "" ||
        username === "" ||
        password === ""
    )
    {
        alert("Please Fill All Fields");
        return;
    }

    try
    {
        const response =
            await fetch(
                "https://smart-supermarket-web.onrender.com/register",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        username,
                        password
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        window.location.href =
            "index.html";
    }
    catch(error)
    {
        console.error(error);
        alert("Registration Failed");
    }
}

async function login()
{
    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let role =
        document.getElementById("role").value;

    try
    {
        const response =
            await fetch(
                "https://smart-supermarket-web.onrender.com/login",
                {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        role
                    })
                }
            );

        const data =
            await response.json();

        if(data.success)
        {
            if(data.role === "admin")
            {
                window.location.href =
                    "admin-dashboard.html";
            }
            else
            {
                window.location.href =
                    "customer-dashboard.html";
            }
        }
        else
        {
            alert("Invalid Username Or Password");
        }
    }
    catch(error)
    {
        console.error(error);
        alert("Login Failed");
    }
}

function logout()
{
    window.location.href = "index.html";
}