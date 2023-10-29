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
  