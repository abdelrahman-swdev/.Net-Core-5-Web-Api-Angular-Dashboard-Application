using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.CORE.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        // Get By Id
        Task<T> GetItem(int id);

        // Find By Expression
        Task<IEnumerable<T>> Find(Expression<Func<T, bool>> criteria, string[] includes);

        // Get All Records
        Task<IEnumerable<T>> GetAll();

        // Add Record
        void AddItem(T entity);
        // Add Range Of Record
        void AddRange(IEnumerable<T> entities);

        // Update Record
        void UpdateItem(T entity);

        // Update Record
        void UpdateRange(IEnumerable<T> entities);

        // Delete Record
        void DeleteItem(int id);
        // Delete Record
        void DeleteRange(IEnumerable<T> entities);

        int Count(Expression<Func<T, bool>> criteria);
        int Count();
    }
}
