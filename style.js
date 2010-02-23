// css constants
var colors = { nav: {
                 bg: '#ace'
		,over: '#89b'
		}
	     }



// helper methods

function showContent(content) {
  $('.contentDiv:not('+content+')').hide();
  $(content).show();
}



// properties set after document loaded:
$(function() {

/* Nav Bar */

$('#navBar ul li').bind('click',
  function(e) {
    showContent('#'+e.target.id.replace('nav','content'));
  }
);

$('#navBar ul li').bind('mouseover',
  function(e) {
    $(e.target).css('background',colors.nav.over);
  }
);

$('#navBar ul li').bind('mouseleave',
  function(e) {
    $(e.target).css('background',colors.nav.bg);
  }
);


/* Browser */

$('#homelink').click(
  function(e) {
    callBrowseAPI(homelink);
  }
);
$('#backlink').click(
  function(e) {
    if (APICalls.length > 0 && APIPos > 0) {
      APIPos--; // one gets added on call
      callBrowseAPI(APICalls[APIPos],true);
    }
  }
);
$('#refreshlink').click(
  function(e) {
    if (APICalls.length > 0 && APIPos > 0) {
      callBrowseAPI(APICalls[APIPos],true);
    }
  }
);
$('#fwdlink').click(
  function(e) {
    if (APICalls.length > 0 && APIPos > 0) {
      if (APIPos+1 < APICalls.length)
        callBrowseAPI(APICalls[++APIPos],true);
    }
  }
);


$('#browseBodyDiv div').live('mouseover',
  function(e) {
    var me = e.target;
    while ($(me).parents('.instanceNode').length>0) me=$(me).parent()[0];
    $(me).css('background','#eea');
  }
);

$('#browseBodyDiv div').live('mouseout',
  function(e) {
    var me = e.target;
    while ($(me).parents('.instanceNode').length>0) me=$(me).parent()[0];
    $(me).css('background','#eee');
  }
);

var service = homelink;
var i = window.location.toString().indexOf('apiurl=');
if (0 <= i) {
  service = unescape(window.location.toString().substring(i+7));
  service += '&jsoncallback=?';
}
callBrowseAPI(service);

$('#navBrowse').click();
$('#homelink').click();

});
