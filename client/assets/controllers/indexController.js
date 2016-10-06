app.controller("indexController", ["$scope", "usersFactory", "questionsFactory", "$location", function($scope, usersFactory, questionsFactory, $location) {
	usersFactory.getUser(function(user) {
		$scope.user = user;
	})
	questionsFactory.index(function(questions) {
		$scope.questions = questions;
	});
	$scope.logout = function() {
		usersFactory.logout();
		$scope.user = null;
		$location.url("/index");
	}
}]);