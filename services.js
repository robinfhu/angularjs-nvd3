define(function(require) {
	var nvApp = require('app');
	
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
});
	