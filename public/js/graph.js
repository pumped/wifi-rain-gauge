function RainGraph(container) {
  this.container = container;
}

RainGraph.prototype.updateData = function(data) {
  console.log(data);

  if (this.rainfallGraph) {
    console.log(this.rainfallGraph.series)
    this.rainfallGraph.series[0].setData(data);
  }

}

RainGraph.prototype.setup = function () {
  data = [];
  this.rainfallGraph = Highcharts.stockChart('rainGraphContainer', {
            chart: {
                alignTicks: false
            },

            rangeSelector: {
                selected: 1
            },

            title: {
                text: ''
            },

            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: { // don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                ordinal: false,
                title: {
                    text: 'Date'
                }
            },

            plotOptions: {
                 spline: {
                     marker: {
                         enabled: true
                     }
                 }
             },

            series: [{
                type: 'column',
                name: 'Rainfall',
                data: data,
                dataGrouping: {
                  enabled:true,
                  forced:true,
                    units: [[
                        'minute', // unit name
                        [30] // allowed multiples
                    ],[
                        'hour', // unit name
                        [1, 24] // allowed multiples
                    ], [
                        'week',
                        [1]
                    ], [
                        'month',
                        [1,6]
                    ], [
                        'year',
                        [1]
                    ]]
                }
            }]
        });
};
