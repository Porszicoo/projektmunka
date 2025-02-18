var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const db = require('../db/dboperations');




router.post('/register', async (req, res) => {
  const { email, password, firstName, phone, lastName } = req.body;
  console.log(req.body);
  
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  try {
      // Új felhasználó beszúrása az adatbázisba
      const result = await db.insertVasarlo(firstName, lastName, email, password, phone);

      // Újonnan regisztrált felhasználó adatai
      const newUser = {
          id: result.insertId,
          email,
          nev: `${firstName} ${lastName}`
      };

      // JWT generálása
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '2h' });
      

      res.status(201).json({
          message: 'Sikeres regisztráció!',
          token,
          user: newUser
      });
  } catch (error) {
      console.error("Hiba történt a regisztráció során:", error.message);
      res.status(500).json({ message: 'Szerverhiba' });
  }
});
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email és jelszó megadása kötelező!' });
    }
  
    try {
      const user = await db.findUserByEmail(email);
  
      if (!user) {
        return res.status(404).json({ message: 'Felhasználó nem található!' });
      }
  
      const isPasswordValid = await db.comparePassword(password, user.jelszo);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Hibás jelszó!' });
      }
  
      // JWT generálása
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });
  
      res.status(200).json({ 
        message: 'Sikeres bejelentkezés!', 
        token,
        user: { id: user.id, email: user.email, nev: user.nev } 
      });
    } catch (error) {
      console.error("Hiba történt a bejelentkezés során:", error.message);
      res.status(500).json({ message: 'Szerverhiba' });
    }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Nincs token megadva' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Érvénytelen token' });
    req.user = user;
    next();
  });
};

router.delete('/account/:id', async (req, res) => {
  try {
    const id = req.user.id; // Ez most már az URL-ből jön
    const valasz = await db.deleteVasarlo(id);

    if (valasz.affectedRows === 0) {
      res.status(404).json({ message: "Nincs ilyen felhasználó" });
    } else {
      res.json({ message: "Fiók sikeresen törölve", valasz });
    }
  } catch (error) {
    console.error("Hiba a fiók törlése közben",+""+ error.message);
    console.log(error)
    res.status(500).json({ message: 'Szerverhiba' });
  }
});
  
module.exports = router;
