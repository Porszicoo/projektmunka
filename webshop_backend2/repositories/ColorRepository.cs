using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Windows;
using be.entities;
using MySql.Data.MySqlClient;

namespace be.interfaces
{
    internal class ColorRepository : IRepository<Color>
    {
        private readonly string _connectionString;

        public ColorRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Color>> GetAllAsync()
        {
            List<Color> colors = new List<Color>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM szinek";
                    var command = new MySqlCommand(query, db);


                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            colors.Add(new Color
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("szin"),

                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return colors;
        }
        public async Task<Color> GetByIdAsync(string id)
        {
            Color color = new Color();

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {

                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM szinek WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                           color = new Color
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("szin"),
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return color;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM szinek WHERE id = @PrimaryKeyValue;";
                    MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                    deleteCmd.Parameters.AddWithValue("@PrimaryKeyValue", id);
                    await deleteCmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Adat törölve a(z) szinek táblából, azonosító: {id}");
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
                    var columns = string.Join(", ", details.Keys);
                    var values = string.Join(", ", details.Keys.Select(key => $"@{key}"));
                    var query = $"INSERT INTO szinek ({columns}) VALUES ({values})";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Szin hozzaadva!");
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
                    var query = $"UPDATE szinek SET {updates} WHERE id = @id";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }
                    cmd.Parameters.AddWithValue("@id", id);

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Szin adatai frissitve! Azonosito: {id}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
