const express = require("express");
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


// Load Admin model
const Admin = require("../../models/Admin");

// Load email
const nodemailer = require("nodemailer")


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

  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
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
  Admin.findOne({ email }).then(admin => {
    // Check if user exists
    if (!admin) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: admin.id,
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
              admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
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


  Admin.findOne({ email: req.body.newEmail })
    .then(admin => { 
      if (admin) { 
        return res.status(400).json({ alreadyexists: "Email already in use" }); 
      } else {
        // Find user by id
        Admin.findOne({ _id: req.body.id }).then(admin => {
          // Check if user exists
          if (!admin) {
            return res.status(404).json({ usernotfound: "Error: User not found" });
          }

          // Check password
          bcrypt.compare(req.body.password, admin.password).then(isMatch => {
            if (isMatch) { // password matched
              Admin.findOneAndUpdate(
                { _id: req.body.id },
                { $set: { email: req.body.newEmail }},
                function (error, success){
                  if (error) {
                    res.status(401).json({ message: 'Email not updated'})
                    return
                  } else {
                    res.status(200).json({
                      admin: {
                        id: admin.id,
                        name: admin.name,
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
  Admin.findOne({ email: req.body.email }).then(admin => {
    // Check if user exists
    if (!admin) {
      return res.status(404).json({ emailnotfound: "Error: Email not found" });
    }

    // Check password
    bcrypt.compare(req.body.password, admin.password).then(isMatch => {
      if (isMatch) { // password matched

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if (err) throw err;
            Admin.findOneAndUpdate(
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


router.post("/forgot_pass", (req, res)=>{
  if (req.body.email === ''){
    res.status(400).send('email required');
  }
  console.error(req.body.email);
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (!admin) {
      return res.status(404).json({ usernotfound: "Error: Email not found" });
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      admin.update({
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
        to: `${admin.email}`,
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


module.exports = router;
