using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows;
using be.entities;
using MySql.Data.MySqlClient;

namespace be.interfaces
{
    internal class OrderRepository : IRepository<Order>
    {
        private readonly string _connectionString;

        public OrderRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            List<Order> orders = new List<Order>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT id, nev FROM webaruhaz.fizetes_mod";
                    var command = new MySqlCommand(query, db);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            orders.Add(new Order
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetInt32("nev") // Mert VARCHAR, nem INT
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a lekérdezés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return orders;
        }

        public async Task<Order?> GetByIdAsync(string id)
        {
            if (!int.TryParse(id, out int parsedId))
            {
                MessageBox.Show("Érvénytelen azonosító!", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                return null;
            }

            Order? order = null;

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string query = "SELECT id, nev FROM webaruhaz.fizetes_mod WHERE id = @id;";
                    var command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@id", parsedId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            order = new Order
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetInt32("nev") // VARCHAR kezelése
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a lekérdezés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return order;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM fizetes_mod WHERE id = @PrimaryKeyValue;";
                    MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                    deleteCmd.Parameters.AddWithValue("@PrimaryKeyValue", id);
                    await deleteCmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Adat törölve a(z) márkák táblából, azonosító: {id}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
        public async Task CreateAsync(Dictionary<string, object> details)
        {
            if (!details.ContainsKey("nev") || details["nev"] == null)
            {
                MessageBox.Show("Hiányzó 'nev' mező!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string query = "INSERT INTO webaruhaz.fizetes_mod (nev) VALUES (@nev);";
                    var cmd = new MySqlCommand(query, db);
                    cmd.Parameters.AddWithValue("@nev", details["nev"].ToString());

                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show("Sikeres adatfelvitel!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    }
                    else
                    {
                        MessageBox.Show("Az adat nem lett rögzítve!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba az adatfelvitel során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        public async Task UpdateAsync(string id, Dictionary<string, object> details)
        {
            if (!int.TryParse(id, out int parsedId))
            {
                MessageBox.Show("Érvénytelen azonosító!", "Hiba!", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            if (!details.ContainsKey("nev") || details["nev"] == null)
            {
                MessageBox.Show("Hiányzó 'nev' mező!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string query = "UPDATE webaruhaz.fizetes_mod SET nev = @nev WHERE id = @id;";
                    var cmd = new MySqlCommand(query, db);
                    cmd.Parameters.AddWithValue("@nev", details["nev"].ToString());
                    cmd.Parameters.AddWithValue("@id", parsedId);
                    int rowsAffected = await cmd.ExecuteNonQueryAsync();
                    if (rowsAffected > 0)
                    {
                        MessageBox.Show($"Sikeres frissítés! Azonosító: {parsedId}");
                    }
                    else
                    {
                        MessageBox.Show("Nem található ilyen azonosító vagy az adat nem változott!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Hiba a frissítés során: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
