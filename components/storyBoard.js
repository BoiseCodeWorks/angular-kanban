(function () {
	
	var app = angular.module('ngKanban');

	app.component('storyBoard', {
		templateUrl: 'templates/storyBoard.html',
		controller: storyBoardController,
		controllerAs: 'sb'
	});

	app.controller('listModalController', listModalController);

	storyBoardController.$inject = ['$uibModal', 'storageService', 'guidService'];
	listModalController.$inject = ['$uibModalInstance', 'list'];
	
	function storyBoardController($uibModal, storageService, guidService) {

		var sb = this;
		
		sb.lists = [];
		
		sb.addList = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'storyListModal.html',
				controller: 'listModalController',
				controllerAs: 'lm',
				resolve: {
					list: function () {
						return null;
					}
				}
			});

			modalInstance.result.then(
				function (newList) {

					guidService.getGuid().then(
						function (response) {

							newList.id = response.data;

							sb.lists = storageService.addList(newList);
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
	}

	function listModalController($uibModalInstance, list) {

		var lm = this;

		lm.isEdit = list ? true : false;		
		lm.list = list || {
			name: '',
			description: ''
		};

		lm.ok = function () {
			$uibModalInstance.close(lm.list);
		};

		lm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	}
})();

