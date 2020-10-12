const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const mysql = require("mysql")
const session = require("express-session")
const saltRounds = 10
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

//configure session
app.use(session({
    secret: 'ssshhhhh', //random string i guess
    resave: true,
    saveUninitialized: false //https://github.com/expressjs/session#options <-- useful site
}));

app.set('view engine', 'ejs')
app.use(express.static('./public'))

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "inventory"
})

connection.connect((err) => {
    if (err) throw err
    console.log("connection is working");
})

/****************************** Login page ********************************/

app.post('/create_user', (req, res) => {
    console.log(req.query);
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.query.password, salt);
    connection.query('INSERT INTO user (username, password, usertype) VALUES ("' + req.query.username + '","' + hash + '","' + req.query.usertype + '")', (err, result) => {
        if (err) throw err
    })
})

app.get('/', (req, res) => {
    res.render('login');
})

app.post('/', urlEncodedParser, (req, res) => {
    sesh = req.session;
    connection.query('SELECT * FROM user WHERE username="' + req.body.user + '"', (err, result) => {
        if (result.length != 0 && bcrypt.compareSync(req.body.pwd, result[0]['password'])) {
            sesh.id = result[0].id;
            sesh.user = result[0].username;
            sesh.usertype = result[0].usertype;
            res.send('dashboard');
        } else {
            res.send(" ");
            throw err;

        }
    })
})

/****************************** Dashboard ********************************/

app.get('/dashboard', (req, res) => {
    res.render('dashb');
})



/****************************** Product ********************************/

app.get('/product', (req, res) => {
    connection.query('SELECT * FROM products WHERE status="avail"', (err, result) => {
        res.render("product", { products: result });
    });
});

app.post('/product', urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO products SET status = "avail", name ="' + req.body.name + '", price ="' + req.body.price + '", quantity ="' + req.body.qty + '"', (err, result) => {
        if (err) throw err;
        res.redirect('product')
    })
})

app.patch('/product', urlEncodedParser, (req, res) => {
    connection.query('UPDATE products SET  price ="' + req.body.price + '", quantity ="' + req.body.qty + '" WHERE name ="' + req.body.name + '"', (err, result) => {
        if (err) throw err
        res.send('product')
    })
})

app.delete('/product', urlEncodedParser, (req, res) => {
    connection.query('UPDATE products SET status= "cancel" WHERE id="' + req.body.id + '"', (err, result) => {
        if (err) throw err
        res.send(result)
    })
})

/****************************** Transaction ********************************/

app.get('/transaction', (req, res) => {
    connection.query('SELECT * FROM transaction', (err, result) => {
        if (err) throw err;
        res.render('transaction')
    })
})
/****************************** cart ********************************/

app.get('/cart', (req, res) => {
    connection.query('SELECT * FROM products', (err, result) => {
        res.render('cart', { products: result })
    })
})

app.post('/cart', urlEncodedParser, (req, res) => {
    console.log(sesh.id)
    console.log(req.body)

    connection.query('UPDATE products SET quantity = quantity - ' + req.body.quantity + ' WHERE id ="' + req.body.id + '"', (err, resp) => {
        if (err) throw err;
        let totalP = req.body.price * req.body.quantity
        console.log(totalP)
        connection.query('INSERT INTO transaction (userid, quantity, totalPrice) VALUE ("' + sesh.id + '", "' + req.body.quantity + '", "' + totalP + '")', (err, response) => {
            if (err) throw err
        })
    })


})



app.listen(3000, (err) => {
    console.log("the server is working");
})  