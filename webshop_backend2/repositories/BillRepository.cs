using be.entities;
using be.interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Data;

namespace be.repositories
{
    
    

        internal class BillRepository : IRepository<Bill>
        {
            private readonly string _connectionString;

            public BillRepository(string connectionString)
            {
                _connectionString = connectionString;
            }

            public async Task<IEnumerable<Bill>> GetAllAsync()
            {
                List<Bill> bill = new List<Bill>();

                using (var db = new MySqlConnection(_connectionString))
                {
                    try
                    {
                        await db.OpenAsync();
                        var query = "SELECT * FROM szamla";
                        var command = new MySqlCommand(query, db);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                bill.Add(new Bill
                                {
                                    Id = reader.GetInt32("id"),
                                    Netto = reader.GetDouble("netto_osszeg"),
                                    Afa = reader.GetDouble("afa"),
                                    Date = reader.GetDateTime("date"),
                                    Szamla_sorszamla = reader.GetString("mennyiseg"),
                                    fizetes_mod = reader.GetInt32("osszeg")
                                });
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }

                return bill;
            }
        public async Task<Bill> GetByIdAsync(string id)
        {
            Bill bill = null; // Initialize the bill variable

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM szamla WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            bill = new Bill
                            {
                                Id = reader.GetInt32("id"),
                                Netto = reader.GetDouble("netto_osszeg"),
                                Afa = reader.GetDouble("afa"),
                                Date = reader.GetDateTime("date"),
                                Szamla_sorszamla = reader.GetString("mennyiseg"),
                                fizetes_mod = reader.GetInt32("osszeg")
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return bill;
        }

            public async Task DeleteAsync(string id)
            {
                using (MySqlConnection db = new MySqlConnection(_connectionString))
                {
                    try
                    {
                        await db.OpenAsync();
                        string deleteQuery = "DELETE FROM szamla WHERE id = @PrimaryKeyValue;";
                        MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                        deleteCmd.Parameters.AddWithValue("@PrimaryKeyValue", id);
                        await deleteCmd.ExecuteNonQueryAsync();
                        MessageBox.Show($"Adat törölve a(z) fizetés  táblából, azonosító: {id}");
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }

        public async Task CreateAsync(Dictionary<string, object> details)
        {
            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();

                    // Check if required fields are present in details
                    if (!details.ContainsKey("netto_osszeg") || !details.ContainsKey("afa") || !details.ContainsKey("date") || !details.ContainsKey("szamla_sorszam") || !details.ContainsKey("fizetes_mod_id"))
                    {
                        throw new ArgumentException("Missing required fields.");
                    }

                    // Constructing the SQL insert query dynamically
                    var columns = string.Join(", ", details.Keys.Where(k => k != "id")); // Exclude 'id' from columns
                    var values = string.Join(", ", details.Keys.Where(k => k != "id").Select(key => $"@{key}"));
                    var query = $"INSERT INTO szamla ({columns}) VALUES ({values})";

                    var cmd = new MySqlCommand(query, db);

                    // Add parameters to the command
                    foreach (var item in details.Where(k => k.Key != "id"))
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }

                    // Execute the insert command
                    await cmd.ExecuteNonQueryAsync();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
        public async Task UpdateAsync(string id, Dictionary<string, object> details)
            {
                using (var db = new MySqlConnection(_connectionString))
                {
                    try
                    {
                        await db.OpenAsync();
                        var updates = string.Join(", ", details.Keys.Select(k => $"{k} = @{k}"));
                        var query = $"UPDATE szamla SET {updates} WHERE id = @id";

                        var cmd = new MySqlCommand(query, db);
                        foreach (var item in details)
                        {
                            cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                        }
                        cmd.Parameters.AddWithValue("@id", id);

                        await cmd.ExecuteNonQueryAsync();
                        MessageBox.Show($"Rendeles adatai frissitve! Azonosito: {id}");
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }

            Task<IEnumerable<Bill>> IRepository<Bill>.GetAllAsync()
            {
                throw new NotImplementedException();
            }

            Task<Bill> IRepository<Bill>.GetByIdAsync(string id)
            {
                throw new NotImplementedException();
            }
        }
}
