using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;
using System.Data;
using be.entities;
using be.interfaces;
using be.utils;
using Size = be.entities.Size;
using be.repositories;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Media.Imaging;
using System.Collections.ObjectModel;
namespace be

{
    public partial class MainWindow : Window
    {
        private static readonly string _connectionString = "server=localhost;database=webaruhaz;uid=root;pwd=root";
        private string _currentTableName = "";
        private IRepository<Product> ProductRepository { get; }
        private IRepository<Color> ColorRepository { get; }
        private IRepository<Order> OrderRepository { get; }
        private IRepository<Payment> PaymentRepository { get; }
        private IRepository<Brand> BrandRepository { get; }
        private IRepository<Size> SizeRepository { get; }
        private IRepository<City> CityRepository { get; }
        private IRepository<User> UserRepository { get; }
        private IRepository<ProductShipping> ProductShippingRepository { get; set; }

        private IRepository<Quantity> QuantityRepository { get; }

        private IRepository<Bill> BillRepository { get; }
        private UtilityHandler UtilityHandler { get; }


        //main konstruktor
        public MainWindow()
        {
            InitializeComponent();
            TestConnection();

            ProductRepository = new ProductRepository(_connectionString);
            ColorRepository = new ColorRepository(_connectionString);
            OrderRepository = new OrderRepository(_connectionString);
            PaymentRepository = new PaymentRepository(_connectionString);
            BrandRepository = new BrandRepository(_connectionString);
            SizeRepository = new SizeRepository(_connectionString);
            CityRepository = new CityRepository(_connectionString);
            UserRepository = new UserRepository(_connectionString);
            ProductShippingRepository = new repositories.ProductShippingRepository(_connectionString);
            BillRepository = new BillRepository(_connectionString);
            QuantityRepository = new QuantityRepository(_connectionString) as IRepository<Quantity>;

            //kulon class a helper functionoknek
            UtilityHandler = new UtilityHandler();
        }

        public bool TestConnection()
        {
            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();
                    LoadComboBoxData(connection);
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Hiba történt az adatbázishoz való csatlakozáskor: {ex.Message}");
                return false;
            }
        }

        private void LoadProducts_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "termekview";
            LoadData(ProductGrid);
            // Szűrők megjelenítése a bejelentkezés gombra kattintva
            Markak.Visibility = Visibility.Visible;
            Szinek.Visibility = Visibility.Visible;
            Meretek.Visibility = Visibility.Visible;
            MarkakLabel.Visibility = Visibility.Visible;
            SzinekLabel.Visibility = Visibility.Visible;
            MeretekLabel.Visibility = Visibility.Visible;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadOrders_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "rendeles";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Visible;
            Csaladnev.Visibility = Visibility.Visible;
            Email.Visibility = Visibility.Visible;
            keresztnevek.Visibility = Visibility.Visible;
            csaladnevek.Visibility = Visibility.Visible;
            emailek.Visibility = Visibility.Visible;
            szur.Visibility = Visibility.Visible;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;

        }

        private void LoadPayments_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "fizetes_mod";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;

        }

        private void LoadStock_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "keszlet_valtozas";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadCities_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "varosok";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadBrands_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "markak";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadColors_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "szinek";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadSizes_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "meretek";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadUsers_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "vasarlok";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }

        private void LoadProductShipping_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "rendelestermek_view";
            LoadData(ProductGrid);
        }

        private void LoadBill_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "szamla";
            LoadData(ProductGrid);
            Markak.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Visible;
            Datum.Visibility = Visibility.Visible;
            Szamla.Visibility = Visibility.Visible;
            szurogomb.Visibility = Visibility.Visible;
            SzamlaTextBox.Visibility = Visibility.Visible;
        }
        public void LoadData(DataGrid ProductGrid)
        {
            using (MySqlConnection db = new MySqlConnection(_connectionString))
            {
                try
                {

                    db.Open();
                    string query = $"SELECT * from {_currentTableName}";
                    MySqlCommand cmd = new MySqlCommand(query, db);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    DataTable dataTable = new DataTable();
                    dataTable.Load(reader);
                    ProductGrid.ItemsSource = dataTable.DefaultView;
                    DatagridActionButtons.Visibility = Visibility.Visible;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Adatbázis kapcsolati hiba!", $"Hiba! {ex.Message}", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }

        }

        private void CreateEntity_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrEmpty(_currentTableName))
            {
                MessageBox.Show("Nincs kiválasztott tábla!");
                return;
            }

            Sidemenu.Visibility = Visibility.Collapsed; // Eltünteti az oldalsó menüt

            GenerateDynamicForm(_currentTableName, "Letrehoz"); // Dinamikus form generálása

            // Ha a felhasználó hozzáadását kell kezelni, akkor jelenjen meg a panel
            if (_currentTableName == "Felhasználók")
            {
                AdminPanel.Visibility = Visibility.Visible; // Megjeleníti a felhasználókezelő panelt
            }
        }


        private void ModifyEntity_Click(object sender, RoutedEventArgs e)
        {
            fotabla.Visibility = Visibility.Hidden;
            if (string.IsNullOrEmpty(_currentTableName))
            {
                MessageBox.Show("Nincs kivalasztott tabla!");
                return;
            }

            if (ProductGrid.SelectedItem is DataRowView selectedRow)
            {
                Sidemenu.Visibility = Visibility.Collapsed;
                GenerateDynamicForm(_currentTableName, "Mentes", selectedRow);
            }
            else
            {
                MessageBox.Show("Valasz ki egy recordot!");
            }
        }

        private async void DeleteEntity_Click(object sender, RoutedEventArgs e)
        {
            fotabla.Visibility = Visibility.Hidden;

            if (string.IsNullOrEmpty(_currentTableName))
            {
                MessageBox.Show("Nincs kiválasztott tábla.");
                return;
            }

            // Törlés tiltása minden táblára
            MessageBox.Show("Nem lehetséges törölni ebből a táblából, mert adatvesztéssel jár.", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
            return;

            if (ProductGrid.SelectedItem == null)
            {
                MessageBox.Show("Válassz ki egy rekordot!", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var selectedRow = ProductGrid.SelectedItem as DataRowView;
            if (selectedRow == null || selectedRow.Row.IsNull("id") || string.IsNullOrWhiteSpace(selectedRow["id"].ToString()))
            {
                MessageBox.Show("Hiányzó azonosító! Törlés nem lehetséges.", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            string id = selectedRow["id"].ToString();

            // Ellenőrizzük, hogy a rekord új vagy alapértelmezett
            bool isNewRecord = selectedRow.Row["is_added"] != DBNull.Value && (bool)selectedRow.Row["is_added"];

            if (!isNewRecord)
            {
                MessageBox.Show("Ez a rekord nem törölhető, mert alapértelmezett adat.", "Figyelmeztetés", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                // Adatbázisból törlés
                switch (_currentTableName)
                {
                    case "termekview":
                        await ProductRepository.DeleteAsync(id);
                        break;
                    case "rendeles":
                        await OrderRepository.DeleteAsync(id);
                        break;
                    case "fizetes_mod":
                        await PaymentRepository.DeleteAsync(id);
                        break;
                    case "varosok":
                        await CityRepository.DeleteAsync(id);
                        break;
                    case "vasarlok":
                        await UserRepository.DeleteAsync(id);
                        break;
                    case "rendelestermek_view":
                        await ProductShippingRepository.DeleteAsync(id);
                        break;
                    case "szamla":
                        await BillRepository.DeleteAsync(id);
                        break;
                    case "keszlet_valtozas":
                        await QuantityRepository.DeleteAsync(id);
                        break;
                    default:
                        MessageBox.Show("Ismeretlen tábla neve: " + _currentTableName, "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                }

                // Ha sikeres a törlés, frissítjük az adatforrást
                if (ProductGrid.ItemsSource is DataView dataView)
                {
                    dataView.Table.Rows.Remove(selectedRow.Row);
                }
                else if (ProductGrid.ItemsSource is ObservableCollection<DataRowView> collection)
                {
                    collection.Remove(selectedRow);
                }
                else if (ProductGrid.ItemsSource is IList<DataRowView> list)
                {
                    list.Remove(selectedRow);
                }

                // UI frissítése az új adatok betöltésével
                LoadData(ProductGrid);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a törlés közben: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
        private void GenerateDynamicForm(string entityType, string saveButtonName, DataRowView? selectedRow = null)
        {
            fotabla.Visibility = Visibility.Hidden;
            FormPanel.Children.Clear(); // kitakaritjuk a FormPanel x:Name -el ellatott stackpanelt hogy be tudjuk rakni az uj textboxokat

            var fields = FieldDefinitions.Fields[entityType];

            foreach (var field in fields)
            {
                // Hozzaadjuk a labelt
                var label = new Label { Content = field.LabelName, HorizontalAlignment = HorizontalAlignment.Center };
                FormPanel.Children.Add(label);

                // Textbox letrehozas
                if (field.DataType == typeof(string))
                {
                    var textBox = new TextBox();
                    textBox.Name = $"{_currentTableName}_{field.PropertyName}";
                    textBox.Width = 200;
                    textBox.Text = selectedRow != null && selectedRow[field.PropertyName] != null
                        ? selectedRow[field.PropertyName].ToString()
                        : string.Empty;

                    FormPanel.RegisterName(textBox.Name, textBox);
                    FormPanel.Children.Add(textBox);
                }
                else if (field.DataType == typeof(DateTime))
                {
                    var datepicker = new DatePicker
                    {
                        Name = $"{_currentTableName}_{field.PropertyName}",
                        Width = 200,
                        SelectedDateFormat = DatePickerFormat.Short,
                        SelectedDate = selectedRow != null && selectedRow[field.PropertyName] != null
                            ? DateTime.TryParse(selectedRow[field.PropertyName].ToString(), out var parsedDate)
                                ? parsedDate
                                : (DateTime?)null
                            : null,
                        DisplayDateStart = DateTime.Parse("1/01/1990"),
                        DisplayDateEnd = DateTime.Parse("12/31/2030"),
                        FirstDayOfWeek = DayOfWeek.Monday,
                    };

                    FormPanel.RegisterName(datepicker.Name, datepicker);
                    FormPanel.Children.Add(datepicker);
                }
            }
            // Mentes Gomb Letrehozasa
            var saveButton = new Button
            {
                Content = saveButtonName,
                Width = 100,
                Margin = new Thickness(5),
            };
            saveButton.Click += (object sender, RoutedEventArgs e) =>
            {
                SubmitForm(entityType, selectedRow != null, ProductGrid);
            };
            FormPanel.Children.Add(saveButton);
            FormPanel.Visibility = Visibility.Visible;
        }

        private async void SubmitForm(string entityType, bool isEdit, DataGrid ProductGrid)
        {
            List<FormField> fields = FieldDefinitions.Fields[entityType];
            Dictionary<string, object> payload = new Dictionary<string, object>();

            foreach (FormField field in fields)
            {
                if (field.DataType == typeof(string))
                {
                    var inputControl = FormPanel.FindName($"{_currentTableName}_{field.PropertyName}") as TextBox;
                    if (inputControl != null && field.PropertyName != null)
                    {
                        payload[field.PropertyName] = inputControl.Text;
                    }
                    else
                    {
                        // Ha a TextBox nem található
                        Console.WriteLine($"Nem található vezérlő: {_currentTableName}_{field.PropertyName}");
                    }
                }
                else if (field.DataType == typeof(DateTime))
                {
                    var inputControl = FormPanel.FindName($"{_currentTableName}_{field.PropertyName}") as DatePicker;
                    if (inputControl != null && field.PropertyName != null)
                    {
                        payload[field.PropertyName] = inputControl.SelectedDate;
                    }
                    else
                    {
                        // Ha a DatePicker nem található
                        Console.WriteLine($"Nem található vezérlő: {_currentTableName}_{field.PropertyName}");
                    }
                }
            }

            if (isEdit)
            {
                var selectedRow = ProductGrid.SelectedItem as DataRowView;
                if (selectedRow == null)
                {
                    MessageBox.Show("Nincs kiválasztott elem!");
                    return;
                }

                string id = selectedRow["id"]?.ToString();
                if (string.IsNullOrEmpty(id))
                {
                    MessageBox.Show("Hianzyo azonosito!");
                    return;
                }

                switch (_currentTableName)
                {
                    case "termekview":
                        await ProductRepository.UpdateAsync(id, payload);
                        break;
                    case "szinek":
                        await ColorRepository.UpdateAsync(id, payload);
                        break;
                    case "fizetes_mod":
                        await OrderRepository.UpdateAsync(id, payload);
                        break;
                    case "keszlet_vlatozas":
                        await QuantityRepository.UpdateAsync(id, payload);
                        break;
                    case "markak":
                        await BrandRepository.UpdateAsync(id, payload);
                        break;
                    case "meretek":
                        await SizeRepository.UpdateAsync(id, payload);
                        break;
                    case "varosok":
                        await CityRepository.UpdateAsync(id, payload);
                        break;
                    case "vasarlok":
                        await UserRepository.UpdateAsync(id, payload);
                        break;
                    case "rendelestermek_view":
                        await ProductShippingRepository.UpdateAsync(id, payload);
                        break;
                    case "szamla":
                        await BillRepository.UpdateAsync(id, payload);
                        break;
                    default:
                        break;
                }
            }
            else
            {
                switch (_currentTableName)
                {
                    case "termekview":
                        await ProductRepository.CreateAsync(payload);
                        break;
                    case "szinek":
                        await ColorRepository.CreateAsync(payload);
                        break;
                    case "fizetes_mod":
                        await OrderRepository.CreateAsync(payload);
                        break;
                    case "rendeles":
                    case "varosok":
                    case "vasarlok":
                    case "szamla":
                    case "keszlet_valtozas":
                        // Felhasználói figyelmeztető üzenet, hogy nem engedélyezett a hozzáadás
                        MessageBox.Show("A hozzáadás nem engedélyezett erre a táblára. Kérjük, válasszon egy másik táblát.",
                                        "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                        break;
                    case "markak":
                        await BrandRepository.CreateAsync(payload);
                        break;
                    case "meretek":
                        await SizeRepository.CreateAsync(payload);
                        break;
                    case "rendelestermek_view":
                        await ProductShippingRepository.CreateAsync(payload);
                        break;
                    default:
                        break;
                }
            }

            LoadData(ProductGrid);
            UtilityHandler.ResetFormFields(FormPanel);
            FormPanel.Visibility = Visibility.Collapsed;
            Sidemenu.Visibility = Visibility.Visible;
        }

        private void RegisterButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text.Trim();
            string password = PasswordBox.Password.Trim();

            // Ellenőrizzük, hogy a felhasználónév megfelel-e az admin vagy titkárnő kritériumnak
            if (username != "admin" && username != "titkárnő")
            {
                MessageBox.Show("Csak admin és titkárnő felhasználó léphet be!");
                return; // Kilépünk a metódusból, ha nem az admin vagy titkárnő
            }

            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                string loginQuery = "SELECT jelszo FROM felhasznalo WHERE jogosultsag = @Username";
                using (var loginCommand = new MySqlCommand(loginQuery, connection))
                {
                    loginCommand.Parameters.AddWithValue("@Username", username);
                    object result = loginCommand.ExecuteScalar();

                    if (result != null)
                    {
                        string storedPassword = result.ToString();
                        string hashedInputPassword = HashPassword(password); // A beírt jelszó hash-elése

                        if (hashedInputPassword == storedPassword)
                        {
                            MessageBox.Show($"Sikeres bejelentkezés: {username}!");
                            ShowAdminTablakPanel();

                            // Ha a felhasználó titkárnő, tiltsuk le a törlés gombokat
                            if (username == "titkárnő")
                            {
                                ButtonDeleteUser.IsEnabled = false;  // Felhasználó törlése gomb letiltása
                                torlestabla.IsEnabled = false;       // Törlés gomb letiltása
                            }
                            else // Ha admin, engedélyezzük a törlés gombokat
                            {
                                ButtonDeleteUser.IsEnabled = true;
                                torlestabla.IsEnabled = true;
                            }
                        }
                        else
                        {
                            MessageBox.Show("Hibás jelszó!");
                        }
                    }
                    else
                    {
                        MessageBox.Show("Hibás felhasználónév!");
                    }
                }
            }
        }
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

        // Admin felület mutatása
        private void ShowAdminModositPanel()
        {
            LoginPanel.Visibility = Visibility.Collapsed;
            AdminTablak.Visibility = Visibility.Collapsed;
            AdminPanel.Visibility = Visibility.Visible;
            ErrorTextBlock.Text = string.Empty;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            szur.Visibility = Visibility.Hidden;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
            Meretek.Visibility = Visibility.Hidden;
            Szinek.Visibility = Visibility.Hidden;
            Markak.Visibility = Visibility.Hidden;
            MarkakLabel.Visibility = Visibility.Hidden;
            MeretekLabel.Visibility = Visibility.Hidden;
            SzinekLabel.Visibility = Visibility.Hidden;
        }

        private void ShowAdminTablakPanel()
        {
            LoginPanel.Visibility = Visibility.Collapsed;
            AdminPanel.Visibility = Visibility.Collapsed;
            AdminTablak.Visibility = Visibility.Visible;
            ErrorTextBlock.Text = string.Empty;
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;
            keresztnevek.Visibility = Visibility.Hidden;
            csaladnevek.Visibility = Visibility.Hidden;
            emailek.Visibility = Visibility.Hidden;
            DatumPicker.Visibility = Visibility.Hidden;
            Datum.Visibility = Visibility.Hidden;
            Szamla.Visibility = Visibility.Hidden;
            szurogomb.Visibility = Visibility.Hidden;
            SzamlaTextBox.Visibility = Visibility.Hidden;
        }


        // Titkárnő panel mutatása
        private void ShowSecretaryPanel()
        {
            LoginPanel.Visibility = Visibility.Collapsed;
            AdminPanel.Visibility = Visibility.Collapsed;
            TitkarPanel.Visibility = Visibility.Visible;
            ErrorTextBlock.Text = string.Empty;

        }
        //Kijelentkezés
        private void LogoutButton_Click(object sender, RoutedEventArgs e)
        {
            UsernameTextBox.Text = ""; // Felhasználónév törlése
            PasswordBox.Clear(); // Jelszó törlése

            // Panelek visszaállítása
            LoginPanel.Visibility = Visibility.Visible;
            AdminPanel.Visibility = Visibility.Collapsed;
            AdminTablak.Visibility = Visibility.Collapsed;
            TitkarPanel.Visibility = Visibility.Collapsed;
            TitkarPanel.Visibility = Visibility.Collapsed;

            // Törli az adatokat a textboxokból
            ClearAdminInputs();
        }

        // Törli a SecretaryPanel mezők adatait
        private void ClearAdminInputs()
        {
            AddFullNameTextBox.Text = "";
            AddEmailTextBox.Text = "";
            AddPasswordTextBox.Text = "";
            AddPasswordConfirmTextBox.Text = "";
            AddRoleComboBox.SelectedIndex = -1;

            ModifyIdTextBox.Text = "";
            ModifyFullNameTextBox.Text = "";
            ModifyEmailTextBox.Text = "";
            ModifyPasswordTextBox.Text = "";
            ModifyRoleComboBox.SelectedIndex = -1;

            DeleteIdTextBox.Text = "";
        }

        // Jelszó megjelenítése checkbox eseménykezelő
        private void ShowPassword_Checked(object sender, RoutedEventArgs e)
        {
            PasswordTextBox.Text = PasswordBox.Password; // Átmásoljuk a jelszót a TextBox-ba
            PasswordTextBox.Visibility = Visibility.Visible; // Szövegmező megjelenítése
            PasswordBox.Visibility = Visibility.Collapsed; // Jelszómező elrejtése
        }

        private void ShowPassword_Unchecked(object sender, RoutedEventArgs e)
        {
            PasswordBox.Password = PasswordTextBox.Text; // Visszamásoljuk a jelszót a PasswordBox-ba
            PasswordBox.Visibility = Visibility.Visible; // Jelszómező megjelenítése
            PasswordTextBox.Visibility = Visibility.Collapsed; // Szövegmező elrejtése
        }

        private void ButtonTabla_Click(object sender, RoutedEventArgs e)
        {
            ShowAdminTablakPanel();
        }

        private void ShowAdminModositPanel(object sender, RoutedEventArgs e)
        {
            // Átvált a felhasználókezelő panelre
            ShowAdminModositPanel();
        }
        private void ShowUserPanel()
        {

            LoginPanel.Visibility = Visibility.Collapsed;
            AdminPanel.Visibility = Visibility.Visible;
            ErrorTextBlock.Text = string.Empty;
        }


        private void RegisterUser(string name, string password)
        {
            string passwordHash = HashPassword(password);

            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                // Ellenőrizzük, hogy a felhasználónév már létezik-e
                string checkQuery = "SELECT COUNT(*) FROM felhasznalo WHERE felhasznalo = @username";
                using (MySqlCommand checkCommand = new MySqlCommand(checkQuery, connection))
                {
                    checkCommand.Parameters.AddWithValue("@username", name);
                    int userCount = Convert.ToInt32(checkCommand.ExecuteScalar());

                    if (userCount > 0)
                    {
                        throw new Exception("A felhasználónév már foglalt.");
                    }
                }

                string query = "INSERT INTO felhasznalo (felhasznalo, jelszo) VALUES (@username, @passwordHash)";
                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@username", name);
                    command.Parameters.AddWithValue("@passwordHash", passwordHash);
                    command.ExecuteNonQuery();
                }
            }
        }

        private void ProductGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            UpdateImage();
            if (_currentTableName == "termekview")
            {
                if (ProductGrid.SelectedItem is DataRowView sor)
                {
                    string id = sor["kep"].ToString();
                    string kepEleresiUt = $"C:\\Users\\13d\\Desktop\\webshop_backend2\\pic\\{id}.png";
                    kepek.Source = new BitmapImage(new Uri(kepEleresiUt, UriKind.Absolute));
                }
            }
            else
            {
                kepek.Source = null; // Más táblák esetén a kép eltűnik
            }
        }
        private void UpdateImage()
        {
            // Ellenőrizzük, hogy a ProductGrid kijelölt sorában van-e adat és a megfelelő táblából származik-e
            if (ProductGrid.SelectedItem is DataRowView sor && sor.DataView.Table.TableName == "termekek")
            {
                string id = sor["kep"].ToString();
                string kepEleresiUt = $"C:\\Users\\13d\\Desktop\\webshop_backend2\\pic\\{id}.png";

                try
                {
                    kepek.Source = new BitmapImage(new Uri(kepEleresiUt, UriKind.Absolute));
                }
                catch (Exception)
                {
                    kepek.Source = null; // Ha a kép nem található, ne jelenjen meg semmi
                }
            }
            else
            {
                kepek.Source = null; // Ha nem a "termekek" táblából származik az adat, ne jelenítsen meg képet
            }
        }
        private void LoadComboBoxData(MySqlConnection conn)
        {
            // Alapadatok betöltése - csak egyszer, nem kell minden szűrésnél újra betölteni!
            if (Markak.Items.Count == 0)
            {
                MySqlCommand markakCmd = new MySqlCommand("SELECT DISTINCT Marka FROM termekview", conn);
                MySqlDataReader markakReader = markakCmd.ExecuteReader();
                while (markakReader.Read())
                {
                    Markak.Items.Add(markakReader["Marka"].ToString());
                }
                markakReader.Close();
            }

            if (Meretek.Items.Count == 0)
            {
                MySqlCommand meretekCmd = new MySqlCommand("SELECT DISTINCT Meret FROM termekview", conn);
                MySqlDataReader meretekReader = meretekCmd.ExecuteReader();
                while (meretekReader.Read())
                {
                    Meretek.Items.Add(meretekReader["Meret"].ToString());
                }
                meretekReader.Close();
            }

            if (Szinek.Items.Count == 0)
            {
                MySqlCommand szinekCmd = new MySqlCommand("SELECT DISTINCT Szín FROM termekview", conn);
                MySqlDataReader szinekReader = szinekCmd.ExecuteReader();
                while (szinekReader.Read())
                {
                    Szinek.Items.Add(szinekReader["Szín"].ToString());
                }
                szinekReader.Close();
            }
        }

        private void FilterData()
        {
            string connectionString = "server=localhost;database=webaruhaz;uid=root;pwd=root;";
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = "SELECT * FROM termekview WHERE 1=1";
                List<MySqlParameter> parameters = new List<MySqlParameter>();

                string marka = Markak.SelectedItem is ComboBoxItem markaItem ? markaItem.Content.ToString() : Markak.SelectedItem?.ToString();
                string meret = Meretek.SelectedItem is ComboBoxItem meretItem ? meretItem.Content.ToString() : Meretek.SelectedItem?.ToString();
                string szin = Szinek.SelectedItem is ComboBoxItem szinItem ? szinItem.Content.ToString() : Szinek.SelectedItem?.ToString();



                if (!string.IsNullOrEmpty(marka))
                {
                    query += " AND Marka=@marka";
                    parameters.Add(new MySqlParameter("@marka", marka));
                }

                if (!string.IsNullOrEmpty(meret))
                {
                    query += " AND Meret=@meret";
                    parameters.Add(new MySqlParameter("@meret", meret));
                }

                if (!string.IsNullOrEmpty(szin))
                {
                    query += " AND Szín=@szin";
                    parameters.Add(new MySqlParameter("@szin", szin));
                }

                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddRange(parameters.ToArray());

                MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                adapter.Fill(dt);
                ProductGrid.ItemsSource = dt.DefaultView;
            }
        }

        private void Markak_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            FilterData();
        }

        private void Szinek_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            FilterData();
        }

        private void Meretek_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            FilterData();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            _currentTableName = "termek";
            LoadData(ProductGrid);
            Keresztnev.Visibility = Visibility.Hidden;
            Csaladnev.Visibility = Visibility.Hidden;
            Email.Visibility = Visibility.Hidden;

        }
        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            using (MySqlConnection conn = new MySqlConnection(_connectionString))
            {
                try
                {
                    conn.Open();
                    string query = "SELECT * FROM webaruhaz.rendeles WHERE 1=1";

                    if (!string.IsNullOrEmpty(Keresztnev.Text) && Keresztnev.Text != "Keresztnév")
                        query += " AND keresztnev LIKE @keresztnev";

                    if (!string.IsNullOrEmpty(Csaladnev.Text) && Csaladnev.Text != "Családnév")
                        query += " AND csaladnev LIKE @csaladnev";

                    if (!string.IsNullOrEmpty(Email.Text) && Email.Text != "Email")
                        query += " AND email LIKE @email";

                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        if (!string.IsNullOrEmpty(Keresztnev.Text) && Keresztnev.Text != "Keresztnév")
                            cmd.Parameters.AddWithValue("@keresztnev", Keresztnev.Text + "%");

                        if (!string.IsNullOrEmpty(Csaladnev.Text) && Csaladnev.Text != "Családnév")
                            cmd.Parameters.AddWithValue("@csaladnev", Csaladnev.Text + "%");

                        if (!string.IsNullOrEmpty(Email.Text) && Email.Text != "Email")
                            cmd.Parameters.AddWithValue("@email", Email.Text + "%");

                        MySqlDataAdapter adapter = new MySqlDataAdapter(cmd);
                        DataTable dt = new DataTable();
                        adapter.Fill(dt);

                        if (dt.Rows.Count == 0)
                        {
                            MessageBox.Show("Nincs találat a keresési feltételeknek megfelelően!");
                        }
                        else
                        {
                            ProductGrid.ItemsSource = dt.DefaultView;
                        }
                    }
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Hiba történt: " + ex.Message);
                }
            }
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            // Ellenőrizzük, hogy minden mező ki van-e töltve
            if (string.IsNullOrWhiteSpace(AddFullNameTextBox.Text) ||
                string.IsNullOrWhiteSpace(AddEmailTextBox.Text) ||
                string.IsNullOrWhiteSpace(AddPasswordTextBox.Text) ||
                string.IsNullOrWhiteSpace(AddPasswordConfirmTextBox.Text) ||
                AddRoleComboBox.SelectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztott mező!");
                return;
            }

            // Ellenőrizzük, hogy a jelszavak egyeznek-e
            if (AddPasswordTextBox.Text != AddPasswordConfirmTextBox.Text)
            {
                MessageBox.Show("A jelszavak nem egyeznek!");
                return;
            }

            // Beállítjuk a változókat a felhasználói adatokkal
            string teljesNev = AddFullNameTextBox.Text;
            string email = AddEmailTextBox.Text;
            string jelszo = AddPasswordTextBox.Text;
            string jogosultsag = (AddRoleComboBox.SelectedItem as ComboBoxItem).Content.ToString();

            // **Jelszó hash-elése SHA-256-tal**
            string hashedJelszo = HashPassword(jelszo);

            // SQL parancs
            string query = "INSERT INTO felhasznalo (jogosultsag, jelszo, email, teljes_nev) " +
                           "VALUES (@jogosultsag, @jelszo, @email, @teljes_nev)";

            try
            {
                // Kapcsolódunk az adatbázishoz
                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    // Készítjük a MySQL parancsot
                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        // Paraméterek hozzáadása
                        cmd.Parameters.AddWithValue("@jogosultsag", jogosultsag);
                        cmd.Parameters.AddWithValue("@jelszo", hashedJelszo); // **Hash-elt jelszó mentése**
                        cmd.Parameters.AddWithValue("@email", email);
                        cmd.Parameters.AddWithValue("@teljes_nev", teljesNev);

                        // A parancs végrehajtása
                        cmd.ExecuteNonQuery();
                    }
                }

                // Üzenet a sikeres felhasználó hozzáadásáról
                MessageBox.Show("Felhasználó sikeresen hozzáadva!");

                // Mezők ürítése
                AddFullNameTextBox.Text = "";
                AddEmailTextBox.Text = "";
                AddPasswordTextBox.Text = "";
                AddPasswordConfirmTextBox.Text = "";
                AddRoleComboBox.SelectedIndex = -1;
            }
            catch (Exception ex)
            {
                // Hibakezelés
                MessageBox.Show("Hiba történt: " + ex.Message);
            }
        }

        // **Jelszó hash-elése SHA-256-tal**
        private string HashPassword2(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hash = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hash).Replace("-", "").ToLower(); // Hexadecimális formátum
            }
        }
        private void Button_Click_3(object sender, RoutedEventArgs e)
        {
            // Ellenőrizzük, hogy az ID mezőben van-e érték
            if (string.IsNullOrWhiteSpace(ModifyIdTextBox.Text))
            {
                MessageBox.Show("Kérlek válaszd ki a mezőket, hogy módosítani tudd a felhasználót!");
                return;
            }

            // Ellenőrizzük, hogy minden mező ki van-e töltve
            if (string.IsNullOrWhiteSpace(ModifyFullNameTextBox.Text) ||
                string.IsNullOrWhiteSpace(ModifyEmailTextBox.Text) ||
                string.IsNullOrWhiteSpace(ModifyPasswordTextBox.Text) ||
                ModifyRoleComboBox.SelectedItem == null)
            {
                MessageBox.Show("Nincs kiválasztott mező!");
                return;
            }

            // Az ID mező tartalma
            int id = int.Parse(ModifyIdTextBox.Text);

            // A többi mező tartalmának beolvasása
            string teljesNev = ModifyFullNameTextBox.Text;
            string email = ModifyEmailTextBox.Text;
            string jelszo = HashPassword(ModifyPasswordTextBox.Text); // Jelszó hash-elése
            string jogosultsag = (ModifyRoleComboBox.SelectedItem as ComboBoxItem).Content.ToString();

            // SQL parancs a felhasználó adatainak frissítésére
            string query = "UPDATE felhasznalo SET jogosultsag = @jogosultsag, jelszo = @jelszo, email = @email, teljes_nev = @teljes_nev WHERE id = @id";

            try
            {
                // Kapcsolódunk az adatbázishoz
                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    // MySQL parancs létrehozása
                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        // Paraméterek hozzáadása a biztonság érdekében
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@jogosultsag", jogosultsag);
                        cmd.Parameters.AddWithValue("@jelszo", jelszo); // Hash-elt jelszó kerül be
                        cmd.Parameters.AddWithValue("@email", email);
                        cmd.Parameters.AddWithValue("@teljes_nev", teljesNev);

                        // A parancs végrehajtása
                        cmd.ExecuteNonQuery();
                    }
                }

                // Üzenet a sikeres módosításról
                MessageBox.Show("Felhasználó sikeresen módosítva!");

                // Mezők ürítése
                ModifyIdTextBox.Text = "";
                ModifyFullNameTextBox.Text = "";
                ModifyEmailTextBox.Text = "";
                ModifyPasswordTextBox.Text = "";
                ModifyRoleComboBox.SelectedIndex = -1;
            }
            catch (Exception ex)
            {
                // Hibakezelés
                MessageBox.Show("Hiba történt a módosítás során: " + ex.Message);
            }
        }

        // SHA-256 jelszó hash-elési metódus
        private string HashPassword3(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hash = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }

        private void Button_Click_4(object sender, RoutedEventArgs e)
        {
            // Ellenőrizzük, hogy az ID mezőben van-e érték
            if (string.IsNullOrWhiteSpace(DeleteIdTextBox.Text))
            {
                MessageBox.Show("Kérlek, add meg a törölni kívánt felhasználó ID-ját!");
                return;
            }

            // Az ID mező tartalma
            int id;
            if (!int.TryParse(DeleteIdTextBox.Text, out id))
            {
                MessageBox.Show("Az ID csak szám lehet!");
                return;
            }

            // SQL parancs a felhasználó törlésére
            string query = "DELETE FROM felhasznalo WHERE id = @id";

            try
            {
                // Kapcsolódunk az adatbázishoz
                using (MySqlConnection connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    // MySQL parancs létrehozása
                    using (MySqlCommand cmd = new MySqlCommand(query, connection))
                    {
                        // Paraméterek hozzáadása
                        cmd.Parameters.AddWithValue("@id", id);

                        // A parancs végrehajtása
                        int rowsAffected = cmd.ExecuteNonQuery();

                        // Ellenőrizzük, hogy történt-e törlés
                        if (rowsAffected > 0)
                        {
                            MessageBox.Show("Felhasználó sikeresen törölve!");
                        }
                        else
                        {
                            MessageBox.Show("A megadott ID-val nem található felhasználó.");
                        }
                    }
                }

                // Mező ürítése
                DeleteIdTextBox.Text = "";
            }
            catch (Exception ex)
            {
                // Hibakezelés
                MessageBox.Show("Hiba történt a törlés során: " + ex.Message);
            }
        }
        private async void Window_Loaded(object sender, RoutedEventArgs e)
        {
            await LoadSzamlak();
        }

        private async Task LoadSzamlak(string datum = null, string szamlaSorszam = null, string fizMod = null)
        {
            try
            {
                string query = "SELECT * FROM webaruhaz.szamla WHERE 1=1";

                if (!string.IsNullOrEmpty(datum))
                {
                    query += $" AND DATE(date) = '{datum}'";
                }

                if (!string.IsNullOrEmpty(szamlaSorszam))
                {
                    query += $" AND szamla_sorszam LIKE '%{szamlaSorszam}%'";
                }

                if (!string.IsNullOrEmpty(fizMod))
                {
                    query += $" AND fizetes_mod_id IN (SELECT id FROM webaruhaz.fizetes_mod WHERE nev LIKE '%{fizMod}%')";
                }

                DataTable szamlakTable = await GetDataTableAsync(query);
                ProductGrid.ItemsSource = szamlakTable.DefaultView;
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a számlák betöltésekor: {ex.Message}");
            }
        }

        private async Task<DataTable> GetDataTableAsync(string query)
        {
            try
            {
                using (MySqlConnection conn = new MySqlConnection(_connectionString))
                {
                    await conn.OpenAsync();
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        using (MySqlDataAdapter adapter = new MySqlDataAdapter(cmd))
                        {
                            DataTable dataTable = new DataTable();
                            adapter.Fill(dataTable);
                            return dataTable;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Adatbázis hiba: {ex.Message}");
                return null;
            }
        }

        private async void Szures_Click(object sender, RoutedEventArgs e)
        {
            string datum = DatumPicker.SelectedDate?.ToString("yyyy-MM-dd");
            string szamlaSorszam = SzamlaTextBox.Text;
            await LoadSzamlak(datum, szamlaSorszam);
        }
    }
}