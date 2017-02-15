$(window).ready(function(){
	$("#main-over").hide();

	// Get the window dimensions including margin
	var dimensions = getDimensions(skills);

	// Create div to insert T-chart into
	var chart = document.createElement("div");
	chart.className = "t-chart";

   	var div = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0);

	generate(skills, chart, div);

	$("#chart-wrapper").append(chart);

 	$(window).resize( function(){
 		generate(skills, chart, div)
 	})

 	$("#note").on("click").hide();
});

function generate(skills, chart, div){
	 	d3.select("svg").remove();
 		dimensions = getDimensions(skills);

 		$("#resume").css( {"width": dimensions["width"] / 2, "margin-left": "auto", "margin-right":"auto"} );

 		var svg = d3.select(chart).append("svg")
    			.attr("width", dimensions["width"])
   				.attr("height", dimensions["height"] - 50)
   				.classed("wordSvg", true);

 		buildMain(skills, dimensions, div, svg);

}

function buildMain(skills, dimensions, div, svg, wordSvg){
	var color = d3.scaleLinear()
   						.domain([0, dimensions["count"] ])
   						.range(["#ff8c00", "#6b486b"])
   						//.range(["#6b486b", "#ff8c00"])
   						.interpolate(d3.interpolateLab); 

   	var counter = 0;
	// For each entry do some stuff
	for(var i = 0; i < skills.length; i ++){
		var yPosition = 50;
		for(var j = 0; j < skills[i].length; j++){
			buildRect(yPosition, skills[i][j], i, dimensions, counter, div, svg, color);
			yPosition += skills[i][j]["val"] * dimensions["multiplier"];
			counter += 1;
		}
	}

	placeWords(svg, color, dimensions["width"], dimensions["screen"]);
}

function placeWords(svg, color, width, screen){
	var fs = "1.3em";
	if(screen > 1){
		fs = "2.5em";
	}
	var label = svg.append("text")
					.attr("x", width / 8)
					.attr("y", 30)
					.style("position", "relative")
					.style("text-anchor", "middle")
					.style("font-size", fs)
					.style("font-weight", "400")
					.style("fill", color(0))
					.html("Research")
					.classed("t-title", true);

	var label = svg.append("text")
					.attr("x", width / 2)
					.attr("y", 30)
					.style("position", "relative")
					.style("text-anchor", "middle")
					.style("font-size", fs)
					.style("font-weight", "400")
					.style("fill", color(4))
					.html("Design")
					.classed("t-title", true);

	var label = svg.append("text")
					.attr("x", (width * 3 / 4) + width / 8)
					.attr("y", 30)
					.style("position", "relative")
					.style("text-anchor", "middle")
					.style("font-size", fs)
					.style("font-weight", "400")
					.style("fill", color(9))
					.html("Build")
					.classed("t-title", true);
}

function buildRect(yPosition, skill, collumn,  dimensions, counter, div, svg, color){
	var x = (collumn * dimensions["width"] / 4);
	var skills = skill["skill_list"];
	var skills_list = ""

	for(var j = 0; j < skills.length; j++){
		skills_list += skills[j] + "</br>"
	}
	
	var rectangle = svg.append("rect").attr("x", (x ))
                                .attr("y", yPosition)
                                .attr("width", (dimensions["width"] / 4)  )
                                .attr("height", skill["val"] * dimensions["multiplier"])
                                .attr("stroke-width", 1)
                                .attr("stroke", "white")
                              	.attr("border-radius", 2)
                              	.attr("rx", 1.5)
                              	.attr("ry", 1.5)
						 		.attr("fill", function(){
						 			return color(counter)
						 		})
						 		.attr("link", "#this-link")
						 		.style("margin", "1px")
						 		.classed("t-rect", true)
						 		.on("click", function(){  // click move to area
						 							console.log(d3.select(this).attr('link'))})
						 		.on('mouseover', function(){  //
						 							if(skills_list.length > 0) {
						 								var left = 0;
						 								div.transition().duration(250)
						 									.style("opacity", 1);
										 				div.html( "<span class='skill-title'>What I can do</span></br>" + skills_list)
										 					.style("left", (0) + "px")		
					            							.style("top", (d3.event.pageY - 20) + "px") }
						 							})
						 		.on("mousemove", function(){ 
						 							div.style("top", (event.pageY-10)+"px")
						 								.style("left",(event.pageX+10)+"px");})
						 		.on('mouseout', function(){ 
						 							div.transition().duration(100)
						 								.style("opacity", 0);	});
						 	  

	var fs = "12px"
	var ls = 0.3;
	if(dimensions["screen"] > 1){
		fs = "28px"
		ls = 0.6;
	}

	word = skill["name"]
	if(dimensions["width"] < 600 || dimensions["screen"] > 1 || word.length > 22){
		word = word.split(" ");
	} else { // not elegant
		word = [word]
	}
	
	for(var j = 0; j < word.length; j++){
		var label = svg.append("text")
					.attr("x", x + dimensions["width"] / 8)
					.attr("y", yPosition + (parseInt(fs) * (1.25 + j)))
					.attr('letter-spacing', ls)
					.style("position", "relative")
					.style("text-anchor", "middle")
					.style("font-size", fs)
					.style("font-weight", "300")
					.style("fill", "white")
					.html(word[j])
					.classed("text", true);
	}
}	

function getDimensions(skills) {
	var dims = calcDimensions();

	var rtrn = findMaxHeight(skills);
	var multiplier = maxHeightMultiplier( rtrn["maxHeight"], (dims["height"] - 100));
	return {"width":dims["width"] * dims["screen"], "height":dims["height"] * dims["screen"] + 
						50, "multiplier": multiplier, "count":rtrn["count"], "screen":dims["screen"]};
}

function calcDimensions(){
	var width = 600;
	var screenWidth = window.innerWidth;

	var screen = 1;
	if($("#mobile").css("display") == "inline"){
		screen = 1.60;
	}

	if (screenWidth < 625){
		smallFont = "";
		width = window.innerWidth - 25;
	} 

	var screenHeight = window.innerHeight * screen;


	var height = 600 * screen;
	if (screenHeight < 600){
		height = screenHeight * screen - 100;
	} else if( screenHeight * screen < 400){
		height = 350;
	}
	return {"width": width,"height": height, "screen":screen};

}
// Returns the ratio which all heights should be configured with to fit screen
function maxHeightMultiplier(maxHeight, height){
	return height / maxHeight;
}

//Finds the max height of any collumn in t=chart
function findMaxHeight(skills){
	var maxHeight = 0; // Max height to be returned

	var count = 0; // Counts how many skills are being used
	for(var j = 0; j < skills.length; j++){
		var height = 0;
		for(var k = 0; k < skills[j].length; k++){
			count += 1;
			height += skills[j][k]["val"]
		}
		if(height > maxHeight){
			maxHeight = height;
		}
	}
	var rtrn = {"maxHeight": maxHeight, "count":count};
	return rtrn;
}

//Removes t-chart components
function resetGraph(){
	d3.selectAll("rect").remove();
 	d3.selectAll(".t-title").remove();
}

//Generates a random color on RGB scale
function getRandomColor(){
	return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
}