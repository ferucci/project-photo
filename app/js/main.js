class MenuController {
    constructor() {
        this.menuButton = document.querySelector('.header__menu-button');
        this.asideBlock = document.querySelector('.aside');
        this.sections = document.querySelectorAll('.content');
        this.links = document.getElementsByClassName("menu__link");

        this.init();
    }

    init() {
        this.menuButton.addEventListener('click', this.toggleAsideClasses.bind(this));

        Array.from(this.links).forEach(link => {
            link.addEventListener('click', this.handleLinkClick.bind(this, link));
        });

        this.activateInitialLink();
    }

    activateInitialLink() {
        const initialActiveLink = Array.from(this.links).find(link => link.classList.contains('menu__link--active'));
        if (initialActiveLink) {
            this.changeContent(initialActiveLink);
        }
    }

    handleLinkClick(link) {
        this.deactivateCurrentActiveLink();
        link.classList.add('menu__link--active');
        this.changeContent(link);
    }

    deactivateCurrentActiveLink() {
        Array.from(this.links).forEach(link => {
            link.classList.remove('menu__link--active');
        });
    }

    toggleAsideClasses() {
        this.asideBlock.classList.toggle('aside-active');
        this.menuButton.classList.toggle('menu-button--active');
    }

    changeContent(link) {
        const contentId = link.getAttribute('href').replace('#', '');

        if (this.asideBlock.classList.contains('aside-active')) {
            this.toggleAsideClasses();
        }

        this.sections.forEach(section => {
            section.style.display = 'none';
            if (section.hasAttribute('data-content') && section.dataset.content === contentId) {
                section.style.display = 'block';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new MenuController());