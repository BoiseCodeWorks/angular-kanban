(function () {
	
	var app = angular.module('ngKanban', []);

	app.controller('storyController', ['storageService', function (storageService) {
		
		var vm = this;

		vm.stories = [];

		storageService.getStories().then(
			function (stories) {
				vm.stories = stories;
			}
		);

	}]);	
})();