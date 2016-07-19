(function () {
	
	var app = angular.module('ngKanban');

	app.factory('storageService', ['$q','$rootScope', function ($q,$rootScope) {
		
		var LIST_STORAGE_ID = 'kanban-list-store';
		var STORY_STORAGE_ID = 'kanban-story-store';
		var lists = [];
		var stories = [];

		// set up firbase subscriptions for lists and stories
		function subscribeToListUpdates() {

			firebase.database().ref('/lists').on('value', function (snapshot) {
			
				var lists = [];

				snapshot.forEach(function (childSnapshot) {
					console.log(childSnapshot.val());
					lists.push(childSnapshot.val());
				});
		
				$rootScope.$broadcast('lists-updated', lists);
			});
		}	

		function subscribeToStoriesUpdates(listId) {

			firebase.database().ref('/stories').on('value', function (snapshot) {
			
				var stories = [];

				snapshot.forEach(function (childSnapshot) {
					
					var story = childSnapshot.val();

					if (story.listId === listId) {
						stories.push(story);
					}

				});
		
				$rootScope.$broadcast('stories-updated', {
					listId: listId,
					stories: stories
				});
			});
		}	

		function saveList(list) {

			firebase.database().ref('/lists/' + list.id).set(list);			
		}		

		function deleteList(list) {

			firebase.database().ref('/lists/' + list.id).remove();

		}

		function saveStory(story) {
			
			firebase.database().ref('/stories/' + story.id).set(story);			

		}	

		function deleteStory(story) {

			firebase.database().ref('/stories/' + story.id).remove();			

		}

		function findStories(term) {

			var found = stories.filter(function (item) {
				
				var data = item.summary.toLowerCase() + ' ' + item.detail.toLowerCase();

				return data.includes(term.toLowerCase());
			});	
			
			return found;
		}

		function saveToLocalStorage() {
			localStorage.setItem(LIST_STORAGE_ID, JSON.stringify(lists));
			localStorage.setItem(STORY_STORAGE_ID, JSON.stringify(stories));
		}

		return {
			saveList: saveList,
			deleteList: deleteList,
			saveStory: saveStory,
			deleteStory: deleteStory,
			findStories: findStories,
			subscribeToListUpdates: subscribeToListUpdates,
			subscribeToStoriesUpdates: subscribeToStoriesUpdates
		};
	}]);	
})();