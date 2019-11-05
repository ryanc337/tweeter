$(document).ready(function() {
  
  const $textArea = $(".new-tweet form textarea.input");
  const $counter = $(".new-tweet form span.counter");
  
  $textArea.on("keydown", (function() {
    const $this = $(this);
    if ($this.val().length <= 140) {
      $counter.text($this.val().length);
    } else if ($this.val().length > 140) {
      $counter.text(0 - (($this.val().length) - 140));
    }
  }))
});
