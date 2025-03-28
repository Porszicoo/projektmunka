using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace be.entities
{
    internal class Payment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime PaymentDate { get; set; }
        public string? PaymentDesc { get; set; }
        public int Bill { get; set; }

    }
}
