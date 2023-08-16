const controller = require("./controller")
const router = require("express").Router()

router.post("/calculate", controller.calculate);
router.post("/store-file",controller.storefile)

module.exports = router
