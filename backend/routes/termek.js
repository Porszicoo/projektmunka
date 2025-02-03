//TERMÉKEK 
var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations'); // Adatbázisműveletek importálása

router.get('/termekview', async function (req, res, next) {
    try {
        console.log('xxxxxx');
        const termekek = await Db.selectView1();
        res.json(termekek);
    } catch (error) {
        console.error('Hiba:', error); // Logolja a hibát a konzolba
        res.status(500).send('Szerver hiba!');
    }
});
// Összes termék lekérdezése
router.get('/', async function(req, res, next) {
    try {
        const termekek = await Db.selectTermekek(); // A termekek tábla lekérdezése
        res.json(termekek);
    } catch (error) {
        res.status(500).send('Szerver hiba!');
    }
});

// Szűrt lista: pl. http://localhost:3000/termekek/filter?nev=baseball
router.get('/filter', async function(req, res, next) {
    try {
        const nev = '%' + req.query.nev + '%'; // Keresési szöveg
        const termekek = await Db.filterTermekek(nev); // Szűrt lekérdezés a termekek tábla alapján
        res.json(termekek);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


// Új termék hozzáadása
router.post('/', async function(req, res, next) {
    let adat = req.body; // Új termék adatai
    try {
        if (!adat.ar || !adat.nev) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }

        const valasz = await Db.insertTermekek(adat.nev, adat.ar); // Új termék beszúrása
        res.json(valasz);
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Termék törlése ID alapján
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const valasz = await Db.deleteTermekek(id); // Termék törlése
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
        if (!req.body.ar || !req.body.nev) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        let id = req.params.id;
        let valasz = await Db.updateTermekek(id, req.body.nev, req.body.ar); // Termék frissítése
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
var router = express.Router();
var Db = require('../db/dboperations'); // Adatbázisműveletek importálása

// Összes termék lekérdezése
router.get('/', async function(req, res, next) {
    try {
        const termekek = await Db.selectTermekek(); // A termekek tábla lekérdezése
        res.json(termekek);
    } catch (error) {
        res.status(500).send('Szerver hiba!');
    }
});

// Szűrt lista: pl. http://localhost:3000/termekek/filter?nev=baseball
router.get('/filter', async function(req, res, next) {
    try {
        const nev = '%' + req.query.nev + '%'; // Keresési szöveg
        const termekek = await Db.filterTermekek(nev); // Szűrt lekérdezés a termekek tábla alapján
        res.json(termekek);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Egy termék lekérdezése ID alapján
router.get('qqqqqqq/:azonosito', async function(req, res, next) {
   console.log("fast")
    try {
        const id = req.params.azonosito;
        const termek = await Db.selectTermekekById(id); // Egyedi lekérdezés ID alapján
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
        if (!adat.ar || !adat.nev) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }

        const valasz = await Db.insertTermekek(adat.nev, adat.ar); // Új termék beszúrása
        res.json(valasz);
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Termék törlése ID alapján
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const valasz = await Db.deleteTermekek(id); // Termék törlése
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
        if (!req.body.ar || !req.body.nev) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        let id = req.params.id;
        let valasz = await Db.updateTermekek(id, req.body.nev, req.body.ar); // Termék frissítése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék - " + id });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Egy termék lekérdezése ID alapján
router.get('/qqqq:azonosito', async function(req, res, next) {
    console.log("fast")
     try {
         const id = req.params.azonosito;
         const termek = await Db.selectTermekekById(id); // Egyedi lekérdezés ID alapján
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
 
module.exports = router;
