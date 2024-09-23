const jwt = require("jsonwebtoken");

const private = (req, res, next) => {
  
  //recupération du token dans les cookies
  const token = req.cookies.token;
  //si le token est different retourne a la page d'accueil
  if (!token) {
    return res.redirect("/");
  }

  try {
    //Verification et docodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.redirect('/login');
  }
};

module.exports = private;
