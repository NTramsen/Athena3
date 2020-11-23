const express = require("express");
var bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const e = require("express");

// load user controllers
const users = require("../../controller/user.controller");

// Load item model
const Item = require("../../models/Item");

// load item controllers
const items = require("../../controller/item.controller");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600 // 1 hour in seconds
          },
          (err, token) => {
            res.json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              }
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});




router.put("/checkoutItem", (req, res) => {

  // TODO: Add validation
  const id = req.body.id;
  const itemid = req.body.item;
  // console.log('id from consolelog ' + id);
  Item.findOne({ _id: itemid, borrowed: { $eq: false } })
    .then(item => {
      if (item) {
        Item.findOneAndUpdate({ _id: itemid }, { borrowed: true })
          .then(item2 => {

            User.findOneAndUpdate(
              { _id: id },
              { $push: { items: itemid } },
              function (error, success) {
                if (error) {
                  res.status(401).json({ message: 'Router- Not Added' })
                  return
                } else {
                  res.status(200).json({ message: 'In Router added item ' + itemid + ' to ' + id })
                  return
                }
              });
          })
          .catch(err => console.error('Router-not updated'));
      }
      else {
        res.status(399).json({ message: 'Router Item already borrowed ' + req.body })
        return
      }
    })
    .catch(err => console.error('Router did not find item with id' + JSON.stringify(req.body)));
});

router.put("/removeitem", (req, res) => {

  // TODO: Add validation

  const id = req.body.id;
  const itemid = req.body.item;

  User.findOne({ _id: id, items: { $in: [itemid] } })
    .then(user => {
      if (user) {
        User.findOneAndUpdate({ _id: id }, { $pull: { items: { $in: [itemid] } } })
          .then(item2 => {

            Item.findOneAndUpdate(
              { _id: itemid },
              { borrowed: false },
              function (error, success) {
                if (error) {
                  res.status(404).json({ message: 'Not removed from account' })
                  return
                } else {
                  res.status(200).json({ message: 'Checked out' + itemid + 'from' + id })
                  return
                }
              });
          })
          .catch(err => console.error('not updated'));
      }
      else {
        res.status(404).json({ message: 'Item already borrowed' })
        return
      }
    })
    .catch(err => console.error('Item not found'))
});


router.get("/getuseritems", (req,res) =>{
  const id = req.body.id;

  User.findOne({ _id: id }).lean().exec(function (error, success) {
    if (error) {
      res.send(err);
    } else {
      if (success){
        res.status(200).json(success);
      }
      else{
        console.log("null");
      }
    }
  });
});


router.get("/", users.findAll);


router.post("/", users.checkoutItem);


router.get("/:id", users.findOne);


router.put("/:id", users.update);


router.delete("/:id", users.delete);


router.delete("/", users.deleteAll);

module.exports = router;
