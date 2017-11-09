//addthis share

jQuery(function($) {

	$('body').delegate('.addthisShare','click',function() {

		var data =  $.parseJSON($(this).attr('data'));

		var content = "<div class='addthis_toolbox addthis_default_style addthis_32x32_style' addthis:url='" + data.link + "' addthis:title='" + data.title + "' addthis:description=' ' style='display:none;'> <a class='addthis_button_facebook'></a> <a class='addthis_button_twitter'></a> <a class='addthis_button_google_plusone_share'></a> <a class='addthis_button_tumblr' ></a> <a class='addthis_button_compact'></a></div>";
		
		if(!$(this).parent().next().is(".addthis_toolbox"))
		{
			$(this).parent().after(content);
			addthis.toolbox(".addthis_toolbox");
		}

		$(this).parent().next(".addthis_toolbox").toggle();
	});
});