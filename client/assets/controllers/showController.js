app.controller("showController", ["$scope", "usersFactory", "questionsFactory", "answersFactory", "$location", "$routeParams", function($scope, usersFactory, questionsFactory, answersFactory, $location, $routeParams) {
	usersFactory.getUser(function(user) {
		$scope.user = user;
	});
	questionsFactory.getQuestion($routeParams.id, function(question) {
		$scope.question = question;
	});
	questionsFactory.getAnswers($routeParams.id, function(answers) {
		$scope.answers = answers;
	});

	$scope.logout = function() {
		usersFactory.logout();
		$scope.user = null;
		$location.url("/index");
	}
	$scope.like = function(id) {
		answersFactory.updateLike(id, function(returned_data) {
			if (returned_data.result == "success") {
				for (var i = 0; i < $scope.answers.length; i++) {
					if ($scope.answers[i]._id == returned_data.answer._id) {
						$scope.answers[i] = returned_data.answer;
					}
				}
			}
		});
	}
}]);