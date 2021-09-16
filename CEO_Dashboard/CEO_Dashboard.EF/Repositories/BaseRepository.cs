using CEO_Dashboard.CORE.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.EF.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationDbContext context;
        public BaseRepository(ApplicationDbContext _context)
        {
            context = _context;
        }
        public async void AddItem(T entity) => await context.Set<T>().AddAsync(entity);

        public async void AddRange(IEnumerable<T> entities) => await context.Set<T>().AddRangeAsync(entities);
        
        public void DeleteItem(int id)
        {
            var item =  context.Set<T>().Find(id);
            context.Set<T>().Remove(item);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            context.Set<T>().RemoveRange(entities);
        }

        public async Task<IEnumerable<T>> Find(Expression<Func<T, bool>> criteria, string[] includes)
        {
            IQueryable<T> query =  context.Set<T>().Where(criteria);
            if(includes.Length > 0)
            {
                foreach(var include in includes)
                {
                    query =  query.Include(include);
                }
            }

            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<T> GetItem(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public void UpdateItem(T entity)
        {
            context.Set<T>().Update(entity);
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            context.Set<T>().UpdateRange(entities);
        }

        public int Count(Expression<Func<T, bool>>? criteria)
        {
            return context.Set<T>().Where(criteria).Count();
        }

        public int Count()
        {
            return context.Set<T>().Count();
        }
    }
}
