var app = new Vue({
    el: '#app',
    data: {
      selectedPage: 0,
      nowmod:"sun",
      elementPosition:0,
      myscreen:0
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
      }
    },
    created(){
      setInterval(() => {
        this.myscreen = window.innerWidth;
      },300);
    }
  })