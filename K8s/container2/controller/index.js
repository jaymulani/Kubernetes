const controller = require("./controller")
const router = require("express").Router()

router.post("/parse", controller.parse);

module.exports = router
