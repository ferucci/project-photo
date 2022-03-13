'use strict'

let menuButton = document.querySelector('.header__menu-button');
let menuLink = document.querySelector('.aside');

menuButton.addEventListener('click', () => {
    menuLink.classList.toggle('aside-active');
    menuButton.classList.toggle('menu-button--active');
});