const selector = d3.select("#selDataset");

  function optionChanged() {
    //Grab the JSON object
  d3.json("./data/samples.json").then((importedData) => {
  //create data variables for each object in the dataset
  var metaData = importedData.metadata;
  var sampleData = importedData.samples;
  var nameData = importedData.names;

  var select = d3.select("select").on("change", optionChanged);
  
  var options = select
    .selectAll("option")
    .data(nameData)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    });

    selectValue = d3.select("select").property("value");

    //==================================================//
    //     **Add data to Demographic Info Table**       //
    //==================================================//
    var result = metaData.filter(
      (meta) => meta.id.toString() === selectValue
    )[0];
    // inject the data into the demo panel in the html
    var demoInfo = d3.select("#sample-metadata");
    // empty the demo panel each time
    demoInfo.html("");
    // inject demographic data for the id and append the info to the panel html
    Object.entries(result).forEach((i) => {
      demoInfo.append("h5").text(i[0].toUpperCase() + ": " + i[1] + "\n");
    });

    //==================================================//
    //           **Create top 10 Bar Chart**            //
    //==================================================//
    //Grab patient sampleData based on patient id
    var newSample = sampleData.filter((sample) => sample.id.toString() === selectValue);
  
    //Grab variables for graphing
    var sampleValues = newSample.map((sample) => sample.sample_values)
    var sampleLabel = newSample.map((sample) => sample.otu_labels)
    var sampleID = newSample.map((sample) => sample.otu_ids)
    var ids = newSample[0]['otu_ids'].map(elem => `OTU ${elem.toString()}`)

    //Create a trace
    var trace = {
      x: sampleValues[0].slice(0,10).reverse(),
      y: ids.slice(0,10),
      text: sampleLabel[0].slice(0,10),
      type: "bar",
      orientation: "h"

    };
    var chartData = [trace]
    var layout = {
      yaxis: {
      type: 'category' },
      xaxis: {  title: "Sample Volume"},
      title: "Top 10 Bacterial Strains"

    };

    Plotly.newPlot("bar", chartData, layout)

    //==================================================//
    //             **Create Bubble Chart**              //
    //==================================================//
    //Create variable for bubble sizing
    var desired_maximum_marker_size = 10

    var trace2 = {
      x: sampleID[0],
      y: sampleValues[0],
      mode: "markers",
      text: sampleLabel[0],
      marker: {
        size: sampleValues[0],
        color: sampleID[0],
        sizeref: 2.0 * Math.max(0.2) / (desired_maximum_marker_size),
        sizemode: 'area'
      }
    }
  var bubbleData = [trace2]
  var bubbleLayout = {
    xaxis : { title: "OTU ID"},
    yaxis: { title: "Sample Volume"}

  }
  Plotly.newPlot("bubble", bubbleData, bubbleLayout)

  //==================================================//
  //             **Create Washing Gauge**             //
  //==================================================//
  var newFreq = result.wfreq

   // Trig to calc meter point
   var degrees = 180-(newFreq*20);
        radius = .5;
   var radians = degrees * Math.PI / 180;
   var x = radius * Math.cos(radians);
   var y = radius * Math.sin(radians);
 
   // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);


  var trace3 = [{ type: "category",
    //Create center needle
    x: [0], y: [0],
    marker: {size: 28, color: '840000'},
    showlegend: false,
    name: "Wash Frequency", text: newFreq, hoverinfo: "text+name"},
    //Set meter values
    {
      values: [
      100/9,
      100/9,
      100/9,
      100/9,
      100/9,
      100/9,
      100/9,
      100/9,
      100/9,
      100],
    text: [
      "8-9",
      "7-8",
      "6-7",
      "5-6",
      "4-5",
      "3-4",
      "2-3",
      "1-2",
      "0-1",
      ""], 
    textinfo: "text",
    textposition: "inside",
    marker: {
      colors: [
        "rgba(142, 179, 141, .5)",
        "rgba(148, 186, 145, .5)",
        "rgba(150, 190, 131, .5)",
        "rgba(187, 203, 149, .5)",
        "rgba(210, 206, 145, .5)",
        "rgba(216, 227, 161, .5)",
        "rgba(238, 221, 182, .5)",
        // "rgba(233, 203, 204, .5)",
        "rgba(244, 241, 229, .5)",
        "rgba(247, 243, 237, .5)",
        "rgba(255, 255, 255, 0)"]},
      type: "pie",
      showlegend: false,
      hole: 0.4,
      rotation: 90,
      // hoverinfo: newFreq,
      textinfo: "text",
      textposition: "inside"
  }];

    var layout = {
      //Create the triangle
      shapes:[{
      type: 'path',
      path: path,
    fillcolor: '850000',
    line: {
      color: '850000'
    }
  }],
  title: '<b> Belly Button Washing Frequency </b> <br> Scrubs per Week ',
  //Add sub title
  height: 500,
  width: 600,
  xaxis: {type:'category',zeroline:false, showticklabels:false,
  showgrid: false, range: [-1, 1]},
  yaxis: {type:'category',zeroline:false, showticklabels:false,
  showgrid: false, range: [-1, 1]}
  }
 

Plotly.newPlot('gauge', trace3, layout);
})}

selector.on('change', optionChanged(this.value))
