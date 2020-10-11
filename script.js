var data = [13, 37, 66, 21, 56, 43];
document.addEventListener("DOMContentLoaded", function(e) {
    chart1(data);

   });

function chart1(data){
    var width = 300;
    var height = 400;
    var bargraph = d3.select("#box1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    for (var i = 0; i < data.length; i ++){
        bargraph.append("rect")
        .attr("x", 20 + i * 40)
        .attr("y", height - 15 - data[i] * 5)
        .attr("width", 25)
        .attr("height", data[i] * 5)
        .attr("fill", "blue")
        .attr("id", "rect_" + i);

        d3.select("#rect_" + i)
        .on("mouseover", function(d, i){
            d3.select(this).attr("fill", "orange");
        })
        .on("mouseout", function(d, i){
            d3.select(this).attr("fill", "blue");
        });

        bargraph.append("text")
        .attr("x", 20 + i * 40)
        .attr("y", height)
        .text(2015 + i);
 
        bargraph.append("text")
        .attr("x", 20 + i * 40)
        .attr("y", height - 20 - data[i] * 5)
        .text(data[i]);
    }
}