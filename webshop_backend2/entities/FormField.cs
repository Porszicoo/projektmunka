using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace be.entities
{
    public class FormField
    {
        public string? LabelName { get; set; }
        public string? PropertyName { get; set; }
        public Type? DataType { get; set; }
    }
}
