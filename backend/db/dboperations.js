//Főtábla

const config = require('./dbconfig'); // Az adatbázis kapcsolati beállításai
const sql = require('mysql2/promise'); // MySQL kapcsolat

let pool = sql.createPool(config); // Pool kapcsolat létrehozása

// Összes termék lekérdezése
async function selectTermekek() {
    try {
        const [rows] = await pool.query('SELECT * FROM termekek');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy termék lekérdezése ID alapján
async function selectTermekekById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM termekek WHERE termekekid = ?', [id]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// Termékek szűrése név alapján
async function filterTermekek(nev) {
    try {
        const [rows] = await pool.query('SELECT * FROM termekek WHERE nev LIKE ?', [`%${nev}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új termék hozzáadása
async function insertTermekek(nev, ar) {
    try {
        const [result] = await pool.query('INSERT INTO termekek (nev, ar) VALUES (?, ?)', [nev, ar]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// Termék törlése ID alapján
async function deleteTermekek(id) {
    try {
        const [result] = await pool.query('DELETE FROM termekek WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// Termék módosítása ID alapján
async function updateTermekek(id, nev, ar) {
    try {
        const [result] = await pool.query('UPDATE termekek SET nev = ?, ar = ? WHERE id = ?', [nev, ar, id]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}

//Összes vásárló lekérdezése
async function osszesVasarlo() {
    try {
        const [rows] = await pool.query('SELECT * FROM vasarlok');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy vásárló lekérdezése ID alapján
async function selectVasarlo(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM vasarlo WHERE vasarloid = ?', [id]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// Vásárló szűrése név alapján
async function filterVasarlo(nev) {
    try {
        const [rows] = await pool.query('SELECT * FROM vasarlo WHERE nev LIKE ?', [`%${nev}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új termék hozzáadása
async function insertVasarlo(nev,) {
    try {
        const [result] = await pool.query('INSERT INTO vasarlo (vasarlo, email, telefonsz, utca, iranyitosz) VALUES (?, ?)', [vasarlo, email, telefonsz, utca, iranyitosz]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// Vásárló törlése ID alapján
async function deleteVasarlo(id) {
    try {
        const [result] = await pool.query('DELETE FROM vasarlo WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// Vásárló módosítása ID alapján
async function updateVasarlo(vasarloid, vasarlo, email, telefonsz, utca, iranyitosz) {
    try {
        const [result] = await pool.query('UPDATE termekek SET vasarloid = ?, ar = ?, vasarlo = ?, email = ?, telefonsz = ?, utca = ?, iranyitosz = ?, WHERE id = ?', [vasarloid, vasarlo, email, telefonsz, utca, iranyitosz]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}

//Összes város lekérdezése
async function osszesVaros() {
    try {
        const [rows] = await pool.query('SELECT * FROM varosok');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy város lekérdezése ID alapján
async function selectVaros(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM varosok WHERE iranyitosz = ?', [id]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// Város szűrése név alapján
async function filterVasros(nev) {
    try {
        const [rows] = await pool.query('SELECT * FROM varosok WHERE nev LIKE ?', [`%${nev}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új város hozzáadása
async function insertVaros(iranyitosz, varos) {
    try {
        const [result] = await pool.query('INSERT INTO varosok (iranyitosz, varos) VALUES (?, ?)', [iranyitosz, varos]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// Város törlése ID alapján
async function deleteVaros(id) {
    try {
        const [result] = await pool.query('DELETE FROM varosok WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// Város módosítása ID alapján
async function updateVaros(iranyitosz, varos) {
    try {
        const [result] = await pool.query('UPDATE varosok SET iranyitosz = ?, varos = ? WHERE id = ?', [iranyitosz, varos]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}

//Összes szin lekérdezése
async function osszesSzin() {
    try {
        const [rows] = await pool.query('SELECT * FROM szinek');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy szin lekérdezése ID alapján
async function selectSzin(szinid, szin) {
    try {
        const [rows] = await pool.query('SELECT * FROM szinek WHERE szinid = ?', [szinid,szin]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// Szin szűrése név alapján
async function filterSzin(szinid, szin) {
    try {
        const [rows] = await pool.query('SELECT * FROM szinek WHERE nev LIKE ?', [`%${szinid, szin}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új szín hozzáadása
async function insertSzin(szinid, szin) {
    try {
        const [result] = await pool.query('INSERT INTO szinek (szinid, szin) VALUES (?, ?)', [szinid, szin]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// Szín törlése ID alapján
async function deleteSzin(szinid) {
    try {
        const [result] = await pool.query('DELETE FROM szinek WHERE id = ?', [szinid]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// Szín módosítása ID alapján
async function updateSzin(szinid, szin) {
    try {
        const [result] = await pool.query('UPDATE szinek SET szinid = ?, vszin = ? WHERE id = ?', [szinid, szin]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}

//Összes rendelesreszleti lekérdezése
async function rendelesReszlete() {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_reszletei');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy rendelesreszlet lekérdezése ID alapján
async function selectrendelesreszlete(id, rendeles_id, polo_id, darab, vegosszeg) {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_reszeletei WHERE id = ?', [id, rendeles_id, polo_id, darab, vegosszeg]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// rendelesresreszlet szűrése név alapján
async function filterrendelesreszlete(id, rendeles_id, polo_id, darab, vegosszeg) {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_reszletei WHERE id LIKE ?', [`%${id, rendeles_id, polo_id, darab, vegosszeg}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új rendelesreszlet hozzáadása
async function insertRendelesreszlet(id, rendeles_id, polo_id, darab, vegosszeg) {
    try {
        const [result] = await pool.query('INSERT INTO rendeles_reszletei (id, rendeles_id, polo_id, darab, vegosszeg) VALUES (?, ?)', [id, rendeles_id, polo_id, darab, vegosszeg]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// Rendelésrészlet törlése ID alapján
async function deleterendelesreszlet(id, rendeles_id, polo_id) {
    try {
        const [result] = await pool.query('DELETE FROM rendeles_reszletei WHERE id = ?', [id, rendeles_id, polo_id]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// rendelésrészlet módosítása ID alapján
async function updaterendelesreszlet(id, rendeles_id, polo_id) {
    try {
        const [result] = await pool.query('UPDATE rendeles_reszetei SET id = ?, rendeles_id = ? polo_id = ? WHERE id = ?', [id, rendeles_id, polo_id]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}

//Összes rendelesfizetes lekérdezése
async function rendelesfizetes() {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_fizetes');
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekek függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a termékeket.');
    }
}

// Egy rendelesfizetes lekérdezése ID alapján
async function selectrendelfizetes(rendeles_id, fizetesid) {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_fizetes WHERE id = ?', [rendeles_id, fizetesid]);
        return rows;
    } catch (error) {
        console.error('Hiba a selectTermekekById függvényben:', error.message);
        throw new Error('Nem sikerült lekérdezni a terméket.');
    }
}

// rendelesfizetes szűrése név alapján
async function filterrendelesfizetes(rendeles_id, fizetesid) {
    try {
        const [rows] = await pool.query('SELECT * FROM rendeles_reszletei WHERE id LIKE ?', [`%${rendeles_id, fizetesid}%`]);
        return rows;
    } catch (error) {
        console.error('Hiba a filterTermekek függvényben:', error.message);
        throw new Error('Nem sikerült szűrni a termékeket.');
    }
}

// Új rendelesfizetes
async function insertRendelesfizetes(rendeles_id, fizetesid) {
    try {
        const [result] = await pool.query('INSERT INTO rendeles_reszletei (rendeles_id, fizetesid) VALUES (?, ?)', [rendeles_id, fizetesid]);
        return result;
    } catch (error) {
        console.error('Hiba az insertTermekek függvényben:', error.message);
        throw new Error('Nem sikerült hozzáadni a terméket.');
    }
}

// rendelesfizetes törlése ID alapján
async function deleterendelesfizetes(rendeles_id, fizetesid) {
    try {
        const [result] = await pool.query('DELETE FROM rendeles_fizetes WHERE id = ?', [rendeles_id, fizetesid]);
        return result;
    } catch (error) {
        console.error('Hiba a deleteTermekek függvényben:', error.message);
        throw new Error('Nem sikerült törölni a terméket.');
    }
}

// rendelesfizetes módosítása ID alapján
async function updaterendelesfizetes(rendeles_id, fizetesid) {
    try {
        const [result] = await pool.query('UPDATE rendeles_fizetes SET id = ?, rendeles_id = ? fizetes_id = ? WHERE id = ?', [rendeles_id, fizetesid]);
        return result;
    } catch (error) {
        console.error('Hiba az updateTermekek függvényben:', error.message);
        throw new Error('Nem sikerült frissíteni a terméket.');
    }
}



// Exportált függvények
module.exports = {
    selectTermekek,
    selectTermekekById,
    filterTermekek,
    insertTermekek,
    deleteTermekek,
    updateTermekek,
    osszesVasarlo,
    selectVasarlo,
    filterVasarlo,
    insertVasarlo,
    deleteVasarlo,
    updateVasarlo,
    osszesVaros,
    selectVaros,
    filterVasros,
    deleteVaros,
    updateVaros,
    insertVaros,
    osszesSzin,
    selectSzin,
    filterSzin,
    insertSzin,
    deleteSzin,
    updateSzin,
    rendelesReszlete,
    selectrendelesreszlete,
    filterrendelesreszlete,
    insertRendelesreszlet,
    deleterendelesreszlet,
    updaterendelesreszlet,
    rendelesfizetes,
    selectrendelfizetes,
    filterrendelesreszlete,
    insertRendelesfizetes,
    deleterendelesfizetes,
    updaterendelesfizetes,
};