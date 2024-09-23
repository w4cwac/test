const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.updateUserById = async (req, res) => {
  //Récupération des champs dans le corp de la requete
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();
    console.log(user);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

exports.deleteUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user){
            return res.status(404).json({message:' User not found'})
        }
        await User.deleteOne({ _id: req.params.id});
        res.redirect('/')
    } catch(error) {
        console.log(error)
        res.status(500).json(error)
    }
}