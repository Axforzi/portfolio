const textTyping = document.querySelector(".knowledge");
const text = ["JavaScript", "HTML", "CSS", "Python"];
let cont = 0

setInterval(() => {
    textTyping.innerHTML = text[cont];
    
    if((cont+1) != text.length){
        cont += 1;
    }
    else{
        cont = 0;
    }
}, 3000);

// OBSERVER HEADER
const about = document.querySelector(".about");
const header = document.querySelector(".menu");
const welcome = document.querySelector(".welcome");

const headerAnimation = (entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting || header.classList.contains("menu-show")){
            header.classList.toggle("menu-show");
            if(!header.classList.contains("menu-show")){ 
                scroll({
                    top: about.offsetTop,
                    behavior: 'smooth',
                });
            }
            else{
                scroll({
                    top: welcome.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    });
};

const observerHeader = new IntersectionObserver(headerAnimation, {threshold: .6});
observerHeader.observe(welcome);

// OBSEVER SECTION
const intro = about.querySelector(".intro");
const skills = about.querySelector(".skills");
const projects = about.querySelector(".projects");
const footer = document.querySelector("footer");
const sectionAnimation = (entries) => {
    entries.forEach( entry => {
        if (entry.isIntersecting || entry.target.classList.contains("section-show")){
            entry.target.classList.toggle("section-show");
        }
    });
}

const options = {
    threshold: 0.3
}

const observerSection = new IntersectionObserver(sectionAnimation, options);
observerSection.observe(intro);
observerSection.observe(skills);
observerSection.observe(projects);