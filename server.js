var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");
const MongoClient = require('mongodb').MongoClient;
const URL = 'mongodb+srv://testuser:testuserpassword@cluster0.5n3d2.mongodb.net/test';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/public",express.static("./public"))

app.listen(process.env.PORT || 80);

app.get("/",(req,res)=>{
    fs.readFile("html/index.html",(err,data)=>{
        res.write(data);
        res.end();
    })
})

app.post("/login",(req,res)=>{
    MongoClient.connect(URL,(err,client)=>{
        if(err) throw err;
        const db = client.db("forumdatabase");
        db.collection("users").findOne({username:req.body.username,password:req.body.password},(err,data)=>{
            if(data != null){
                res.send({"information":"başarılı"});
                res.end();
            }
            else{
                res.send({"information":"başarısız"});
                res.end();
            }
        })
    })
})

app.get("/kullaniciadi",(req,res)=>{
    MongoClient.connect(URL, (err, client) => {
    if (err) throw err;
    const db = client.db('forumdatabase');
    db.collection('users').insertOne({ username:"batu" /*req.body.username*/, password: "123"/*req.body.password*/ }, (err, result) => {
        if (err) throw err;
            console.log('Başarılı bir şekilde eklendi.');
            res.status(204).send();
            res.end();
            client.close();
        })
    })
})
