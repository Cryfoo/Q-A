app.controller("newQueController", ["$scope", "usersFactory", "questionsFactory", "$location", function($scope, usersFactory, questionsFactory, $location) {
	usersFactory.getUser(function(user) {
		$scope.user = user;
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
		questionsFactory.create([$scope.question, $scope.user], function(returned_data) {
			if (returned_data.result === "success") {
				$location.url("/");
			} else {
				$scope.errors = returned_data.msg;
				$location.url("/new_question");
			}
		});
	}
}]);