var express = require('express');
var router = express.Router();
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
        res.status(201).json({ message: 'Sikeres regisztráció!' });
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
      // Felhasználó keresése az email alapján
      const user = await db.findUserByEmail(email);
  
      if (!user) {
        return res.status(404).json({ message: 'Felhasználó nem található!' });
      }
  
      // A megadott jelszó ellenőrzése
      const isPasswordValid = await db.comparePassword(password, user.jelszo);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Hibás jelszó!' });
      }
  
      // Sikeres bejelentkezés, válasz küldése
      console.log("Bejelentkezett felhasználó:", user);
      res.status(200).json({ message: 'Sikeres bejelentkezés!', user: user });
    } catch (error) {
      console.error("Hiba történt a bejelentkezés során:", error.message);
      res.status(500).json({ message: 'Szerverhiba' });
    }
  });
  
module.exports = router;
