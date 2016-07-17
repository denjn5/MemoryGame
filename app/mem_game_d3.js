﻿// d3_force.js
// http://bl.ocks.org/mbostock/950642
// TODO: Add, delete nodes, edges: http://bl.ocks.org/ericcoopey/6c602d7cb14b25c179a4, https://medium.com/@c_behrens/enter-update-exit-6cafc6014c36#.xmxn4kygw
// TODO: Use divergent forces: http://bl.ocks.org/mbostock/1021841
// TODO: Words fly in from side into group: https://bl.ocks.org/mbostock/1021953
// TODO: Multi-focus: http://codepen.io/fabiobiondi/pen/nFxyD, http://tributary.io/inlet/3898058
// TODO: Collision detection: http://datavizclub.tumblr.com/post/119852708658/
// TODO: Start text in Python
// return ((NODE_SIZE) ? scale(d.children) : 10);

// load the external data
var lastX = -20;
var lastY = 25;


//Width and height
var w = 500;
var h = 300;
var colors = d3.scale.category10();

var svg = d3.select("#force")
    .attr("width", w)
    .attr("height", h);

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


d3.json("/data/texts.json", function (error, textsData) {
    wordsList = textsData.nodes;
    wordsLinks = textsData.edges;


    // start() calls the tick() method repeatedly to lay out the graph.
    force
        .nodes(wordsList)
        .links(wordsLinks)
        .start();

    var edges = svg.selectAll("line")
        .data(wordsLinks)
        .enter()
        .append("line")
        .attr("class", "edge")
        .style("opacity", 1);

    var gnodes = svg.selectAll('g.gnode')
        .data(wordsList)
        .enter()
        .append('g')
        .classed('gnode', true)
        //.on("dblclick", dblclick)
        .call(force.drag);

    var nodes = gnodes.append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .style("fill", function (d, i) { return colors(d.pos); });

    var labels = gnodes.append("text")
        .attr("class", "text")
        .attr("text-anchor", "middle")
        //.attr("alignment-baseline", "central")
        .attr("dy", 2)
        .text(function (d) { return d.word });

    // Clear glaze over the top to keep the text from getting in the way
    var nodes = gnodes.append("circle")
        .attr("class", "node")
        .attr("r", 20)
        .style("opacity", 0.0);


    force.on("tick", tick);

    function tick(e) {
        edges.attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        gnodes
            .attr("transform", function (d) {
                return 'translate(' + [d.x, d.y] + ')';
            });
    }

    var nodeEvents = nodes
        .on('mouseenter', function (d) {
            d3.select(this)
            .transition()
            .style("stroke-width", 1);
            //.attr("r", 30)
        })
        .on('click', function (d) {
            d.fixed = !d.fixed
            d.x = d.px = lastX = lastX + 40;
            d.y = d.py = lastY;

            if (lastX >= w - 40) {
                lastX = -20;
                lastY = lastY + 40;
            }
            tick();
        })
        // set back
        .on('mouseleave', function (d) {
            d3.select(this)
            .transition()
            .style("stroke-width", 0);
            //.attr("r", 20)
        });

    function restartForce() {
        nodes = [];
        links = [];
        force.nodes(nodes);
        force.links(links);
        messageSpan = document.getElementById("message");

    }



});
