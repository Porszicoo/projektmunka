//TERMÉKEK 
var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations'); // Adatbázisműveletek importálása



//Polók szűrése márka alapján
router.get("/filtertermek", async (req, res) => {
    try {
        const { marka } = req.query;
        console.log("marka,  req.query", marka, req.query);
        const products = await Db.filtertermek(marka || ""); // Ha nincs megadva márka, üres string
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Nem sikerült szűrni a termékeket.", error: error.message });
    }
});
//Termék lekérdezése a View alapján
router.get('/termekview/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log('view',id)
        const termek = await Db.getTermekView(id); // A termek tábla lekérdezése
        res.json(termek);
    } catch (error) {
        res.status(500).send('Szerver hiba!');
    }
});

// Összes termék lekérdezése
router.get('/', async function(req, res, next) {
    try {
        const termek = await Db.selecttermek(); // A termek tábla lekérdezése
        res.json(termek);
    } catch (error) {
        res.status(500).send('Szerver hiba!');
    }
});

// Szűrt lista: pl. http://localhost:3000/termek/filter?marka=baseball
router.get('/filter', async function(req, res, next) {
    try {
        const marka = '%' + req.query.marka + '%'; // Keresési szöveg
        const termek = await Db.filtertermek(marka); // Szűrt lekérdezés a termek tábla alapján
        res.json(termek);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Egy termék lekérdezése ID alapján

// Termék törlése ID alapján
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const valasz = await Db.deletetermek(id); // Termék törlése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék" });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Termék módosítása ID alapján
router.put('/:id', async function(req, res, next) {
    try {
        if (!req.body.ar || !req.body.marka) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        let id = req.params.id;
        let valasz = await Db.updatetermek(id, req.body.marka, req.body.ar); // Termék frissítése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék - " + id });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

//KÉSZLET

var express = require('express');
var Db = require('../db/dboperations'); // Adatbázisműveletek importálása

// Egy termék lekérdezése ID alapján
router.get('/x/:azonosito', async function(req, res, next) {
   console.log("fast")
    try {
        const id = req.params.azonosito;
        const termek = await Db.selecttermekById(id); // Egyedi lekérdezés ID alapján
        if (termek.length == 0) {
            res.status(404).json({ message: 'Nincs ilyen termék' });
        } else {
            res.json(termek);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
});

// Új termék hozzáadása
router.post('/', async function(req, res, next) {
    let adat = req.body; // Új termék adatai
    try {
        if (!adat.ar || !adat.marka) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }

        const valasz = await Db.inserttermek(adat.marka, adat.ar); // Új termék beszúrása
        res.json(valasz);
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Termék törlése ID alapján
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const valasz = await Db.deletetermek(id); // Termék törlése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék" });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Termék módosítása ID alapján
router.put('/:id', async function(req, res, next) {
    try {
        if (!req.body.ar || !req.body.marka) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        let id = req.params.id;
        let valasz = await Db.updatetermek(id, req.body.marka, req.body.ar); // Termék frissítése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék - " + id });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

module.exports = router;
