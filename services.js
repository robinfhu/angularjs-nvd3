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

	nvApp.factory('stockService', function() {
		return function volatileChart(key,startPrice, volatility, isArea) {
		     var rval = {key: key, values: []};
		     if (isArea) rval.area = true;
		     for(var i = 1; i < 100; i++) {

		        rval.values.push({x: i, y: (i > 110 && i < 130) ? null : startPrice});
		        var rnd = Math.random();
		        var changePct = 2 * volatility * rnd;
		        if ( changePct > volatility) {
		           changePct -= (2*volatility);
		        }

		        startPrice = startPrice + startPrice * changePct;

		     }
		     return rval;
		  }
	});
});
	