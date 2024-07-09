import gsap from "gsap"
// import Swiper from "swiper";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { Navigation, Pagination } from 'swiper/modules';
import { projects, fargions } from "./data";
import imagesLoaded from 'imagesloaded';

//loading
document.body.classList.add('loading');
const bar = document.querySelector('.loading__bar--inner');
const counterNum = document.querySelector(".loading__counter--number");
let c = 0;

let barInterval = setInterval(() => {
  bar.style.width = c + "%";
  counterNum.innerText = c + "%";
  c++;
  if(c===101) {
    clearInterval(barInterval);
    gsap.to('.loading__bar', {
      duration: 5,
      rotate: "90deg",
      left: "1000%",
    });
    gsap.to('.loading__text,.loading__counter', {
      duration: 1,
      opacity: "0"
    });
    gsap.to('.loading__box', {
      duration: 2,
      height: "500px",
      borderRadius: "50%",
    });
    gsap.to('.loading__img', {
      duration: 6,
      opacity: 1,
      borderRadius: "50%",
      scale: 0
    });
    gsap.to('.loading__box', {
      delay: 2,
      border: "none"
    });
    imagesLoaded(document.querySelectorAll('img'), () => {
      gsap.to('.loading', {
        delay: 2,
        duration: 2,
        zIndex: 1,
        background: "transparent",
        opacity: 1
      });
      gsap.to('header', {
        duration: 1,
        delay: 2,
        top: "0",
      });
      gsap.to('.socials', {
        duration: 1,
        delay: 2.5,
        bottom: "10rem",
      });
      gsap.to('.scrolldown', {
        duration: 1,
        delay: 3,
        bottom: "3rem",
      });
      document.body.classList.remove('loading');
    })
  }
}, 50);


//Menu toggle
const button = document.querySelector(".btn-toggle");
const menu = document.querySelector('.menu-links');
button.addEventListener('click', () => {
  menu.classList.toggle('active');
});

//Project mapping
const project_container = document.querySelector('.projects-container');
projects.map((project) => {
  let template = `
    <div class="project">
    <div class="project__header">
      <span>1/8</span>
      <span>${project.date}</span>
    </div>
    <div class="project__infos">
      <h1 class="project__infos--name">${project.name}</h1>
    </div>
    <div class="project__img">
      <img src="${project.image}.jpg" alt="">
      <div class="project__links">
        <a href="${project.link}" target="_blank">
          <a href="${project.link}" target="_blank"class="coolCircleEyeButton">
            <svg class="textcircle" viewBox="0 0 500 500">
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                />
              </defs>
              <text>
                <textPath
                  xlink:href="#textcircle"
                  aria-label=".Listen here."
                  textLength="900"
                >
                  .Listen here.
                </textPath>
              </text>
            </svg>
            <svg
              class="eye"
              aria-hidden="true"
              class="eye"
              viewBox="0 0 70 70"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="eye__outer"
                d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z"
              />
              <path
                class="eye__lashes-up"
                d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192"
              />
              <path
                class="eye__lashes-down"
                d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z"
              />
              <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
              <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
            </svg>
          </a>
        </a>
      </div>
      <div class="project__description">
        <p>${project.text}.</p>
      </div>
    </div>

  </div>
  `
  project_container.innerHTML += template;
});

//Fargion Mapping
gsap.registerPlugin(ScrollTrigger);

const horizontalSections = gsap.utils.toArray('section.horizontal')

horizontalSections.forEach(function (sec, i) {

  const thisPinWrap = sec.querySelector('.pin-wrap');
  const thisAnimWrap = thisPinWrap.querySelector('.animation-wrap');

  const getToValue = () => -(thisAnimWrap.scrollWidth - window.innerWidth);

  gsap.fromTo(thisAnimWrap, {
    x: () => thisAnimWrap.classList.contains('to-right') ? 0 : getToValue()
  }, {
    x: () => thisAnimWrap.classList.contains('to-right') ? getToValue() : 0,
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top top",
      end: () => "+=" + (thisAnimWrap.scrollWidth - window.innerWidth),
      pin: thisPinWrap,
      invalidateOnRefresh: true,
      //anticipatePin: 1,
      scrub: true,
      // markers: true,
    }
  });

});
