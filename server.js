var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const { url } = require("inspector");
const res = require("express/lib/response");
const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb+srv://testuser:testuserpassword@cluster0.5n3d2.mongodb.net/test';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static("./public"))

app.listen(process.env.PORT || 80);

app.get("/", (req, res) => {
    fs.readFile("html/index.html", (err, data) => {
        res.write(data);
        res.end();
    })
})

app.get("/news", (req, res) => {
    fs.readFile("html/createNews.html", (err, data) => {
        res.write(data);
        res.end();
    })
})

app.post("/login", (req, res) => {
    if (req.body.username == "ad" && req.body.password == "123") {
        res.send({
            'information': 'başarılı',
            'html': '<div class="otherLogin"><span>Admin bilgileri İle giriş yaptınız<br>Kullanıcı bilgilerini tekrar girin</span><form action="/adminLogin" method="post"><input class="usernameBox" type="text" name="adminusername"><br><input class="usernameBox" type="password" name="adminpassword"><br><br><input class="LoginButton" type="submit" value="Giriş"></form></div>'
        })
    }
    else {
        MongoClient.connect(URL, (err, client) => {
            if (err) throw err;
            const db = client.db("forumdatabase");
            db.collection("users").findOne({ username: req.body.username, password: req.body.password }, (err, data) => {
                if (data != null) {
                    res.send({ "information": "başarılı", "html": "" });
                    res.end();
                    client.close();
                }
                else {
                    res.send({ "information": "başarısız", "html": "" });
                    res.end();
                    client.close();
                }
            })
        })
    }
})

app.post("/singup", (req, res) => {
    console.log("erişildi");
    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        const db = client.db("forumdatabase");
        db.collection("users").findOne({ username: req.body.username }, (err3, data) => {
            if (data == null) {
                db.collection("users").insertOne({ username: req.body.username, password: req.body.password }, (error, islem) => {
                    if (error) throw error;
                    res.send({ "information": "başarılı" });
                    res.end();
                    client.close();
                    console.log("kayıt başarılı")
                })
            }
            else {
                res.send({ "information": "bu kullanıcı var" });
                res.end();
                client.close();
                console.log("kayıt başarısız!")
            }
        });
    })
})

app.post("/publish-news", (req, res) => {
    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        const db = client.db("forumdatabase");
        db.collection("news").insertOne({
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content,
            writer: req.body.writer,
            newsImage: req.body.newsImage
        }, (error, data) => {
            if (error) throw error;
            res.send({ "text": "Haber Yayınlandı!" });
            res.end();
            client.close();
            console.log("yeni haber yayınlandı!")
        })
    })
})

app.get("/get-news", (req, res) => {
    MongoClient.connect(URL, (err, client) => {
        if (err) throw err;
        const db = client.db("forumdatabase");
        db.collection("news").find({}).toArray((err2, result) => {
            if (err2) throw err2;
            res.send(result);
            res.end();
            client.close();
        })
    })
})

app.post("/adminLogin", (req, res) => {
    if (req.body.adminusername == "ad" && req.body.adminpassword == "123") {
        fs.readFile("html/createNews.html", (err, data) => {
            res.write(data);
            res.end();
        })
    }
    else {
        fs.readFile("html/html.html", (err, data) => {
            res.write(data);
            res.end();
        })
    }
})

app.post("/uploadImage", (req, res) => {
    const buffer = Buffer.from(req.body.imgData, "base64");
    var date = new Date();
    var time = date.getFullYear() + "." + date.getMonth() + "." + date.getDay() + "." + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + "." + date.getMilliseconds();
    var name = "admin_" + time + "." + req.body.imgExtention;
    fs.writeFileSync("public/images/NewsImages/" + name, buffer);
    res.send({ "text": name })
    res.end();
})