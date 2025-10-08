/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    const swiper = new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 2,
        centerSlides : true
    });
    $('.expand_img').on('click', function(){
        $('.swiper').css('display','block');
    })
    $('.swiper').on('click', function (){
        $(this).css('display', 'none');
    })

    // Dark Mode Toggler
    const themeToggler = document.getElementById('theme-toggler');
    const themeIcon = themeToggler.querySelector('i');
    // On load, check local storage first, then OS preference
    const savedTheme = localStorage.getItem('theme');
    let theme;

    if (savedTheme) {
        // 1. Use the saved theme if it exists
        theme = savedTheme;
    } else {
        // 2. If no saved theme, check OS preference
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // 3. Apply the determined theme
    document.body.setAttribute('data-theme', theme);

    // 4. Update the icon accordingly
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggler.addEventListener('click', () => {
        let newTheme;
        if (document.body.getAttribute('data-theme') === 'light') {
            newTheme = 'dark';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            newTheme = 'light';
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Scroll-in animations
    const sectionsToAnimate = document.querySelectorAll('.scroll-fade-in');
    if (sectionsToAnimate.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01 }); // Trigger when 1% of the element is visible

        sectionsToAnimate.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopButton.classList.add('is-visible');
            } else {
                backToTopButton.classList.remove('is-visible');
            }
        });
    }
});
