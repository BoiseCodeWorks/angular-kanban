(function () {

	var app = angular.module('ngKanban');

	app.component('storyBoard', {
		templateUrl: 'templates/storyBoard.html',
		controller: storyBoardController,
		controllerAs: 'vm'
	});

	app.controller('listModalController', listModalController);

	storyBoardController.$inject = ['$uibModal', 'storageService', 'guidService'];
	listModalController.$inject = ['$uibModalInstance', 'list'];
	
	function storyBoardController($uibModal, storageService, guidService) {

		var vm = this;
		
		vm.lists = [];
		
		vm.addList = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'addListModal.html',
				controller: 'listModalController',
				controllerAs: 'vm',
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

							vm.lists.push(newList);	
							console.log('lists: ', vm.lists);
							//vm.lists = storageService.addList(newList);
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

		var vm = this;

		vm.isEdit = list ? true : false;		
		vm.list = list || {
			name: '',
			description: ''
		};

		vm.ok = function () {
			$uibModalInstance.close(vm.list);
		};

		vm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	}
})();

