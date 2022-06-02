var express = require("express");
var app = express();
var fs = require("fs");
app.listen(80);

app.use(express.static("../frontend/"))

app.get("/",(req,res)=>{
    fs.readFile("../frontend/forumTemplate.html",(err,data)=>{
        res.write(data);
        res.end();
    })
})