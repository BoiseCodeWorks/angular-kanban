(function () {

	var app = angular.module('ngKanban');

	app.factory('usersService', ['$rootScope', '$q', 'notificationService', function ($rootScope, $q, notificationService) {

		function createAccount(user) {

			firebase.auth()
				.createUserWithEmailAndPassword(user.email, user.password)
				.then(function (newUser) {

					newUser.updateProfile({
						displayName: user.name,
						photoURL: 'https://api.adorable.io/avatars/100/' + user.email + '.png'
					})
						.then(
						function () {
							$rootScope.$broadcast('profile-updated', newUser);
							$rootScope.$broadcast('userlist-updated');
						}
						)
						.catch(function (error) {
							// TODO: broadcast error message
							console.log(error);
						});
				})
				.catch(function (error) {
					// TODO: broadcast error message
					console.log(error);
				}
			);
		}

		function authorizeAccount(user) {
			firebase.auth()
				.signInWithEmailAndPassword(user.email, user.password)
				.then(function (user) {
					addOnlineUser(user);
				})
				.catch(function (error) {
					notificationService.showError('Login Failed', error.message);
					console.log(error);
				}
			);
		}

		function exitAccount() {

			if (firebase.auth().currentUser) {
				removeOnlineUser(firebase.auth().currentUser);
      		} 
		}

		function subscribeToOnlineUsers() {

			firebase.database().ref('users/').on('value', function (snapshot) {

				var users = [];
				
				snapshot.forEach(function(childSnapshot) {
					users.push(childSnapshot.val());
				});

				$rootScope.$broadcast('userlist-updated', users);
			});
		}

		function addOnlineUser(user) {
			firebase.database().ref('users/' + user.uid).set({
				id: user.uid,
				name: user.displayName,
				photoURL: user.photoURL,
				lastLogin: new Date().getTime()
			}).then(function () {
				$rootScope.$broadcast('userlist-updated');
			});
		}

		function removeOnlineUser(user) {
			firebase.database().ref('users/' + user.uid).remove().then(
				function () {
					firebase.auth().signOut();
					$rootScope.$broadcast('userlist-updated');
				}
			);
		}

		return {
			createAccount: createAccount,
			authorizeAccount: authorizeAccount,
			exitAccount: exitAccount,
			subscribeToOnlineUsers: subscribeToOnlineUsers
		};
	}]);
})();