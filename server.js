var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

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
    if(req.body.username=="batu" && req.body.password =="123"){
        res.send({"information":"başarılı"});
        res.end();
    }
    else{
        res.send({"information":"başarılı değil"});
        res.end();
    }
})
