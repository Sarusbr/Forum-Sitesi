var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

app.listen(process.env.PORT || 80);



app.use(bodyParser.json()) //body parserin çalışması için gerekli
app.use(express.static("frontend/"))

app.get("/",(req,res)=>{
    fs.readFile("frontend/forumTemplate.html",(err,data)=>{
        res.write(data);
        res.end();
    })
})

app.post("/loginControl",(req,res)=>{
    var control = false;
    fs.readFile("users.json","utf8",(err,data)=>{
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if(data[i].username == req.body.username && data[i].password == req.body.password){
                control = true;
                break;
            }            
        }
        res.end(JSON.stringify({status:control}));
    })
})

app.post("/register",(req,res)=>{//kullanıcı kayıt
    console.log("girdim")
    var control = false;
    fs.readFile("users.json","utf8",(err,data)=>{
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
            if(data[i].username == req.body.username){
                control = true;
                break;
            }            
        }
        if(!control){
            data.push(req.body);
            fs.writeFile("users.json",JSON.stringify(data,null,4),(err)=>{
                res.end(JSON.stringify({status:true}))
            })
        }
        else res.end(JSON.stringify({status:false}));
    })
})