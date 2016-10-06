var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	questions: [{
		type: Schema.Types.ObjectId,
		ref: "Question"
	}],
	answers: [{
		type: Schema.Types.ObjectId,
		ref: "Answer"
	}]
}, {timestamps: true});

mongoose.model("User", UserSchema);