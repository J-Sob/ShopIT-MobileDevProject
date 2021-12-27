const express = require("express");
const {create,index,login} = require("../controllers/User")

const router = express.Router();

router.post("/addUser",create);
router.post("/loginUser",login);

module.exports = router;