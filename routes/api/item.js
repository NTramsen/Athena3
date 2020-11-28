const items = require("../../controller/item.controller");

var router = require("express").Router();

router.post("/", items.create);


router.get("/", items.findAll);


router.get("/:id", items.findOne);


router.put("/:id", items.findOne);


router.put("/:id", items.update);


router.delete("/:id", items.delete);


router.delete("/", items.deleteAll);

module.exports = router;