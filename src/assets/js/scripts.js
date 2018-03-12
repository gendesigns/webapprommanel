$('.nextBtn').click(function(){
    next_fs = $(this).parents('.step-tab').next();
    next_radio_nm = "quiz_" + $(this).parents('.step-tab').attr('id');
    alert = "#alert_" + $(this).parents('.step-tab').attr('id');
    if($("input[name='"+next_radio_nm+"']").is(":checked")) {
        $('.step-tab').hide();
        $(alert).hide();
        next_fs.show(); 
        return false;
    } else{
        $(alert).show();
    }
});

$('.prevBtn').click(function(){
    prev_fs = $(this).parents('.step-tab').prev();
    $('.step-tab').hide();
    prev_fs.show(); 
    return false;

    $('.step-content .alert').hide();
});