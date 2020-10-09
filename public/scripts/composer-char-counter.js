$(document).ready(function() {
  console.log("DOM has loaded")  
  
  $("#tweet-text").on("input", function () {
    //  $(".counter").val(140 - this.value.length) ;
    const $counter = $(this).parent().find("output.counter");
    $counter.val(140-this.value.length);
    if($counter.val() < 0){
      $counter.addClass("negative");
    } else {
      $counter.removeClass("negative")
    }
  
  });


});



 