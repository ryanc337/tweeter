// import { create } from "domain";

const escaped =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(i) {
  const markup = `<article>
              <div class="icon-holder">
                <img src=${i.user.avatars}>
                  <span class="display-name">${escaped(i.user.name)}</span>
                  <span><a>${escaped(i.user.handle)}</a></span>
              </div>
              <p class="tweet">${escaped(i.content["text"])}</p>
                <div class="posted-tweet">
                  <p class="time">${new Date(i.created_at).toLocaleTimeString("en-US")}</p>
                  <div class="icons">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-flag"></i>
                  </div>
                </div>
              </article>`;
  return markup;
}

const renderTweets = function(tweets) {
  // loops through tweets
  let $tweet = undefined;
  for (const i of tweets) {
    $tweet = createTweetElement(i);
    $('#tweet-container').append($tweet);
  }
};

$("document").ready(function() {
  $(".error-message").hide();
  $("form").hide();
  // POST TWEET
  $("form").submit((event) => {
    console.log($("form"));
    event.preventDefault();
    if ($("form").serialize() === "text=") {
      $(".error").html("<span>You Cannot Tweet Nothing!</span>")
      $(".error-message").show(100);
      } 
      if ($("form").serialize().length - 5 > 140) {
        $(".error").html("<span>This Tweet is too Long, You're not that interesting!</span>");
        $(".error-message").show(100);
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets/",
          data: $("form").serialize(),
        })
          .done((data) => {
            $("#tweet-container").empty()
            loadTweets();
            $(".error-message").hide();
          })
          .fail((err) => {
            console.log(err);
          }); 
      }
  });

  // GET TWEETS 
  function loadTweets() {
    $.ajax("/tweets/", { method: "GET" })
    .then((data) => {
      renderTweets(data);
    })
  }

loadTweets();
$("#down-arrow").click(() => { 
  if ($("form").is(":visible")) {
    $("form").slideUp("slow", () => {
      //animation complete;
    })
  } else {
    $("form").slideDown("slow", () => {
      //animation complete;
    })
  }
});


})
