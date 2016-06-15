(function () {
	
	var app = angular.module('ngKanban', []);

	app.controller('storyController', ['storageService', function (storageService) {
		
		var vm = this;

		vm.stories = [];
		vm.newStory = {
			name: '',
			details: ''
		};

		vm.addStory = function () {

			var newStory = angular.copy(vm.newStory);

			vm.stories = storageService.addStory(newStory);
			
			vm.newStory.name = '';
			vm.newStory.details = '';
		};	
		
		storageService.getStories().then(
			function (stories) {
				vm.stories = stories;
			}
		);

	}]);	
})();