const Item = require("../models/Item");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Equipment
  const equipment = new Item({
    id:req.body.id,
    type: req.body.type,
    description: req.body.description,
    borrowed: req.body.borrowed ? req.body.borrowed : false,
    dueDate: null
  });

  // Save Equipment in the database
  equipment
    .save(equipment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Equipment."
      });
    });
};

// Retrieve all Equipments from the database.
exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { $regex: new RegExp(type), $options: "i" } } : {};

  Item.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving items."
      });
    });
};

// Find a single Equipment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  //console.log("id in exports.findOne: " + id);
  Item.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Item with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Item with id=" + id });
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

  Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update item with id=${id}.`
        });
      } else res.send({ message: "Item was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};
// Delete a Equipment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Item.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Item with id=${id}.`
        });
      } else {
        res.send({
          message: "Item was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Item with id=" + id
      });
    });
};

// Delete all Equipments from the database.
exports.deleteAll = (req, res) => {
  Item.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Items were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Item."
      });
    });
};

