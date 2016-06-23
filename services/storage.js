(function () {
	
	var app = angular.module('ngKanban');

	app.factory('storageService', ['$q', function ($q) {
		
		var LIST_STORAGE_ID = 'kanban-list-store';
		var STORY_STORAGE_ID = 'kanban-story-store';
		var lists = [];
		var stories = [];

		function addList(list) {
			
			lists.push(list);
			saveToLocalStorage();

			return lists; 
		}	

		function updateList(list) {

			var original = lists.find(function (item) {
				return item.id === list.id;
			})

			original.name = list.name;
			original.description = list.description;
			
			saveToLocalStorage();

			return lists;
		}

		function deleteList(list) {

			lists = lists.filter(function (item) {
				return item.id !== list.id;
			});

			saveToLocalStorage();

			return lists;
		}
		
		function getLists() {

			var deferred = $q.defer();

			lists = JSON.parse(localStorage.getItem(LIST_STORAGE_ID) || '[]');
			
			deferred.resolve(lists);
			
			return deferred.promise;
		}

		function addStory(story) {
			
			stories.push(story);
			saveToLocalStorage();

			return stories; 
		}	

		function updateStory(story) {

			var original = stories.find(function (item) {
				return item.id === story.id;
			})

			original.name = story.name;
			original.details = story.details;
			
			saveToLocalStorage();

			return stories;
		}

		function deleteStory(story) {

			stories = stories.filter(function (item) {
				return item.id !== story.id;
			});

			saveToLocalStorage();

			return stories;
		}
		
		function getStories() {

			var deferred = $q.defer();

			stories = JSON.parse(localStorage.getItem(STORY_STORAGE_ID) || '[]');
			
			deferred.resolve(stories);
			
			return deferred.promise;
		}

		function saveToLocalStorage() {
			localStorage.setItem(LIST_STORAGE_ID, JSON.stringify(lists));
			localStorage.setItem(STORY_STORAGE_ID, JSON.stringify(stories));
		}

		return {
			addList: addList,
			getLists: getLists,
			updateList: updateList,
			deleteList: deleteList,
			addStory: addStory,
			getStories: getStories,
			updateStory: updateStory,
			deleteStory: deleteStory
		};
	}]);	
})();