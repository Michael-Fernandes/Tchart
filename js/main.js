$(window).ready(function(){
	populateBackgroundImgs();
	$("#close").on("click", function(){
		$("#note").hide();
	});

	$(window).on("resize", function(){
		var dimensions = calcDimensions();
		$("resume-link").css("width", dimensions["width"] / 2 + "px")
	});
});

function populateBackgroundImgs(){
	var BG_imgs = ["http://www.cqsisu.com/data/wallpapers/5/718875.jpg", "img/asb.jpg"]
	var $row_img = $(".col-1-1");
	for(var j = 0; j < $row_img.length; j++){
		var url = "url(\'" + BG_imgs[j] + "\')"
		console.log(url);
		$($row_img[j]).css( {"background-image": url});

	}
}
