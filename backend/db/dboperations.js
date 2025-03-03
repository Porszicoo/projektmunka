//Főtábla

const config = require("./dbconfig"); // Az adatbázis kapcsolati beállításai
const sql = require("mysql2/promise"); // MySQL kapcsolat
const crypto = require('crypto'); // Jelszó hasheléshez

let pool = sql.createPool(config); // Pool kapcsolat létrehozása

async function AddtoCart(rendeles_id, termek_id, mennyiseg,vasarlo_id, date,szamla_id,nett_osszeg, afa,datum,szamla_sorszam,fizetes_mod_id) {
  try {
    const [OrderProduct] = await pool.query(
      "INSERT INTO rendeles_termek rendeles_id, termek_id, mennyiseg VALUES (?,?,?)"
      [rendeles_id, termek_id, mennyiseg]
    );

    const [Order] = await pool.query(
      "INSERT INTO rendeles (vasarlo_id,date,szamla_id) VALUES (?,?,?)"
      [vasarlo_id, date,szamla_id]

    );
    
    const [Szamla] = await pool.query(
      "INSERT INTO szamla (nett_osszeg, afa,datum,szamla_sorszam,fizetes_mod_id) VALUES (?,?,?,?,?)"
      [nett_osszeg, afa,datum,szamla_sorszam,fizetes_mod_id]
    );
    return { OrderProduct, Order, Szamla };
    }
    catch (error) {
      console.error("Hiba az AddToCart függvényben:", error.message);
      throw new Error("Nem sikerült hozzáadni a rendelés terméket.");
  }
}

async function PaymentMethod(id){
  try{
    const [result] = await pool.query(
      "SELECT * FROM fizetes_mod WHERE id = ?",
      [id]
    )
    return result;
   
  }
  catch (error) {
    console.error("Hiba a PaymentMethod függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a fizetési módot.");
  }
}


//Vásárló törlése
async function deleteVasarlo(id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM vasarlok WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Hiba a deleteVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült törölni a vásárlót.");
  }
}

async function getProducts(page) {
    const limit = 10;
    const skip = (page - 1) * limit;
    console.log('Lapozás',page,limit,skip);
    // Lekérdezzük a termékeket a termek táblából adott limit és offset használatával
    const [rows] = await pool.query('SELECT * FROM termekview LIMIT ? OFFSET ?', [limit, skip]);

    // Feltételezve, hogy a termék táblában a kép fájlneve a 'kep' oszlopban van tárolva,
    // itt adjuk hozzá az abszolút URL-t.

    return rows;
}

async function selectTermekek(field, size, brand, color, pageSize = 20, pageNumber = 0) {
  try {
    let query = "SELECT * FROM termekview WHERE 1=1";
    let params = [];

    // Megengedett mezőnevek a kereséshez
    const allowedFields = { Marka: "Marka", Szín: "Szín", Meret: "Meret" };

    // Kiválasztott mező alapján szűrés
    if (field && allowedFields[field]) {
      query += ` AND ${allowedFields[field]} = ?`;
      params.push(field); // A kiválasztott érték
    }

    if (size) {
      query += " AND Meret = ?";
      params.push(size);
    }

    if (brand) {
      query += " AND Marka = ?";
      params.push(brand);
    }

    if (color) {
      query += " AND Szín = ?";
      params.push(color);
    }

    // Oldalszámozás
    const limit = Number(pageSize) || 20;
    const offset = (Number(pageNumber) || 0) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    // Debug: SQL lekérdezés logolása
    console.log("SQL lekérdezés:", query);
    console.log("Paraméterek:", params);

    const [rows] = await pool.query(query, params);
    return rows;
  } catch (error) {
    console.error("Hiba a selectTermekek függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a termékeket.");
  }
}


// Egy termék lekérdezése ID alapján
async function selectTermekById(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM termekview WHERE TermekID = ?",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a selecttermekById függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a terméket.");
  }
}

// Termékek szűrése név alapján
async function filterTermek(marka) {
  try {
    const [rows] = await pool.query("SELECT * FROM termek WHERE marka LIKE ?", [
      `%${marka}%`,
    ]);
    return rows;
  } catch (error) {
    console.error("Hiba a filtertermek függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a termékeket.");
  }
}

// Új termék hozzáadása
async function insertTermek(marka, ar) {
  try {
    const [result] = await pool.query(
      "INSERT INTO termek (marka, ar) VALUES (?, ?)",
      [marka, ar]
    );
    return result;
  } catch (error) {
    console.error("Hiba az inserttermek függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a terméket.");
  }
}

// Termék törlése ID alapján
async function deleteTermek(id) {
  try {
    const [result] = await pool.query("DELETE FROM termek WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error("Hiba a deletetermek függvényben:", error.message);
    throw new Error("Nem sikerült törölni a terméket.");
  }
}

// Termék módosítása ID alapján
async function updateTermek(id, marka, ar) {
  try {
    const [result] = await pool.query(
      "UPDATE termek SET marka = ?, ar = ? WHERE id = ?",
      [marka, ar, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updatetermek függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a terméket.");
  }
}

//Összes vásárló lekérdezése
async function selectVasarlok() {
  try {
    const [rows] = await pool.query("SELECT * FROM vasarlok");
    return rows;
  } catch (error) {
    console.error("Hiba az osszesVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a vásárlókat.");
  }
}

// Egy vásárló lekérdezése ID alapján
async function selectVasarlo(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM vasarlok WHERE vasarloid = ?",
      [id]
    );
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a vásárlót.");
  }
}

// Vásárló szűrése név alapján
async function filterVasarlo(marka) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM vasarlok WHERE marka LIKE ?",
      [`%${marka}%`]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a vásárlókat.");
  }
}

// Új vásárló hozzáadása
async function insertVasarlo(keresztnev,csaladnev,email, jelszo, telefonszam) {
  try {
   console.log(email, jelszo);
    // Új felhasználó beszúrása
    const [result] = await pool.query(
      "INSERT INTO vasarlok (keresztnev, csaladnev, email, jelszo, telefonszam) VALUES (?, ?, ?, SHA2(?, 256), ?)",
      [keresztnev, csaladnev, email, jelszo, telefonszam]
    );
    
    return result;
  } catch (error) {
    console.error("Hiba az insertVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a vásárlót." ,error);
  }
}

//Bejelentkezésnél a felhasználó keresése email alapján
async function findUserByEmail(email) {
  try {
    const [rows] = await pool.query("SELECT * FROM vasarlok WHERE email = ?", [email]);
    if (rows.length === 0) {
      console.log('Nincs ilyen felhasználó');
      return null; // Ha nincs ilyen felhasználó, null-t adunk vissza
    }
    return rows[0]; // Visszaadjuk az első (vagy egyetlen) találatot
  } catch (error) {
    console.error("Hiba a felhasználó keresésekor:", error.message);
    throw new Error("Hiba a felhasználó keresésekor");
  }
}


//A jelszó összehasonlítása a tárolt hash értékkel
async function comparePassword(inputPassword, storedHash) {
  try {
    // Az input jelszót hash-eljük, és összehasonlítjuk a tárolt hash értékkel
    const inputPasswordHash = crypto.createHash('sha256').update(inputPassword).digest('hex');
    return inputPasswordHash === storedHash;
  } catch (error) {
    console.error("Hiba a jelszó ellenőrzésében:", error.message);
    throw new Error("Hiba a jelszó ellenőrzésében");
  }
}


// Vásárló módosítása ID alapján
async function updateVasarlo(
  vasarloid,
  marka,
  email,
  telefonsz,
  utca,
  iranyitosz
) {
  try {
    const [result] = await pool.query(
      "UPDATE vasarlok SET marka = ?, email = ?, telefonsz = ?, utca = ?, iranyitosz = ? WHERE vasarloid = ?",
      [marka, email, telefonsz, utca, iranyitosz, vasarloid]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateVasarlo függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a vásárlót.");
  }
}

// Összes város lekérdezése
async function selectVaros() {
  try {
    const [rows] = await pool.query("SELECT * FROM varosok");
    return rows;
  } catch (error) {
    console.error("Hiba a selectVaros függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a városokat.");
  }
}

// Egy város lekérdezése irányítószám alapján
async function selectVarosById(iranyitosz) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM varosok WHERE iranyitosz = ?",
      [iranyitosz]
    );
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectVarosById függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a várost.");
  }
}

// Város szűrése név alapján
async function filterVaros(marka) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM varosok WHERE varos LIKE ?",
      [`%${marka}%`]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterVaros függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a városokat.");
  }
}

// Új város hozzáadása
async function insertVaros(iranyitosz, varos) {
  try {
    const [result] = await pool.query(
      "INSERT INTO varosok (iranyitosz, varos) VALUES (?, ?)",
      [iranyitosz, varos]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertVaros függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a várost.");
  }
}

// Város törlése irányítószám alapján
async function deleteVaros(iranyitosz) {
  try {
    const [result] = await pool.query(
      "DELETE FROM varosok WHERE iranyitosz = ?",
      [iranyitosz]
    );
    return result;
  } catch (error) {
    console.error("Hiba a deleteVaros függvényben:", error.message);
    throw new Error("Nem sikerült törölni a várost.");
  }
}

// Város módosítása irányítószám alapján
async function updateVaros(iranyitosz, varos) {
  try {
    const [result] = await pool.query(
      "UPDATE varosok SET varos = ? WHERE iranyitosz = ?",
      [varos, iranyitosz]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateVaros függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a várost.");
  }
}

// Összes szín lekérdezése
async function osszesSzin() {
  try {
    const [rows] = await pool.query("SELECT * FROM szinek");
    return rows;
  } catch (error) {
    console.error("Hiba az osszesSzin függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a színeket.");
  }
}

// Egy szín lekérdezése ID alapján
async function selectSzin(szinid) {
  try {
    const [rows] = await pool.query("SELECT * FROM szinek WHERE szinid = ?", [
      szinid,
    ]);
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectSzin függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a színt.");
  }
}

// Szín szűrése név alapján
async function filterSzin(szin) {
  try {
    const [rows] = await pool.query("SELECT * FROM szinek WHERE szin LIKE ?", [
      `%${szin}%`,
    ]);
    return rows;
  } catch (error) {
    console.error("Hiba a filterSzin függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a színeket.");
  }
}

// Új szín hozzáadása
async function insertSzin(szin) {
  try {
    const [result] = await pool.query("INSERT INTO szinek (szin) VALUES (?)", [
      szin,
    ]);
    return result;
  } catch (error) {
    console.error("Hiba az insertSzin függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a színt.");
  }
}

// Szín törlése ID alapján
async function deleteSzin(szinid) {
  try {
    const [result] = await pool.query("DELETE FROM szinek WHERE szinid = ?", [
      szinid,
    ]);
    return result;
  } catch (error) {
    console.error("Hiba a deleteSzin függvényben:", error.message);
    throw new Error("Nem sikerült törölni a színt.");
  }
}

// Szín módosítása ID alapján
async function updateSzin(szinid, szin) {
  try {
    const [result] = await pool.query(
      "UPDATE szinek SET szin = ? WHERE szinid = ?",
      [szin, szinid]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateSzin függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a színt.");
  }
}

async function osszesRendelesReszlet() {
  try {
    const [rows] = await pool.query("SELECT * FROM rendeles_reszletei");
    return rows;
  } catch (error) {
    console.error("Hiba az osszesRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendelés részleteit.");
  }
}

// Egy rendelésrészlet lekérdezése ID alapján
async function selectRendelesReszlet(id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM rendeles_reszletei WHERE id = ?",
      [id]
    );
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendelés részletet.");
  }
}

// Rendelésrészlet szűrése rendelés ID alapján
async function filterRendelesReszletByID(rendeles_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM rendeles_reszletei WHERE rendeles_id = ?",
      [rendeles_id]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a rendelés részleteit.");
  }
}

// Új rendelésrészlet hozzáadása
async function insertRendelesReszlet(rendeles_id, polo_id, darab, vegosszeg) {
  try {
    const [result] = await pool.query(
      "INSERT INTO rendeles_reszletei (rendeles_id, polo_id, darab, vegosszeg) VALUES (?, ?, ?, ?)",
      [rendeles_id, polo_id, darab, vegosszeg]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a rendelés részletet.");
  }
}

// Rendelésrészlet törlése ID alapján
async function deleteRendelesReszlet(id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM rendeles_reszletei WHERE id = ?",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Hiba a deleteRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült törölni a rendelés részletet.");
  }
}

// Rendelésrészlet módosítása ID alapján
async function updateRendelesReszlet(
  id,
  rendeles_id,
  polo_id,
  darab,
  vegosszeg
) {
  try {
    const [result] = await pool.query(
      "UPDATE rendeles_reszletei SET rendeles_id = ?, polo_id = ?, darab = ?, vegosszeg = ? WHERE id = ?",
      [rendeles_id, polo_id, darab, vegosszeg, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateRendelesReszlet függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a rendelés részletet.");
  }
}

// Összes rendelésfizetés lekérdezése
async function osszesRendelesFizetes() {
  try {
    const [rows] = await pool.query("SELECT * FROM rendeles_fizetes");
    return rows;
  } catch (error) {
    console.error("Hiba az osszesRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendelés fizetéseket.");
  }
}

// Egy rendelésfizetés lekérdezése rendelés ID alapján
async function selectRendelesFizetes(rendeles_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM rendeles_fizetes WHERE rendeles_id = ?",
      [rendeles_id]
    );
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendelés fizetést.");
  }
}

// Rendelésfizetés szűrése fizetési mód alapján
async function filterRendelesFizetes(fizetesid) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM rendeles_fizetes WHERE fizetes_id = ?",
      [fizetesid]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a rendelés fizetéseket.");
  }
}

// Új rendelésfizetés hozzáadása
async function insertRendelesFizetes(rendeles_id, fizetesid) {
  try {
    const [result] = await pool.query(
      "INSERT INTO rendeles_fizetes (rendeles_id, fizetes_id) VALUES (?, ?)",
      [rendeles_id, fizetesid]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a rendelés fizetést.");
  }
}

// Rendelésfizetés törlése rendelés ID alapján
async function deleteRendelesFizetes(rendeles_id) {
  try {
    const [result] = await pool.query(
      "DELETE FROM rendeles_fizetes WHERE rendeles_id = ?",
      [rendeles_id]
    );
    return result;
  } catch (error) {
    console.error("Hiba a deleteRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült törölni a rendelés fizetést.");
  }
}

// Rendelésfizetés módosítása ID alapján
async function updateRendelesFizetes(rendeles_id, fizetesid) {
  try {
    const [result] = await pool.query(
      "UPDATE rendeles_fizetes SET fizetes_id = ? WHERE rendeles_id = ?",
      [fizetesid, rendeles_id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateRendelesFizetes függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a rendelés fizetést.");
  }
}

// Összes rendelés lekérdezése
async function osszesRendeles() {
  try {
    const [rows] = await pool.query("SELECT * FROM rendeles");
    return rows;
  } catch (error) {
    console.error("Hiba az osszesRendeles függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendeléseket.");
  }
}

// Egy rendelés lekérdezése ID alapján
async function selectRendeles(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM rendeles WHERE id = ?", [
      id,
    ]);
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectRendeles függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a rendelést.");
  }
}

// Rendelés szűrése vásárló ID alapján
async function filterRendeles(vasarlo_id) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM rendeles WHERE vasarlo_id = ?",
      [vasarlo_id]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterRendeles függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a rendeléseket.");
  }
}

// Új rendelés hozzáadása
async function insertRendeles(vasarlo_id, rendeles_ideje, rendeles_statusz) {
  try {
    const [result] = await pool.query(
      "INSERT INTO rendeles (vasarlo_id, rendeles_ideje, rendeles_statusz) VALUES (?, ?, ?)",
      [vasarlo_id, rendeles_ideje, rendeles_statusz]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertRendeles függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a rendelést.");
  }
}

// Rendelés törlése ID alapján
async function deleteRendeles(id) {
  try {
    const [result] = await pool.query("DELETE FROM rendeles WHERE id = ?", [
      id,
    ]);
    return result;
  } catch (error) {
    console.error("Hiba a deleteRendeles függvényben:", error.message);
    throw new Error("Nem sikerült törölni a rendelést.");
  }
}

// Rendelés módosítása ID alapján
async function updateRendeles(
  id,
  vasarlo_id,
  rendeles_ideje,
  rendeles_statusz
) {
  try {
    const [result] = await pool.query(
      "UPDATE rendeles SET vasarlo_id = ?, rendeles_ideje = ?, rendeles_statusz = ? WHERE id = ?",
      [vasarlo_id, rendeles_ideje, rendeles_statusz, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateRendeles függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a rendelést.");
  }
}
// Összes méret lekérdezése
async function getMeretek() {
  try {
    const [rows] = await pool.query("SELECT * FROM meretek");
    return rows;
  } catch (error) {
    console.error("Hiba a getMeretek függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a méreteket.");
  }
}

// Egy méret lekérdezése ID alapján
async function selectMeret(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM meretek WHERE id = ?", [id]);
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectMeret függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a méretet.");
  }
}

// Méret szűrése név alapján
async function filterMeret(meret) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM meretek WHERE meret LIKE ?",
      [`%${meret}%`]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterMeret függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a méreteket.");
  }
}

// Új méret hozzáadása
async function insertMeret(meret) {
  try {
    const [result] = await pool.query(
      "INSERT INTO meretek (meret) VALUES (?)",
      [meret]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertMeret függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a méretet.");
  }
}

// Méret törlése ID alapján
async function deleteMeret(id) {
  try {
    const [result] = await pool.query("DELETE FROM meretek WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error("Hiba a deleteMeret függvényben:", error.message);
    throw new Error("Nem sikerült törölni a méretet.");
  }
}

// Méret módosítása ID alapján
async function updateMeret(id, meret) {
  try {
    const [result] = await pool.query(
      "UPDATE meretek SET meret = ? WHERE id = ?",
      [meret, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateMeret függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a méretet.");
  }
}

// Összes márka lekérdezése
async function getMarkak() {
  try {
    const [rows] = await pool.query("SELECT * FROM marka");
    return rows;
  } catch (error) {
    console.error("Hiba a getMarkak függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a márkákat.");
  }
}

// Egy márka lekérdezése ID alapján
async function selectMarka(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM marka WHERE id = ?", [id]);
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectMarka függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a márkát.");
  }
}

// Márka szűrése név alapján
async function filterMarka(marka) {
  try {
    const [rows] = await pool.query("SELECT * FROM marka WHERE marka LIKE ?", [
      `%${marka}%`,
    ]);
    return rows;
  } catch (error) {
    console.error("Hiba a filterMarka függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a márkákat.");
  }
}

// Új márka hozzáadása
async function insertMarka(marka) {
  try {
    const [result] = await pool.query("INSERT INTO marka (marka) VALUES (?)", [
      marka,
    ]);
    return result;
  } catch (error) {
    console.error("Hiba az insertMarka függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a márkát.");
  }
}

// Márka törlése ID alapján
async function deleteMarka(id) {
  try {
    const [result] = await pool.query("DELETE FROM marka WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error("Hiba a deleteMarka függvényben:", error.message);
    throw new Error("Nem sikerült törölni a márkát.");
  }
}

// Márka módosítása ID alapján
async function updateMarka(id, marka) {
  try {
    const [result] = await pool.query(
      "UPDATE marka SET marka = ? WHERE id = ?",
      [marka, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateMarka függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a márkát.");
  }
}

// Összes márka lekérdezése
async function getKeszlet() {
  try {
    const [rows] = await pool.query("SELECT * FROM keszlet");
    return rows;
  } catch (error) {
    console.error("Hiba a getMarkak függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a márkákat.");
  }
}

// Egy márka lekérdezése ID alapján
async function selectKeszlet(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM keszlet WHERE id = ?", [id]);
    return rows[0] || null; // Egyedi rekord vagy null
  } catch (error) {
    console.error("Hiba a selectMarka függvényben:", error.message);
    throw new Error("Nem sikerült lekérdezni a márkát.");
  }
}

// Márka szűrése név alapján
async function filterKeszlet(marka) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM keszlet WHERE marka LIKE ?",
      [`%${marka}%`]
    );
    return rows;
  } catch (error) {
    console.error("Hiba a filterMarka függvényben:", error.message);
    throw new Error("Nem sikerült szűrni a márkákat.");
  }
}

// Új márka hozzáadása
async function insertKeszlet(marka) {
  try {
    const [result] = await pool.query(
      "INSERT INTO keszlet (marka) VALUES (?)",
      [marka]
    );
    return result;
  } catch (error) {
    console.error("Hiba az insertMarka függvényben:", error.message);
    throw new Error("Nem sikerült hozzáadni a márkát.");
  }
}

// Márka törlése ID alapján
async function deleteKeszlet(id) {
  try {
    const [result] = await pool.query("DELETE FROM keszlet WHERE id = ?", [id]);
    return result;
  } catch (error) {
    console.error("Hiba a deleteMarka függvényben:", error.message);
    throw new Error("Nem sikerült törölni a márkát.");
  }
}

// Márka módosítása ID alapján
async function updateKeszlet(id, marka) {
  try {
    const [result] = await pool.query(
      "UPDATE keszlet SET marka = ? WHERE id = ?",
      [marka, id]
    );
    return result;
  } catch (error) {
    console.error("Hiba az updateMarka függvényben:", error.message);
    throw new Error("Nem sikerült frissíteni a márkát.");
  }
}


async function updatePassword(email, newPassword) {
  try {
    const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
    const [result] = await pool.query(
      "UPDATE vasarlok SET jelszo = ? WHERE email = ?",
      [hashedPassword, email]
    );
    return result;
  } catch (error) {
    console.error("Hiba a jelszó frissítésekor:", error.message);
    throw new Error("Nem sikerült frissíteni a jelszót.");
  }
}

// Exportált függvények
module.exports = {
  selectTermekek,
  selectTermekById,
  filterTermek,
  insertTermek,
  deleteTermek,
  updateTermek,

  selectVasarlok,
  selectVasarlo,
  selectVarosById,
  filterVasarlo,
  insertVasarlo,
  deleteVasarlo,
  updateVasarlo,

  selectVaros,
  selectVarosById,
  filterVaros,
  insertVaros,
  deleteVaros,
  updateVaros,

  selectSzin,
  osszesSzin,
  selectSzin,
  filterSzin,
  insertSzin,
  deleteSzin,
  updateSzin,

  osszesRendelesReszlet,
  selectRendelesReszlet,
  filterRendelesReszletByID,
  insertRendelesReszlet,
  deleteRendelesReszlet,
  updateRendelesReszlet,

  osszesRendelesFizetes,
  selectRendelesFizetes,
  filterRendelesFizetes,
  insertRendelesFizetes,
  deleteRendelesFizetes,
  updateRendelesFizetes,

  osszesRendeles,
  selectRendeles,
  filterRendeles,
  insertRendeles,
  deleteRendeles,
  updateRendeles,

  getMeretek,
  selectMeret,
  filterMeret,
  insertMeret,
  deleteMeret,
  updateMeret,

  getMarkak,
  selectMarka,
  filterMarka,
  insertMarka,
  deleteMarka,
  updateMarka,

  getKeszlet,
  selectKeszlet,
  filterKeszlet,
  insertKeszlet,
  deleteKeszlet,
  updateKeszlet,


  findUserByEmail,
  comparePassword,

  

  AddtoCart,
  getProducts,
  updatePassword,
  PaymentMethod,
};
