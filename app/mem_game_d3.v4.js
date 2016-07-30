// General variablees
var prevClicked = -1,   // ID of the most recent gnode that was clicked
    allWordData = [],   // All words (data) from text from json
    wordData = [],      // Words loaded (data) into simulation from json
    wordLinks = [],     // Links (data) in the simulation
    w = 500,            // Width of the svg palette
    h = 300,            // Height of the svg palette
    rad = 20,           // Radius of the word circles
    initCount = 7,      // Number of words to show at beginning of game
    answerKey = [],     // The right answer
    playerAnswer = [],  // 
    foci = [{ x: 100, y: h / 2 }, { x: 350, y: h / 2 }];

// Set color palette for nodes
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Size the pre-created svg palette
var svg = d3.select("#force")
    .attr("width", w)
    .attr("height", h);

// Set forces in the simulation
var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-50))
    .force("collide", d3.forceCollide(function (d) { return d.rad; }));

// Define the 
var glinks,         // Active links on the game
    gnodes;         // The current set of gnodes

var radScale = d3.scaleLinear().domain([1, 15]).range([10, 50]);

// Get text from json, then start simulation
d3.json("/data/texts.json", function (error, textsData) {

    var keyText = textsData.nodes.filter(function (obj) { if (obj.cit == "Eph 2:8") return true; else return false; });
    kt = keyText[0].text.replace("-", "- ").split(" ");

    for (i = 0; i < kt.length; i++) {
        var firstIndex = kt.indexOf(kt[i]);
        var firstID = firstIndex > -1 ? Math.min(firstIndex, i) : i;
        answerKey.push(firstID);

        allWordData.push({
            word: kt[i],
            fociLoc: 0,
            id: i,
            wordid: firstID,
            x: 0,
            y: ~~(Math.random() * h),
            rad: radScale(kt[i].length)
        })
    }


    for (i = 0; i < Math.min(initCount, allWordData.length) ; i++) {
        wordData.push(allWordData[i]);
    }

    for (i = 0; i < textsData.links.length ; i++) {
        wordLinks.push(textsData.links[i]);
    }

    start();
});

function start() {

    glinks = svg.selectAll(".link").data(wordLinks, function (d) {
            return d.source.id +
                "-" +
                d.target.id;
        })
        .enter().insert("line", ".gnode").attr("class", "link");
    //glink.exit().remove();


    // Get current g-elements, add new if needed
    gnodes = svg.selectAll("g")
        .data(wordData, function id(d, i) {
            return d.id;
        })
        .enter()
        .append("g")
        .attr("class", function (d) { return "gnode w" + d.id; });

    circles = gnodes.append("circle").attr("class", function (d) { return "n" + d.id; })
        .attr("r", function (d) { return d.rad; }).style("fill", function (d, i) { return color(d.id); })
        .attr("opacity", 0.6);

    texts = gnodes.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("class", "text")
        .style("pointer-events", "none")
        .text(function(d) { return (d.word); });

    actions = gnodes.on("dblclick", nodeClicked)
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));

    simulation.nodes(wordData)
        .force("link").links(wordLinks);

    simulation.on("tick", ticked)
        .alpha(0.5)
        .restart();
}


function ticked(e) {

    var k = .2 * simulation.alpha();

    // multi-foci
    svg.selectAll(".gnode").attr("transform", function (d) {
        d.y += (foci[d.fociLoc].y - d.y) * k;
        d.x += (foci[d.fociLoc].x - d.x) * k;

        d.y = Math.max(d.rad, Math.min(h - d.rad, d.y));
        d.x = Math.max(d.rad, Math.min(w - d.rad, d.x));

        return 'translate(' + [d.x, d.y] + ')';
    });

    svg.selectAll(".link").attr("x1", function (d) { return d.source.x; })
    .attr("y1", function (d) { return d.source.y; })
    .attr("x2", function (d) { return d.target.x; })
    .attr("y2", function (d) { return d.target.y; });

}


var findNode = function (id) {
    for (var i in wordData) {
        if (wordData[i]["id"] === id) return wordData[i];
    };
};


function dragStarted(d) {
    d3.select(this).raise().classed("active", true);
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    d3.select(this).classed("active", false);
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function nodeClicked(d) {

    // Move the node, and a link
    d.fociLoc = 1;
    if (allWordData.length > wordData.length) { wordData.push(allWordData[wordData.length]); }
    if (prevClicked != -1) { wordLinks.push({ "source": prevClicked, "target": d.id }); }
    start();

    // Update prevClicked and check the answer
    prevClicked = d.id;
    playerAnswer.push(d.wordid);
    if (playerAnswer.toString() == answerKey.toString()) { alert("you won!"); }
    else if (playerAnswer.toString() != answerKey.slice(0, playerAnswer.length).toString()) { alert("there's a problem...") }
}
