const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();


const User = require("../app/model/User");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/signup",[
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }
            let token = '';
            user = new User({
                username,
                email,
                password,
                token
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    User.updateOne({ 'email' : user.email },{$set:{token : token }},{ upsert: true }, function(err,result){
                        try {
                            res.status(200).json({
                                msg:'you are successfully signup!',
                                success:true
                            });
                        } catch(err) {
                            console.log('Error is coming! '+err);
                        }
                    });
                                       
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });
      console.log(user.id);
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: '24h'
        },
        (err, token) => {
          if (err) throw err;
          User.updateOne({ 'email' : user.email },{$set:{token : token }},{ upsert: true }, function(err,result){
              try {
                  req.session.loggedin = true;
                  req.session.username = user.username;
                  req.session.uid = user.id;
                  res.status(200).json({
                    token,
                    success:'true',
                    redirect_url:'/me'
                  });
              } catch(err) {
                  console.log('Error is coming! '+err);
              }
          });
          
        }
      );      
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.get('/me', async function(req, res) {
    if (req.session.loggedin) {
        const results = await User.findById(req.session.uid);
        const token = results.token;
        if (!token) return res.status(401).json({ message: "Auth Error" });

        try {
            const decoded = jwt.verify(token, "randomString");
            req.user = decoded.user;
            console.log(req.user);            
        } catch (e) {
            console.error(e);
            res.status(500).send({ message: "Invalid Token" });
        }
        res.send('Welcome back, ' + req.session.username + '!');
    } else {
        res.send('Please login to view this page!');
    }
    res.end();
});

module.exports = router;