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
  
module.exports = router;
