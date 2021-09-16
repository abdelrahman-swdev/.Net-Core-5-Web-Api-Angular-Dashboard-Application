using CEO_Dashboard.CORE.Data;
using CEO_Dashboard.CORE.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEO_Dashboard.EF.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(ApplicationDbContext context) : base(context)
        {

        }
        public async Task<Employee> GetEmployeeWithRelatedData(int id)
        {
            return await context.Employees.Where(e => e.Id == id).Include(e => e.Address)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesWithRelatedData(int? pageIndex, int pageSize = 10)
        {
            IQueryable<Employee> query = context.Employees.Include(e => e.Address);

            if (pageIndex.HasValue)
            {
                query.Skip((pageIndex.Value - 1) * pageSize);
            }

            query.Take(pageSize);
            return await query.ToListAsync();
        }

    }
}