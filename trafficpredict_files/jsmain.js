"use strict";

function speakerScorePlot(datum, colour, yellow, avgtour, avgbr) {
    var w = 560;
    var h = 320;
    var pad = 10;
    var axispadding = 40;
    var speakers = datum.length;
    //var splotsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "splotsvg");
    var splotsvg = d3.select("#nameGenderScoresPlot").append("svg").attr("width", w).attr("height", h).attr("class", "splotsvg");

    var xScale = d3.scale.linear()
        .domain([0, speakers])
        .range([axispadding, w - pad]);

    var yScale = d3.scale.linear()
        .domain([d3.min(datum, function(d) {
            return parseFloat(d[1]);
        }), d3.max(datum, function(d) {
            return parseFloat(d[1]);
        })])
        .range([h - axispadding, pad]);


    d3.svg.axis();

    splotsvg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - axispadding + pad) + ")")
        .call(d3.svg.axis().scale(xScale).orient("bottom").ticks("5"));


    splotsvg.append("g").attr("class", "axis").attr("transform", "translate(" + (axispadding - pad) + ",0)")
        .call(d3.svg.axis().scale(yScale).orient("left").ticks(5));

    splotsvg.append("g").attr("class", "plotbody").selectAll("circle")
        .data(datum)
        .enter()
        .append("circle")
        .attr("cy", function(d) {
            return yScale(parseFloat(d[1]));
        })
        .attr("cx", function(d, i) {
            return xScale(i);
        })
        .attr("r", 2.8)
        .attr("fill", function(d) {
            if (d[2] === "m") {
                return "#40c0d0";
            } else return "#f41e50";
        })
        .append("title").text(function(d) {
            return d[0] + " , " + d[1];
        });

    splotsvg.append("line")
        .attr("x1", xScale(-1))
        .attr("y1", yScale(parseFloat(avgbr)))
        .attr("x2", xScale(88))
        .attr("y2", yScale(parseFloat(avgbr)))
        .attr("stroke-dasharray", ("3,3"))
        .attr("stroke-width", 1.5)
        .attr("stroke", "rgb(240,240,240)");

    splotsvg.append("line")
        .attr("x1", xScale(-1))
        .attr("y1", yScale(parseFloat(avgtour)))
        .attr("x2", xScale(88))
        .attr("y2", yScale(parseFloat(avgtour)))
        .attr("stroke-dasharray", ("3,3"))
        .attr("stroke-width", 1.5)
        .attr("stroke", "rgb(90,220,90)");


    splotsvg.append("text").attr("x", xScale(11)).attr("y", yScale(70)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 30).text("Traffic Distribution");
    splotsvg.append("text").attr("x", xScale(30)).attr("y", yScale(69)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 17).text("Day vs Time");
    splotsvg.append("text").attr("x", xScale(5)).attr("y", yScale(avgtour) + 20).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 15).text("Weekly Average : " + avgtour.toFixed(2));
    splotsvg.append("text").attr("x", xScale(40)).attr("y", yScale(avgbr) - 10).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 15).text("Peak Average : " + avgbr.toFixed(2));
}

function speakerGender(totalfema, colour, yellow) {
    var w = 150;
    var h = 150;
    totalfema = [(totalfema[0] * 100 / (totalfema[0] + totalfema[1])).toFixed(2), (totalfema[1] * 100 / (totalfema[0] + totalfema[1])).toFixed(2)];

    //var genderdistsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "genderdistsvg");
    var genderdistsvg = d3.select("#genderPiePlot").append("svg").attr("width", w).attr("height", h).attr("class", "genderdistsvg");

    genderdistsvg.append("text").attr("x", 15).attr("y", 25).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 20).text("Total Vehicles");

    var pie = d3.layout.pie();
    var arc = d3.svg.arc().innerRadius(0).outerRadius(50);
    var arcs = genderdistsvg.selectAll("g.arc")
        .data(pie(totalfema))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(75,90)");

    arcs.append("path")
        .attr("fill", function(d, i) {
            return colour[i];
        })
        .attr("d", arc);

    arcs.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .attr("font-family", "Titillium Web")
        .attr("font-size", 15)
        .attr("fill", "rgb(50,50,50)")
        .text(function(d) {
            return d.value + "%";
        });
}

function bpIcons(teamcomp, icontext, classname, yellow, divId) {

    var w = 260;
    var h = 100;

    //var teamcompsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", classname);
    var teamcompsvg = d3.select("#"+divId).append("svg").attr("width", w).attr("height", h).attr("class", classname);
    var pad = 25;

    teamcompsvg.append("path").attr("id", "feicon")
        .attr("d", "M80.161,60.442l-15.66-7.47l-6.622-3.159c0.166-0.105,0.324-0.224,0.487-0.335h8.695c1.346,0,2.438-1.091,2.438-2.438 v-6.415h-0.022c-0.266-8.94-3.371-16.805-8.034-21.737c-2.459-2.773-5.646-4.657-9.211-5.22c-0.159-0.026-0.318-0.05-0.478-0.071 c-0.184-0.023-0.367-0.046-0.553-0.061c-0.398-0.035-0.798-0.059-1.202-0.059h0h0c-0.001,0-0.001,0-0.002,0 c-0.398,0-0.791,0.023-1.183,0.057c-0.188,0.016-0.374,0.039-0.56,0.062c-0.156,0.02-0.311,0.042-0.465,0.068 c-3.536,0.553-6.701,2.408-9.153,5.141c-4.708,4.927-7.847,12.829-8.115,21.821H30.5v6.415c0,1.346,1.091,2.438,2.438,2.438h8.719 c0.238,0.162,0.475,0.327,0.721,0.475l-6.342,2.953l-16.168,7.53c-1.405,0.658-2.327,2.242-2.327,4.011v15.062v2.703 c0,2.381,1.659,4.311,3.708,4.311h57.504c2.049,0,3.708-1.93,3.708-4.311v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.442z")
        .attr("fill", "#f41e50")
        .attr("transform", "translate(0," + pad + ") scale(0.5)");

    teamcompsvg.append("path").attr("id", "feicon")
        .attr("d", "M80.161,60.442l-15.66-7.47l-6.622-3.159c0.166-0.105,0.324-0.224,0.487-0.335h8.695c1.346,0,2.438-1.091,2.438-2.438 v-6.415h-0.022c-0.266-8.94-3.371-16.805-8.034-21.737c-2.459-2.773-5.646-4.657-9.211-5.22c-0.159-0.026-0.318-0.05-0.478-0.071 c-0.184-0.023-0.367-0.046-0.553-0.061c-0.398-0.035-0.798-0.059-1.202-0.059h0h0c-0.001,0-0.001,0-0.002,0 c-0.398,0-0.791,0.023-1.183,0.057c-0.188,0.016-0.374,0.039-0.56,0.062c-0.156,0.02-0.311,0.042-0.465,0.068 c-3.536,0.553-6.701,2.408-9.153,5.141c-4.708,4.927-7.847,12.829-8.115,21.821H30.5v6.415c0,1.346,1.091,2.438,2.438,2.438h8.719 c0.238,0.162,0.475,0.327,0.721,0.475l-6.342,2.953l-16.168,7.53c-1.405,0.658-2.327,2.242-2.327,4.011v15.062v2.703 c0,2.381,1.659,4.311,3.708,4.311h57.504c2.049,0,3.708-1.93,3.708-4.311v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.442z")
        .attr("fill", "#f41e50")
        .attr("transform", "translate(35," + pad + ") scale(0.5)");

    teamcompsvg.append("text").attr("x", 30).attr("y", pad + 70).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 20).text(teamcomp[0]);

    teamcompsvg.append("path").attr("id", "feicon")
        .attr("d", "M80.161,60.442l-15.66-7.47l-6.622-3.159c0.166-0.105,0.324-0.224,0.487-0.335h8.695c1.346,0,2.438-1.091,2.438-2.438 v-6.415h-0.022c-0.266-8.94-3.371-16.805-8.034-21.737c-2.459-2.773-5.646-4.657-9.211-5.22c-0.159-0.026-0.318-0.05-0.478-0.071 c-0.184-0.023-0.367-0.046-0.553-0.061c-0.398-0.035-0.798-0.059-1.202-0.059h0h0c-0.001,0-0.001,0-0.002,0 c-0.398,0-0.791,0.023-1.183,0.057c-0.188,0.016-0.374,0.039-0.56,0.062c-0.156,0.02-0.311,0.042-0.465,0.068 c-3.536,0.553-6.701,2.408-9.153,5.141c-4.708,4.927-7.847,12.829-8.115,21.821H30.5v6.415c0,1.346,1.091,2.438,2.438,2.438h8.719 c0.238,0.162,0.475,0.327,0.721,0.475l-6.342,2.953l-16.168,7.53c-1.405,0.658-2.327,2.242-2.327,4.011v15.062v2.703 c0,2.381,1.659,4.311,3.708,4.311h57.504c2.049,0,3.708-1.93,3.708-4.311v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.442z")
        .attr("fill", "#f41e50")
        .attr("transform", "translate(85," + pad + ") scale(0.5)");

    teamcompsvg.append("path").attr("id", "maicon")
        .attr("d", "M80.161,60.441l-15.66-7.47l-6.622-3.159c2.892-1.822,5.241-4.634,6.778-8.022c1.22-2.69,1.946-5.734,1.946-8.99 c0-1.827-0.29-3.562-0.694-5.236C63.94,19.453,57.605,13.477,50,13.477c-7.461,0-13.701,5.763-15.792,13.645 c-0.482,1.808-0.815,3.688-0.815,5.68c0,3.459,0.808,6.684,2.181,9.489c1.587,3.254,3.94,5.937,6.804,7.662l-6.342,2.953 l-16.168,7.53c-1.404,0.658-2.327,2.242-2.327,4.011v15.062v2.703c0,2.381,1.659,4.312,3.708,4.312h57.505 c2.048,0,3.708-1.93,3.708-4.312v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.441z")
        .attr("fill", "#40c0d0")
        .attr("transform", "translate(120," + pad + ") scale(0.5)");

    teamcompsvg.append("text").attr("x", 115).attr("y", pad + 70).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 20).text(teamcomp[1]);


    teamcompsvg.append("path").attr("id", "maicon")
        .attr("d", "M80.161,60.441l-15.66-7.47l-6.622-3.159c2.892-1.822,5.241-4.634,6.778-8.022c1.22-2.69,1.946-5.734,1.946-8.99 c0-1.827-0.29-3.562-0.694-5.236C63.94,19.453,57.605,13.477,50,13.477c-7.461,0-13.701,5.763-15.792,13.645 c-0.482,1.808-0.815,3.688-0.815,5.68c0,3.459,0.808,6.684,2.181,9.489c1.587,3.254,3.94,5.937,6.804,7.662l-6.342,2.953 l-16.168,7.53c-1.404,0.658-2.327,2.242-2.327,4.011v15.062v2.703c0,2.381,1.659,4.312,3.708,4.312h57.505 c2.048,0,3.708-1.93,3.708-4.312v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.441z")
        .attr("fill", "#40c0d0")
        .attr("transform", "translate(175," + pad + ") scale(0.5)");

    teamcompsvg.append("path").attr("id", "maicon")
        .attr("d", "M80.161,60.441l-15.66-7.47l-6.622-3.159c2.892-1.822,5.241-4.634,6.778-8.022c1.22-2.69,1.946-5.734,1.946-8.99 c0-1.827-0.29-3.562-0.694-5.236C63.94,19.453,57.605,13.477,50,13.477c-7.461,0-13.701,5.763-15.792,13.645 c-0.482,1.808-0.815,3.688-0.815,5.68c0,3.459,0.808,6.684,2.181,9.489c1.587,3.254,3.94,5.937,6.804,7.662l-6.342,2.953 l-16.168,7.53c-1.404,0.658-2.327,2.242-2.327,4.011v15.062v2.703c0,2.381,1.659,4.312,3.708,4.312h57.505 c2.048,0,3.708-1.93,3.708-4.312v-2.703V64.446C82.46,62.683,81.552,61.114,80.161,60.441z")
        .attr("fill", "#40c0d0")
        .attr("transform", "translate(210," + pad + ") scale(0.5)");

    teamcompsvg.append("text").attr("x", 205).attr("y", pad + 70).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 20).text(teamcomp[2]);

    teamcompsvg.append("text").attr("x", w / 2).attr("y", pad - 5).attr("font-family", "Titillium Web").attr("text-anchor", "middle").attr("fill", yellow).attr("font-size", 20).text(icontext);
}

function teamRoundPlot(data_team, yellow) {
    var w = 460;
    var h = 350;
    var pad = 10;
    var axispadding = 40;
    //var teams = data_team.length;
    //var tplotsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "tplotsvg");
    var tplotsvg = d3.select("#teamScoreDist").append("svg").attr("width", w).attr("height", h).attr("class", "tplotsvg");


    //console.log(data_team);
    data_team=transpose(transpose(data_team).slice(0,9));
    //console.log(data_team);


    var xScale = d3.scale.linear()
        .domain([1, 5])
        .range([axispadding, w - pad]);

    var ymin = d3.min(data_team, function(d) {
        return (d3.min(d, function(k, i) {
            if (i > 3) {
                return parseFloat(k);
            }
        }));
    });


    var ymax = d3.max(data_team, function(d) {
        return (d3.max(d, function(k, i) {
            if (i > 3) {
                return parseFloat(k);
            }
        }));
    });


    var yScale = d3.scale.linear()
        .domain([ymin,ymax])
        .range([h - axispadding, pad]);


    d3.svg.axis();

    tplotsvg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - axispadding + pad) + ")")
        .call(d3.svg.axis().scale(xScale).orient("bottom").ticks("5"));


    tplotsvg.append("g").attr("class", "axis").attr("transform", "translate(" + (axispadding - pad) + ",0)")
        .call(d3.svg.axis().scale(yScale).orient("left").ticks("5"));

    var teamscore=[0,0,0,0,0,0,0,0,0,0];



    var who = tplotsvg.append("g").attr("id","roundscores").selectAll("g").data(data_team).enter().append("g");

    who.attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke-width",1.5)
    .attr("opacity",1)
    .attr("id",function(d,i){
        return "num"+i;
    })

    .on("mouseover",function(){
        var self = this;
        d3.selectAll("#"+this.id).attr("fill","white").attr("stroke","white").attr("stroke-width",3);
        d3.selectAll("#"+this.id).selectAll("text").attr("fill","white").attr("stroke","white").attr("stroke-width",0);


        d3.selectAll("#roundscores").selectAll("g").filter(function(){
            return self.id!==this.id;
        }).attr("opacity",0.3);

    })
    .on("mouseout",function(){

        d3.selectAll("#roundscores").selectAll("g").attr("opacity",1)
        .attr("stroke-width",1.5).attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    });
    d3.selectAll("#roundscores").selectAll("text").attr("fill","rgba(235,154,0,1)").attr("stroke-width",0);
    });
    

    who.append("title").text(function(d){
        return " "+d[1]+" , "+d[4]+" , "+d[5]+" , "+d[6]+" , "+d[7]+" , "+d[8]+" ";
    });



    who.selectAll("circle")
        .data(function(d){
                return d;
            })
        .enter()
        .append("circle")

        .attr("cy", function(d,i) {
            if (i>3){
                //console.log(i);
                return yScale(parseFloat(d));
            }
            else return 0;
        })
        .attr("cx", function(d,i) {
            if (i>3){
                return xScale(i-3);
            }
        })
        .attr("r", function(d,i){
            if (i>3){
                return 2.5;
            }
            else return 0;
        });

        who.append("polyline").attr("points",function(d){
            for (var j=0;j<5;j++){
                teamscore[2*j]=xScale(j+1);
                teamscore[2*j+1]=yScale(parseInt(d[j+4]));
            }
            return teamscore;
        })
        .attr("fill","none");


    tplotsvg.append("text").attr("x", xScale(1.8)).attr("y", yScale(135)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 25).text("Team Speaks Distribution");
    tplotsvg.append("text").attr("x", xScale(2.5)).attr("y", yScale(132)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 17).text("Speaks vs Round");
}

function rankRoundPlot(data_team, yellow) {
    var w = 460;
    var h = 650;
    var pad = 10;
    var axispadding = 40;
    //var teams = data_team.length;
    //var rankplotsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "rankplotsvg");
    var rankplotsvg = d3.select("#rankVsRound").append("svg").attr("width", w).attr("height", h).attr("class", "rankplotsvg");


    for (var i=0;i<data_team.length;i++){
        for (var j=5;j<9;j++){
            data_team[i][j]=(parseInt(data_team[i][j-1])+parseInt(data_team[i][j])).toString();
            data_team[i][j+5]=(parseInt(data_team[i][j+4])+parseInt(data_team[i][j+5])).toString();
        }
    }
     for ( i=0;i<data_team.length;i++){
        for (var k=4;k<9;k++){
            data_team[i][k]=(parseInt(data_team[i][k])+(parseInt(data_team[i][k+5])*1000)).toString();
        }
    }
 //console.log(data_team);

 for (i=0;i<5;i++){
        data_team=data_team.sort(function(a,b){
        return a[4+i]-b[4+i];
    });
        for (var p=0;p<data_team.length;p++){
            data_team[p][i+4]=p+1;
        }
        //console.log(data_team);

    }

    data_team=data_team.sort(function(a,b){
        return b[8]-a[8];
    });

    //console.log(data_team);
    data_team=transpose(transpose(data_team).slice(0,9));
    //console.log(data_team);


    var xScale = d3.scale.linear()
        .domain([1, 5])
        .range([axispadding, w - pad]);

    var yScale = d3.scale.linear()
        .domain([0,44])
        .range([h - axispadding, pad]);


    d3.svg.axis();

    rankplotsvg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - axispadding + pad) + ")")
        .call(d3.svg.axis().scale(xScale).orient("bottom").ticks("5"));


    rankplotsvg.append("g").attr("class", "axis no-label").attr("transform", "translate(" + (axispadding - pad) + ",0)")
        .call(d3.svg.axis().scale(yScale).orient("left"));

    var teamscore=[0,0,0,0,0,0,0,0,0,0];



    var who = rankplotsvg.append("g").attr("id","roundscores").selectAll("g").data(data_team).enter().append("g");

    who.attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke-width",1.5)
    .attr("opacity",1)
    .attr("id",function(d,i){
        return "num"+i;
    })

    .on("mouseover",function(){
        var self = this;
        d3.selectAll("#"+this.id).attr("fill","white").attr("stroke","white").attr("stroke-width",3);
        d3.selectAll("#"+this.id).selectAll("text").attr("fill","white").attr("stroke","white").attr("stroke-width",0);


        d3.selectAll("#roundscores").selectAll("g").filter(function(){
            return self.id!==this.id;
        }).attr("opacity",0.3);

    })
    .on("mouseout",function(){

        d3.selectAll("#roundscores").selectAll("g").attr("opacity",1)
        .attr("stroke-width",1.5).attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    });
    d3.selectAll("#roundscores").selectAll("text").attr("fill","rgba(235,154,0,1)").attr("stroke-width",0);
    });
    

    who.append("title").text(function(d){
        return " "+d[1]+" , "+d[4]+" , "+d[5]+" , "+d[6]+" , "+d[7]+" , "+d[8]+" ";
    });



    who.selectAll("circle")
        .data(function(d){
                return d;
            })
        .enter()
        .append("circle")

        .attr("cy", function(d,i) {
            if (i>3){
                //console.log(i);
                return yScale(parseFloat(d));
            }
            else return 0;
        })
        .attr("cx", function(d,i) {
            if (i>3){
                return xScale(i-3);
            }
        })
        .attr("r", function(d,i){
            if (i>3){
                return 2.5;
            }
            else return 0;
        });

        who.append("polyline").attr("points",function(d){
            for (var j=0;j<5;j++){
                teamscore[2*j]=xScale(j+1);
                teamscore[2*j+1]=yScale(parseInt(d[j+4]));
            }
            return teamscore;
        })
        .attr("fill","none");

    rankplotsvg.append("text").attr("x", xScale(2.5)).attr("y", yScale(-0.3)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 22).text("Rank vs Round");
    rankplotsvg.append("text").attr("x", xScale(-1.8)).attr("y", yScale(43.3)).attr("font-family", "Titillium Web")
    .attr("transform","rotate(270)").attr("fill", "white").attr("font-size", 15).text("Breaks");

    rankplotsvg.append("line")
        .attr("x1", xScale(0.95))
        .attr("y1", yScale(28.5))
        .attr("x2", xScale(5.8))
        .attr("y2", yScale(28.5))
        .attr("stroke-dasharray", ("7,3"))
        .attr("stroke-width", 2)
        .attr("stroke", "rgb(200,200,200)");


}

function cumulRoundPlot(data_team, yellow) {
    var w = 460;
    var h = 300;
    var pad = 10;
    var axispadding = 40;
    //var teams = data_team.length;
    //var cumulplotsvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "cumulplotsvg");
    var cumulplotsvg = d3.select("#teamSpeaksDist").append("svg").attr("width", w).attr("height", h).attr("class", "cumulplotsvg");


    //console.log(data_team);
    data_team=transpose(data_team);
    data_team.splice(4,5);
    data_team=transpose(data_team);
    //console.log(data_team);

    for (var i=0;i<data_team.length;i++){
        for (var j=5;j<9;j++){
            data_team[i][j]=(parseInt(data_team[i][j-1])+parseInt(data_team[i][j])).toString();
        }
    }
    //console.log(data_team);

    var xScale = d3.scale.linear()
        .domain([0, 5])
        .range([axispadding, w - pad]);


    var yScale = d3.scale.linear()
        .domain([0,15])
        .range([h - axispadding, pad]);


    d3.svg.axis();

    cumulplotsvg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - axispadding + pad) + ")")
        .call(d3.svg.axis().scale(xScale).orient("bottom").ticks("5"));


    cumulplotsvg.append("g").attr("class", "axis").attr("transform", "translate(" + (axispadding - pad) + ",0)")
        .call(d3.svg.axis().scale(yScale).orient("left").ticks("10"));

    var teamscore=[0,0,0,0,0,0,0,0,0,0,0,0];



    var who = cumulplotsvg.append("g").attr("id","roundscores").selectAll("g").data(data_team).enter().append("g");

    who.attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke-width",1.5)
    .attr("opacity",1)
    .attr("id",function(d,i){
        return "num"+i;
    })
    .on("mouseover",function(){
        var self = this;
        d3.selectAll("#"+this.id).attr("fill","white").attr("stroke","white").attr("stroke-width",3);
        d3.selectAll("#"+this.id).selectAll("text").attr("fill","white").attr("stroke","white").attr("stroke-width",0);


        d3.selectAll("#roundscores").selectAll("g").filter(function(){
            return self.id!==this.id;
        }).attr("opacity",0.3);

    })
    .on("mouseout",function(){

        d3.selectAll("#roundscores").selectAll("g").attr("opacity",1)
        .attr("stroke-width",1.5).attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    });
    d3.selectAll("#roundscores").selectAll("text").attr("fill","rgba(235,154,0,1)").attr("stroke-width",0);
    });
    
    who.append("title").text(function(d){
        return " "+d[1]+" , "+d[4]+" , "+d[5]+" , "+d[6]+" , "+d[7]+" , "+d[8]+" ";
    });



    who.selectAll("circle")
        .data(function(d){
                return d;
            })
        .enter()
        .append("circle")

        .attr("cy", function(d,i) {
            if (i===3){
                return yScale(0);
            }
            if (i>3){
                //console.log(i);
                return yScale(parseFloat(d));
            }
            else return 0;
        })
        .attr("cx", function(d,i) {
            if(i===3){
                return xScale(0);
            }
            if (i>3){
                return xScale(i-3);
            }
        })
        .attr("r", function(d,i){
            if (i>2){
                return 2.5;
            }
            else return 0;
        });

        teamscore[0]=xScale(0);
        teamscore[1]=yScale(0);

        who.append("polyline").attr("points",function(d){
            for (var j=1;j<6;j++){
                teamscore[2*j]=xScale(j);
                teamscore[2*j+1]=yScale(parseInt(d[j+3]));
            }
            return teamscore;
        })
        .attr("fill","none");


    cumulplotsvg.append("text").attr("x", xScale(0.5)).attr("y", yScale(12)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 25).text("Team Score Distribution");
    cumulplotsvg.append("text").attr("x", xScale(1.2)).attr("y", yScale(11)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 17).text("Score vs Round");
}

function teamNames(data_team, yellow) {
    var w = 250;
    var h = 520;
    var pad = 10;
    var axispadding = 40;
    //var teams = data_team.length;
    //var namesvg = d3.select("body").append("svg").attr("width", w).attr("height", h).attr("class", "namesvg");
    var namesvg = d3.select("#teamNames").append("svg").attr("width", w).attr("height", h).attr("class", "namesvg");

    //console.log(data_team);
    data_team=transpose(data_team);
    data_team.splice(2,12);
    data_team.splice(0,1);
    data_team=data_team[0];
    //console.log(data_team);
    //console.log(data_team.length);



    var xScale = d3.scale.linear()
        .domain([0, 2])
        .range([axispadding, w - pad]);

    
    var yScale = d3.scale.linear()
        .domain([23,1])
        .range([h - axispadding, pad]);


   
    var who = namesvg.append("g").attr("id","roundscores").selectAll("g").data(data_team).enter().append("g");

    who.attr("id",function(d,i){
        return "num"+i;
    })
    .on("mouseover",function(){
        var thisid = "#"+this.id;
        var self = this;

        d3.selectAll(thisid).attr("fill","white").attr("stroke","white").attr("stroke-width",3);
        d3.selectAll(thisid).selectAll("text").attr("fill","white").attr("stroke","white").attr("stroke-width",0);

        d3.selectAll("#roundscores").selectAll("g").filter(function(){
            return self.id!==this.id;
        }).attr("opacity",0.3);
    })
    .on("mouseout",function(){

        d3.selectAll("#roundscores").selectAll("g").attr("opacity",1)
        .attr("stroke-width",1.5).attr("fill", function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    })
    .attr("stroke",function(d, i) {
        if (i<16){
            return "rgba("+((i*255/15)+200)+","+(50)+","+(50)+",0.9)";
        }
        else if (i<30){
            return "rgba("+(50)+","+(i*255/15)+","+(50)+",0.9)";
        }
        else return "rgba("+(50)+","+(50)+","+(i*255/15)+",0.9)";
        //return "#"+(Math.random()*0xFFFFFF<<0).toString(16);
    });
    d3.selectAll("#roundscores").selectAll("text").attr("fill","rgba(235,154,0,1)").attr("stroke-width",0);
    });
    

    who.append("text")
    .attr("font-size",20)
    .attr("font-family","Titillium Web")
    .attr("fill",yellow)
    .attr("x",function(d,i){
        if (i<22){
            return xScale(0);
        }
        else return xScale(1);
    })

    .attr("y",function(d,i){
        if (i<22){
            return yScale(i+2);
        }
        else return yScale(i-20);
    })
    .attr("cursor","pointer")
    .text(function(d){
            return d;
        });



    //tplotsvg.append("text").attr("x", xScale(1.8)).attr("y", yScale(135)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 25).text("Team Speaks Distribution");
    //tplotsvg.append("text").attr("x", xScale(2.5)).attr("y", yScale(132)).attr("font-family", "Titillium Web").attr("fill", yellow).attr("font-size", 17).text("Score vs Round");
}


function transpose(a)
{
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
}


/*
function heading(yellow){
    d3.select("body").append("svg").attr("width", 1050).attr("height", 150).attr("class", "heading")
    .append("text").attr("x", 525).attr("y", 120).attr("font-family", "Titillium Web")
    .attr("fill", yellow).attr("font-size", 150).attr("text-anchor","middle").text("ON THAT POINT!");

}
*/

d3.text("gensp.csv", function(text) {
    var datum = d3.csv.parseRows(text);
    console.log(datum);

    var totalfema = [39, 49];
    var teamcomp = [13, 13, 18];
    //var avgspeak = [74.31, 74.42];
    //var totalspeaks = 32722;
    var avgtour = 74.36818;
    var avgbr = 76.6625;
    var breakcomp = [2, 6, 8];
    var colour = ["#f41e50", "#40c0d0"];
    var yellow = "#eb9a00";

    //heading(yellow);
    speakerScorePlot(datum, colour, yellow, avgtour, avgbr);
    speakerGender(totalfema, colour, yellow);
    //bpIcons(teamcomp, "Total Te", "toticons", yellow,"totIcons");
   // bpIcons(breakcomp, "Breaking Teams Composition", "bricons", yellow,"brIcons");

});


d3.text("SMCteams.csv", function(text) {
    var data_team = d3.csv.parseRows(text);
    //console.log(data_team);
    //console.log(data_team.length);
    var colour = ["#f41e50", "#40c0d0"];
    var yellow = "#eb9a00";

    teamNames(data_team,yellow,colour);
    teamRoundPlot(data_team, yellow, colour);
    cumulRoundPlot(data_team, yellow, colour);
    rankRoundPlot(data_team,yellow,colour);

});