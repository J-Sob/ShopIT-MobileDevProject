const express = require("express");
const {create,index,login} = require("../controllers/User")

const router = express.Router();

router.post("/",create);

module.exports= router;