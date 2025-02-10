var express = require('express');
var router = express.Router();
const db = require('../db/dboperations');



router.post('/register', async (req, res) => {
  const { email, password, keresztnev,telefonszam,vezeteknev } = req.body;
  console.log(req.body);
  
  if (!email || !password) {
      return res.status(400).json({ message: 'Minden mezőt ki kell tölteni!' });
  }

  try {
      
     

      // Új felhasználó beszúrása
      const result =  db.insertVasarlo(email, password, keresztnev, vezeteknev, telefonszam);
      res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
      console.error("Hiba történt a regisztráció során:", error.message);
      res.status(500).json({ message: 'Szerverhiba' });
  }
});

module.exports = router;
