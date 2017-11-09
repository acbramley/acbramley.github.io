//addthis share

jQuery(function($) {

    $('body').delegate('.addthisShareV1','click',function() {

        // var data =  $.parseJSON($(this).attr('data'));

        // var content = "<div class='addthis_toolbox addthis_default_style addthis_32x32_style' addthis:url='" + data.link + "' addthis:title='" + data.title + "' addthis:description=' ' style='display:none;'> <a class='addthis_button_facebook'></a> <a class='addthis_button_twitter'></a> <a class='addthis_button_google_plusone_share'></a> <a class='addthis_button_tumblr' ></a> <a class='addthis_button_compact'></a></div>";
        
        // if(!$(this).parent().next().is(".addthis_toolbox"))
        // {
        //  $(this).parent().after(content);
        //  addthis.toolbox(".addthis_toolbox");
        // }

        // $(this).parent().next(".addthis_toolbox").toggle();
        var tpl = $('#shareModalTpl').html();
        $('#shareModal').html(tpl);
        var data =  $.parseJSON($(this).attr('data'));
        var content = "<div class='addthis_toolbox addthis_default_style addthis_32x32_style' addthis:url='" + data.link + "' addthis:title='" + data.title + "' addthis:description=' '> <a class='addthis_button_facebook'></a> <a class='addthis_button_twitter'></a> <a class='addthis_button_google_plusone_share'></a> <a class='addthis_button_tumblr' ></a> <a class='addthis_button_compact'></a></div>";
        $('#shareModal .addthis_toolbox').remove();
        $('#shareModal .social').after(content);
        $('#shareModal .share-link-input').val(data.link);
        addthis.toolbox(".addthis_toolbox");

        $('#shareModal .share-table li').attr('data-share',$(this).attr('id'));
        
        if(data.slug=='antitrustlawsource'){
            $('#shareModal #antitrustlawsource-theme').show();
        }else{
            $('#shareModal #antitrustlawsource-theme').hide();
        }

        if(data.support_embed=='0'){
            $('#shareModal .tab3-li').remove();
            $('#shareModal .tab2-li').remove();
        }else{
            if(data.file_type == 'audio'){
                $('#shareModal .tab2-li').show();
                $('#shareModal .tab3-li').hide();
                
            }else{
                $('#shareModal .tab2-li').hide();
                $('#shareModal .tab3-li').show();
            }
        }

        $('#iframe-block').css('z-index','99999');
        $('#share-backdrop').show();
        $('#shareModal').show();
        $('body').css('overflow','hidden');
        // var modal = $('#shareModal');
        // modal.modal("show");
  
    });

    $('body').delegate('#shareModal .tab-li a','click',function()
    {
        var share_id = $(this).parents('li').attr('data-share');
        var data =  $.parseJSON($('#'+share_id).attr('data'));

        var wp_domain = '';
        if(data.wp_domain){
            wp_domain = 'domain='+data.wp_domain;
        }

        if(data.file_type == 'audio'){
            $('#shareModal #tab2 .episode-logo').attr('src',data.logo);

            var audio_style1_embed = '<iframe src="'+data.player_link+'?from=site&vjs=1&skin=1&fonts=Helvetica&auto=0&download=0" height="315" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
            var audio_style1_wp_embed = '[podbean type=audio-square resource="episode='+data.wp_source+'" skin="1" auto="0" height=315 '+wp_domain+']';
            $('#shareModal #audio-embed-code').val(audio_style1_embed);
            $('#shareModal #audio-iframe-box').html(audio_style1_embed);
            $('#shareModal #audio-iframe-box').attr('data-link',data.player_link);
            $('#shareModal #audio-iframe-box').attr('data-wp-code',data.wp_source);
            $('#shareModal #audio-iframe-box').attr('data-wp-domain',wp_domain);
            $('#shareModal #audio-wp-embed-code').val(audio_style1_wp_embed);

            var audio_style2_embed = '<iframe src="'+data.player_link+'?from=site&skin=1&share=1&fonts=Helvetica&auto=0&download=0" height="100" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
            var audio_style2_wp_embed = '[podbean type=audio-rectangle resource="episode='+data.wp_source+'" skin="1" auto="0" height=100 '+wp_domain+']';
            $('#shareModal #audio-embed-code1').val(audio_style2_embed);
            $('#shareModal #audio-iframe-box1').html(audio_style2_embed);
            $('#shareModal #audio-iframe-box1').attr('data-link',data.player_link);
            $('#shareModal #audio-iframe-box1').attr('data-wp-code',data.wp_source);
            $('#shareModal #audio-iframe-box1').attr('data-wp-domain',wp_domain);
            $('#shareModal #audio-wp-embed-code1').val(audio_style2_wp_embed);

        }else{
            var video_embed = '<iframe id="video_iframe" src="'+data.player_link+'?from=site&vjs=1&width=100%&height=315&fonts=Helvetica&auto=0&download=0&skin=0" width="100%" height="315" frameborder="0" scrolling="no" allowfullscreen=""></iframe>'
            var video_wp_embed = '[podbean type=video resource="episode='+data.wp_source+'" skin="0" auto="0" height=315 '+wp_domain+']';
            $('#shareModal #video-embed-code').val(video_embed);
            $('#shareModal #video-iframe-box').html(video_embed);
            $('#shareModal #video-iframe-box').attr('data-link',data.player_link);
            $('#shareModal #video-iframe-box').attr('data-wp-code',data.wp_source);
            $('#shareModal #video-iframe-box').attr('data-wp-domain',wp_domain);
            $('#shareModal #video-wp-embed-code').val(video_wp_embed);
        }
    });

    $('body').delegate('#tab3 .ul-skins a[data-skin]','click',function(event) 
    {
      var skinIndex = $(this).attr('data-skin');

      var iframe_box = $('#audio-iframe-box');

      var iframe = iframe_box.find('iframe');

      var btnskin = null;
      var is_btn = $(this).parents('.ul-button').length>0;
      if(is_btn){
          btnskin = skinIndex;
          skinIndex = $(this).parents('.ul-skins').not('.ul-button').find('a.current').attr('data-skin');
          $(this).parents('.ul-button').find('a.current').removeClass('current');
      }else{
          $(this).parents('.ul-skins').not('.ul-button').find('a.current').removeClass('current');
      }

      
      var link = iframe_box.attr('data-link');
      var auto_play = '0';
      if($('#audio-style1-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }

      var params = '?from=site&vjs=1&skin='+skinIndex+'&fonts=Helvetica&auto='+auto_play+'&download=0';
      if(btnskin){
          params+='&btn-skin'+btnskin;
      }

      iframe.attr('src',link+'&'+params);

      var embed_code = '<iframe src="'+link+'&'+params+'" height="400" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
      $('#audio-embed-code').val(embed_code);

      var wp_code = iframe_box.attr('data-wp-code');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var wp_embed = '[podbean type=audio-square resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height=315 '+wp_domain+']';
      $('#shareModal #audio-wp-embed-code').val(wp_embed);
      $(this).parents('.ul-skins').find('a.current').removeClass('current');
      
      $(this).addClass('current');
    });

    $('body').delegate('#audio-style1-checkbox','click',function(event) 
    {
      var skinIndex = $('#tab3 .ul-skins a.current').attr('data-skin');

      var iframe_box = $('#audio-iframe-box');

      var iframe = iframe_box.find('iframe');
      
      var link = iframe_box.attr('data-link');
      var auto_play = '0';

      if($('#audio-style1-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }

      var params = '?from=site&vjs=1&skin='+skinIndex+'&fonts=Helvetica&auto='+auto_play+'&download=0';

      iframe.attr('src',link+'&'+params);

      var embed_code = '<iframe src="'+link+'&'+params+'" height="315" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
      $('#audio-embed-code').val(embed_code);

      var wp_code = iframe_box.attr('data-wp-code');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var wp_embed = '[podbean type=audio-square resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height=315 '+wp_domain+']';
      $('#shareModal #audio-wp-embed-code').val(wp_embed);

    });

    $('body').delegate('#tab4 .ul-skins a[data-skin]','click',function(event) 
    {
      var skinIndex = $(this).attr('data-skin');

      var iframe_box = $('#audio-iframe-box1');

      var iframe = iframe_box.find('iframe');
      
      var link = iframe_box.attr('data-link');
      var auto_play = '0';
      if($('#audio-style2-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }

        var btnskin = null;
        var is_btn = $(this).parents('.ul-button').length>0;
        if(is_btn){
            btnskin = skinIndex;
            skinIndex = $(this).parents('.more-opt-box').find('.ul-skins').not('.ul-button').find('a.current').attr('data-skin');
        }else{
            btnskin = $(this).parents('.more-opt-box').find('.ul-button').find('a.current').attr('data-skin');
        }
                     
      var params = '?from=site&skin='+skinIndex+'&fonts=Helvetica&auto='+auto_play+'&download=0&share=1';
      params+='&btn-skin='+btnskin;

      iframe.attr('src',link+'&'+params);
                                            
      var embed_code = '<iframe src="'+link+'&'+params+'" height="100" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
      $('#audio-embed-code1').val(embed_code);

      var wp_code = iframe_box.attr('data-wp-code');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var wp_embed = '[podbean type=audio-rectangle btn-skin='+btnskin+' resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height=100 '+wp_domain+']';
      $('#shareModal #audio-wp-embed-code1').val(wp_embed);

      // $('#tab4 .ul-skins').find('a.current').removeClass('current');
        $(this).parents('.ul-skins').find('a.current').removeClass('current');
      
      $(this).addClass('current');
    });

    $('body').delegate('#audio-style2-checkbox','click',function(event) 
    {
      var skinIndex = $('#tab4 .ul-skins a.current').attr('data-skin');

      var iframe_box = $('#audio-iframe-box1');

      var iframe = iframe_box.find('iframe');
      
      var link = iframe_box.attr('data-link');
      var auto_play = '0';
      if($('#audio-style2-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }
                     
      var params = '?from=site&skin='+skinIndex+'&fonts=Helvetica&auto='+auto_play+'&download=0&share=1';

      iframe.attr('src',link+'&'+params);
                                            
      var embed_code = '<iframe src="'+link+'&'+params+'" height="100" width="100%" frameborder="0" scrolling="no" data-name="pb-iframe-player"></iframe>';
      $('#audio-embed-code1').val(embed_code);

      var wp_code = iframe_box.attr('data-wp-code');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var wp_embed = '[podbean type=audio-rectangle resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height=100 '+wp_domain+']';
      $('#shareModal #audio-wp-embed-code1').val(wp_embed);

    });

    $('body').delegate('#shareModal .more-opt-btn','click',function(event) 
    {
        if($(this).next('.more-opt-box:visible').length>0){
            $(this).find('span').text('More options');
            $(this).find('img').attr('src','/wp-content/plugins/pbShare/images/icon-down.png');
            $(this).next('.more-opt-box').hide();
        }else{
            $(this).find('span').text('Fewer options');
            $(this).find('img').attr('src','/wp-content/plugins/pbShare/images/icon-up.png');
            $(this).next('.more-opt-box').show();
        }
    });

    $('body').delegate('#tab5 .ul-skins a[data-skin]','click',function(event) 
    {
      var skinIndex = $(this).attr('data-skin');

      var iframe_box = $('#video-iframe-box');

      var iframe = iframe_box.find('iframe');
      
      var link = iframe_box.attr('data-link');
      
      var auto_play = '0';

      if($('#video-auto-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }

      var video_size_dom = $('#shareModal #video-main');
      
      var size = video_size_dom.find('input[name="size"]:checked').val();
      if(size == 'other'){
        size = video_size_dom.find('input[name="other-size"]').val();
      }

      var params = '?from=site&vjs=1&skin='+skinIndex+'&fonts=Helvetica&width=100%&height='+size+'&auto='+auto_play+'&download=0';

      iframe.attr('src',link+params);

      var embed_code = '<iframe src="'+link+params+'" width="100%" height="'+size+'" frameborder="0" scrolling="no" allowfullscreen=""></iframe>';
      $('#video-embed-code').val(embed_code);

      var wp_code = iframe_box.attr('data-wp-code');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var wp_embed = '[podbean type=video resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height='+size+' '+wp_domain+']';
      $('#shareModal #video-wp-embed-code').val(wp_embed);

      $(this).parents('.ul-skins').find('a.current').removeClass('current');
      
      $(this).addClass('current');
    });

    $('body').delegate('#shareModal #tab5 input[name="size"],#video-auto-checkbox,#save-other-size-btn','click',function(event) 
    {
        var skinIndex = $('#shareModal #tab5 .ul-skins a.current').attr('data-skin');

        var iframe_box = $('#video-iframe-box');

        var iframe = iframe_box.find('iframe');
      
        var link = iframe_box.attr('data-link');
      
        var auto_play = '0';

        if($('#video-auto-checkbox').attr('checked') == 'checked'){
            auto_play = '1';
        }

        var video_size_dom = $('#shareModal #video-main');
      
        var size = video_size_dom.find('input[name="size"]:checked').val();
        if(size == 'other'){
            size = video_size_dom.find('input[name="other-size"]').val();
        }

        var params = '?from=site&vjs=1&skin='+skinIndex+'&fonts=Helvetica&width=100%&height='+size+'&auto='+auto_play+'&download=0';

        iframe.attr('src',link+params);

        var embed_code = '<iframe src="'+link+params+'" width="100%" height="'+size+'" frameborder="0" scrolling="no" allowfullscreen=""></iframe>';
        $('#video-embed-code').val(embed_code);

        var wp_code = iframe_box.attr('data-wp-code');
        var wp_domain = iframe_box.attr('data-wp-domain');
        var wp_embed = '[podbean type=video resource="episode='+wp_code+'" skin="'+skinIndex+'" auto="'+auto_play+'" height='+size+' '+wp_domain+']';
        $('#shareModal #video-wp-embed-code').val(wp_embed);


    });

    $('body').delegate("#blogShareLink",'click',function(){
        var tpl = $('#blogShareModalTpl').html();
        $('#shareModal').html(tpl);
        var data =  $.parseJSON($(this).attr('data'));
        var content = "<div class='addthis_toolbox addthis_default_style addthis_32x32_style' addthis:url='" + data.share_link + "' addthis:title='" + data.title + "' addthis:description=' '> <a class='addthis_button_facebook'></a> <a class='addthis_button_twitter'></a> <a class='addthis_button_google_plusone_share'></a> <a class='addthis_button_tumblr' ></a> <a class='addthis_button_compact'></a></div>";
        $('#shareModal .addthis_toolbox').remove();
        $('#shareModal .social').after(content);
        $('#shareModal .share-link-input').val(data.share_link);
        addthis.toolbox(".addthis_toolbox");

        $('#shareModal .share-table li').attr('data-share',$(this).attr('id'));
        
        $('#iframe-block').css('z-index','99999');
        $('#share-backdrop').show();
        $('#shareModal').show();
        $('body').css('overflow','hidden');
        // var modal = $('#shareModal');
        // modal.modal("show");
    });

    $('body').delegate('#shareModal .tab6-li a','click',function()
    {   
        var share_id = $(this).parents('li').attr('data-share');
        var data =  $.parseJSON($('#'+share_id).attr('data'));
        
        var wp_domain = '';
        if(data.wp_domain){
            wp_domain = 'domain='+data.wp_domain;
        }

        var mulit_embed = '<iframe id="multi_iframe" frameborder="0" scrolling="no" allowfullscreen="" src="'+data.multi_link+'&vjs=1&size=315&share=1&fonts=Helvetica&auto=0&download=0&skin=0" width="100%" height="505"></iframe>';
        var mulit_wp_embed = '[podbean type=multi playlist="'+data.playlist+'" skin=0 auto=0 height=315 '+wp_domain+']';
        $('#shareModal #video-embed-code').val(mulit_embed);
        $('#shareModal #video-iframe-box').html(mulit_embed);
        $('#shareModal #video-iframe-box').attr('data-link',data.multi_link);
        $('#shareModal #video-iframe-box').attr('data-playlist',data.playlist);
        $('#shareModal #video-iframe-box').attr('data-wp-domain',wp_domain);
        $('#shareModal #video-wp-embed-code').val(mulit_wp_embed);
    });

    $('body').delegate('#tab6 .ul-skins a[data-skin]','click',function(event) 
    {
      var skinIndex = $(this).attr('data-skin');

      var iframe_box = $('#video-iframe-box');

      var iframe = iframe_box.find('iframe');
      
      var link = iframe_box.attr('data-link');
      
      var auto_play = '0';

      if($('#video-auto-checkbox').attr('checked') == 'checked'){
        auto_play = '1';
      }

      var video_size_dom = $('#shareModal #video-main');
      
      var size = video_size_dom.find('input[name="size"]:checked').val();
        
        var size1 = parseInt(size)+200;

      var params = '&vjs=1&size='+size+'&share=1&fonts=Helvetica&auto='+auto_play+'&download=0&skin='+skinIndex;

      iframe.attr('src',link+params);

      var embed_code = '<iframe id="multi_iframe" frameborder="0" scrolling="no" allowfullscreen="" src="'+link+params+'" width="100%" height="'+size1+'"></iframe>';
      $('#video-embed-code').val(embed_code);

      var wp_playlist = iframe_box.attr('data-playlist');
      var wp_domain = iframe_box.attr('data-wp-domain');
      var mulit_wp_embed = '[podbean type=multi playlist="'+wp_playlist+'" skin='+skinIndex+' auto='+auto_play+' height='+size+' '+wp_domain+']';
      $('#shareModal #video-wp-embed-code').val(mulit_wp_embed);
      
      $(this).parents('.ul-skins').find('a.current').removeClass('current');
      
      $(this).addClass('current');
    });

    $('body').delegate('#shareModal #tab6 input[name="size"],#multi-auto-checkbox','click',function(event) 
    {
        var skinIndex = $('#shareModal #tab6 .ul-skins a.current').attr('data-skin');

        var iframe_box = $('#video-iframe-box');

        var iframe = iframe_box.find('iframe');
      
        var link = iframe_box.attr('data-link');
      
        var auto_play = '0';

        if($('#multi-auto-checkbox').attr('checked') == 'checked'){
            auto_play = '1';
        }

        var video_size_dom = $('#shareModal #video-main');
      
        var size = video_size_dom.find('input[name="size"]:checked').val();

        var size1 = parseInt(size)+200;

        var params = '&vjs=1&size='+size+'&share=1&fonts=Helvetica&auto='+auto_play+'&download=0&skin='+skinIndex;

        iframe.attr('src',link+params);

        var embed_code = '<iframe id="multi_iframe" frameborder="0" scrolling="no" allowfullscreen="" src="'+link+params+'" width="100%" height="'+size1+'"></iframe>';
        $('#video-embed-code').val(embed_code);

        var wp_playlist = iframe_box.attr('data-playlist');
        var wp_domain = iframe_box.attr('data-wp-domain');
        var mulit_wp_embed = '[podbean type=multi playlist="'+wp_playlist+'" skin='+skinIndex+' auto='+auto_play+' height='+size+' '+wp_domain+']';
        $('#shareModal #video-wp-embed-code').val(mulit_wp_embed);

    });

    $('body').delegate('#shareModal #audio-embed-code,#shareModal #audio-embed-code1,#shareModal .share-link-input,#shareModal #video-embed-code,#shareModal .iframe-code,#shareModal .wp-code','click',function(){
        $(this).select();
    });

    $('body').delegate('#shareModal','click',function(event){
        if($(event.target).is('.modal-body'))
        {
            $('#shareModal .modal-header button').click();
        }
    });

    $('body').delegate('#shareModal .modal-header button','click',function(event){
        $('#shareModal').hide();
        $('#share-backdrop').hide();
        $('body').css('overflow','auto');
        $('#shareModal').html('');
    });

    $('body').delegate('#shareModal .nav-tabs li a','click',function()
    {
        var target_tab_id = $(this).attr('data-href');
        var target_tab = $(target_tab_id);
        target_tab.siblings('.tab-pane').hide();
        target_tab.show();
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parents('li').addClass('active');
    });

    $('body').delegate('#shareModal .wp-checkbox','click',function()
    {
        if($(this).attr('checked')=='checked')
        {
            $(this).parents('.preview-code').find('.iframe-code').hide();
            $(this).parents('.preview-code').find('.wp-code').show();
            $(this).parents('.preview-code').find('.wp-code-desc').show();
        }else{
            $(this).parents('.preview-code').find('.iframe-code').show();
            $(this).parents('.preview-code').find('.wp-code').hide();
            $(this).parents('.preview-code').find('.wp-code-desc').hide();
        }
    });
});