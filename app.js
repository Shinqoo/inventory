const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const saltRounds = 10
const urlEncodedParser = bodyParser.urlencoded({extended: false})
const app = express()
const mysql = require("mysql")
app.set('view engine', 'ejs')
app.use(express.static('./public'))

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "sample"
})

connection.connect((err) =>{
    if (err) throw err
    console.log("connection is working")
})

app.post('/create_user', (req, res) =>{
    console.log(req.query)
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash =bcrypt.hashSync(req.query.password, salt)
    connection.query('INSERT INTO user (username, password, usertype) VALUES ("'+ req.query.username +'","'+ hash +'","'+ req.query.usertype +'")', (err, result) =>{
        if (err) throw err
        res.send("here")
        console.log('here')
    })
})

app.get('/', (req, res) =>{
    res.render('login')
})

app.post('/', urlEncodedParser, (req, res) =>{
    connection.query('SELECT * FROM user WHERE username="' + req.body.user+ '"', (err, result) =>{
        if(bcrypt.compareSync(req.body.pwd, result[0]['password'])){
            console.log("taku punani");
            res.redirect('/dashboard');
        } else {
            console.log("here")
            res.json(true)
        }
        
    })
})

app.get('/dashboard', (req, res) =>{
    console.log("gian my bb")
    res.render('dashb')
})

app.listen(3000, (err)=>{
    console.log("the server is working")
})