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





// Exportált függvények
module.exports = {
    selectTermekek,
    selectTermekekById,
    filterTermekek,
    insertTermekek,
    deleteTermekek,
    updateTermekek
};