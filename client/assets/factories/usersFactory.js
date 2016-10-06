app.factory("usersFactory", ["$http", function($http) {
	var user = [];
	function UsersFactory() {
		this.login = function(loginUser, callback) {
			$http.post("/login", loginUser).then(function(returned_data) {
				if (typeof(callback) == "function") {
					if (returned_data.data.result === "success") {
						user = returned_data.data.user;
					}
					callback(returned_data.data);
				}
			});
		}
		this.getUser = function(callback) {
			callback(user);
		}
		this.logout = function() {
			user = [];
		}
	}
	return new UsersFactory();
}])