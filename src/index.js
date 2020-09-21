class Accordion {
  constructor(){
    // constructor
    this.el=null;
    this.isMobile = null;
    this.accWidth = 650;
    this.prevAcc = document.querySelector('.third');
    this.isActiveTab = null;
    this.headerBg = document.querySelector('.bg');
    this.buttons = document.querySelectorAll('.accordion');
    this.panels = document.querySelectorAll('.panel');
  }

  init(e) {
    // initialize
    this.el = e.target;
    this.isActiveTab = this.el.classList.contains('active');
    this.isMobile = window.innerWidth < 768;
    if(this.isMobile){
      // if mobile
      this.animateMobile()
    } else {
      // if desktop
      this.prevAcc.classList.remove('active');
      this.el.classList.add('active');
      this.animate()
    }
  }

  animateMobile() {
    const panels = [...this.panels];
    const id = this.el.getAttribute('data-id');
    panels.forEach((panel,ind)=>{
      if(id == ind && !this.isActiveTab){
        panel.style.maxHeight = panel.scrollHeight + "px";
        this.buttons[ind].classList.add('active');
      } else {
        panel.style.maxHeight = "0px";
        this.buttons[ind].classList.remove('active');
        console.log('adding', ind, this.el)
      }
    })
  };

  animate() {
    this.moveBg();
    this.moveContent();
  }

  moveBg() {
    this.headerBg.style.left = this.el.offsetLeft + 'px';
    this.prevAcc.style.color = 'black';
    this.el.style.color = 'white';
    this.prevAcc = this.el;
  };

  moveContent() {
    const id = this.el.getAttribute('data-id');
    let spots = [];
    switch(id) {
      case "0":
        spots = ['0px', `${this.accWidth}px`, `${this.accWidth}px`]
        break;
      case "2": 
        spots = [`-${this.accWidth}px`, `-${this.accWidth}px`, '0px', ]
        break;
      default:
        spots = [`-${this.accWidth}px`, '0px', `${this.accWidth}px`]
    }
    spots.forEach((spot,ind)=>{
      this.panels[ind].style.left=spot;
      if(id == ind && !this.isActiveTab){
        this.buttons[ind].classList.add('active');
      } else {
        this.buttons[ind].classList.remove('active');
      }
    });
  }
}

const accordion = new Accordion();
const acc = [...document.querySelectorAll(".accordion")];
acc.forEach(item=>item.addEventListener('click',e=>accordion.init(e)))



// Window Resize adjustments
const ipadSize = 768;
document.querySelector('button.accordion.active + .panel').style.maxHeight = '100%';
const accordions = [...document.querySelectorAll('.accordion')];
const panels = [...document.querySelectorAll('.panel')];

function windowResize(){
  console.log('window.innerWidth',window.innerWidth)
  if(window.innerWidth >= ipadSize){
    // if desktop apply animations
    document.querySelector('.bg').style.left = document.querySelector('.active').offsetLeft + 'px';
    accordions.forEach((accordion,ind)=>{
      accordion.style.color = accordion.classList.contains('active') ? 'white' : "black";
      panels[ind].style.left = accordion.classList.contains('active') ? '0px' : "-650px";
    })
  } else {
    // if mobile apply animations
    accordions.forEach((item,ind)=>{
      panels[ind].style.maxHeight = item.classList.contains('active') ? '100%' : '0px';
    })
  }
}
// Addedd debounce to improve performance
let debounce;
window.onresize = ()=> {
  clearTimeout(debounce);
  debounce = setTimeout(windowResize, 500);
};