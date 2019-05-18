// from data.js
var tableData = data;
var tbody = d3.select("tbody");

var datum3 = {
    datetime: "1/28/1996",
    city: "dallas",
    state: "tx",
    country: "us",
    shape: "star",
    durationMinutes: "5 mins.",
    comments: "Cowboys win a superbowl, that's alien!."
};

// insert datum3 into data
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
data.insert(2, datum3);

function populateTable(data) {
    // console.log(data);
    var row = tbody.append("tr");

    Object.entries(data).forEach(function ([key, value]) {
        // console.log(key, value);
        var cell = row.append("td");
        cell.text(value);
    });
}

data.forEach(populateTable);

var datetime = tableData.map((tableData => tableData.datetime));
var city = tableData.map((tableData => tableData.city));
var state = tableData.map((tableData => tableData.state));
var country = tableData.map((tableData => tableData.country));
var shape = tableData.map((tableData => tableData.shape));
var uniqueDatetime=[...new Set(datetime)];
var uniqueCity=[...new Set(city)];
var uniqueState=[...new Set(state)];
var uniqueCountry=[...new Set(country)];
var uniqueShape=[...new Set(shape)];

// create eventHandler to react to form submission
function dataFilterEventHandler() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    console.log(inputValue);

    // filter data based on datetime key
    var filteredData = tableData.filter(tableData => tableData.datetime === inputValue);
    console.log(filteredData);

    var Parent = document.getElementById('ufo-table-body');
    console.log(Parent);
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    };
    filteredData.forEach(populateTable);
}

function clearFilterEventHandler() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // clear table
    var Parent = document.getElementById('ufo-table-body');
    console.log(Parent);
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    };

    //repopulate table
    data.forEach(populateTable);
}

// Select the buttons
var submit = d3.select("#filter-btn");
var clearFilter = d3.select("#clear-filter-btn");

// assign eventHandlers to buttons
submit.on("click", dataFilterEventHandler);
clearFilter.on("click",clearFilterEventHandler); 

