
const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Joi = require('joi')


const signup = async (req,res)=>{
	const {name, email, password} = req.body;
	const hashedPassword = await bcrypt.hash(password,+process.env.SALT_ROUND); 
	const user = await User.create({name, email, password:hashedPassword});
	user.password = undefined;
	res.send(user)
}






const login = async (req,res)=>{
	const {email,password} = req.body;
	//1) make sure user with that email exists
	const user = await User.findOne({email}).select('+password');
	if(!user) {
		throw new Error("invalid credentials")
	}
	//2) compare the password provided to the one hashed saved password in db
	const userPassowrdRight = await bcrypt.compare(password,user.password)
	if(!userPassowrdRight){
		throw new Error("invalid credentials")
	}
	//3) return token
	const token = jwt.sign({email},process.env.JWT_SECRET);
	res.send({token});
}


module.exports = {signup,login}