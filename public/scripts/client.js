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
                  <p class="time">${Math.round((i.created_at / (3.6e+6 * 24)))} days ago</p>
                  <div class="icons">
                    <i class="fas fa-heart"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-flag"></i>
                  </div>
                </div>
              </article>`;
  return markup;
}
$()
const renderTweets = function(tweets) {
  // loops through tweets
  let $tweet = undefined;
  for (const i of tweets) {
    $tweet = createTweetElement(i);
    $('#tweet-container').append($tweet);
  }
};

$("document").ready(function() {
  // POST TWEET
  $("form").submit((event) => {
    console.log($("form"));
    event.preventDefault();
    if ($("form").serialize() === "text=") {
      $(".error").html("<span>You Cannot Tweet Nothing!</span>")
      $(".error-message").show();
      } else if ($("form").serialize().length - 5 > 140) {
        $(".error").html("<span>This Tweet is too Long, You're not that intersting!</span>");
        $(".error-message").show(100);
      } else {
        $(".error-message").hide();
        $.ajax({
          type: "POST",
          url: "/tweets/",
          data: $("form").serialize(),
        })
          .done((data) => {
            $("#tweet-container").empty()

            loadTweets();
            console.log("sucess");
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

$(".error-message").hide();
})



// $(function() {
//   const $button = $('#load-more-posts');
//   $button.on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
