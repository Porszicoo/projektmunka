using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace be.entities
{
    internal class ProductShipping
    {
        public int Id { get; set; }
        public string Reszletek { get; set; }

        public DateTime Date { get; set; }
        
        public string Name { get; set; }


        public int Value { get; set; }

        public int Mennyiseg { get; set; }


        public double Total { get; set; }
    }
}
