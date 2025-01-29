var express = require('express');
var router = express.Router();
var Db = require('../db/dboperations'); // Adatbázisműveletek importálása

// Összes vásárló lekérdezése
router.get('/', async function(req, res, next) {
    try {
        const vasarlok = await Db.selectVasarlok(); // Vásárlók tábla lekérdezése
        res.json(vasarlok);
    } catch (error) {
        res.status(500).send('Szerver hiba!');
    }
});

// Szűrt lista: pl. http://localhost:3000/vasarlok/filter?nev=John
router.get('/filter', async function(req, res, next) {
    try {
        const nev = '%' + req.query.nev + '%'; // Keresési szöveg
        const vasarlok = await Db.filterVasarlok(nev); // Szűrt lekérdezés a vásárlók tábla alapján
        res.json(vasarlok);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Egy vásárló lekérdezése ID alapján
router.get('/:azonosito', async function(req, res, next) {
    try {
        const id = req.params.azonosito;
        const vasarlo = await Db.selectVasarloById(id); // Egyedi lekérdezés ID alapján
        if (vasarlo.length == 0) {
            res.status(404).json({ message: 'Nincs ilyen vásárló' });
        } else {
            res.json(vasarlo);
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Új vásárló hozzáadása
router.post('/', async function(req, res, next) {
    let adat = req.body; // Új vásárló adatai
    try {
        if (!adat.nev || !adat.email) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }

        const valasz = await Db.insertVasarlo(adat.nev, adat.email); // Új vásárló beszúrása
        res.json(valasz);
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Vásárló törlése ID alapján
router.delete('/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        const valasz = await Db.deleteVasarlo(id); // Vásárló törlése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen vásárló" });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

// Vásárló módosítása ID alapján
router.put('/:id', async function(req, res, next) {
    try {
        if (!req.body.nev || !req.body.email) { // Ellenőrzés: hiányos adatok
            res.status(400).json({ message: "Hiányos adatok!" });
            return;
        }
        let id = req.params.id;
        let valasz = await Db.updateVasarlo(id, req.body.nev, req.body.email); // Vásárló frissítése
        if (valasz.affectedRows === 0) {
            res.status(404).json({ message: "Nincs ilyen vásárló - " + id });
        } else {
            res.json(valasz);
        }
    } catch (error) {
        res.status(500).json({ "hiba": error });
    }
});

module.exports = router;
