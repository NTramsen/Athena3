const express = require("express");
var bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const crypto = require("crypto");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangePass = require("../../validation/changepass");
const validateChangeEmail = require("../../validation/change_email");

// Load User model
const User = require("../../models/User");
const e = require("express");

// Load email
const nodemailer = require("nodemailer")



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



router.put("/change_pass", (req, res) => {
  // Form validation
  const { errors, isValid } = validateChangePass(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword


  // Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Error: User not found" });
    }

    // Check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) { // password matched

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if (err) throw err;
            User.findOneAndUpdate(
              { email: req.body.email },
              { $set: { password: hash }},
              function (error, success){
                if (error) {
                  res.status(401).json({ message: 'Password not updated'})
                  return
                } else {
                  res.status(200).json({ message: 'Password updated'})
                  return
                }
              });
          });
        });

      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.put("/change_email", (req, res) => {
  // Form validation
  const { errors, isValid } = validateChangeEmail(req.body);

  // Check validation
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  const id = req.body.id;
  const password = req.body.password;
  const newEmail = req.body.newEmail;


  User.findOne({ email: req.body.newEmail })
    .then(user => { 
      if (user) { 
        return res.status(400).json({ alreadyexists: "Email already in use" }); 
      } else {
        // Find user by id
        User.findOne({ _id: req.body.id }).then(user => {
          // Check if user exists
          if (!user) {
            return res.status(404).json({ usernotfound: "Error: User not found" });
          }

          // Check password
          bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) { // password matched
              User.findOneAndUpdate(
                { _id: req.body.id },
                { $set: { email: req.body.newEmail }},
                function (error, success){
                  if (error) {
                    res.status(401).json({ message: 'Email not updated'})
                    return
                  } else {
                    res.status(200).json({
                      user: {
                        id: user.id,
                        name: user.name,
                        email: newEmail,
                      }
                    })
                    return
                  }
                });

            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
          });
        });
      }
    })

});


router.post("/forgot_pass", (req, res)=>{
  if (req.body.email === ''){
    res.status(400).send('email required');
  }
  console.error(req.body.email);
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Error: User not found" });
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'athena.ims.no.reply',
          pass: 'athenacs370!',
        }
      });

      const mailOptions = {
        from: 'athena.ims.no.reply@gmail.com',
        to: `${user.email}`,
        subject: 'Password Reset',
        text: `${token}`
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error ('error sending', err);
        } else {
          res.status(200).json('email sent');
        }
      });
    }
  });
});


router.put("/checkoutItem", (req, res) => {

  // TODO: Add validation
  const id = req.body.id;
  const itemid = req.body.item;
  const duration = req.body.duration;
  var date = new Date;
  date.setDate(date.getDate() + parseInt(duration));
  console.log(id, itemid, duration, date);
  console.log("date.getDate() + duration" + (date.getDate() + duration));

  Item.findOne({ _id: itemid, borrowed: { $eq: false } })
    .then(item => {
      if (item) {
        Item.findOneAndUpdate({ _id: itemid }, { borrowed: true, dueDate: date})
          .then(item2 => {
            User.findOneAndUpdate( { _id: id }, { $push: { items: itemid } })
              .then(user =>{
                if (!user){
                  return res.status(404).json({ emailnotfound: "Error: User not found" })
                } else {
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'athena.ims.no.reply',
                      pass: 'athenacs370!',
                    }
                  });

                  const mailOptions = {
                    from: 'athena.ims.no.reply@gmail.com',
                    to: `${user.email}`,
                    subject: `Athena: ${item.type} has been checked out!`,
                    text:
                      `${user.name}, \n\n` +
                      `Please return your ${item.type} by ${date}. \n \n` +
                      `Thank you for using Athena.\n \n`
                  };

                  transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                      console.error ('error sending', err);
                    } else {
                      return res.status(200).json('email sent');
                    }
                  });
                }
              })
              .catch (err => console.error('Error: checkout unsuccesful'))
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
              { borrowed: false, dueDate: null},
              function (error, success) {
                if (error) {
                  res.status(404).json({ message: 'Not removed from account' })
                  return
                } else {
                  res.status(200).json({ message: 'returned ' + itemid + ' from ' + id })
                  return
                }
              });
          })
          .catch(err => console.error('not updated'));
      }
      else {
        res.status(403).json({ message: 'failed removal 403' })
        return
      }
    })
    .catch(err => console.error('Item not found'))
});


router.put("/getuseritems", (req,res) =>{
  const id = req.body.id;
  //console.log("id: " + id);
  User.findOne({ _id: id }).lean().exec(function (error, success) {
    if (error) {
      res.send(err);
    } else {
      if (success){
        res.status(200).json(success);
        //console.log("success: " + success);
      }
      else{
        console.log("null");
      }
    }
  });
});


router.get("/", users.findAll);


//router.put("/removeitem", users.removeItem);


// router.post("/", users.checkoutItem);


router.get("/:id", users.findOne);


router.put("/:id", users.update);


router.delete("/:id", users.delete);


router.delete("/", users.deleteAll);

module.exports = router;
