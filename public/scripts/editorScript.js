function editorBold(){
    document.execCommand("bold",false,null);
}
function editorItalic(){
    document.execCommand("italic",false,null);
}
function editorUnderline(){
    document.execCommand("underline",false,null);
}
function editorColor(){
    document.execCommand("forecolor",false,document.getElementById("EditorColorButton").value);
}
function editorSize(){
    document.execCommand("fontsize",false,document.getElementById("editorSizeButton").value)
}
function editorLeft(){
    document.execCommand("justifyLeft",false,null);
}
function editorRight(){
    document.execCommand("justifyRight",false,null);
}
function editorCenter(){
    document.execCommand("justifyCenter",false,null);
}
function editorList1(){
    document.execCommand("InsertUnorderedList", false, "newUl");
}
function editorList2(){
    document.execCommand("InsertOrderedList", false, "newUl");
}

function editorImage(){
    if(document.getElementById("editorFile").value != ""){
        var textbox = document.getElementById("editorTextBox3");
        var filevalue = document.getElementById("editorFile").value;
        var filesSelected = document.getElementById("editorFile").files;
        var randomid = "P"+Math.random().toString();
        var fileSrc;
        textbox.innerHTML += '<br><img id="'+randomid+'" class="editorTextImg" src="/public/images/EditorImages/loading.svg">';
        if (filesSelected.length > 0) {
          var fileToLoad = filesSelected[0];
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
            fileSrc = fileLoadedEvent.target.result; // <--- data: base64
            var fileURL = fileSrc.split(",");
            var fileExtention = filevalue.split(".");
            var uploadImageJson={
                "imgData":fileURL[1],
                "imgExtention":fileExtention[fileExtention.length-1]
            }
            fetch("/uploadImage",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(uploadImageJson)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById("editorTextBox3").innerHTML=document.getElementById("editorTextBox3").innerHTML.replace('<br><img id="'+randomid+'" class="editorTextImg" src="/public/images/EditorImages/loading.svg">','<br><img id="'+randomid+'" class="editorTextImgFull" src="/public/images/NewsImages/'+data.text+'">')
            })
          }
          fileReader.readAsDataURL(fileToLoad);
        }
        document.getElementById("editorFile").value = "";
    }
}