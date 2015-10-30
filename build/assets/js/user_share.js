$(function(){
	var params = purl().param();
	if(params.rank){
		$('#rank').text(params.rank);
	}
	if(params.ticketName){
		$('#awardName').text(decodeURI(params.ticketName));
	}
});