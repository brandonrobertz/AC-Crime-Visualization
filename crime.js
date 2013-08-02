//Width and height
var margin = {top: 25, right: 5, bottom: 0, left: 250};
var w = 900 - margin.right - margin.left;
var h = 900 - margin.top - margin.bottom;
var barPadding = 1;
// Donut position
var legend_y = h-((h/5)*4)
var totals_legend_top = 220, totals_legend_mult = 25;
// align x of legend 
ww = w - 200;

//Create SVG element
var svg = d3.select("#chart")
  .append("svg:svg")
    .attr("width", w + margin.right + margin.left)
    .attr("height", h + margin.top + margin.bottom);

svg.attr('xmlns', 'http://www.w3.org/2000/svg');

// Donut Init
var donut_w = 250, donut_h = 250, donut_r = Math.min(donut_w, donut_h) / 2,
  donut = d3.layout.pie().sort(null),
  arc = d3.svg.arc().innerRadius(donut_r - 70).outerRadius(donut_r - 20);
// Arc group
var arc_grp = svg.append("svg:g")
  .attr("class", "arcg")
  .attr("transform", "translate(" + (ww+120) + "," +  ((legend_y)+(totals_legend_top+(totals_legend_mult*8))) + ")");
// Labels group
var label_group = svg.append("svg:g")
  .attr("class", "labelg")
  .attr("transform", "translate(" + (ww+120) + "," + ((legend_y)+(totals_legend_top+(totals_legend_mult*8))) + ")");

// Donut transition helper function
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

// Our main drawing function
function update(data, totals_data, avgs_data, year){
  // scales
  var y = d3.scale.ordinal()
      .rangeBands([margin.top, h]);

  //var x = d3.scale.linear()
  var x = d3.scale.linear()
      .domain([0, d3.max(data, function(d){ return d.value; })])
      .range([0, w - margin.right - 300]);

  // axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5);   

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("right")
      .tickSize(0);

  data.sort(function(a, b) { return b.value - a.value; });
  y.domain(data.map(function(d) { return d.name; }));

  // Join old data (if any) with new
  var rect = svg.selectAll("rect")
      .data(data);
     
  // Update old elements
  rect.attr("class", function(d){ return d.eth; } )
      .attr("x", margin.left)
      .attr("y", function(d, i) {
        switch (d.eth){
          case "WHITE":
            return y(d.name);
            break;
          case "BLACK":
            return y(d.name);
            break;
          case "HISPANIC":
            return y(d.name);
            break; };
        })
      .attr("height", y.rangeBand() - barPadding)
      .transition()
      .delay(function(d, i) { return i * 5; })
      .duration(200)
      .attr("width", function(d){ return x(d.value) - margin.right; });

  // Enter new elements if needed
  rect.enter()
      .append("rect")
      .attr("class", function(d){ return d.eth; } )
      .attr("x", margin.left)
      .attr("y", function(d, i) {
        switch (d.eth){
          case "WHITE":
            return y(d.name);
            break;
          case "BLACK":
            return y(d.name);
            break;
          case "HISPANIC":
            return y(d.name);
            break; };
        })
      .attr("height", y.rangeBand() - barPadding)
      .transition()
      .delay(function(d, i) { return i * 5; })
      .duration(200)
      .attr("width", function(d){ return x(d.value) - margin.right; });
     
  // Exit, remove old nodes
  rect.exit()
    .transition()
    .delay(function(d, i) { return i; })
    .duration(200)
    .attr("width", 0)
    .remove()
  
  // Remove old axis
  svg.selectAll("g.x.axis")
      .remove();
  svg.selectAll("g.y.axis")
      .remove();

  // Draw new ones
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + ", " + (margin.top) + ")rotate(-90)")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis);
  
  // Legend
  svg.selectAll("g.legend")
      .remove();

  var l = svg.selectAll("g.legend")
    .data(avgs_data)
    .enter()
      .append("g")
      .attr("class", "legend");

  l.selectAll("rect")
      .attr("class", function(d){ return d.name; })
      .attr("x", ww)
      .attr("y", function(d, i){ return (legend_y)+55+(i*35); } )
      .attr("height", 30)
      .transition()
      .attr("width", function(d){ return d.value*8; });
  l.selectAll("text")
      .attr("class", function(d){ return d.name; })
      .attr("x", ww+5)
      .attr("y", function(d, i){ return (legend_y)+55+(i*35); } )
      .attr("text-anchor", "left")
      .attr("dy", "2em")
      .text( function(d){ return d.name + ": " + d.value.toFixed(1); });

  l.append("rect")
      .attr("class", function(d){ return d.name; })
      .attr("x", ww)
      .attr("y", function(d, i){ return (legend_y)+55+(i*35); } )
      .attr("height", 30)
      .transition()
      .attr("width", function(d){ return d.value*8; });
  l.append("text")
      .attr("class", function(d){ return d.name; })
      .attr("x", ww+5)
      .attr("y", function(d, i){ return (legend_y)+55+(i*35); } )
      .attr("text-anchor", "left")
      .attr("dy", "2em")
      .text( function(d){ return d.name + ": " + d.value.toFixed(1); });

  // Show the year above the legend
  svg.append("g")
      .attr("class", "legend big_year")
    .append("text")
      .text(year)
      .attr("x", ww)
      .attr("y", legend_y-35)
      .attr("height", 30)
      .attr("width", 30);
  var txt = svg.append("g")
      .attr("class", "legend desc")
    .append("text")
      .attr("x", ww)
      .attr("y", legend_y+25)
      .attr("height", 30)
      .attr("width", 30);
      
    txt.append("tspan")
      .text("Overall average sentence length broken down by");
    txt.append("tspan")
      .attr("dy", "1.5em")
      .attr("x", ww)
      .text("race (days per sentence):");

  // ethnic breakdown
    svg.append("g")
      .attr("class", "legend totals")
    .append("text")
      .text("Ethnic Breakdown")
      .attr("x", ww)
      .attr("y", legend_y+2);
  // donut description
  var dtxt = svg.append("g")
      .attr("class", "legend desc")
      .append("text")
      .attr("x", ww)
      .attr("y", legend_y+totals_legend_top)
    dtxt.append("tspan")
      .attr("x", ww)
      .text("For crimes with people from more than one");
    dtxt.append("tspan")
      .attr("x", ww)
      .attr("dy", "1.5em")
      .text("race/ethnicity being charged, how often did");
    dtxt.append("tspan")
      .attr("x", ww)
      .attr("dy", "1.5em")
      .text("each race/eth get the harshest punishment?");
    dtxt.append("tspan")
      .attr("x", ww)
      .attr("dy", "1.5em")
      .text("(Represented as # crimes w/ this race having");
    dtxt.append("tspan")
      .attr("x", ww)
      .attr("dy", "1.5em")
      .text("largest punishment / # total crimes for this race.):");
      
  // DONUT DRAWING //
  // Join
  var arcs = arc_grp.selectAll("path")
      .data(donut(totals_data.map( function(d){ return d.value;})));
  // Update
  arcs.transition()
      .attr("class", function(d,i) { return totals_data[i].name; })
      .delay(200)
      .attrTween("d", arcTween);
  // New
  arcs.enter().append("path")
      .attr("class", function(d,i) { return totals_data[i].name; })
      .transition()
      .delay(function(d, i) { return i * 20; })
      .attr("d", arc)
      .each(function(d) {this._current = d});;
  // Exit
  arcs.exit().transition().remove();

  // Join
  var sliceLabel = label_group.selectAll("text")
      .data(donut(totals_data.map( function(d){ return d.value})));
  // Update
  sliceLabel.attr("class", "label")
      .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .text(function(d, i){
        if(!d.value){
          return "";
        } else {
          return d.value.toFixed(1)+"% "+totals_data[i].name;
        } });
  // New
  sliceLabel.enter().append("svg:text")
      .attr("class", function(d,i) { return totals_data[i].name; })
      .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .text(function(d, i){
        if(!d.value){
          return "";
        } else {
          return d.value.toFixed(1)+"% "+totals_data[i].name;
        } });
  // Exit
  sliceLabel.exit().remove();

  // Font on "2006-2011"
  if(year === "2006-2011"){
    d3.selectAll("svg g.y g text")
      .transition()
      .delay(function(d, i) { return i * 25; })
      .style("font-size", "6px");
  } else {
    d3.selectAll("svg g.y g text")
      .transition()
      .delay(function(d, i) { return i * 25; })
      .style("font-size", "9px");
  }
  
}

update(dataset_2011, dataset_2011_totals, dataset_2011_averages, 2011);
