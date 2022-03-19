fetch("/get-news")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        var nesne ='<a class="newslink" href="/haber/?baslik='+stringtohtml(element.title).textContent+'"><div class="theNewsBox"><div class="newsTitle"><h1>'+element.title+'</h1><div class="bilgiler">'+element.summary+'</div></div><img class="newsImage" src="'+element.newsImage+'" alt=""></div></a>';
        document.getElementById("mycontentBox").innerHTML = nesne + document.getElementById("mycontentBox").innerHTML;
    });
});

function stringtohtml(str){
    var parser = new DOMParser();
    var doc = parser.parseFromString(str,'text/html');
    return doc.body;
}