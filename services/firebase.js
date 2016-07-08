(function () {

	var app = angular.module('ngKanban');

	app.factory('firebaseService', ['$q', function ($q) {

		function createAccount(user) {

			firebase.auth()
				.createUserWithEmailAndPassword(user.email, user.password)
				.catch(function (error) {

					console.log(error);
				}
			);
		}

		function authorizeAccount(user) {
			firebase.auth()
				.signInWithEmailAndPassword(user.email, user.password)
				.catch(function (error) {

					console.log(error);
				}
			);
		}

		function addList(list) {

			firebase.database().ref('lists/' + list.id).set(list);
		}

		return {
			createAccount: createAccount,
			authorizeAccount: authorizeAccount,
			addList: addList
		};
	}]);
})();