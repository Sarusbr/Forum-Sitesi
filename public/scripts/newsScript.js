fetch("/get-news")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        var nesne ='<div class="theNewsBox"><div class="newsTitle"><h1>'+element.title+'</h1><div class="bilgiler">'+element.summary+'</div></div><img class="newsImage" src="'+element.newsImage+'" alt=""></div>';
        document.getElementById("mycontentBox").innerHTML = nesne + document.getElementById("mycontentBox").innerHTML;
    });
});

