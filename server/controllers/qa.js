var mongoose = require("mongoose");
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Answer = mongoose.model("Answer");

module.exports = {
	login: function(req, res) {
		var name = req.body.name.toLowerCase();
		name = name.charAt(0).toUpperCase() + name.slice(1);
		User.findOne({name: name}, function(err, user) {
			if (user == null) {
				var user = new User({name: name});
				user.save(function(err) {
					if (err) {
						console.log("Log in error!");
						res.json({result: "failure"});
					} else {
						console.log("Logged in successfully!");
						res.json({user: user, result: "success"});
					}
				});
			} else {
				console.log("Logged in successfully!");
				res.json({user: user, result: "success"});
			}
		});
	},
	index_q: function(req, res) {
		Question.find({}, function(err, questions) {
			if (err) {
				console.log("Accessing list of questions error!");
			} else {
				console.log("List of questions returned from DB");
				res.json(questions);
			}
		});
	},
	create_q: function(req, res) {
		User.findOne({_id: req.body[1]._id}, function(err, user) {
			var question = new Question(req.body[0]);
			question._user = user._id;
			question.save(function(err) {
				if (err) {
					console.log("Question save error!");
					res.json({msg: err.errors, result: "failure"})
				} else {
					user.questions.push(question);
					user.save(function(err) {
						if (err) {
							console.log("User save error!");
							res.json({result: "failure"});
						} else {
							console.log("Question saved!");
							res.json({question: question, result: "success"});
						}
					})
				}
			})
		})
	},
	create_a: function(req, res) {
		User.findOne({_id: req.body[2]._id}, function(err, user) {
			var answer = new Answer(req.body[0]);
			answer.name = user.name;
			answer._user = user._id;
			Question.findOne({_id: req.body[1]._id}, function(err, question) {
				answer._question = question._id;
				answer.save(function(err) {
					if (err) {
						console.log("Answer save error!");
						res.json({msg: err.errors, result: "failure"})
					} else {
						user.answers.push(answer);
						user.save(function(err) {
							if (err) {
								console.log("User save error!");
								res.json({result: "failure"});
							} else {
								question.answers.push(answer);
								question.save(function(err) {
									console.log("Answer saved!");
									res.json({answer: answer, result: "success"});
								});
							}
						})
					}
				})
			});
		})
	},
	answers: function(req, res) {
		Question.findOne({_id: req.params.id})
		.populate("answers")
		.exec(function(err, question) {
			if (err) {
				console.log("Accessing a question with answers error!");
			} else {
				console.log("Question with answers returned from DB");
				res.json(question);
			}
		});
	},
	update_like: function(req, res) {
		Answer.findOne({_id: req.params.id}, function(err, answer) {
			answer.likes++;
			answer.save(function(err) {
				if (err) {
					console.log("Update like error!");
				} else {
					console.log("Like updated!");
					res.json({answer: answer, result: "success"});
				}
			});
		});
	}
}