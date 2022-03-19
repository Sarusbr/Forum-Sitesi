let url = new URL(window.location.href);
let searchparams = new URLSearchParams(url.search);
let title = searchparams.get("baslik");
fetch("/haber/"+title)
.then(response => response.json())
.then(data => {
    var src = "";
    if(data[0].newsImage != "")src= '"src="/'+data[0].newsImage+'"';
    else src= '';
    var veri =  data[0].title+'<br><img '+src+'><br>'+data[0].content+'<br><br>Yazar: '+data[0].writer;
    document.getElementById("innerContentBox").innerHTML=veri;
})
