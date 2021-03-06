

// build the dropdown with test subject IDs
d3.json("samples.json").then(function(data) {
    
    var testSubjectDropdown = d3.select('#selDataset');
    var testSubjects = Object.values(data.names);

    testSubjects.forEach((row,i) => {
        testSubjectDropdown
        .append("option")
        .text(row)
        .property("value", i)
    })

});

// grab the user input and trigger building the plots
function optionChanged() { 

    var testSubject = d3.select('#selDataset').node().value;
    buildPlot(testSubject)
    
}

// build the plot with the selected ID
function buildPlot(testSubject) {

    d3.json("samples.json").then(function(data) {
        
        var selectedID = testSubject

        var topSampleValues = Object.values(data.samples[selectedID].sample_values.slice(0,10).reverse());
        var topOtuIDs = Object.values(data.samples[selectedID].otu_ids.slice(0,10).reverse());
        var topOtuLabels = Object.values(data.samples[selectedID].otu_labels.slice(0,10).reverse());
        

// fill demo data 

    var demoBox = document.getElementById("sample-metadata");

    demoBox.innerHTML = `id: ${Object.values(data.metadata[selectedID])[0]}<br>
                        ethnicity: ${Object.values(data.metadata[selectedID])[1]}<br>
                        gender: ${Object.values(data.metadata[selectedID])[2]}<br>
                        age: ${Object.values(data.metadata[selectedID])[3]}<br>
                        location: ${Object.values(data.metadata[selectedID])[4]}<br>
                        bbtype: ${Object.values(data.metadata[selectedID])[5]}<br>
                        wfreq:${Object.values(data.metadata[selectedID])[6]}<br>`;

    console.log(Object.values(data.metadata[selectedID]))

//bar chart
        // trace for horizontal bar chart
        var traceBar = {
        x: topSampleValues,
        y: topOtuIDs,
        text: topOtuLabels,
        name: "Top 10 OTU Samples",
        type: "bar",
        orientation: "h"
        };

        // data
        var chartData = [traceBar];

        // Apply the group bar mode to the layout
        var barLayout = {
        title: "Top 10 OTU Samples",
        width: 500,
        height: 800,
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        yaxis: {
            type: 'category',
            title: {
                text: "OTU Names",
                standoff: 20
              },
            automargin: true,
          },
        xaxis: {
            title: {
                text: "Sample Measurement",
                standoff: 20
              },
            automargin: true,
          }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData, barLayout);

// bubble chart 

        var sampleValues = Object.values(data.samples[selectedID].sample_values);
        var otuIDs = Object.values(data.samples[selectedID].otu_ids);
        var otuLabels = Object.values(data.samples[selectedID].otu_labels);

        var traceBubble = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues,
            }
          };
          
          var data = [traceBubble];
          
          var bubbleLayout = {
            title: 'All Samples by OTU ID',
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: {
                title: {
                    text: "OTU ID",
                    standoff: 20
                  },
                automargin: true,
              }
          };
          
          Plotly.newPlot('bubble', data, bubbleLayout);


});       

} 