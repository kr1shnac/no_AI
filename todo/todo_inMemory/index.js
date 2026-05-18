const express = require ("express");
const jwt = require ("jsonwebtoken");

const { authMiddleware } = require("./middleware.js")

const app = express();

app.use(express.json());

//in Memory
const users = []
const todos = []


//create account route
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = users.find(u => u.username === username);

    if(userExist) {
        return res.status(403).json({
            message: "Account already exist"
        })
    }

    users.push({
        username,
        password
    })

    res.json({
        message: "your acoount is created"
    })
})


//login route
app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = users.find(u => u.username === username && u.password === password);

    if(!userExist) {
        return res.status(403).json({
            message: "invalid username or password"
        })
    }

    //json web token
    const token = jwt.sign({
        username
    }, "secreat")

    res.json({
        message: "logged in",
        token: token
    })
})


//create todo
app.post("/todo", authMiddleware, (req, res) => {
    const todo = req.body.todo;
    const username = req.username;

    todos.push({
        todo,
        username
    })

    res.json({
        message: "todo is added"
    })
})


//display todo
app.get("/todo", authMiddleware, (req, res) => {
    const username = req.username;

    const usersTodo = todos.filter(u => u.username === username)

    res.json({
        todos : usersTodo
    })
})

app.listen(3000);