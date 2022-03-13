'use strict'

let menuButton = document.querySelector('.header__menu-button');
let menuLink = document.querySelector('.aside');

menuButton.addEventListener('click', () => {
    menuLink.classList.toggle('aside-active');
    menuButton.classList.toggle('menu-button--active');
});

let links = document.getElementsByClassName("menu__link");
let activeLink = document.getElementsByClassName('menu__link--active');
let i;
for (i = 0; links.length > i; i++){
    links[i].onclick = function(){
        let currentActive = activeLink[0];
        if (currentActive)
            currentActive.classList.remove("menu__link--active");
        if (currentActive !== this)
            this.classList.add("menu__link--active");    
    };
}