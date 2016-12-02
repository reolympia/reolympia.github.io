var dev = false;

// https://rss2json.com/api.json?rss_url=http%3A%2F%2Fcapitolympia.tumblr.com%2Frss
// https://rss2json.com/api.json?rss_url=http%3A%2F%2Folyblog.net%2Frss.xml
// https://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.olympiatime.com%2Ffeeds%2Fposts%2Fdefault%3Falt%3Drss
// https://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.olysketcher.com%2Ffeeds%2Fposts%2Fdefault%3Falt%3Drss
// https://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.olympiapoprocks.com%2Fopr-blog%3Fformat%3DRSS
// https://rss2json.com/api.json?rss_url=https%3A%2F%2Fwriterobwrite.com%2Ffeed%2F
// https://rss2json.com/api.json?rss_url=http%3A%2F%2Fkenbalsley.com%2Ffeed%2F



// http://capitolympia.tumblr.com/rss
// http://olyblog.net/rss.xml
// http://www.olympiatime.com/feeds/posts/default?alt=rss
// http://www.olysketcher.com/feeds/posts/default?alt=rss
// http://www.olympiapoprocks.com/opr-blog?format=RSS
// https://writerobwrite.com/feed/
// http://kenbalsley.com/feed/


if (!dev) {

	// Get local news from The Olympian
	var theOlympianURL = 'https://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.theolympian.com%2Fnews%2Flocal%2F%3FwidgetName%3Drssfeed%26widgetContentId%3D712015';
	$.get(theOlympianURL, function (data) {
	    $(data.items.slice(0,5)).each(function (i, post) { // or "item" or whatever suits your feed
	        var el = $(this);
	        var story = new Object();
		    $('.theOlympian').append('<a href="'+post.link+'" class="list-group-item">'+post.title+'</a>');
	    });
	});


	// Get Reddit
	function compare_created_date(a,b) {
	  if (a.created < b.created)
	    return 1;
	  if (a.created > b.created)
	    return -1;
	  return 0;
	}

	$.when(
	    $.getJSON('https://www.reddit.com/r/olympia/new.json'),
	    $.getJSON('https://www.reddit.com/r/olyjobs/new.json'),
	    $.getJSON('https://www.reddit.com/r/evergreen/new.json'),
	    $.getJSON('https://www.reddit.com/r/Lacey/new.json')
	).then(function (r1, r2, r3, r4) {
		// after data comes back from 4 different subs, jam them together, then sort by date then publish
		var stories = new Array();
		var rawReddit = [r1, r2, r3, r4];

		$(rawReddit).each(function (i, subreddit) {
			var obj = JSON.parse(subreddit[2].responseText);
			var posts = obj.data.children.slice(0,5);
			$(posts).each(function (idx,post) {
				var story = {
					created: post.data.created,
					title: post.data.title,
					subreddit: post.data.subreddit,
					permalink: post.data.permalink,
					url: post.data.url,
					score: post.data.score
				};
				stories.push(story);
			});
		});
		stories.sort(compare_created_date);
		$.each(stories.slice(0, 5), function (i, post) {
		    $('.reddit').append('<a href="http://reddit.com'+post.permalink+'" class="list-group-item" style="width: 100%; display: inline-block; word-wrap: break-word;">'+post.title+'<span class="label label-default pull-right" style="">/r/'+post.subreddit+'</span></a> ');
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
	// var rssURL = 'https://rss2json.com/api.json?rss_url=http%3A%2F%2Folympiawa.gov%2FRSS%2Fnews-releases.aspx';
	var rssURL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeedity.com%2Folympiawa-gov%2FW1tVW1NR.rss';
	$.getJSON( rssURL, function foo(data) {
		var stories = data.items.reverse();
		$.each(stories, function (i, post) {

			// var title = post.link.replace('http://olympiawa.gov/news-and-faq-s/news-releases/', '');
			// title = title.replace('.aspx', '');
			// title = title.replace('-', ' ');
		    // $('.cityNews').append('<a href="'+post.link+'" class="list-group-item">'+title+'</a>');
		   	$('.cityNews').append('<a href="'+post.guid+'" class="list-group-item">'+post.title+'</a>');
			if (i > 3) {
				return false; // limit to 5 stories
			}
		});
	});

	// Get Thurston Talk
	var rssURL = 'https://rss2json.com/api.json?rss_url=http%3A%2F%2Fwww.thurstontalk.com%2Ffeed%2F';
	$.getJSON( rssURL, function foo(data) {
		$.each(data.items.slice(0,5), function (i, post) {
		    $('.thurstonTalk').append('<a href="'+post.link+'" class="list-group-item">'+post.title+'</a>');
		});
	});

	// Inspections
	var rssURL = 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.theolympian.com%2Fliving%2Ffood-drink%2F%3FwidgetName%3Drssfeed%26widgetContentId%3D23920939%26getXmlFeed%3Dtrue';
	$.getJSON( rssURL, function foo(data) {
		$.each(data.items.slice(0,5), function (i, post) {
			if (post.title.startsWith("Restaurant inspection")) {
		   		$('.healthreview').append('<a href="'+post.link+'" class="list-group-item">'+post.title+'</a>');
			}
		});
	});	


	// Get weather
	$.ajax({
	    url : "https://api.wunderground.com/api/5bdfb82dd593406e/conditions/q/pws:KWAOLYMP73.json",
	    dataType : "jsonp",
	    success : function(parsed_json) {
	        var temp = parsed_json['current_observation']['temp_f'];
	        var icon = parsed_json['current_observation']['icon_url'];
	        var iconName = parsed_json['current_observation']['weather'];
	        var winddir = parsed_json['current_observation']['wind_dir'];
	        var windspeed = parsed_json['current_observation']['wind_mph'];
	        var dew = parsed_json['current_observation']['dewpoint_f'];
	        var hum = parsed_json['current_observation']['relative_humidity'];
	        var rainrate = parsed_json['current_observation']['precip_1hr_in'];
	        var rainaccum = parsed_json['current_observation']['precip_today_in'];
	        var pressure = parsed_json['current_observation']['pressure_in'];
	        var uv = parsed_json['current_observation']['UV'];
	        var vis = parsed_json['current_observation']['visibility_mi'];
	        var forecast = parsed_json['current_observation']['forecast_url'];
	        var obtime = parsed_json['current_observation']['observation_time'];
	        $('#temp').html(temp + "&deg; F");
	        $('#icon').html(iconName+" <img src='"+icon+"'>");
	        $('#winddir').html(winddir);
	        $('#windspeed').html(windspeed + " mph");
	        $('#dew').html(dew + "&deg; F");
	        $('#hum').html(hum);
	        $('#rainrate').html(rainrate + "\" last 1 hr");
	        $('#rainaccum').html(rainaccum + "\" last 24 hrs");
	        $('#pressure').html(pressure + " in.");
	        $('#uv').html(uv);
	        $('#vis').html(vis+" mi.");
	        $('#forecast').html("<a href='"+forecast+"'>Forecast</a>");
	        $('#obtime').html(obtime);
	    }
	});




}
