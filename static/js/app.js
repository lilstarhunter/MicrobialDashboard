//Grab the JSON object
d3.json("/data/samples.json").then((importedData) => {
  //create data variables for each object in the dataset
  var metaData = importedData.metadata;
  var sampleData = importedData.samples;
  var nameData = importedData.names;
  console.log(Object.values(nameData));

  var select = d3.select("select").on("change", optionChanged);
  var options = select
    .selectAll("option")
    .data(nameData)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    });

  function optionChanged() {
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
  }
});
