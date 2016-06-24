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

	function storyListController() {

		var sl = this;
		
		sl.editList = function () {
			sl.board.editList(sl.list);
		}

		sl.deleteList = function () {
			sl.board.deleteList(sl.list);
		}
	}
})();