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
    internal class UserRepository : IRepository<User>
    {
        private readonly string _connectionString;

        public UserRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            List<User> users = new List<User>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM vasarlok";
                    var command = new MySqlCommand(query, db);


                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new User
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("vasarlo"),
                                Email = reader.GetString("email"),
                                Phone = reader.GetString("telefonsz"),
                                Address = reader.GetString("utca"),
                                Postcode = reader.GetInt32("iranyitosz")

                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return users;
        }
        public async Task<User> GetByIdAsync(string id)
        {
            User users = new User();

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {

                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM vasarlok WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            users = new User
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("vasarlo"),
                                Email = reader.GetString("email"),
                                Phone = reader.GetString("telefonsz"),
                                Address = reader.GetString("utca"),
                                Postcode = reader.GetInt32("iranyitosz")
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return users;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM vasarlok WHERE id = @PrimaryKeyValue;";
                    MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                    deleteCmd.Parameters.AddWithValue("@PrimaryKeyValue", id);
                    await deleteCmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Adat törölve a(z) vasarlok táblából, azonosító: {id}");
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
                    var query = $"INSERT INTO vasarlok ({columns}) VALUES ({values})";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Vasarlo hozzaadva!");
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
                    var query = $"UPDATE vasarlok SET {updates} WHERE id = @id";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }
                    cmd.Parameters.AddWithValue("@id", id);

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Vasarlo adatai frissitve! Azonosito: {id}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
