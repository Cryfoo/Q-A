app.controller("newAnsController", ["$scope", "usersFactory", "questionsFactory", "answersFactory", "$location", "$routeParams", function($scope, usersFactory, questionsFactory, answersFactory, $location, $routeParams) {
	usersFactory.getUser(function(user) {
		$scope.user = user;
	});
	questionsFactory.getQuestion($routeParams.id, function(question) {
		$scope.question = question;
	});

	$scope.logout = function() {
		usersFactory.logout();
		$scope.user = null;
		$location.url("/index");
	}
	$scope.cancel = function() {
		$location.url("/");
	}
	$scope.create = function() {
		$scope.answer.likes = 0;
		answersFactory.create([$scope.answer, $scope.question, $scope.user], function(returned_data) {
			if (returned_data.result === "success") {
				$location.url("/");
			} else {
				$scope.errors = returned_data.msg;
			}
		});
	}
}]);