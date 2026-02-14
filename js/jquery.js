$('.mini_img img').on('click',function(){
    var cursor = $(this).parents('.career_area').first();
    if(cursor.css('max-height') == '200px'){
        cursor.css('max-height', '100%');
    }else{
        cursor.css('max-height', '200px');
    }
});
function toggleSlide() {
    var profileBtn = $('#slideContent');
    
    profileBtn.toggleClass("hidden").toggleClass("fade-in-box");
    
  }

// supportList hover effect
// 이 배열에 마우스를 올렸을 때 표시할 문구를 순서대로 입력하세요.
var hoverTexts = [
    "[Java, JavaScript, Jquery, Oracle, Jeus, Linux]", // 1. KBank
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 2. 웰컴저축은행
    "[Java, JavaScript, Oracle, Tomcat, WindowServer]", // 3. IBK캐피탈
    "[Java, JavaScript, Jquery, Oracle, Jeus, Linux]", // 4. IM캐피탈
    "[Java, JavaScript, Jquery, Oracle, Jeus, Linux]", // 5. KB캐피탈
    "[Java, JavaScript, Oracle, Jeus, Linux]", // 6. JB우리캐피탈
    "[Java, JavaScript, Jquery, Oracle, Jeus, Linux]", // 7. KDB산은캐피탈
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 8. 한국주택공사
    "[Java, JavaScript, Oracle, Tomcat, WindowServer]", // 9. 애큐온캐피탈
    "[Java, JavaScript, Jquery, Oracle, Jeus, Linux]", // 10. 법무부
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 11. 부산시청
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 12. 정보자원관리시스템
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 13. 건설근로자공제회
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]", // 14. 한국신용정보보증원
    "[Java, JavaScript, Jquery, Oracle, Tomcat, Linux]"  // 15. 교통안전공단
];

$('.supportList strong').hover(function() {
    // Mouse enter
    var $smallTag = $(this).siblings('small');
    var index = $(this).closest('span').index(); // Get the index of the parent span

    // Store original text if it doesn't exist
    if (!$smallTag.data('original-text')) {
        $smallTag.data('original-text', $smallTag.text());
    }

    // Change to hover text
    if (hoverTexts[index]) {
        $smallTag.text('-> ' + hoverTexts[index]);
    }

}, function() {
    // Mouse leave
    var $smallTag = $(this).siblings('small');
    
    // Restore original text
    if ($smallTag.data('original-text')) {
        $smallTag.text($smallTag.data('original-text'));
    }
});

$(function() {
    $('.btn-filter').on('click', function() {
        var filterValue = $(this).attr('data-filter');

        // Button active state
        $('.btn-filter').removeClass('active');
        $(this).addClass('active');

        if (filterValue === 'all') {
            $('.career_area').show();
            $('.project').show(); 
        } else {
            $('.career_area').hide();
            $('.project').hide();

            $('.career_area').each(function() {
                var techStack = $(this).find('.comment').text().toLowerCase();
                var match = false;
                
                if (filterValue === 'DB') {
                     if (techStack.includes('mariadb') || 
                         techStack.includes('mysql') || 
                         techStack.includes('oracle') || 
                         techStack.includes('postgresql') || 
                         techStack.includes('db2') || 
                         techStack.includes('redis') || 
                         techStack.includes('tibero')) {
                         match = true;
                     }
                } else {
                    if (techStack.includes(filterValue.toLowerCase())) {
                        match = true;
                    }
                }
                
                if (match) {
                    $(this).show();
                }
            });
        }
    });
});

/* 타이핑 이펙트 */
$(function() {
    var textList = [
        "사용자 중심의 관점으로 문제를 해결하는 개발자",
        "팀원들과의 협력을 통해 가치를 만드는 개발자",
        "끊임없이 배우고 성장하는 개발자 김덕훈입니다."
    ];
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var speed = 100;

    function type() {
        var currentText = textList[textIndex];
        var displayText = isDeleting 
            ? currentText.substring(0, charIndex--) 
            : currentText.substring(0, charIndex++);

        $('#typing-text').text(displayText);

        if (!isDeleting && charIndex > currentText.length) {
            isDeleting = true;
            speed = 2000; // Wait before deleting
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textList.length;
            charIndex = 0;
            speed = 500;
        } else {
            speed = isDeleting ? 50 : 100;
        }

        setTimeout(type, speed);
    }

    type();
});
