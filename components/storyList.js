(function () {
	
	var app = angular.module('ngKanban');

	app.component('storyList', {
		templateUrl: 'templates/storyList.html',
		controller: storyListController,
		controllerAs: 'sl',
		bindings: {
			list: '<'
		},
		require: {
			board: '^storyBoard'
		}
	});

	app.controller('cardModalController', cardModalController);
	
	storyListController.$inject = ['$uibModal', 'storageService', 'guidService'];
	cardModalController.$inject = ['$uibModalInstance', 'card'];
	
	function storyListController($uibModal, storageService, guidService) {

		var sl = this;
		
		sl.cards = [];

		sl.$onInit = function () {
			storageService.getStories().then(
				function (cards) {
					sl.cards = cards;
				}
			);
		}

		sl.editList = function () {
			sl.board.editList(sl.list);
		}

		sl.deleteList = function () {
			sl.board.deleteList(sl.list);
		}

		sl.addCard = function () {
			
			var modalInstance = $uibModal.open({
				templateUrl: 'storyCardModal.html',
				controller: 'cardModalController',
				controllerAs: 'cm',
				resolve: {
					card: function () {
						return null;
					}
				}
			});

			modalInstance.result.then(
				function (newCard) {

					guidService.getGuid().then(
						function (response) {

							newCard.id = response.data;

							sl.cards = storageService.addStory(newCard);
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
		}
	}

	function cardModalController($uibModalInstance, card) {

		var cm = this;

		cm.isEdit = card ? true : false;		
		cm.list = card || {
			summary: '',
			detail: ''
		};

		cm.ok = function () {
			$uibModalInstance.close(cm.card);
		};

		cm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	}
})();