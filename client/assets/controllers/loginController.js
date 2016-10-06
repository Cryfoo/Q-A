app.controller("loginController", ["$scope", "usersFactory", "$location", function($scope, usersFactory, $location) {
	$scope.login = function() {
		usersFactory.login($scope.user, function(returned_data) {
			if (returned_data.result === "success") {
				$location.url("/");
			} else {
				$location.url("/index");
			}
		});
	}
}]);