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
  