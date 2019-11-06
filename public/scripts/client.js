// import { create } from "domain";

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


function createTweetElement(i) {
  const markUp = ` <article>
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
    </article> `;
    return markUp;
}

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

const renderTweets = function(tweets) {
  // loops through tweets
  let $tweet = undefined;
  for (const i of tweets) {
    $tweet = createTweetElement(i);
    $('#tweet-container').append($tweet);
  }
};
renderTweets(data);

// const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.