// Setup svg using Bostock's margin convention
var margin = {top: 20, right: 160, bottom: 35, left: 30};
var width = 280,
height = 225;
var svg = d3.select("#stackedChart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var data = [
{ year: "2018", income: "4.056367041", expanses: "2.889700375" },
{ year: "2017", income: "5", expanses: "0" },
{ year: "2016", income: "0", expanses: "3" },
{ year: "2015", income: "1", expanses: "0" },
{ year: "2014", income: "0", expanses: "1" },
{ year: "2013", income: "5", expanses: "3" },
];
var parse = d3.time.format("%Y").parse;
var dataset = d3.layout.stack()(["income", "expanses"].map(function(type) {
return data.map(function(d) {
return {x: parse(d.year), y: +d[type]};
});
}));
console.log (data)
console.log (dataset)
var x = d3.scale.ordinal()
.domain(dataset[0].map(function(d) { return d.x; }))
.rangeRoundBands([10, width-10], 0.02);
var y = d3.scale.linear()
.domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
.range([height, 0]);
var colors = ["rgb(62, 36, 204)", "rgb(96, 107, 239)", "rgb(136, 140, 195)", "rgb(201, 202, 220)"];
var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.ticks(5)
.tickSize(-width, 0, 0)
.tickFormat( function(d) { return d } );
var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.tickFormat(d3.time.format("%Y"));
svg.append("g")
.attr("class", "y axis")
.call(yAxis);
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis);
var groups = svg.selectAll("g.cost")
.data(dataset)
.enter().append("g")
.attr("class", "cost")
.style("fill", function(d, i) { return colors[i]; });
var rect = groups.selectAll("rect")
.data(function(d) { return d; })
.enter()
.append("rect")
.attr("x", function(d) { return x(d.x); })
.attr("y", function(d) { return y(d.y0 + d.y); })
.attr("height", function(d, i) { console.log(i, d); return y(d.y0) - y(d.y0 + d.y); })
.attr("width", x.rangeBand())
.attr('transform', function(d, i) { return '' })