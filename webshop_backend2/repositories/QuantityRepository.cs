using be.entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace be.repositories
{
    internal class QuantityRepository
    {
        private readonly string _connectionString;

        public QuantityRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Quantity>> GetAllAsync()
        {
            List<Quantity> quantities = new List<Quantity>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM keszlet_valtozas";
                    var command = new MySqlCommand(query, db);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            quantities.Add(new Quantity
                            {
                                Id = reader.GetInt32("id"),
                                Change = reader.GetString("valtozas_tipusa"),
                                ProductId = reader.GetInt32("termek_id"),
                                Quantiti = reader.GetInt32("mennyiseg"),
                                Date = reader.GetDateTime("date")
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Adatbázis kapcsolati hiba! {ex.Message}", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return quantities;
        }

        public async Task<Quantity> GetByIdAsync(int id)
        {
            Quantity quantity = null;

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM keszlet_valtozas WHERE id = @id;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@id", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            quantity = new Quantity
                            {
                                Id = reader.GetInt32("id"),
                                Change = reader.GetString("valtozas_tipusa"),
                                ProductId = reader.GetInt32("termek_id"),
                                Quantiti = reader.GetInt32("mennyiseg"),
                                Date = reader.GetDateTime("date")
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Adatbázis kapcsolati hiba! {ex.Message}", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return quantity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();

                    // Ellenőrizzük, hogy létezik-e az adott ID
                    string checkQuery = "SELECT COUNT(*) FROM keszlet_valtozas WHERE id = @id;";
                    MySqlCommand checkCmd = new MySqlCommand(checkQuery, db);
                    checkCmd.Parameters.AddWithValue("@id", id);
                    int count = Convert.ToInt32(await checkCmd.ExecuteScalarAsync());

                    if (count == 0)
                    {
                        MessageBox.Show("A törlendő rekord nem található!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                        return false;
                    }

                    string deleteQuery = "DELETE FROM keszlet_valtozas WHERE id = @id;";
                    MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                    deleteCmd.Parameters.AddWithValue("@id", id);

                    int rowsAffected = await deleteCmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show($"Rekord törölve! ID: {id}");
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Adatbázis hiba! {ex.Message}", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return false;
        }

        public async Task<bool> CreateAsync(Dictionary<string, object> details)
        {
            if (string.IsNullOrEmpty(_connectionString))
            {
                throw new InvalidOperationException("A kapcsolat string nincs inicializálva.");
            }

            if (details == null || details.Count == 0)
            {
                throw new ArgumentException("A részletek nem lehetnek null vagy üresek.");
            }

            // Ellenőrizzük a kötelező mezőket
            if (!details.ContainsKey("termek_id") || !details.ContainsKey("mennyiseg") || !details.ContainsKey("valtozas_tipusa"))
            {
                throw new ArgumentException("A 'termek_id', 'mennyiseg' és 'valtozas_tipusa' mezők kötelezők.");
            }

            await using var db = new MySqlConnection(_connectionString);
            await db.OpenAsync();

            var columns = string.Join(", ", details.Keys);
            var values = string.Join(", ", details.Keys.Select(k => $"@{k}"));
            var query = $"INSERT INTO keszlet_valtozas ({columns}) VALUES ({values}); SELECT LAST_INSERT_ID();";

            await using var cmd = new MySqlCommand(query, db);

            foreach (var item in details)
            {
                if (string.IsNullOrEmpty(item.Key))
                {
                    throw new ArgumentException("Egy kulcs sem lehet null vagy üres.");
                }

                // Ha a mező 'date' és nincs explicit értéke, adjunk hozzá egy aktuális timestamp-et
                object value = item.Value ?? (item.Key == "date" ? DateTime.Now : DBNull.Value);

                cmd.Parameters.AddWithValue($"@{item.Key}", value);
            }

            try
            {
                var result = await cmd.ExecuteScalarAsync();

                if (result != null && long.TryParse(result.ToString(), out long newId) && newId > 0)
                {
                    Console.WriteLine($"Sikeres hozzáadás! Új ID: {newId}");
                    return true;
                }
            }
            catch (MySqlException ex) when (ex.Number == 1452) // Idegen kulcs megsértése
            {
                throw new Exception("A megadott termek_id nem létezik a termek táblában.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception($"Adatbázis hiba történt: {ex.Message}", ex);
            }

            return false;
        }

        public async Task<bool> UpdateAsync(int id, Dictionary<string, object> details)
        {
            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();

                    // Ellenőrizzük, hogy létezik-e az adott ID
                    string checkQuery = "SELECT COUNT(*) FROM keszlet_valtozas WHERE id = @id;";
                    using (var checkCmd = new MySqlCommand(checkQuery, db))
                    {
                        checkCmd.Parameters.AddWithValue("@id", id);
                        int count = Convert.ToInt32(await checkCmd.ExecuteScalarAsync());

                        if (count == 0)
                        {
                            MessageBox.Show("A módosítandó rekord nem található!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                            return false;
                        }
                    }

                    var updates = string.Join(", ", details.Keys.Select(k => $"{k} = @{k}"));
                    string query = $"UPDATE keszlet_valtozas SET {updates} WHERE id = @id;";

                    using (var cmd = new MySqlCommand(query, db))
                    {
                        foreach (var item in details)
                        {
                            cmd.Parameters.AddWithValue($"@{item.Key}", item.Value ?? DBNull.Value);
                        }
                        cmd.Parameters.AddWithValue("@id", id);

                        int rowsAffected = await cmd.ExecuteNonQueryAsync();
                        if (rowsAffected > 0)
                        {
                            MessageBox.Show($"Rekord frissítve! ID: {id}");
                            return true;
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Adatbázis hiba! {ex.Message}", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return false;
        }
    }
}
