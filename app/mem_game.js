// d3_force.js
// http://bl.ocks.org/mbostock/950642
// http://bigtext.org/
// TODO: Add, delete nodes, edges: http://bl.ocks.org/ericcoopey/6c602d7cb14b25c179a4, https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36#.xmxn4kygw
// TODO: Make text draggable: http://bl.ocks.org/ericcoopey/6c602d7cb14b25c179a4
// return ((NODE_SIZE) ? scale(d.children) : 10);

var mem_text = "For God so loved the world that he gave his only Son that whoever believes in him should not perish but have eternal life";
var words = mem_text.split(' ');
var wordsList = []
for (var i = 0; i < words.length; i++) {
    wordsList.push({ word: words[i], id: i });
}

var lastX = 0;
var lastY = 50;

function dblclick(d) {
    d.fixed = !d.fixed
    d.x = d.px = lastX = lastX + 50;
    d.y = d.py = lastY;

    if (lastX >= w) {
        lastX = 0;
        lastY = lastY + 50;
    }
}


var wordLinks = []; // { source: 0, target: 1 }

//Width and height
var w = 500;
var h = 300;

// Start off by creating an SVG container to hold the visualization. We only need to specify
// the dimensions for this container.
var svg = d3.select(".force")
    .attr("width", w)
    .attr("height", h);

// Create the force layout.  After a call to force.start(), the tick method will
//   be called repeatedly until the layout "gels" in a stable configuration.
// linkDistance() is the distance we desire between connected nodes, 20 is default
// linkStrength() adjusts the strength of the linkDistance, 1 is default; a data driven statement:
//   force.linkStrength(function(link) { if (link.className === 'red')  return 0.1; return 1; });
// charge() default is -30; a negative value results in node repulsion, a positive
//   value in node attraction
// TODO: Set charge to a greater number for nodes with no links. Or alter gravity.
var force = d3.layout.force()
    .size([w, h])
    .linkDistance(100)
    .charge(-75);

var colors = d3.scale.category10();


// start() calls the tick() method repeatedly to lay out the graph.
force
    .nodes(wordsList)
    .links(wordLinks)
    .start();

var edges = svg.selectAll("line")
    .data(wordLinks)
    .enter()
    .append("line")
    .attr("class", "edge")
    .style("opacity", 1);


var gnodes = svg.selectAll('g.gnode')
    .data(wordsList)
    .enter()
    .append('g')
    .classed('gnode', true)
    .on("dblclick", dblclick)
    .call(force.drag);

    
// TODO: Make it sticky: http://bl.ocks.org/mbostock/3750558
// TODO: Make it collapsible: http://bl.ocks.org/mbostock/1093130
// TODO: Use divergent forces: http://bl.ocks.org/mbostock/1021841
var nodes = gnodes.append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .style("fill", colors);
//.style("fill", function (d, i) { return colors(d.group); })


// Add events to each node: resize on mouseenter and mouseleave
// 'this' is a keyword which refers to the object on which the currently executing
//   method has been invoked (the mouseenter event in this case).
// .transition() is similar to .select(), but it animates changes smoothly over time
//   rather than applying instantaneously.
// .attr() here uses the same scale that we set previously, but we double it (or reset
//   it on mouseleave).
var nodeEvents = nodes
    .on('mouseenter', function () {
        d3.select(this)
        .transition()
        .attr("r", 30)
    })
    // set back
    .on('mouseleave', function () {
        d3.select(this)
        .transition()
        .attr("r", 20)
    });


// Append a label to each node (or each gnode in this case). x, y, dx, and dy are SVG
//   attributes. While x and y are absolute coordinates and dx and dy are relative coordinates
//   (relative to the specified x and y for the containing gnode).
var labels = gnodes.append("text")
    .attr("class", "text")
    .attr("text-anchor", "middle")
    .attr("dy", 2)
    .text(function (d) { return d.word });


// This tick method is called repeatedly until the layout stabilizes. The order in which we
// update nodes and edges does *not* determine which gets drawn 1st.  Drawing order is
// determined above by the order in which we added them.
force.on("tick", tick);

function tick() {
    edges.attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    //gnodes
    //    .attr("cx", function (d) { return d.x; })
    //    .attr("cy", function (d) { return d.y; });

    gnodes.attr("transform", function (d) {
        return 'translate(' + [d.x, d.y] + ')';
    });
}
