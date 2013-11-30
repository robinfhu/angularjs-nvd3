define(function(require) {
	var angular = require('angular');
	var filtersModule = require('filters');
	var nvApp = angular.module('nvApp',['nvApp.filters']);

	return nvApp;
});




