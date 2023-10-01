const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchpassword(password)) {
    console.log("verifie");
    generateToken(res, user._id);
    res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    console.log("else");
    res.status(400).send({ Message: "Incorrect email or password" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ Message: "Invailid input" });
    }
    const isUserVailable = await User.findOne({ email });
    if (isUserVailable) {
      res.status(200).send({ Message: "user already registerd" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      generateToken(res, user._id);
      res.status(201).send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      console.log("else");
      res.status(400).send({ Message: "something went wrong" });
    }
  } catch (error) {
    console.log("error");
    res.send({ Message: error });
  }
};

const logout = (req, res) => {
  res.cookie("access_token", "", {
    httpOnly: true,
    secure: false,
    expires: new Date(0),
  });
  res.status(200).send({ Message: "user logged out" });
};

const getUser = (req, res) => {
  const { _id, name, email } = req.user;

  res.status(200).send({ UserDetails:{
    _id,name,email
  }  });
};

const updateUser = async(req, res) => {
    const user=await User.findById(req.user._id)
    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.password=req.body.password || user.password
        const updateduser=user.save()
        res.status(200).send({ result:{
            _id:updateduser._id,
            name:updateduser.name,
            email:updateduser.email
        }  });

    }else{
        res.status(400).send({ Message: "No user founnd" });
    }
 
};

module.exports = {
  authUser,
  registerUser,
  logout,
  getUser,
  updateUser,
};
