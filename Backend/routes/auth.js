const express = require('express')
const User = require('../models/User');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
// const User = require('../models/User');
const JWT_SECRET = 'signatur$'
//create a user using PORT "/api/auth/createuser" doesnt require auth.no login required    
//ROUTE:1
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  //if there are errors return bad request and error  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  //check whteher the user exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "A user with this email already exists!" })
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error:'Please enter unique value for email',message:err.message})
    // });
    // res.send(req.body)
    //     const user=User(req.body);
    //     user.save()
    //    console.log(req.body)
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtdata);
    // res.json(user)
    success = true;
    res.json({ success, authtoken })

  }
  catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured");
  }
})


//ROUTE 2
//authenticate a user using PORT "/api/auth/login" doesnt require auth.no login required   
router.post('/login', [
  // body('name','Enter a valid name').isLength({min:3}),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect Credentials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ success, error: "Incorrect Credentials" });
    }
    //if the password is correct
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured");

  }
})

//Route 3
//get logged in user details.login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured");

  }
})

module.exports = router