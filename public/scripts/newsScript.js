fetch("/get-news")
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        var nesne ='<div class="theNewsBox"><div class="newsTitle"><h1>'+element.title+'</h1><div class="bilgiler">'+element.summary+'</div></div><img class="newsImage" src="https://cdnuploads.aa.com.tr/uploads/sirkethaberleri/Contents/2021/05/28/thumbs_b_c_98c3d9bd57097f565d055dedf624822d.jpg" alt=""></div>';
        document.getElementById("mycontentBox").innerHTML = nesne + document.getElementById("mycontentBox").innerHTML;
    });
});

