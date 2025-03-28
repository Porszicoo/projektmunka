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
    internal class PaymentRepository : IRepository<Payment>
    {
        private readonly string _connectionString;

        public PaymentRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<Payment>> GetAllAsync()
        {
            List<Payment> pays = new List<Payment>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM rendeles";
                    var command = new MySqlCommand(query, db);


                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            pays.Add(new Payment
                            {
                                Id = reader.GetInt32("id"),
                                UserId = reader.GetInt32("vasarlo_id"),
                                PaymentDate = reader.GetDateTime("date"),
                                PaymentDesc = reader.GetString("reszletek"),
                                Bill = reader.GetInt32("szamla_id")


                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return pays;
        }
        public async Task<Payment> GetByIdAsync(string id)
        {
            Payment pays = new Payment();

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {

                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM rendeles WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            pays = new Payment
                            {
                                Id = reader.GetInt32("id"),
                                UserId = reader.GetInt32("vasarlo_id"),
                                PaymentDate = reader.GetDateTime("date"),
                                PaymentDesc = reader.GetString("reszletek"),
                                Bill = reader.GetInt32("szamla_id")
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return pays;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM rendeles WHERE id = @PrimaryKeyValue;";
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
                    var query = $"INSERT INTO rendeles ({columns}) VALUES ({values})";

                    using (var cmd = new MySqlCommand(query, db))
                    {
                        foreach (var item in details)
                        {
                            cmd.Parameters.AddWithValue($"@{item.Key}", item.Value ?? DBNull.Value);
                        }

                        await cmd.ExecuteNonQueryAsync();
                        long insertedId = cmd.LastInsertedId; // Frissen beszúrt rekord ID-je
                        MessageBox.Show($"Rendelés sikeresen hozzáadva! Azonosító: {insertedId}");
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Adatbázis hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
            private bool TableHasColumn(string tableName, string columnName)
            { 
            using (var db = new MySqlConnection(_connectionString))
            {
                db.Open();
                var query = $"SHOW COLUMNS FROM {tableName} LIKE '{columnName}'";
                using (var cmd = new MySqlCommand(query, db))
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        return reader.HasRows;
                    }
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
                    var query = $"UPDATE rendeles SET {updates} WHERE id = @id";

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
    }
}