using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace be.entities
{
    internal class Quantity
    {
        public int Id  { get; set; }
        public string Change {  get; set; }

        public int ProductId { get; set; }

        public int Quantiti { get; set; }

        public DateTime Date { get; set; }


    }
}
