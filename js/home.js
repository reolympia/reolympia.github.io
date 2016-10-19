


// Get local news from The Olympian
var theOlympianURL = 'http://www.theolympian.com/news/local/?widgetName=rssfeed&widgetContentId=712015';
var idxa = 1;
$.get(theOlympianURL, function (data) {
    $(data).find("item").each(function () { // or "item" or whatever suits your feed
        var el = $(this);
        var story = new Object();

        story.title = el.find("title").text();
        story.link = el.find("guid").text();
        story.date = el.find("pubDate").text();
		story.desc = el.find("description").contents();
		story.desc = story.desc[0].textContent;
		story.desc = story.desc.replace('[CDATA[','');
		story.desc = story.desc.replace(/<a href.*/, '');
	    $('.theOlympian').append('<a href="'+story.link+'" class="list-group-item">'+story.title+'</a>');
		idxa++;
		if (idxa > 5) {
			return false; // limit to 5 stories
		}
        // console.log("------------------------");
        // console.log("title      : " + el.find("title").text());
        // console.log("link     : " + el.find("guid").text());
        // console.log("pubDate     : " + el.find("pubDate").text());
    });
});


// Get /r/Olympia
var redditURL = 'https://www.reddit.com/r/olympia/new.json';
var idxb = 1;

$.getJSON( redditURL, function foo(data) {
	$.each(data.data.children.slice(0, 10), function (i, post) {
	    $('.reddit').append('<a href="http://reddit.com'+post.data.permalink+'" class="list-group-item">'+post.data.title+'</a>');
		idxb++;
		if (idxb > 5) {
			return false; // limit to 5 stories
		}
		// $("#reddit").append( '<a href="'+post.data.url+'"">'+post.data.title+'</a><br>');
		// post.data.ups, post.data.downs
	});
});

// Setup twitter widget
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));


// Get City of Olympia News
var rssURL = 'http://rss2json.com/api.json?rss_url=http%3A%2F%2Folympiawa.gov%2FRSS%2Fnews-releases.aspx';
var idxc = 1;
$.getJSON( rssURL, function foo(data) {
	$.each(data.items, function (i, post) {
		var title = post.link.replace('http://olympiawa.gov/news-and-faq-s/news-releases/', '');
		title = title.replace('.aspx', '');
		title = title.replace('-', ' ');
	    $('.cityNews').append('<a href="'+post.link+'" class="list-group-item">'+title+'</a>');
		idxc++;
		if (idxc > 5) {
			return false; // limit to 5 stories
		}
	});
});

// Get Thurston Talk
var rssURL = 'http://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.thurstontalk.com%2Ffeed%2F';
var idxd = 1;
$.getJSON( rssURL, function foo(data) {
	$.each(data.items, function (i, post) {
	    $('.thurstonTalk').append('<a href="'+post.link+'" class="list-group-item">'+post.title+'</a>');
		idxd++;
		if (idxd > 5) {
			return false; // limit to 5 stories
		}
	});
});