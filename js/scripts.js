
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

    // Excel Reading Logic
    const openWorkListBtn = document.getElementById('openWorkList');
    const workListModal = new bootstrap.Modal(document.getElementById('workListModal'));
    const excelContainer = document.getElementById('excel-data-container');
    let isExcelLoaded = false;

    if (openWorkListBtn) {
        openWorkListBtn.addEventListener('click', function(e) {
            e.preventDefault();
            workListModal.show();

            if (!isExcelLoaded) {
                fetch('workList.xls')
                    .then(response => response.arrayBuffer())
                    .then(data => {
                        const workbook = XLSX.read(data, { type: 'array' });
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // User requested columns
                        const targetColumns = ["No.", "요청일자", "고객사명", "사업명", "제품유형", "요청사항", "처리자", "처리방법", "처리유형", "진행상태", "처리완료일", "처리내용"];
                        
                        // Convert to JSON
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        
                        if (jsonData.length === 0) {
                            excelContainer.innerHTML = '<p class="text-center">표시할 데이터가 없습니다.</p>';
                            return;
                        }

                        // Build HTML Table manually to filter columns
                        let htmlTable = '<table id="workListTable" class="table table-bordered table-hover table-sm" style="width:100%">';
                        
                        // Header
                        htmlTable += '<thead class="table-light"><tr>';
                        targetColumns.forEach(col => {
                            htmlTable += `<th>${col}</th>`;
                        });
                        htmlTable += '</tr></thead>';
                        
                        // Body
                        htmlTable += '<tbody>';
                        jsonData.forEach(row => {
                            htmlTable += '<tr>';
                            targetColumns.forEach(col => {
                                let cellValue = row[col] || '';
                                // Handle date values if necessary (Excel dates can be numbers)
                                htmlTable += `<td>${cellValue}</td>`;
                            });
                            htmlTable += '</tr>';
                        });
                        htmlTable += '</tbody></table>';
                        
                        excelContainer.innerHTML = htmlTable;
                        isExcelLoaded = true;
                    })
                    .catch(error => {
                        console.error('Error loading excel file:', error);
                        excelContainer.innerHTML = '<p class="text-danger text-center">파일을 불러오는 중 오류가 발생했습니다.</p>';
                    });
            }
        });
    }
});
