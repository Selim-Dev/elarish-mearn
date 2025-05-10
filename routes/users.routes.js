const express = require('express')
const router = express.Router();
const User = require('../models/User')
const authController = require('../controllers/auth.controller')
const Joi = require('joi')



// authentication routes
const loginSchema = Joi.object({
	email: Joi.string().min(2).max(30).email().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})
const validateLogin = (req,res,next)=>{
	const {error} = loginSchema.validate(req.body);

	if(error){
		const err = new Error(error.details[0].message);
		err.statusCode = 400; // bad request
		err.details = error.details;
		next(err)
	}
	next()
}
router.post('/login',validateLogin,authController.login)

router.post('/',authController.signup);

// handle users
// My Own : middleware
router.get('/',async (req,res,next)=>{
	try{
		const usersData = await User.find();
		res.send(usersData)
	} catch(err){
		next(err)
	}
})


router.get('/:id',(req,res)=>{
	res.send("success users routes")
})

router.patch('/:id',(req,res)=>{
	res.send("success")
})
router.delete('/:id',(req,res)=>{
	res.send("success")
})


module.exports = router;