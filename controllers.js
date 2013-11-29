define(function(require) {
	var nvApp = require('app');
	require('directives');
	require('services');
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
});
	
