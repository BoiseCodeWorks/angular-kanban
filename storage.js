(function () {
	
	var app = angular.module('ngKanban');

	app.factory('storageService', ['$q', function ($q) {
		
		function getItems() {
			return [];
		}

		return {
			getItems: getItems
		};
	}]);	
})();