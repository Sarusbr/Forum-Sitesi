function rain(){
    let amount = 250;
    let body = document.querySelector(".cloud");
    let i = 0;
    while(i<amount){
        let drop =document.createElement("i");
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
            alert("başarılı");
        }
        else{
            alert("başarısız");
        }
    });
}