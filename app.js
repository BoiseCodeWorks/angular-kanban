(function () {

	var app = angular.module('ngKanban', ['ui.bootstrap']);

	app.controller('storyController', ['storageService', 'guidService', '$uibModal', function (storageService, guidService, $uibModal) {

		var vm = this;

		vm.stories = [];

		vm.addStory = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'addStoryModal.html',
				controller: 'newStoryModalController',
				controllerAs: 'vm'
			});

			modalInstance.result.then(
				function (newStory) {

					guidService.getGuid().then(
						function (response) {

							newStory.id = response.data;

							vm.stories = storageService.addStory(newStory);
						}
					).catch(
						function (err) {
							console.log('Something went wrong: ', err);
						}
					);
				},
				function () {
					// cancelled
				}
			);


		};

		storageService.getStories().then(
			function (stories) {
				vm.stories = stories;
			}
		);

	}]);

	app.controller('newStoryModalController', ['$uibModalInstance', function ($uibModalInstance) {

		var vm = this;

		vm.newStory = {
			name: '',
			details: ''
		};

		vm.ok = function () {
			$uibModalInstance.close(vm.newStory);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}]);
})();
