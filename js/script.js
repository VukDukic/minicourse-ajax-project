
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

  var streetviewUrl = 'https://maps.googleapis.com/maps/api/' +
    'streetview?size=600x300&location=' + loc + '';
  $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

  // Update greeting
  $greeting.text("So, you want to live in " + loc + "?");

  //// NYT Article Search Results ////
  var nytimesURL =
    'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +
    $city + '&api-key=d063d63c7bf2373bfd5f718418f6e128:0:62722835';

  // AJAX Request
  $.getJSON(nytimesURL, function (data) {
    console.log(data);
    // Update NYT Header
    $nytHeaderElem.text("New York Times Articles About " + $city);
    // Declare data object pieces
    var articles = data.response.docs;
    var numArticles = articles.length;
    var webUrl;
    var snippet;
    var headline;

    // Declare list item
    var item;

    // Iterate response
    for (var i = 0; i < numArticles; i++) {
      webUrl = articles[i].web_url;
      snippet = articles[i].snippet;
      // Prevent null result from showing
      if (snippet === null){snippet = "Click to view article";}
      headline = articles[i].headline.main;
      item = "<li class='article'>" + "<a href='" + webUrl +
        "'>" + headline + "</a><p>" + snippet + "</p></li>";
      $nytElem.append(item);
    }
  }).error(function(e){
    console.log(e);
    // Update NYT Header
    $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
  });

  //// Relevant Wikipedia Articles ////
  var wikiUrl = 'https://en.wikiASDFpedia.org/w/api.php?action=opensearch' +
    '&search=' + $city + '&format=json&callback=wikicallback';

  // AJAX Request
  $.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    success: function (response) {
      console.log(response);
      // Declare data object pieces
      var articles = response[1];
      var numArticles = articles.length;
      var webUrl = response[3];
      // Declare list item
      var item;

      // Iterate response
      for (var i = 0; i < numArticles; i++) {
        item = "<li class='article'>" + "<a href='" + webUrl[i] +
          "'>" + articles[i] + "</a></li>";
        $wikiElem.append(item);
      }
    },
    error: function (data, status, error) {
      console.log(error);
      $wikiElem.text('Wikipedia Links Could Not Be Loaded');
    }
  });

  return false;
}

$('#form-container').submit(loadData);

// loadData();