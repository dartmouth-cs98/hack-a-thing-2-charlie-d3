var data = [13, 37, 66, 21, 56, 43];
document.addEventListener("DOMContentLoaded", function(e) {
    chart1(data);
    chart2(data);
    d3.select("#submit")
    .on("click", function(){
        data = []
        console.log("clicked button");
        for (var i = 2015; i <= 2020; i++){
            var current_id = "val" + i;
            console.log(current_id);
            data.push(document.getElementById(current_id).value);
        }
        console.log(data);
        updateBar(data);
        // updatePie(data);
        d3.select("#box2").selectAll("svg").remove();
        chart2(data);
    })

   });

function chart1(data){
    var width = 600;
    var height = 430;
    var bargraph = d3.select("#box1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    bargraph.attr("align", "center");
    for (var i = 0; i < data.length; i ++){
        bargraph.append("rect")
        .attr("x", 50 + i * 50)
        .attr("y", height - 15 - data[i] * 5)
        .attr("width", 40)
        .attr("height", data[i] * 5)
        .attr("fill", "#42f5dd")
        .attr("id", "rect_" + i);

        d3.select("#rect_" + i)
        .on("mouseover", function(d, i){
            d3.select(this).attr("fill", "#72edb6");
        })
        .on("mouseout", function(d, i){
            d3.select(this).attr("fill", "#42f5dd");
        });

        bargraph.append("text")
        .attr("x", 50 + i * 50)
        .attr("y", height)
        .attr("font-family", "Georgia")
        .text(2015 + i);
 
        bargraph.append("text")
        .attr("x", 50 + i * 50 + 10)
        .attr("y", height - 20 - data[i] * 5)
        .attr("id", "text_" + i)
        .attr("font-family", "Georgia")
        .text(data[i]);
    }
    bargraph.append("g")
    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
    .append("text")
    .text("Bar Graph")
    .attr("font-family", "Georgia")
    .attr("class", "title")
}

function updateBar(data){
    //Update all rects
    var height = 430;
    for (var i = 0; i < data.length; i ++){
        var current_bar = d3.select("#rect_" + i);
        var current_label = d3.select("#text_" + i);
        console.log(current_bar);
        current_bar.transition()
        .duration(2000)
        .attr("y", height - 15 - data[i] * 5)
        .attr("height", data[i] * 5);
        current_label.transition()
        .duration(2000) 
        .attr("y", height - 20 - data[i] * 5);
        
    }
    for (var i = 0; i < data.length; i ++){
        var current_label = d3.select("#text_" + i);
        current_label.transition().delay(2000).text(data[i]);
    }
    
  }

function chart2(data){
    var width = 600;
    var height = 430;
    var radius = 150;

var svg = d3.select("#box2")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");



var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#86f078", "#78f0be", "#78c2f0", "#a278f0", "#f078a2", "#f0b878"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

svg
  .selectAll('pie')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "1.5px")

  svg.append("g")
  .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
  .append("text")
  .text("Pie Chart")
  .attr("font-family", "Georgia")
  .attr("class", "title")
}
    
function updatePie(data){
    //Update pie slices 
    var svg = d3.select("#box2");
    var color = d3.scaleOrdinal()
    .domain(data)
    .range(["#86f078", "#78f0be", "#78c2f0", "#a278f0", "#f078a2", "#f0b878"])
  
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))
svg.select("path")
  .transition()
  .duration(2000)
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "white")
  .style("stroke-width", "1.5px")
    
    
  }