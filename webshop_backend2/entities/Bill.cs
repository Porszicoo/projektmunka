using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace be.entities
{
    internal class Bill
    {
        public int Id { get; set; }

        public double Netto { get; set; }

        public double Afa { get; set; }

        public DateTime Date { get; set; }

        public string Szamla_sorszamla { get; set; } = string.Empty;

        public int fizetes_mod { get; set; }

        public static implicit operator List<object>(Bill v)
        {
            throw new NotImplementedException();
        }
    }
}
