requirejs.config({
	paths: {
		'angular': 'lib/angular',
		'd3': 'lib/d3.v3',
		'nvd3': 'lib/nv.d3'
	},
	shim: {
		'angular': {
			exports: 'angular'
		},
		'd3': {
			exports: 'd3'
		},
		'nvd3': {
			deps: ['d3'],
			exports: 'nvd3'
		}
	}
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular','app','controllers'], function(angular, app,controllers) {
	 var $html = angular.element(document.getElementsByTagName('html')[0]);
	 angular.element().ready(function() {
          angular.resumeBootstrap([app['name']]);
     });
});