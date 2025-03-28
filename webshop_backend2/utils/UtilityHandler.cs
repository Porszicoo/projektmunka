using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace be.utils
{
    internal class UtilityHandler
    {
        internal void ResetFormFields(StackPanel FormPanel)
        {
            //helper function a formba regisztralt elemek torlesehez es lecsatlakozasahoz
            foreach (var child in FormPanel.Children)
            {
                //cleareljuk a textboxot majd leregisztraljuk
                if (child is TextBox textBox)
                {
                    textBox.Clear();
                    FormPanel.UnregisterName(textBox.Name);
                }
                //cleareljuk a datepicker majd es leregisztraljuk
                if (child is DatePicker datePicker)
                {
                    datePicker.SelectedDate = null;
                    FormPanel.UnregisterName(datePicker.Name);
                }
            }
        }
    }
}
