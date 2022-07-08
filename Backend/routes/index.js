var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register', (req, res, next) => {
	console.log(req.body);
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.firstName || !personInfo.lastName|| !personInfo.password || !personInfo.passwordConf){
		res.send({'Success':'ERROR_INPUT_ALL'});
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email}, (err,data) => {
				if(!data){
					var c;
					User.findOne({}, (err,data) => {

						if (data)
							c = data.unique_id + 1;
						else
							c = 1;

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							firstName: personInfo.firstName,
							lastName: personInfo.lastName,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							role: false
						});

						newPerson.save((err, Person) => {
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"REGISTERED"});
				}else{
					res.send({"Success":"ALREADY_USED"});
				}

			});
		}else{
			res.send({"Success":"PASSWORD_ERROR"});
		}
	}
});

router.post('/', (req, res, next) => {
	User.findOne({email:req.body.email}, (err,data) => {
		if(data){
			if(data.password == req.body.password){
				
				req.session.userId = data.unique_id;
				req.session.isAdmin = data.role;
				
				res.send({"Success":"LOGIN", "Role": data.role});
				
			} else{
				res.send({"Success":"WRONG_PASSWORD"});
			}
		}else{
			res.send({"Success":"NOT_REGISTERED"});
		}
	});
});


router.post('/modify', (req, res, next) => {
	console.log(req.body);
	var personInfo = req.body;
	if(!personInfo.newFirstName || !personInfo.newLastName || !personInfo.currentPassword || !personInfo.password || !personInfo.passwordConf){
		res.send();
	}

	User.findOne({email:req.body.email}, async (err,data) => {
		if(data){
			if(data.password==req.body.currentPassword && req.body.password == req.body.passwordConf) {
				
				var admin = req.body.role === 'checked' ? true : false;
				await User.findOneAndUpdate({email: req.body.email}, {firstName: req.body.newFirstName, lastName: req.body.newLastName, password: req.body.password, passwordConf: req.body.passwordConf, role:admin}, {
					new: true
				});

				res.send({"Success":"SUCCESS"});
				
			}else{
				res.send({"Success":"WRONG_PASSWORD"});
			}
		}else{
			res.send({"Success":"NOT_REGISTERED"});
		}
	});
});

router.delete('/delete', async (req, res) => {
	try {
		User.findOne({email:req.body.email}, async (err,data) => {
			if(!data)
				res.send({"Success":"NO_EMAIL"});
			else
			{
				await User.findOneAndRemove({ email: req.body.email });
				res.send({"Success":"DELETED"});
				console.log("OK");
			}
		});
		
	  
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send('SERVER_ERROR');
	}
});

router.get('/everybody', async (req, res) => {
	try {
	  const users = await User.find();
	  res.json(users);
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send('SERVER_ERROR');
	}
});

router.get('/profile', (req, res, next) => {
	console.log("profile");
	User.findOne({email:req.body.selectedUserEmail}, (err, data) => {
		if(!data){
			return res.send({'Success':'NO_USER_ERROR'});
		}else{
			return res.send({'Success':'GET_USER', data});
		}
	});
});

router.get('/logout', (req, res, next) => {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy((err) => {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

module.exports = router;