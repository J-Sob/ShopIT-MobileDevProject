const {insert , list , loginUser , UniqueEmail, updateUser} = require("../services/User");
const httpStatus = require("http-status");
const fs = require("fs");

const {
  passwordToHash,
  generateAccesToken,
  generateRefreshToken,
} = require("../utils/helper");
const { BAD_REQUEST } = require("http-status");

const create = async (req,res) =>
{
  try {
    const usermail = req.body.email;
    const existUser = await UniqueEmail(usermail);
    if(existUser) {
      throw new Error("User with that email already exists.")
    }
    req.body.password = passwordToHash(req.body.password);
    response = await insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
      console.log(error)
    res.status(httpStatus.BAD_REQUEST).send(error.message)
  }
       
}
const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginUser(req.body).then((user) => {
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({
          message:
            "Account Not Found. Please check your account details Or Register.",
        });
    }

    fs.readFile(`./uploads/${user.img}`, `base64`, (err, fileData) =>{
      user.img = fileData
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccesToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };
  
      res.status(httpStatus.OK).send(user);
    })
  });
}

const changeImg = async (req, res) => {
  const user = await UniqueEmail(req.body.email)
  if (!user) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({
        message:
          "Account Not Found",
      });
  }else{
    if(!req.file){
      return res 
        .status(httpStatus.BAD_REQUEST)
        .send({
          message: "No file was selected to be uploaded"
        }
        )
    }else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){
      fs.unlink(`./uploads/${req.file.filename}`, (err) => {
        res.status(BAD_REQUEST).send({message: `Only .png, .jpg and .jpeg format accepted`})
      })
    }else{
      const fileName = req.file.filename
      if(user.img !== ''){
        fs.unlinkSync(`./uploads/${user.img}`)
        user.img = ''
      }
      user.img = fileName
      response = await updateUser({email: req.body.email}, user)
      fs.readFile(`./uploads/${user.img}`, `base64`, (err, fileData) =>{
        res.status(httpStatus.OK).send(fileData)
      })
      
    }
  }
}
    


module.exports = {
    create,
    login,
    changeImg
}