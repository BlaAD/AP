(function($){
      // scroll to top after banner is added by Templated core JS
      // if url contains no hash
      // if url contains hash, then look for video and scroll to that video
      var intervaled = setInterval(function(){
          if(_isBannerAdded())
          {
              if (!_isHashed())
              {
                  _scrollTo(0,0);
              }
              else {
                  var videoTitle = _getVideoNameFromUrlHash();
                  var video = $('.video[data-title=' + videoTitle + ']');
                  if (video.length)
                  {
                    _handleIFrameUrlAndScrollToIt($(video).data('youtube'), videoTitle, 800);
                  }
              }
              clearInterval(intervaled);
          }
    });

    // scroll to the screen when youtube thumbnail is clicked
    $('.video.col').on('click', function(){
        var video = $(this).parent('.video');
        _handleIFrameUrlAndScrollToIt($(this).data('youtube'), $(this).data('title'));
    });

    // get hash from url and strip out #
    function _getVideoNameFromUrlHash()
    {
      return window.location.hash.split('#').join('');
    }

    // handle changing video in iframe video screen and scrolling to it
    function _handleIFrameUrlAndScrollToIt(youtubeUrl, title, scrollSpeed)
    {
        scrollSpeed = scrollSpeed || 0;

        youtubeUrl += '?autoplay=1';
        var screen = $('#video.screen');
        var iframe = $(screen).find('iframe');

        var screenOffset = $(screen).offset().top;

        if ($(iframe).attr('src') === youtubeUrl)
        {
            _scrollToScreen();
            return;
        }

        $(iframe).attr('src', youtubeUrl);
        $(iframe).on('load', function(){
            _scrollToScreen(scrollSpeed);
            window.location.hash = title
            $(this).off('load');
        });
    }

    // mute, pause, unpause when window is scrolled
    $(window).scroll(function(){
        var elem = $("#banner");
        var video = $(elem).find("video")[0];

        if (undefined !== video)
        {
          $(video).prop('muted', true);
          if(!isElementVisible(elem))
          {
              video.pause();
          }else {
              video.play();
          }
        }
    });

    // scroll to iframe screen
    function _scrollToScreen(scrollSpeed)
    {
      scrollSpeed = scrollSpeed || 0;
      var offset = $('#video.screen').offset().top;
      _scrollTo(offset, scrollSpeed);
    }

    // check if url contains hash and return respectively true or false
    function _isHashed()
    {
      return (window.location.hash !== "");
    }

    // Video banner is added dynamically by javascript so scrolling to the top on
    // document ready or any other event does not work as until then the js's not
    // appended banner in DOM. Templated script gives a way to find that by inpecting
    // class in body which is removed after the banner is added to the DOM.
    function _isBannerAdded()
    {
      return !($('body').hasClass('is-loading'));
    }

    // Scroll to an offset with a animation speed
    function _scrollTo(offset, speed)
    {
      $('html, body').animate({
        scrollTop: offset
      }, speed);
    }

    // checks if an element is completely visible in the screen
    function isElementVisible(element, fullyInView) {
      var pageTop = $(window).scrollTop();
      var pageBottom = pageTop + $(window).height();
      var elementTop = $(element).offset().top;
      var elementBottom = elementTop + $(element).height();

      if (fullyInView === true) {
          return ((pageTop < elementTop) && (pageBottom > elementBottom));
      } else {
          return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
      }
    }
})(jQuery);

/* Open when someone clicks on the span element */
function openNav() {
  event.stopPropagation();
  jQuery("body").addClass('overlayed');
  var overlay = event.target.parentNode.parentNode.nextElementSibling;
  overlay.style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  event.stopPropagation();
  jQuery("body").removeClass('overlayed');
  var overlay = event.target.parentNode;
  overlay.style.width = "0%";
}
