function registerUser()
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

    localStorage.setItem(
        "user",
        JSON.stringify({
            name,
            email,
            username,
            password
        })
    );

    alert("Registration Successful");

    window.location.href = "/";
}

function login()
{
    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    let role =
        document.getElementById("role").value;

    if(role === "admin")
    {
        if(
            username === "admin" &&
            password === "admin123"
        )
        {
            window.location.href =
                "admin-dashboard.html";
        }
        else
        {
            alert("Invalid Admin Credentials");
        }

        return;
    }

    let user =
        JSON.parse(
            localStorage.getItem("user")
        );

    if(
        user &&
        user.username === username &&
        user.password === password
    )
    {
        window.location.href =
            "customer-dashboard.html";
    }
    else
    {
        alert("Invalid Username Or Password");
    }
}

function logout()
{
    window.location.href = "/";
}