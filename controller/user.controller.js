const User = require("../models/User");

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};


exports.getUsersItems = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to checkout can not be empty!"
    });
  }

  const id = req.body.id;

  User.findOneAndUpdate(
    { id: id },
    function (error, success) {
         if (error) {
             console.log(error);
             res.json({ message: 'Unsucuessful Retrieval' })
         } else {
           res.status(400).json({
             message: 'Retrieved'
           });
            //  console.log(success);
            //  console.log("item: " + item);
            //  res.json({ message: 'Added' })
         }
     });

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}.`
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

//checkout an item to a user
exports.checkoutItem = (req, res) => {
  const id = req.body.id;
  const itemid = req.body.item;

  Item.findOne({_id: itemid, borrowed:{$eq:false}})
    .then(item => {
      if (item){
        Item.findOneAndUpdate({_id: itemid},{borrowed: true})
        .then(item2 => {

          User.findOneAndUpdate(
            { _id: id },
            { $push: { items: itemid } },
            function (error, success) {
                 if (error) {
                     res.status(404).json({ message: 'controller Not Added' })
                     return
                 } else {
                     res.status(200).json({ message: 'Added item '+itemid +' to '+id})
                     return
                 }
             });
        })
        .catch(err => console.error('not updated'));
      }
      else{
        res.status(404).json({message: 'controller Item already borrowed'})
        return 
      }
    })
    .catch(err => console.error('Did not find item with id'));
};
// exports.checkoutItem = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to checkout can not be empty!"
//     });
//   }

//   const email = req.body.email;
//   const items = req.body.items;

//   console.log("item" + items);

//   User.findOneAndUpdate(
//     { email: email },
//     { $push: { items: items } },
//     function (error, success) {
//          if (error) {
//              console.log(error);
//              res.json({ message: 'Not Added' })
//          } else {
//            res.status(400).json({
//              message: 'added'
//            });
//             //  console.log(success);
//             //  console.log("item: " + item);
//             //  res.json({ message: 'Added' })
//          }
// //      });

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update user with id=${id}.`
//         });
//       } else res.send({ message: "Item was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating user with id=" + id
//       });
//     });
// };

// Find a single user with an id
exports.findOne = (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving user with id=" + id });
    });
};

// Update a Equipment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.body.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}.`
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}.`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Item."
      });
    });
};