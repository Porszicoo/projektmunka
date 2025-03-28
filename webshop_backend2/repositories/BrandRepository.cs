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
    internal class BrandRepository : IRepository<Brand>
    {
        private readonly string _connectionString;

        public BrandRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Brand>> GetAllAsync()
        {
            List<Brand> brand = new List<Brand>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM markak";
                    var command = new MySqlCommand(query, db);


                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            brand.Add(new Brand
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("nev"),

                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

           return brand;
        }
        public async Task<Brand> GetByIdAsync(string id)
        {
            Brand brand = new Brand();

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {

                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM marka WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            brand = new Brand
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("nev"),
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return brand;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM markak WHERE id = @PrimaryKeyValue;";
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
            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var columns = string.Join(", ", details.Keys);
                    var values = string.Join(", ", details.Keys.Select(key => $"@{key}"));
                    MessageBox.Show(columns);
                    MessageBox.Show(values);
                    var query = $"INSERT INTO markak ({columns}) VALUES ({values})";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Márka hozzáadva!");
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
                    var query = $"UPDATE markak SET {updates} WHERE id = @id";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }
                    cmd.Parameters.AddWithValue("@id", id);

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Márka adatai frissitve! Azonosító: {id}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
