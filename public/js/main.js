$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        val = Math.round(val * 4) / 4; /* To round to nearest quarter */
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}
$('.tsubmit').click(function(){
	$.post('/api/product/search', function(resp){
		//console.log(resp)
		$('#response').html(resp);
	});
});

$('.submit').click(function(){
	var term = null,
		minRange = null,
		maxRange = null,
		errCnt = 0;

	if($('#search').val()){
		//alert("Please submit a term!" + $('#search').val());
		term = $('#search').val();
	}else{
		$('#search').css('border', '1px solid red');
		alert("Please search for a term");
		errCnt++;
	}
	if($('#max').val() && $('#min').val()){
		minRange = $('#min').val();
		maxRange = $('#max').val();
	}else if($("#max").val() && !$('#min').val()){
		minRange = 0;
		maxRange = $('#max').val();
	}else if(!$('#max').val() && $('#min').val()){
		errCnt++;
		alert("Please provide a Max price");
	}

	if(errCnt < 1){
		$('.loading').fadeIn('slow');
		var search = {};
		if(minRange != null && maxRange != null){
			search = { 
				searchTerm: term,
				minPrice: minRange,
				maxPrice: maxRange
			}
		}else{
			search = {
				searchTerm: term
			}
		}
		//alert(search.searchTerm);
		$.post('/api/product/search', search, function(resp){
			$('.loading').fadeOut('slow');
			//var temp = $.parseHTML(resp);

			var result = $('<div />').append(resp).html();
			document.getElementById('response').innerHTML = result;
            //$('#response').html(result);

			//$('#response').html(temp);
			$('span.stars').stars();
		});
	}else{
	}

});
