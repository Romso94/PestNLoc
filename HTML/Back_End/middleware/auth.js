const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Accès refusé, token manquant" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = decoded.user;

    console.log("Token décrypté:", decoded);

    next();
  } catch (e) {
    console.error("Erreur de vérification du token:", e);
    res.status(401).json({ msg: "Token non valide" });
  }
};

const adminOnly = (req, res, next) => {
  console.log('req.user dans adminOnly :', req.user);

  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Accès refusé, seuls les administrateurs sont autorisés' });
  }

  next();
};


module.exports = { verifyToken, adminOnly };
