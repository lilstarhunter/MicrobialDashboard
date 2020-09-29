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
    console.log("This worked");
  }
  //nameData returns an array of objects
});

// console.log(sampleData);
// console.log(nameData)
//Add data to Options for the drop down menu
// var select = document.getElementById("selDataset");
// var nameData = importedData.names;
// var options = [];
// for (var i = 0; i < length(select); i++) {
//   var option = document.createElement("option");
//   option.text = option.value = i;
//   options.push(option.outerHTML);
// }
// select.insertAdjacentHTML("beforeEnd", options.join("\n"));

// Function to access demographic data based on Patient ID
//   function demoInfo(id) {
//     // read in the jason data
//     d3.json("/data/samples.json").then((data) => {
//       // collent the metadata for the demographic panel in the html file
//       var metaData = importedData.metadata;
//       // console.log(metadata);
//       // metadata fileterd info by id
//       var result = metaData.filter((meta) => meta.id.toString() === id)[0];
//       // console.log(result);
//       // inject the data into the demo panel in the html
//       var demoInfo = d3.select("#sample-metadata");
//       // empty the demo panel each time
//       demoInfo.html("");
//       // inject demographic data for the id and append the info to the panel html
//       Object.entries(result).forEach((i) => {
//         demoInfo.append("h5").text(i[0].toUpperCase() + ": " + i[1] + "\n");
//       });
//     });
//     demoInfo(metaData);
//   }
// });

// Create a dropdown element
// //Create an Initial plot
// var trace = {
//   x: sliceValues[0],
//   y: "sliceOTU[0]",
//   type: "bar",
//   orientation: "h",
// };

//Create an update Plot function
// funtion updatePlot(newData) {
//   //create a variable to access the bar chart
//   var BAR = document.getElementById("bar")
//   Plotly.restyle(BAR, "values", [newData])
// }

// //Create a get data function to select data based on dropdown menu selected
// function getData(newData){
//   var data = []

//   updatePlot(data)
