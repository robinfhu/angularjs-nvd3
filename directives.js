define(function(require) {
	var nvApp = require('app');
	require('nvd3');
	//Create a directive for <div nv-pie-chart>
	nvApp.directive('nvPieChart', ['stateService',function(stateService){
		return {
			restrict: 'A',
			template: '<svg></svg>',
			scope: {
				chartData: '='
			},
			link: function(scope,element,attrs) {
				element.css('height','300px');
				var svgElem = element.find('svg')[0];
				scope.$watch('chartData', function(newVal,oldVal) {
					newChart(newVal);
				},true);
				
				function newChart(data) {
					//Call nvd3 to add the chart.
					nv.addGraph(function() {

					    var chart = nv.models.pieChart()
					        .x(function(d) { return d.key })
					        .y(function(d) { return d.y })
					        .color(d3.scale.category10().range())
					        ;

					      d3.select(svgElem)
					          .datum(data)
					        .transition().duration(1200)
					          .call(chart);

					    chart.dispatch.on('stateChange', function(e) { 
					    	stateService.setState(e);
					    });

					    return chart;
					});
				}

				newChart(scope.chartData);
				
			}
		};
	}]);

	//Create a directive for <div nv-pie-chart>
	nvApp.directive('nvLineChart', ['stateService',function(stateService){
		return {
			restrict: 'A',
			template: '<svg></svg>',
			scope: {
				chartData: '='
			},
			link: function(scope,element,attrs) {
				element.css('height','300px');
				var svgElem = element.find('svg')[0];
				scope.$watch('chartData', function(newVal,oldVal) {
					newChart(newVal);
				},true);
				
				var yAxisLabel = attrs.yAxisLabel || 'no label';
				function newChart(data) {
					//Call nvd3 to add the chart.
					nv.addGraph(function() {
					    var chart = nv.models.lineChart()
						  .options({
						    margin: {left: 100, bottom: 100},
						    x: function(d,i) { return i},
						    showXAxis: true,
						    showYAxis: true,
						    transitionDuration: 250
						  })
						  ;

						  // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
						  chart.xAxis
						    .axisLabel("Time (s)")
						    .tickFormat(d3.format(',.1f'));

						  chart.yAxis
						    .axisLabel(yAxisLabel)
						    .tickFormat(d3.format(',.2f'));

						  d3.select(svgElem)
						    .datum(data)
						    .call(chart);

						return chart;
					});
				}

				newChart(scope.chartData);
				
			}
		};
	}]);


	//Directive that sets focus for an input box.
	nvApp.directive('startFocus', function() {
		return function(scope,elem,attrs) {
			elem[0].focus();
		};
	});
});