define(function(require) {
	var angular = require('angular');
	var filtersModule = angular.module('nvApp.filters',[]);
	filtersModule.filter('arrayPretty', function() {
		return function(input) {
			var out = '';
			for(var i =0; i < input.length; i++) {
				out += input[i].y + ' : ';
			}
			return out;
		};
	});
	return filtersModule;
});