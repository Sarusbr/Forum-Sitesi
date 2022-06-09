var app = new Vue({
    el: '#app',
    data: {
      selectedPage: 0,
      nowmod:"sun",
      elementPosition:0,
      myscreen:0,
      username:"",
      password:"",
      password2:"",
      news:[]
    },
    methods:{
      changeMod(){
        this.nowmod = this.nowmod == "sun" ? "moon":"sun";
        var body = document.querySelector("body");
        body.classList.toggle("bg-dark-body");
        body.classList.toggle("bg-light");
      },
      login(){
        let mydata = {
          username: this.username,
          password: this.password
        }
        this.username="";
        this.password="";
        fetch('/loginControl', {
          method: "POST",
          body: JSON.stringify(mydata),
          headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          if(json.status){
            alert("giriş başarılı!");
            $('#SingInModal').modal('hide');
          }
          else {
            if(json.link == null){
              alert("Başarısız!!");
            }
            else{
              window.location.href = json.link;
            }
          }
        })
        
      },
      register(){
        if(this.password == this.password2){
          let mydata = {
            username: this.username,
            password: this.password
          }
          this.username="";
          this.password="";
          this.password2="";
          fetch('/register', {
            method: "POST",
            body: JSON.stringify(mydata),
            headers: {"Content-type": "application/json"}
          })
          .then(response => response.json())
          .then(json => {
            if(json.status) {
              alert("kayıt başarılı!");
              $('#SingUpModal').modal('hide');
            }
            else alert("Bu kullancı adı zaten mevcut!");
          })
        }
        else alert("şifreler aynı değil!");
      }
    },
    created(){
      setInterval(() => {
        this.myscreen = window.innerWidth;
      },300);
      fetch('/getNews', {
        method: "POST",
        body: "",
        headers: {"Content-type": "application/json"}
      })
      .then(response => response.json())
      .then(json => {
        this.news = json;
      })
    }
  })