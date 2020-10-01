const selector = d3.select("#selDataset");

  function optionChanged() {
    //Grab the JSON object
  d3.json("/data/samples.json").then((importedData) => {
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
      title: "Top 10 Bacterial Strains",
      yaxis: {
      type: 'category' },
      xaxis: {  title: "Sample Volume"}

    };

    Plotly.newPlot("bar", chartData, layout)

    //==================================================//
    //             **Create Bubble Chart**              //
    //==================================================//
    //Grab variables for graphing
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

  })

}

selector.on('change', optionChanged(this.value))