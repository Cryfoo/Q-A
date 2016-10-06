app.factory("answersFactory", ["$http", function($http) {
	var questions = [];
	function AnswersFactory() {
		this.index = function(callback){
			$http.get('/questions').then(function(returned_data){
				questions = returned_data.data;
				callback(returned_data.data);
			}
		)}
		this.create = function(newAns, callback) {
			$http.post("/answer", newAns).then(function(returned_data) {
				if (typeof(callback) == "function") {
					callback(returned_data.data);
				}
			});
		}
		this.getQuestion = function(index, callback) {
			if (typeof(callback) == "function") {
				for (var i in questions) {
					if (questions[i]._id === index) {
						callback(questions[i]);
					}
				}
			}
		}
		this.updateLike = function(index, callback) {
			$http.get("/" + index + "/ans_like").then(function(returned_data) {
				if (typeof(callback) == "function") {
					callback(returned_data.data);
				}
			});
		}
	}
	return new AnswersFactory();
}]);