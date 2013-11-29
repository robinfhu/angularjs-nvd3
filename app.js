var nvApp = angular.module('nvApp',[]);

/*
Controller for the application.
*/
nvApp.controller('PieChartController', function($scope) {

	$scope.newValue = 2;
	$scope.title = "Pie Chart Widget";
	$scope.pieData = [
	    {
	      key: "One",
	      y: 5
	    }
	  ];

	$scope.pieRandomData = [];

	$scope.count = 2;
	$scope.addData = function add(dataValue) {
		console.log('adding: ' + dataValue);
		$scope.pieData.push({
			key: 'Data ' + $scope.count,
			y: dataValue
		});

		$scope.pieRandomData.push({
			key: 'Data ' + $scope.count,
			y: Math.random()
		});

		$scope.count++;
	};

	$scope.outputData = function output() {
		var result = '';
		angular.forEach($scope.pieData, function(item) {
			result += item.y + ','
		});

		return result;
	};
});

//Create a directive for <div nv-pie-chart>
nvApp.directive('nvPieChart', function(){
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
				    var width = attrs.chartWidth,
				        height = attrs.chartHeight;

				    var chart = nv.models.pieChart()
				        .x(function(d) { return d.key })
				        .y(function(d) { return d.y })
				        .color(d3.scale.category10().range())
				        .width(width)
				        .height(height);

				      d3.select(svgElem)
				          .datum(data)
				        .transition().duration(1200)
				          .attr('width', width)
				          .attr('height', height)
				          .call(chart);

				    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

				    return chart;
				});
			}

			newChart(scope.chartData);
			
		}
	};
});


//Directive that sets focus for an input box.
nvApp.directive('startFocus', function() {
	return function(scope,elem,attrs) {
		elem[0].focus();
	};
});