using System.Data;
using System.Text;
using System.Windows;
using be.entities;
using MySql.Data.MySqlClient;

namespace be.interfaces
{
    internal class CityRepository : IRepository<City>
    {
        private readonly string _connectionString;

        public CityRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<IEnumerable<City>> GetAllAsync()
        {
            List<City> cities = new List<City>();

            using (var db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    var query = "SELECT * FROM varosok";
                    var command = new MySqlCommand(query, db);


                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            cities.Add(new City
                            {
                                Postcode = reader.GetInt32("iranyitoszam"),
                                Name = reader.GetString("varos"),

                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

            return cities;
        }
        public async Task<City> GetByIdAsync(string id)
        {
            City cities = new City();

            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {

                try
                {
                    await db.OpenAsync();
                    string query = "SELECT * FROM varosok WHERE id = @PrimaryKeyValue;";
                    MySqlCommand command = new MySqlCommand(query, db);
                    command.Parameters.AddWithValue("@PrimaryKeyValue", id);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            cities = new City
                            {
                                Postcode = reader.GetInt32("iranyitoszam"),
                                Name = reader.GetString("varos"),
                            };
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            return cities;
        }

        public async Task DeleteAsync(string id)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {
                    await db.OpenAsync();
                    string deleteQuery = "DELETE FROM varosok WHERE id = @PrimaryKeyValue;";
                    MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, db);
                    deleteCmd.Parameters.AddWithValue("@PrimaryKeyValue", id);
                    await deleteCmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Adat törölve a(z) városok táblából, azonosító: {id}");
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
                    var query = $"INSERT INTO varosok ({columns}) VALUES ({values})";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Varos hozzaadva!");
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
                    var query = $"UPDATE varosok SET {updates} WHERE id = @id";

                    var cmd = new MySqlCommand(query, db);
                    foreach (var item in details)
                    {
                        cmd.Parameters.AddWithValue($"@{item.Key}", item.Value);
                    }
                    cmd.Parameters.AddWithValue("@id", id);

                    await cmd.ExecuteNonQueryAsync();
                    MessageBox.Show($"Meret adatai frissitve! Azonosito: {id}");
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }
    }
}
