(function () {

	var app = angular.module('ngKanban');

	app.component('userList', {
		templateUrl: 'templates/userList.html',
		controller: userListController,
		controllerAs: 'ul'
	});

	userListController.$inject = ['globals', '$scope', '$timeout', 'usersService', 'chatService', '$uibModal'];

	function userListController(globals, $scope, $timeout, usersService, chatService, $uibModal) {

		var ul = this;

		ul.users = [];

		ul.$onInit = function () {

			if (globals.user) {
				subscribeToChats();
				subscribeToUsers();
			}
			else {
				ul.users = [];
			}

			$scope.$on('user-updated', function (event) {

				if (globals.user) {
					subscribeToChats();
					subscribeToUsers();
				}
				else {
					ul.users = [];
				}
			});

		}

		ul.userChat = function (user) {

			var modalInstance = $uibModal.open({
				templateUrl: 'userChatModal.html',
				controller: 'userChatController',
				controllerAs: 'uc',
				resolve: {

					user: function () {
						return user;
					}

				}
			});

			modalInstance.result.then(
				function (user) {
					//$rootScope.$broadcast('edit-story', story);
				},
				function () {
					// cancelled
				}
			);
		}

		function subscribeToChats() {

			$scope.$on('chat-conversations-updated', function (event, conversations) {

				conversations.forEach(function (item) {
					chatService.subscribeToMessages(item);
				});
			});

			$scope.$on('chat-messages-updated', function (event, messages) {
				console.log('Messages: ', messages);
			});

			chatService.subscribeToConversations(globals.user.uid);
		}

		function subscribeToUsers() {

			$scope.$on('userlist-updated', function (event, users) {

				if (users && users.length) {
					users = users.filter(function (item) {
						return item.id !== globals.user.uid;
					});
				}

				$timeout(function () {
					$scope.$apply(function () {
						ul.users = users;
					});
				}, 100);
			});

			usersService.subscribeToOnlineUsers();
		}
	}

	app.controller('userChatController', ['globals', '$uibModalInstance', 'chatService', 'user', function (globals, $uibModalInstance, chatService, user) {

		var uc = this;
		uc.members = [];

		uc.members.push(globals.user);
		uc.members.push(user);

		var conversationId = globals.user.uid > user.id ? globals.user.uid + '-' + user.id : user.id + '-' + globals.user.uid;

		chatService.postMessage(conversationId, globals.user.uid, user.id, 'Yo dude!, Whats up?');

		uc.close = function () {
			$uibModalInstance.dismiss('cancel');
		}

	}]);

})();