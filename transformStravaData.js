// run node transformStravaData.js


const moment = require("moment");
const fs = require('fs');
const strava_data = require("./public/data/strava-activity-data.json");

// define start/end dates (YYYY-MM-DD)
const today = new Date(); 
const month_ago = moment().subtract(30,'d').toDate(); 

// create an empty array for the last 30 days
const dateArr = createEmptyDateArray(month_ago, today);

// create a JSON object with runs for the last 30 days
const money = transformDatatoJson(strava_data, dateArr);
console.log(money);


const filePath = "./public/data/strava-data.json";
fs.writeFile(filePath, money, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 


function createEmptyDateArray (startDate, endDate) {
    let arr = new Array();
    let dt = new Date(startDate);

    while (dt <= endDate) {
        arr.push(dt.toJSON().slice(0,10));
        dt.setDate(dt.getDate() + 1);
    }

    return arr;
}


function transformDatatoJson (data, dates) {
	// data must have JSON properties of start_date and distance

	let i;
	let output = {};
	let distance = [];
	let run_dates = [];
	let run_distances = [];

	// create two arrays - one for dates, one for distances
	for (i = 0; i < data.length; i++) { 
		run_dates[i] = data[i].start_date.substring(0,10);
		run_distances[i] = parseFloat((data[i].distance/1609.34).toFixed(2));
	}
	console.log(run_distances);

	// check if the start_date is contained in the array; if so, update the value
	for (i = 0; i < dates.length; i++) { 
		if (run_dates.includes(dates[i])) {
			matchedIndex = run_dates.indexOf(dates[i]);
			distance[i] = run_distances[matchedIndex];
		} else {
			distance[i] = 0; 
		}
		output[dates[i]] = distance[i];
	}

	jsonOutput = JSON.stringify(output);
	return jsonOutput
};

