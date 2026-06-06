const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "smart_supermarket"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err);
        return;
    }

    console.log("MySQL Connected");
});

app.get("/products", (req, res) => {

    db.query(
        "SELECT * FROM products",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);
        }
    );
});

app.post("/feedback", (req, res) => {

    const feedback = req.body.feedback;

    db.query(
        "INSERT INTO feedback(customer_feedback) VALUES(?)",
        [feedback],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Feedback Saved"
            });
        }
    );
});

app.post("/register", (req, res) => {

    const {
        name,
        email,
        username,
        password
    } = req.body;

    db.query(
        `INSERT INTO customers
        (name,email,username,password)
        VALUES (?,?,?,?)`,
        [name, email, username, password],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Registration Successful"
            });
        }
    );
});

app.post("/login", (req, res) => {

    const {
        username,
        password,
        role
    } = req.body;

    if(role === "admin")
    {
        if(
            username === "admin" &&
            password === "admin123"
        )
        {
            return res.json({
                success: true,
                role: "admin"
            });
        }

        return res.json({
            success: false
        });
    }

    db.query(
        "SELECT * FROM customers WHERE username=? AND password=?",
        [username, password],
        (err, result) => {

            if(err)
                return res.status(500).json(err);

            if(result.length > 0)
            {
                res.json({
                    success: true,
                    role: "customer"
                });
            }
            else
            {
                res.json({
                    success: false
                });
            }
        }
    );
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});