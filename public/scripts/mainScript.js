function rain(){
    let amount = 250;
    let body = document.querySelector(".cloud");
    let i = 0;
    while(i<amount){
        let drop =document.createElement("em");
        let size=Math.random() * 5;
        let posx= Math.floor(Math.random() * window.innerWidth);
        let delay=Math.random() * -20;
        let duration=Math.random() * 0.5;

        drop.style.width = 0.2 + size+"px";
        drop.style.left = posx  +"px";
        drop.style.animationDelay = delay  +"s";
        drop.style.animationDuration = 1+duration  +"s";
        drop.style.zIndex=-5;
        body.appendChild(drop);
        i++;
    }
}

var rainStatus = true;

function controlRain(){
    let cloud = document.getElementById("cloudID");
    if(rainStatus){
        rain();
        cloud.classList.add("cloudHover");
        rainStatus=false;
    }
    else{
        cloud.classList.remove("cloudHover");
        let body = document.querySelector(".cloud");
        rainStatus=true;
        body.innerHTML="";
    }
}

function sunAndMoon(){
    let sun = document.getElementById("sunAndMoon");
    let back = document.querySelector("body");
    sun.classList.toggle("sun");
    sun.classList.toggle("moon");
    back.classList.toggle("bodysun");
    back.classList.toggle("bodymoon");
}

function popupControl(){
    var loginbox = document.getElementById("LoginPopupBox");
    var popupbox = document.getElementById("PopupBackBox");
    loginbox.classList.toggle("loginBoxOff");
    loginbox.classList.toggle("loginBoxOn");
    popupbox.classList.toggle("open");
    if(popupbox.classList.contains("open")){
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    }
}

function userEnterButton(){
    var logininformation = {
        "username":document.getElementById("username").value,
        "password":document.getElementById("password").value
    }

    fetch("/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(logininformation)
    })
    .then(response => response.json())
    .then(data => {
        if(data.information == "başarılı"){
            alert("Giriş Yapıldı!");
        }
        else{
            alert("Giriş Başarısız! Bu kullanıcı adı mevcut değil!");
        }
    });
}

function popupControl2(){
    var loginbox = document.getElementById("LoginPopupBox2");
    var popupbox = document.getElementById("PopupBackBox2");
    loginbox.classList.toggle("loginBoxOff");
    loginbox.classList.toggle("loginBoxOn");
    popupbox.classList.toggle("open");
    if(popupbox.classList.contains("open")){
        document.getElementById("username2").value = "";
        document.getElementById("password2").value = "";
        document.getElementById("password3").value = "";
    }
}

function userSingInButton(){
    var informationss = {
        "username": document.getElementById("username2").value,
        "password": document.getElementById("password2").value
    }
    if(informationss.password === document.getElementById("password3").value){
        fetch("/singup",{ 
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(informationss)
        })
        .then(response => response.json())
        .then(data => {
            if(data.information == "başarılı"){
                alert("Tebrikler kayıt oldun!");
            }
            else{
                alert("Bu kullanıcı adı mevcut!");
            }
        });
    }
    else{
        alert("Şifreler aynı olmalıdır");
    }
}

function mainpage(){
    window.location.href="/";
}

var boldbutton = document.getElementById("boldButton");
var underlinebutton = document.getElementById("underlineButton");
var italicbutton = document.getElementById("itelicButton");
var colorbutton = document.getElementById("colorButton");
var sizebutton = document.getElementById("sizeButton");
var list1button = document.getElementById("list1Button");
var list2button = document.getElementById("list2Button");

var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");
var centerButton = document.getElementById("centerButton");
var linkbutton = document.getElementById("linkbutton");
var unlinkButton = document.getElementById("unlinkButton");

boldbutton.addEventListener("click",()=>{
    document.execCommand("bold",false,null);
})
underlinebutton.addEventListener("click",()=>{
    document.execCommand("underline",false,null);
})
italicbutton.addEventListener("click",()=>{
    document.execCommand("italic",false,null);
})
colorbutton.addEventListener("click",()=>{
    document.execCommand("forecolor",false,document.getElementById("editorColor").value);
})
sizebutton.addEventListener("click",()=>{
    document.execCommand("fontsize",false,document.getElementById("editorFontSize").value);
})
list1button.addEventListener("click",()=>{
    document.execCommand("InsertOrderedList",false,"newOl");
})
list2button.addEventListener("click",()=>{
    document.execCommand("InsertUnorderedList",false,"newUl");
})

leftButton.addEventListener("click",()=>{
    document.execCommand("justifyLeft",false,null);
})
rightButton.addEventListener("click",()=>{
    document.execCommand("justifyRight",false,null);
})
centerButton.addEventListener("click",()=>{
    document.execCommand("justifyCenter",false,null);
})

linkbutton.addEventListener("click",()=>{
    document.execCommand("link",false,null);
})
unlinkButton.addEventListener("click",()=>{
    document.execCommand("unlink",false,null);
})


function renk(){
    document.execCommand("forecolor",false,document.getElementById("editorColor").value);
} 

function boyut(){
    document.execCommand("fontsize",false,document.getElementById("editorFontSize").value);
}

function imgbox(){
    var box = document.getElementById("textEditorImgBox");
    var button = document.getElementById("textimgboxButton");
    if(button.style.width == "100px")button.style.width="40px";
    else button.style.width="100px";
    box.classList.toggle("showimgbox");
    box.classList.toggle("showimgbox2");
}

function baska(){
    alert("deneme");
}
