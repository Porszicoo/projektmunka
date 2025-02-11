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
  

module.exports = router;
