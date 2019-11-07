// import { create } from "domain";

function createTweetElement(i) {
  const markUp = `<article>
    <div class="icon-holder">
      <img src=${i.user.avatars}>
        <span class="display-name">${i.user.name}</span>
        <span><a>${i.user.handle}</a></span>
    </div>
    <p class="tweet">${i.content["text"]}</p>
      <div class="posted-tweet">
       <p class="time">${Math.round((i.created_at / 1400))} hours ago</p>
       <div class="icons">
          <i class="fas fa-heart"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-flag"></i>
        </div>
      </div>
    </article>`;
  return markUp;
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
      alert("Cannot Post empty tweet");
      } else if ($("form").serialize().length - 5 > 140) {
        alert("Cannot Post Tweet over 140 characters");
      } else {
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
});



// $(function() {
//   const $button = $('#load-more-posts');
//   $button.on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
