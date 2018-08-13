// run node getData.js <token>

var request = require('request-promise');
const fs = require('fs');

const filePath = "./public/data/strava-activity-data-2.json";

const strava = {
  token: null,
  
  getActivity: function() {
    return request({
      "method":"GET", 
      "uri": "https://www.strava.com/api/v3/athlete/activities?before=1534108714&after=1531430314&page=1&per_page=30",
      "json": true,
      "headers": {
        "Authorization": "Bearer " + strava.token,
        'User-Agent': 'Strava'
      }
    });
  }
}

function main(token) {
  strava.token = token;
  return strava.getActivity();
}

function writeData(fp,rr) {
	fs.writeFileSync(fp, rr, function(err) {
	  if(err) {
	      return console.log(err);
	  }
	  console.log("The file was saved!");
	});
};

main(process.argv[2]).then(function(result) {
	//console.log(result);
    return result;
});

console.log(strava.getActivity(result));








