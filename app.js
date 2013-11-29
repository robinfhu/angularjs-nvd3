var nvApp = angular.module('nvApp',[]);

/*
Controller for the application.
*/
nvApp.controller('PieChartController', 
	['$scope','randomDataService', 'stateService',function($scope,randomDataService,stateService) {

	$scope.newValue = 2;
	$scope.title = "Pie Chart Widget";
	$scope.pieData = [
	    {
	      key: "One",
	      y: 5
	    }
	  ];

	$scope.currentState = stateService.getState();
	$scope.updateState = function() {
		$scope.currentState = stateService.getState();
	}

	$scope.pieRandomData = randomDataService();

	$scope.count = 2;
	$scope.addData = function add(dataValue) {
		console.log('adding: ' + dataValue);
		$scope.pieData.push({
			key: 'Data ' + $scope.count,
			y: dataValue
		});

		$scope.pieRandomData = randomDataService();

		$scope.count++;
	};

	$scope.outputData = function output() {
		var result = '';
		angular.forEach($scope.pieData, function(item) {
			result += item.y + ','
		});

		return result;
	};
}]);

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


//Directive that sets focus for an input box.
nvApp.directive('startFocus', function() {
	return function(scope,elem,attrs) {
		elem[0].focus();
	};
});

nvApp.factory('randomDataService', function() {
	return function randomDataService() {
		var data = [];
		for(var i =0; i < 7; i++) {
			data.push({
				key: 'Series ' + i,
				y: Math.random()
			});
		}

		return data;
	};
});

nvApp.factory('stateService', function() {
	var state = {};
	return {
		setState: function(s) {
			state = s;
		},
		getState: function() {
			return JSON.stringify(state);
		}
	};
});