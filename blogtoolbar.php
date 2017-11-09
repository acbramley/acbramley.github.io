<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css">
<link rel="stylesheet" type="text/css" href="css/toolbar.css">
<script src="js/jquery-1.10.2.min.js"></script>

<div id="toolbar-panel">
	<a href="https://www.podbean.com?sourceid=navbar_logo" class="podbean-logo pb-pc-logo" target="_blank">
    <img src="/images/toolbar/logo-img2.png" width="88" height="33" border="0">
 </a>

 <div class="podbean-logo pb-mobile-logo">
    <a class="pb-logo-sm" href="https://www.podbean.com?sourceid=navbar_logo" target="_blank">
        <img src="/images/toolbar/logo.png" border="0" width="30" height="auto">
    </a>
                <a class="create-btn" target="_blank" href="https://www.podbean.com/site/user/register?sourceid=navbar_pub">Create Podcast</a>
            </div>

  <div class="nav-left">
     <form id="search-form" class="form-search" method="get">
        <input type="text" class="input-medium search-query"  placeholder="Search Podcast">
     </form>
  </div>

  <div class="user-block">
          <div class="nav-right hidden-phone">
                  <a class="signin btn" target="_blank" href="https://www.podbean.com/site/user/login">Sign in</a>
          <a class="create btn" target="_blank" href="https://www.podbean.com/site/user/register?sourceid=navbar_pub">Create Podcast</a>
              </div>


      </div>
</div>

<script type="text/javascript">
    $('#toolbar-panel #search-form').submit(function(){
      var link = "https://www.podbean.com/site/search/index/?sourceid=navbar_search&v="+$('#search-form input').val();
      window.open(link);
      return false;
    });
</script>
