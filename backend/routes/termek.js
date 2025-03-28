//TERMÉKEK
var express = require("express");
var router = express.Router();
var Db = require("../db/dboperations"); // Adatbázisműveletek importálása
var { sendConfirmationEmail } = require("../utils/emailService"); // Email service importálása

// Termékek lekérdezése
router.get("/", async function (req, res, next) {
  try {
    const { 
      field, 
      size, 
      brand, 
      color, 
      searchTerm, 
      minPrice, // Minimum ár (frontend küldi)
      maxPrice, // Maximum ár (frontend küldi)
      pageSize = 20, 
      pageNumber = 0 
    } = req.query;

    // Konvertáljuk számokra, ha léteznek (mert query paraméterként stringként jönnek)
    const minPriceNum = minPrice ? parseFloat(minPrice) : undefined;
    const maxPriceNum = maxPrice ? parseFloat(maxPrice) : undefined;
    console.log(maxPriceNum);
    console.log(minPriceNum);
    // Meghívjuk a selectTermekek függvényt az összes releváns paraméterrel
    const termek = await Db.selectTermekek(
      field, 
      size, 
      brand, 
      color, 
      searchTerm, 
      minPriceNum, 
      maxPriceNum, 
      pageSize, 
      pageNumber
    );

    

    if (termek.length === 0) {
      return res.status(404).json({ message: "Nincs találat." });
    }

    res.json(termek);
  } catch (error) {
    console.error("Hiba a termékek lekérdezésekor:", error.message);
    res.status(500).json({ message: "Szerver hiba!" });
  }
});


router.get("/payment", async (req, res) => {
  try {
    console.log("Fizetési módok lekérése elindult...");
    
    const paymentMethods = await Db.PaymentMethod(); 
   
    
    console.log("Lekért adatok:", paymentMethods);

    if (!paymentMethods || paymentMethods.length === 0) {
      console.log("Nincsenek elérhető fizetési módok!");
      return res.status(404).json({ message: "Nincsenek elérhető fizetési módok" });
    }

    res.json(paymentMethods);
  } catch (error) {
    console.error("Szerverhiba:", error.message);
    res.status(500).json({ 
      message: "Hiba a fizetési módok lekérésekor", 
      error: error.message 
    });
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


router.post("/addtocart", async (req, res) => {
  console.log("Kapott body:", req.body);

  try {
    let {
      termekek, // Tömb, amely tartalmazza az összes terméket (termek_id, mennyiseg)
      netto_osszeg,
      afa,
      szamla_sorszam,
      last_name,
      first_name,
      email,
      paymentMethod
    } = req.body;

    // Ellenőrzés: Minden mező megvan?
    if (!Array.isArray(termekek) || termekek.length === 0) {
      console.log("Hibás terméklista:", termekek);
      return res.status(400).json({ error: "A terméklista üres vagy érvénytelen!" });
    }
    if (Object.values(req.body).some(value => value == null)) {
      console.log("Hibás request body:", req.body);
      return res.status(400).json({ error: "Hiányzó adatok!" });
    }

    const now = new Date(Date.now());

    // Számla létrehozása
    const szamla = await Db.insertSzamla(netto_osszeg, afa, now, szamla_sorszam, paymentMethod);
    console.log("Számla létrehozva:", szamla);

    // Rendelés létrehozása
    const order = await Db.insertRendeles(now, szamla.insertId, last_name, first_name, email);
    console.log("Rendelés létrehozva:", order);

    // Több termék felvitele a rendeles_termek táblába
    await Db.rendeles_termek(order.insertId, termekek);
    console.log("Termékek beszúrva:", termekek);

    // E-mail küldés
    const orderDetails = `Rendelési azonosító: ${order.insertId}, Teljes összeg: ${netto_osszeg} Ft`;
    console.log(`Sending confirmation email to: ${email} with details: ${orderDetails}`);

    await sendConfirmationEmail(email, orderDetails);

    res.status(200).json({ message: "Sikeres vásárlás", order });

  } catch (error) {
    console.error("Hiba a rendelés hozzáadásakor:", error.message);
    res.status(500).json({ error: "Szerver hiba!" });
  }
});


module.exports = router;
