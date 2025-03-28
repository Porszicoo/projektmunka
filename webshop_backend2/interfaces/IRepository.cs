using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace be.interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(string id);
        Task CreateAsync(Dictionary<string, object> details);
        Task UpdateAsync(string id, Dictionary<string, object> details);
        Task DeleteAsync(string id);
    }
}
