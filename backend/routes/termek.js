// routes/termek.js
const express = require('express');
const router = express.Router();
const Db = require('../db/dboperations'); // Adatbázisműveletek importálása

// ==============================
// Termék lekérdezések
// ==============================

router.get('/termekview/:page', async (req, res) => {
    try {
        const page = req.params.page;
        const termekek = await Db.getProducts(page);
        res.json(termekek); // A válasz JSON formátumban
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Termék lekérdezése a view alapján
router.get('/termekviewxx/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log('View lekérdezés, id:', id);
        const termek = await Db.getTermekView(id);
        res.json(termek);
    } catch (error) {
        console.error('Hiba a view lekérdezésnél:', error);
        res.status(500).send('Szerver hiba!');
    }
});

// Összes termék lekérdezése
router.get('/', async (req, res) => {
    try {
        const termek = await Db.selecttermek();
        res.json(termek);
    } catch (error) {
        console.error('Hiba az összes termék lekérdezésénél:', error);
        res.status(500).send('Szerver hiba!');
    }
});

// Szűrt lista: pl. http://localhost:3000/termek/filter?marka=baseball
router.get('/filter', async (req, res) => {
    try {
        const marka = '%' + req.query.marka + '%';
        const termek = await Db.filtertermek(marka);
        res.json(termek);
    } catch (error) {
        console.error('Hiba a szűrésnél:', error);
        res.status(500).json({ error: error });
    }
});

// Egy termék lekérdezése ID alapján (például készlet adatokhoz, ha ezt külön szeretnéd kezelni)
router.get('/x/:azonosito', async (req, res) => {
    try {
        const id = req.params.azonosito;
        console.log("Készlet lekérdezés, id:", id);
        const termek = await Db.selecttermekById(id);
        if (termek.length === 0) {
            res.status(404).json({ message: 'Nincs ilyen termék' });
        } else {
            res.json(termek);
        }
    } catch (error) {
        console.error('Hiba az egyedi termék lekérdezésénél:', error);
        res.status(500).json({ error: error });
    }
});

// ==============================
// Termék módosítások (CRUD műveletek)
// ==============================

// Új termék hozzáadása
router.post('/', async (req, res) => {
    const adat = req.body; // Várhatóan: { marka, ar, esetleg egyéb mezők (pl. kep) }
    try {
        if (!adat.ar || !adat.marka) {
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        // Ha a kép URL-t is szeretnéd beszúrni, bővítsd a függvényt pl.: adat.kep
        const valasz = await Db.inserttermek(adat.marka, adat.ar);
        res.json(valasz);
    } catch (error) {
        console.error('Hiba az új termék hozzáadásánál:', error);
        res.status(500).json({ "hiba": error });
    }
});

// Termék módosítása ID alapján
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.ar || !req.body.marka) {
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        const id = req.params.id;
        // Ha szükséges, itt bővítsd a frissítést például a kép URL kezelésére is
        const valasz = await Db.updatetermek(id, req.body.marka, req.body.ar);
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék - " + id });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        console.error('Hiba a termék módosításánál:', error);
        res.status(500).json({ "hiba": error });
    }
});

// Termék törlése ID alapján
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const valasz = await Db.deletetermek(id);
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen termék" });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        console.error('Hiba a termék törlésénél:', error);
        res.status(500).json({ "hiba": error });
    }
});

module.exports = router;
