/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



const createTweetElement = function (tweetObject) {



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

const renderTweets = function (tweets) {
  for (let tweet of tweets) {

    $('.tweets-container').append(createTweetElement(tweet));
  }

};

$(document).ready(function () {
  console.log("DOM has loaded from client.js");

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (content) {
        console.log('Success: ', content);
        renderTweets(content);
      });

  };
  loadTweets();




  $('#form').submit(event => {
    event.preventDefault();
    const count = $('#tweet-text').val().length;
    const data = $('#form').serialize();

    if (!count) {
      $('#empty-error').slideDown("slow");
    } else if (count > 140) {
      $('#length-error').slideDown("slow");
    } else {
      $('.new-tweet p').slideUp("slow");
      $.ajax({ method: 'POST', data: data, url: "/tweets" })
        .then(function () {

          $.ajax('/tweets', { method: 'GET' })
            .then(function (content) {

              $('.tweets-container').prepend(createTweetElement(content[content.length - 1]));
              $('#tweet-text').val('');
              $('.counter').val(140);
            });

        });

    }
  });

});



