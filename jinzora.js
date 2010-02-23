// jinzora API demo

var homelink = jz.catalog;
    homelink += "?output=jsonp&user="+jz.username+"&pass="+jz.password+"&request=home&jsoncallback=?"; // standardize: output => format

  var APIPos = -1;
  var APICalls = new Array();
  function callBrowseAPI(service, skipHistory) { // opt request
    if (!skipHistory) {
      APIPos++;
      APICalls.length = APIPos;
      APICalls.push(service);
    }
    $.getJSON(service,
						 // parametrize this.
        function(data){
          // this syntax works well even for asynchronous results,
	  // where the size of data is not stable.
	  // We probably have to change this outer function to
	  // be intended for a single item from a list of items.
	  // compare speed with array iteration
          $('#browseBodyDiv').empty();

	  if (data.tracks && data.tracks.length > 0) {
  	    $.each(data.tracks, function(i,item){
	     	var html = '<div class="instanceNode"><a href="' + item['playlink']+'">';
	        html += "Play: " + item['name'] + "</a>";
              $('#browseBodyDiv').append(html + "</div>");
	    });
            $('#browseBodyDiv').append("<br/>");
	  }

	  $.each(data.nodes, function(i,item){
            var node = $("#templateNode").clone();
		$(node).find('.browselink').attr('href',window.location + '?apiurl=' + escape(item['browse']));
		$(node).find('.browselink').click(
		  function(e) {
		    //window.location = window.location + '?apiurl=' + escape(item['browse']);
		    callBrowseAPI(item['browse'] + "&jsoncallback=?");
		    return false;
		  }
		);
		$(node).find('.browselink').text(item['name']);
		if (item['playlink']) {
			$(node).find('.playlink').attr('href',item['playlink']);
		} else {
			$(node).find('.playlink,.sep').remove();
		}
		if (item['thumbnail']) {
			$(node).find('.thumbnail').attr('src',item['thumbnail']);
		} else {
			$(node).find('.mediaNodeImg').remove();
		}
		node.show().appendTo('#browseBodyDiv');
	  });

        });
}