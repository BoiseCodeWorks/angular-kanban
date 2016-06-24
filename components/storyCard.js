(function () {
	
	var app = angular.module('ngKanban');

	app.component('storyCard', {
		templateUrl: 'templates/storyCard.html',
		controller: storyCardController,
		controllerAs: 'sc',
		bindings: {
			card: '<'
		},
		require: {
			list: '^storyList'
		}
	});

	function storyCardController() {

		var sc = this;
	
	}

})();