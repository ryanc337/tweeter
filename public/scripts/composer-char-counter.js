$(document).ready(function() {
  
  const $textArea = $(".new-tweet form textarea.input");
  const $counter = $(".new-tweet form span.counter");
  
  $textArea.on("keyup", (function() {
    const $this = $(this);
    if ((140 - ($this.val().length) >= 0)) {
      $counter.css("color", "black");
      $counter.text(140 - ($this.val().length));
    } else {
      $counter.css("color", "red");
      $counter.text(140 - ($this.val().length));
    }
     
  }))
});
