var app = new Vue({
    el: '#app',
    data: {
      selectedPage: 0,
      nowmod:"sun",
      elementPosition:0,
      myscreen:0,
      username:"",
      password:"",
      password2:""
    },
    methods:{
      changeMod(){
        this.nowmod = this.nowmod == "sun" ? "moon":"sun";
        var body = document.querySelector("body");
        body.classList.toggle("bg-dark-body");
        body.classList.toggle("bg-light");
      },
      getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);
      
        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);
      
        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
      
        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);
      
        return scrollbarWidth;
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
          if(json.status) alert("giriş başarılı!");
          else alert("Başarısız!!");
        })


      },
      register(){
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
          if(json.status) alert("kayıt başarılı!");
          else alert("Bu kullancı adı zaten mevcut!");
        })
      }
    },
    created(){
      setInterval(() => {
        this.myscreen = window.innerWidth;
      },300);
    }
  })