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
      news:[],
      forums:[]
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
      findDate(time){
        var mytime = new Date(time);
        var nowtime = new Date();
        console.log(mytime+" / "+nowtime);
        if((nowtime.getFullYear() - mytime.getFullYear()) != 0) return (nowtime.getFullYear() - mytime.getFullYear())+" yıl önce";
        else if((nowtime.getMonth() - mytime.getMonth()) != 0) return (nowtime.getMonth() - mytime.getMonth())+" ay önce";
        else if((nowtime.getDate() - mytime.getDate()) != 0) return (nowtime.getDate() - mytime.getDate())+" gün önce";
        else if((nowtime.getHours() - mytime.getHours()) != 0) return (nowtime.getHours() - mytime.getHours())+" saat önce";
        else if((nowtime.getMinutes() - mytime.getMinutes()) != 0) return (nowtime.getMinutes() - mytime.getMinutes())+" dakika önce";
        else return "şimdi";
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
      if(pageID == 1){
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
      else if(pageID == 2){
        fetch('/getForums', {
          method: "POST",
          body: "",
          headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(json => {
          this.forums = json;
          console.log(json);
        })
      }
    }
  })