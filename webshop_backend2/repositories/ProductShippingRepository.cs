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
    
    
        internal class ProductShippingRepository : IRepository<ProductShipping>
        {
            private readonly string _connectionString;

            public ProductShippingRepository(string connectionString)
            {
                _connectionString = connectionString;
            }

        public async Task<IEnumerable<ProductShipping>> GetAllAsync()
        {
            List<ProductShipping> shipping = new List<ProductShipping>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM rendelestermek_view";
                    var command = new MySqlCommand(query, db);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            shipping.Add(new ProductShipping
                            {
                                Id = reader.GetInt32("id"),
                                Reszletek = reader.GetString("rendel_reszletek"),
                                Date = reader.GetDateTime("rendel_datum"),
                                Name = reader.GetString("termek_nev"),
                                Value = reader.GetInt32("reszletek"),
                                Mennyiseg = reader.GetInt32("mennyiseg"),
                                Total = reader.GetDouble("osszeg")
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return shipping;
        }
            public async Task<ProductShipping> GetByIdAsync(string id)
            {
                ProductShipping shipping = new ProductShipping();

                using (MySqlConnection db = new MySqlConnection(_connectionString))
                {

                    try
                    {
                        await db.OpenAsync();
                        string query = "SELECT * FROM rendelestermek_view WHERE id = @PrimaryKeyValue;";
                        MySqlCommand command = new MySqlCommand(query, db);
                        command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                shipping = new ProductShipping
                                {
                                    Id = reader.GetInt32("id"),
                                    Reszletek = reader.GetString("rendel_reszletek"),
                                    Date = reader.GetDateTime("rendel_datum"),
                                    Name = reader.GetString("termek_nev"),
                                    Value = reader.GetInt32("reszletek"),
                                    Mennyiseg = reader.GetInt32("mennyiseg"),
                                    Total = reader.GetDouble("osszeg")
                                };
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                return shipping;
            }

            public async Task DeleteAsync(string id)
            {
                using (MySqlConnection db = new MySqlConnection(_connectionString))
                {
                    try
                    {
                        await db.OpenAsync();
                        string deleteQuery = "DELETE FROM rendelestermek_view WHERE id = @PrimaryKeyValue;";
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
                        var columns = string.Join(", ", details.Keys);
                        var values = string.Join(", ", details.Keys.Select(key => $"@{key}"));
                        var query = $"INSERT INTO rendelestermek_view ({columns}) VALUES ({values})";

                        var cmd = new MySqlCommand(query, db);
                        foreach (var item in details)
                        {
                            cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                        }

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
                        var query = $"UPDATE rendelestermek_view SET {updates} WHERE id = @id";

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

        Task<ProductShipping> IRepository<ProductShipping>.GetByIdAsync(string id)
        {
            throw new NotImplementedException();
        }
    }
}
