var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.listen(process.env.PORT || 80);

var adminIp;

app.use(bodyParser.json()) //req.body çalışması için gerekli
app.use(express.static("frontend/"))
/*app.use(express.limit('5M'));  Dosya yükleme limitni 5mb yapıyor muhtemelen  */

app.get("/", (req, res) => {
    fs.readFile("frontend/news.html", (err, data) => {
        res.write(data);
        res.end();
    })
})

app.get("/forum", (req, res) => {
    fs.readFile("frontend/forum.html", (err, data) => {
        res.write(data);
        res.end();
    })
})

app.get("/adminPage",(req,res)=>{
    if(adminIp == req.socket.remoteAddress){
        fs.readFile("adminPage/admin.html",(err,data)=>{
            res.end(data);
            adminIp = null;
        })
    }
    else{
        res.end();
        adminIp = null;
    }
})


app.post("/loginControl", (req, res) => { //giriş api
    var control = false;
    if(req.body.username == "ad" && req.body.password == "asd"){
        adminIp = req.socket.remoteAddress;
        res.end(JSON.stringify({status: control,link:"/adminPage"}));
        setTimeout(() => {
            adminIp = null;
        }, 10000);
    }else {
    fs.readFile("data/users.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == req.body.username && data[i].password == req.body.password) {
                control = true;
                break;
            }
        }
        res.end(JSON.stringify({status: control}));
    })}
})

app.post("/register", (req, res) => { //kullanıcı kayıt api
    var control = false;
    fs.readFile("data/users.json", "utf8", (err, data) => {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i].username == req.body.username) {
                control = true;
                break;
            }
        }
        if (!control) {
            data.push(req.body);
            fs.writeFile("data/users.json", JSON.stringify(data, null, 4), (err) => {
                console.log("yeni kullanıcı kaydedildi.");
                res.end(JSON.stringify({
                    status: true
                }))
            })
        } else res.end(JSON.stringify({
            status: false
        }));
    })
})

app.post("/getNews", (req, res) => {
    fs.readFile("data/news.json", "utf8", (err, data) => {
        res.end(data);
    })
})

app.post("/getForums",(req,res)=>{ 
// bu kısımda bir json istenecek ve jsondan gelen bilgileye göre hangi veriden başlanıp hangisine kadar olduğu alınacak
    fs.readFile("data/forums.json", "utf8", (err, data) => {
        res.write(data);
        res.end();
    })
})