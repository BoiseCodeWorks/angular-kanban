(function () {

	var app = angular.module('ngKanban', ['ui.bootstrap']);

	app.controller('appController', ['storageService', function (storageService) {
		
		var ac = this;

		ac.searchTerm = '';

		ac.search = function () {
			var results = storageService.findStories(ac.searchTerm);
			console.log(results);
		};
	}]);

	app.controller('searchResultsController', ['$uibModalInstance', 'results', 'term', function ($uibModalInstance, results, term) {
		
		var rm = this;

		results = results.map(function (item) {
			item.summary = item.summary.replace(new RegExp(term, 'gi'), )
		});

		rm.results = results;
	}]);

})();
