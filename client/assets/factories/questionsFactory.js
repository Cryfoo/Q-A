app.factory("questionsFactory", ["$http", function($http) {
	var questions = [];
	function QuestionsFactory() {
		this.index = function(callback){
			$http.get('/questions').then(function(returned_data){
				questions = returned_data.data;
				callback(returned_data.data);
			}
		)}
		this.create = function(newQue, callback) {
			$http.post("/question", newQue).then(function(returned_data) {
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
		this.getAnswers = function(index, callback) {
			$http.get("/" + index + "/answers").then(function(returned_data) {
				if (typeof(callback) == "function") {
					callback(returned_data.data.answers);
				}
			});
		}
	}
	return new QuestionsFactory();
}]);