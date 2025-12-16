
window.addEventListener('DOMContentLoaded', event => {

    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    };

    
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

    
    const themeToggler = document.getElementById('theme-toggler');
    const themeIcon = themeToggler.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    let theme;

    if (savedTheme) {
        
        theme = savedTheme;
    } else {
        
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    
    document.body.setAttribute('data-theme', theme);

    
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

    
    const sectionsToAnimate = document.querySelectorAll('.scroll-fade-in');
    if (sectionsToAnimate.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01 }); 

        sectionsToAnimate.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { 
                backToTopButton.classList.add('is-visible');
            } else {
                backToTopButton.classList.remove('is-visible');
            }
        });
    }
});
