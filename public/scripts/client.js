/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// to sanitize the input from the user
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// creates a html section to append with values from the intial-tweets.json
const createTweetElement = function(tweetObject) {



  const $tweet = $(`<article>
  <header class="tweet-header">
  <div class="pic-name">
  <img src= ${tweetObject.user.avatars}>
  <p>${tweetObject.user.name}</p>
  </div>
  <div class="handle">
  <span>${tweetObject.user.handle}</span>
  </div>
  </header>
  <div>
  <p class= "main-message">${escape(tweetObject.content.text)}</p>
    </div>
    <hr>
    <footer>
    <div class="days-ago">
    <p>${new Date(tweetObject.created_at)}</p>
    </div>  
    <div class="icons">  
    <span><i class="fas fa-flag"></i></span>
    <span><i class="fas fa-retweet"></i></span>
    <span><i class="fas fa-heart"></i></span>
    </div>
    </footer>
    </article>`);

  return $tweet;
};

//renders the tweets
const renderTweets = function(tweets) {
  for (let tweet of tweets) {

    $('.tweets-container').append(createTweetElement(tweet));
  }

};

//to start all the functions after the DOM has loaded
$(document).ready(function() {
  console.log("DOM has loaded from client.js");
  //to get the tweets from the database via ajax request
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(content) {
        console.log('Success: ', content);
        renderTweets(content);
      });

  };
  loadTweets();
  //to post a new tweet
  $('#form').submit(event => {
    event.preventDefault();
    const count = $('#tweet-text').val().length;
    const data = $('#form').serialize();
    //to check if the tweet is empty or over 140 characters
    if (!count) {
      $('#empty-error').slideDown("slow");
    } else if (count > 140) {
      $('#length-error').slideDown("slow");
    } else {
      $('.new-tweet p').slideUp("slow");
      $.ajax({ method: 'POST', data: data, url: "/tweets" })
        .then(function() {

          $.ajax('/tweets', { method: 'GET' }) //to get the newly posted tweet to put on the top
            .then(function(content) {

              $('.tweets-container').prepend(createTweetElement(content[content.length - 1]));
              $('#tweet-text').val(''); //to empty the text area
              $('.counter').val(140); //to reset the word counter
            });

        });

    }
  });

});



