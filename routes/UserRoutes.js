const { Router } = require("express");
const UserRouter = Router();
const { userModel } = require("../models/UserModel");

UserRouter.get("/", async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    res.send({ err: error });
  }
});

UserRouter.get("/getProfile", async (req, res) => {
  const { email } = req.query;
  try {
    const data = await userModel.find({ email: email });
    res.send(data);
  } catch (error) {
    res.send({ err: error });
  }
});

UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const ExistUser = await userModel.find({ email: email });
    if (ExistUser.length > 0) {
      res.send({ msg: "User Exist" });
    } else {
      const RegisterUser = new userModel(req.body);
      await RegisterUser.save();
      res.send({ msg: "User Registered" });
    }
  } catch (error) {
    res.send({ err: error });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const ExistUser = await userModel.findOne({ email: email });
    if (!ExistUser) {
      res.send({ msg: "User Not Exist" });
    } else {
      if (ExistUser.password === password) {
        res.send({ msg: "Login Successfull", data: [ExistUser] });
      } else {
        res.send({ msg: "Invalid Cred" });
      }
    }
  } catch (error) {
    res.send({ err: error });
  }
});

module.exports = {
  UserRouter,
};
