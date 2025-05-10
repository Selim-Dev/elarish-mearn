const mongoose = require('mongoose');
const {Schema } = mongoose;


const postSchema = new Schema({
	title:{type: String,required:true},
	content:{type:String , required:true},
	author: {ref: 'User', type: Schema.Types.ObjectId,required:true}
})


module.exports = mongoose.model("Post",postSchema);