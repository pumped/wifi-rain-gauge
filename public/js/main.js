function dataCollector() {

}

dataCollector.prototype.setup = function () {
  this.data = {};
  this.procData = {};

  this.calibration = 0.2794;

  this.setupGraph();
  this.getData();

  var that = this;
  setInterval(function(){
    that.getData();
  },10*1000)
};

dataCollector.prototype.setupGraph = function () {
  console.log("setting up graph");
  this.rainfallGraph = new RainGraph('rainGraphContainer');
  this.rainfallGraph.setup();
};

dataCollector.prototype.getData = function () {
  var that = this;
  $.getJSON( "/data", function( data ) {
    that.data = data;
    that.processData();
  });
};

dataCollector.prototype.processData = function () {
  this.procData = {
    "day": 0,
    "week": 0,
    "month": 0,
    "year": 0,
    "hour": 0
  };

  var procTime = Date.now()

  var timeAgo = {
    "day": 24*60*60*1000,
    "week": 7*24*60*60*1000,
    "month": 30*24*60*60*1000,
    "year": 365*24*60*60*1000,
    "hour": 60*60*1000
  };

  for (var i in this.data.rain) {
    var time = this.data.rain[i];

    //increment each element if it's in that time period
    for (var tType in this.procData) {
      if (time > procTime - timeAgo[tType]) {
        this.procData[tType] += this.calibration;
      }
    }
  }

  this.procData["values"] = this.createIntervalData(this.data.rain);

  this.updateValues();
};

dataCollector.prototype.updateValues = function () {
  this.rainfallGraph.updateData(this.procData.values);

  $('#hourlyRainfall .value').html(round(this.procData['hour'],2));
  $('#weeklyRainfall .value').html(round(this.procData['week'],2));
  $('#todayRainfall .value').html(round(this.procData['day'],2));
};

dataCollector.prototype.createIntervalData = function (data) {
  var maxTime = 7*24*60*60*1000
  var procTime = Date.now()

  var rainData = [];

  for (var i in data) {
    rainData.push([data[i]+10*60*60*1000,this.calibration]);
  }

  return rainData;
}


var app = new dataCollector();
app.setup();

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
