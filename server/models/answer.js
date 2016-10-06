var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
	answer: {
		type: String,
		required: true,
		minlength: 5
	},
	detail: {
		type: String
	},
	name: {
		type: String
	},
	likes: {
		type: Number
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	_question: {
		type: Schema.Types.ObjectId,
		ref: "Question"
	}
}, {timestamps: true});

mongoose.model("Answer", AnswerSchema);