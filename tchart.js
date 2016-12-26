$(window).ready(function(){

	var skills = [ [("design", 50), ('ucd', 50), ("research", 25)], 
					[("design", 100), ('ucd', 200), ("research", 300)], 
					[("design", 100), ('ucd', 200), ("research", 300)], 
					[("design", 50), ('ucd', 50), ("research", 25)] ];
	var dimensions = getDimensions();
	var chart = document.createElement("div");
	chart.className = "t-chart";

	var svg = d3.select(chart).append("svg")
    			.attr("width", dimensions["width"])
   				.attr("height", dimensions["height"]);

   	buildSkills(skills, dimensions, svg);

   	$("#chart-wrapper").append(chart);
   	$("#main-over").hide();
});


function debuggerJson(jsonSkillz){
	
}

function buildSkills(skills, dimensions, svg){
	for(var i = 0; i < skills.length; i ++){
		var yPosition = 0;
		for(var j = 0; j < skills[i].length; j++){
			yHeight = skills[i][j];
			buildRect(yPosition, yHeight, i, svg, dimensions);
			yPosition += yHeight;
		}
	}
}

function buildRect(yPosition, yHeight, collumn, svg, dimensions){
	var x = collumn * dimensions["width"] / 4;

	var rectangle = svg.append("rect").attr("x", (x ))
                                .attr("y", yPosition)
                                .attr("width", (dimensions["width"] / 4) )
                                .attr("height", yHeight)
                                .attr("stroke-width", 2)
                                .attr("stroke", "white")
						 		.attr("fill", "#959595")
						 		.attr("link", "#this-link")
						 		.classed("t-rect", true)
						 		.on("click", function(){
   										console.log(d3.select(this).attr('link'))})
						 		.on('mouseover', function(){
						 			$
						 		});
	
	var label = svg.append("text")
					.attr("x", x + dimensions["width"] / 8)
					.attr("y", yPosition + 12)
					.style("text-anchor", "middle")
					.style("font-size", "10pt")
					.style("font-weight", "light")
					.style("fill", "white")
					.text("Research")
					.classed("text", true);
}	

function getDimensions() {
	var width = 600;
	var screenWidth = $(document).width();
	if (screenWidth < 625){
		width = window.innerWidth - 50;
	} 

	var screenHeight = $(document).height();
	var height = 600;
	if (screenHeight < 600){
		height = screen.height - 100;
	} 
	return {"width":width, "height":height};
}

function getRandomColor(){
	return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}