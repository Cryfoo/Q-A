var qa = require("./../controllers/qa.js");

module.exports = function(app) {
	app.post("/login", qa.login);
	app.get("/questions", qa.index_q);
	app.post("/question", qa.create_q);
	app.post("/answer", qa.create_a);
	app.get("/:id/answers", qa.answers);
	app.get("/:id/ans_like", qa.update_like)
}