var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/public",express.static("./public"));

app.get("/",(req,res)=>{
    fs.readFile("html/index.html",(err,data)=>{
        res.write(data);
        res.end();
    });
});

app.listen(80);