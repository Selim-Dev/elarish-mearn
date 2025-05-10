const express = require('express')
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router()
const jwt = require('jsonwebtoken')


const verifyUser = async (req,res,next)=>{
	const token = req.headers.authorization;
	if(!token){
		const error = new Error('please provide token');
		error.statusCode = 403; //not authorized
		next(error)
	}
	const payload = jwt.verify(token,process.env.JWT_SECRET);
	const user = await User.findOne({email: payload.email});
	if(!user){
		const error = new Error('user not found');
		error.statusCode = 403;
		next(error)
	}
	req.user = user;
	next();
}


router.post('/',verifyUser,async(req,res,next)=>{
	try{
		const {title,content} = req.body;
		const post = await Post.create({title,content,author:req.user._id});
		res.send(post)
	}catch(err){
		next(err)
	}
})






router.get('/',async (req,res)=>{
	try{
		const  posts = await Post.find().populate('author');
		res.send(posts)
	}catch(err){
		res.status(500).send({
			status: 'fail',
			message: "error reading posts"
		})
	}
})
router.get('/:id',(req,res)=>{
	res.send("successs postsssss")
})








router.patch('/:id',(req,res)=>{
	res.send("success")
})
router.delete('/:id',(req,res)=>{
	res.send("success")
})




module.exports = router