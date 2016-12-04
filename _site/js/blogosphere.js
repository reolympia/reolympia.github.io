$(document).ready(function($) {

	//bloggers
	var rssURL = 'https://reolympia.herokuapp.com';
	$('.bloggers').html('<tr><td><i class="fa fa-refresh fa-spin fa-fw"></i><span class="sr-only">Loading...</span>Loading...</td><td></td></tr>');
	$.getJSON( rssURL, function foo(data) {
		$('.bloggers').html('');
		$.each(data, function (i, post) {
			var regex = / \d\d:.*/;
			var date = post.pubDate[0].replace(regex, "");
		    $('.bloggers').append('<tr class="clickable-row" data-href="'+post.link[0]+'" style="cursor:pointer"><td style="word-wrap: break-word; overflow: hidden; white-space: pre-wrap;">'+post.title[0]+'</td><td><span class="text-muted"><small><small>'+date+'</small></small><br></span><span class="label label-default">'+post.rssName+'</span></td></tr>');
		});
	    $(".clickable-row").click(function() {
	        window.document.location = $(this).data("href");
	    });
	});


});