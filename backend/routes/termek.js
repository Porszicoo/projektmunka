//TERMÉKEK
var express = require("express");
var router = express.Router();
var Db = require("../db/dboperations"); // Adatbázisműveletek importálása

router.get("/", async function (req, res, next) {
  try {
    const { search, field, pageSize, pageNumber } = req.query;
    const termek = await Db.selectTermekek(search, field, pageSize, pageNumber); // A termek tábla lekérdezése
    res.json(termek);
  } catch (error) {
    res.status(500).send("Szerver hiba!");
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const termek = await Db.getTermekView(id);
    res.json(termek);
  } catch (error) {
    res.status(500).send("Szerver hiba!");
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    const valasz = await Db.deleteTermek(id); // Termék törlése
    if (valasz.affectedRows === 0) {
      res.status(404).json({ message: "Nincs ilyen termék" });
    } else {
      res.json(valasz);
    }
  } catch (error) {
    res.status(500).json({ hiba: error });
  }
});

// Termék módosítása ID alapján
router.put("/:id", async function (req, res, next) {
  try {
    if (!req.body.ar || !req.body.marka) {
      // Ellenőrzés: hiányos adatok
      res.status(400).json({ message: "Hiányos adatok!" });
      return;
    }
    let id = req.params.id;
    let valasz = await Db.updateTermek(id, req.body.marka, req.body.ar); // Termék frissítése
    if (valasz.affectedRows === 0) {
      res.status(404).json({ message: "Nincs ilyen termék - " + id });
    } else {
      res.json(valasz);
    }
  } catch (error) {
    res.status(500).json({ hiba: error });
  }
});

module.exports = router;
