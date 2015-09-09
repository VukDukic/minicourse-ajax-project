
function loadData() {

  var $body = $('body');
  var $wikiElem = $('#wikipedia-links');
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');
  var $greeting = $('#greeting');

  // clear out old data before new request
  $wikiElem.text("");
  $nytElem.text("");

  // load streetview
  var $street = $('#street').val();
  var $city = $('#city').val();
  var loc = $street + ', ' + $city;

  // Update greeting
  $greeting.text("So, you want to live in " + loc + "?");

  var streetviewUrl = 'https://maps.googleapis.com/maps/api/' +
    'streetview?size=600x300&location=' + loc + '';
  $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

  // NYT Article Search Results
  // AJAX Request
  $.getJSON(
    'http://api.nytimes.com/svc/search/v2/articlesearch.' +
    'json?q=barack+obama' +
    '&api-key=d063d63c7bf2373bfd5f718418f6e128:0:62722835',
    function (data) {
      console.log(data);

      /*
      var link = ;
      var artHeader = ;
      var firstPara = ;
        $.each( data.response.docs,
          function( key, link, artHeader, firstPara ) {
          articles.push( "<li id='" + key + "' class='article'>" +
            "<a href='" + link + "'>" + artHeader + "</a><p>" +
            firstPara + "</p></li>" );
        });

        $( "<ul/>", {
          "class": "my-new-list",
          html: articles.join( "" )
        }).appendTo( "body" );
      */

      var articles = data.response.docs;
      console.log(articles);
      var numArticles = data.response.docs.length;
      console.log(numArticles);
      // Iterate response
      for (var i = 0; i < numArticles; i++) {
        //$nytElem.text(articles[i]);
        // <ul id="nytimes-articles" class="article-list"></ul>
        console.log("count");
      }
  });



  // Update NYT Header
  $nytHeaderElem.text("Recent New York Times Articles in " + loc);

  return false;
}

$('#form-container').submit(loadData);

// loadData();
