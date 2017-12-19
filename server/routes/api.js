var User = require('../models/usersDAO');
var jwt = require('jsonwebtoken');
var secret = 'secret';
module.exports = function(router){	
	//User registration
	router.post('/users', function(req, res){
		var user = new User();
		user.alias = req.body.username;
		user.email = req.body.email;
		user.password = req.body.password;		
		if(req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
			res.json({success:'false',message:'Ensure Username, email and password were provided'});
		}else{
			user.save(function(err){
				if(err){
					res.json({success:'false',message:'Username or Email already Exist'});
				}
				else{
					res.json({success:'true',message:'User created successfully'});
				}
			});
		}
	});

	//User Login Route
	router.post('/authenticate', function(req,res){
		User.findOne({alias: req.body.username}).select('alias email _id password resourcename designation kinId etype').exec(function(err,user){
			if(err) throw err;
			if(!user){
				res.json({success:false,message:'could not authenticate user'});			
			}else if (user){
				if(req.body.password){
					var validPassword = user.comparePasswords(req.body.password);		
				}else{
					res.json({success:false,message:'No password Provided'});			
				}				
				if(!validPassword){
					res.json({success:false,message:'could not authenticate user'});			
				}else{
					var token = jwt.sign({alias:user.alias, email:user.email,_id:user._id,designation:user.designation,resourcename:user.resourcename,kinId:user.kinId,etype:user.etype},secret,{expiresIn: '10h'});
					res.json({success:true,message:'User Authenticates',token: token});			
				}
			}
		});
	});

	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];
		if(token){
			jwt.verify(token,secret, function(err, decoded){
				if(err) {
					res.json({success:false, message: 'Token Invalid'});
				}else{
					req.decoded = decoded;
					next();
				}
			});
		}else{
			res.json({success:false, message: 'Token Not Found'});
		}
	});

	router.put('/resetpassword', function(req,res){
		User.findOne({alias: req.body.username}).select('alias password').exec(function(err,user){
		if(err) throw err;
		if(!user){
			res.json({success :false, message : "User Not Found 1" + req.body.username});
		}else {
			if(req.body.password){
				user.password = req.body.password;
				user.save(function(err){
				if(err){
						res.json({success:false, message: err});
				 }else{
				 	res.json({success:true, message: 'Password has been reset'});
				 }			 
				});
			}else{
				res.json({success:false, message: 'Not Valid Password Entered'});				
		   }
		}
		});
	});

	router.post('/me', function(req, res){
		res.send(req.decoded);
	});

return router;
}