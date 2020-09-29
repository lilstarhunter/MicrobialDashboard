d3.json("/data/samples.json").then((importedData) => {
  //Access sample information
  var samples = importedData.samples;
  var sliceValues = samples.map((value) => value.sample_values.slice(0, 10));
  var sliceOTU = samples.map((otu) => otu.otu_ids.slice(0, 10));
  // console.log(sliceOTU);
  console.log(sliceValues[0]);
  var trace1 = {
    x: sliceOTU[0],
    y: sliceValues[0],
    type: "bar",
  };

  var data = [trace1];

  Plotly.newPlot("bar", data);

  //=========Make a Graph for initial data =========//
  //   var makeVis = function (patientID) {
  //     // Handler for dropdown value change
  //     var dropdownChange = function () {
  //       var newPatient = d3.select(this).property("value"),
  //         newData = names[newPatient];

  //       updateBars(newData);

  //       // Get patient IDs for dropdown
  //       var patientID = Object.values(importedData.names);

  //       var dropdown = d3
  //         .select("#selDataset")
  //         .insert("select", "svg")
  //         .on("change", dropdownChange);

  //       dropdown
  //         .selectAll("option")
  //         .data(patientID)
  //         .enter()
  //         .append("option")
  //         .attr("value", function (d) {
  //           return d;
  //         })
  //         .text("value", function (d) {
  //           return d;
  //         });

  //       var initData = samples[0];
  //     };
  //     makeVis(initData);
  //   };
});
