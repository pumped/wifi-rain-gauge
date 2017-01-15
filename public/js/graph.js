function RainGraph(container) {
  this.container = container;
}

RainGraph.prototype.updateData = function(data) {
  //console.log(data);
}

RainGraph.prototype.setup = function () {
  var rainfallGraph =  Highcharts.chart(this.container, {
        title: {
            text: 'Rainfall',
            x: -20 //center
        },
        chart: {
           type: 'column'
       },
        xAxis: {
          title: { text: 'Time' }
        },
        yAxis: {
            title: {
                text: 'Rainfall (mm)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'mm'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled:false
        },
        series: [{
            name: 'Rainfall',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
};
