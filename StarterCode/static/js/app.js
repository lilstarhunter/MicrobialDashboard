//Fetch and Read JSON file
d3.json("data/samples.json").then((importedData) => {
  console.log(importedData);
  var data = importedData;
});
