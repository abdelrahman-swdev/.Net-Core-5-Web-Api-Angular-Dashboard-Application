using CEO_Dashboard.CORE.Data;
using CEO_Dashboard.CORE.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.EF.Repositories
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        public DepartmentRepository(ApplicationDbContext context) : base(context)
        {
            
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsWithRelatedData(int? pageIndex, int pageSize = 10)
        {
            IQueryable<Department> query = context.Departments.Include(d => d.Employees).ThenInclude(e => e.Address);
            if (pageIndex.HasValue)
            {
                query.Skip((pageIndex.Value - 1) * pageSize);
            }

            query.Take(pageSize);
            return await query.ToListAsync();
        }

        public async Task<Department> GetDepartmentWithRelatedData(int id)
        {
            return await context.Departments.Where(e => e.DepId == id).Include(e => e.Employees).ThenInclude(e => e.Address)
                .FirstOrDefaultAsync();
        }
    }
}
