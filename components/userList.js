(function () {

	var app = angular.module('ngKanban');

	app.component('userList', {
		templateUrl: 'templates/userList.html',
		controller: userListController,
		controllerAs: 'ul'
	});

	userListController.$inject = ['$scope', '$timeout', 'firebaseService'];

	function userListController($scope, $timeout, firebaseService) {

		var ul = this;

		$scope.$on('userlist-updated', function (event, users) {
			$timeout(function () {
				$scope.$apply(function () {
					ul.users = users;
				});
			}, 100);			
		});

		ul.$onInit = function () {
			updateList();
		}

		function updateList() {
			firebaseService.getOnlineUsers().then(
				function (users) {
					ul.users = users;
					console.log(users);
				}
			);
		}
	}

})();