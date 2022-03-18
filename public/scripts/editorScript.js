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
        document.getElementById("editorFile").value = "";
        var randomid = "P"+Math.random().toString();
        textbox.innerHTML += '<br><img id="'+randomid+'" class="editorTextImg" src="/public/images/EditorImages/loading.svg">';
        
    }
}