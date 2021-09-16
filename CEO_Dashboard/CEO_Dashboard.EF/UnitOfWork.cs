using CEO_Dashboard.CORE;
using CEO_Dashboard.CORE.Interfaces;
using CEO_Dashboard.EF.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.EF
{
    public class UnitOfWork : IUnitOfWork
    {
        public ApplicationDbContext context { get; }
        public UnitOfWork(ApplicationDbContext _context)
        {
            context = _context;
            Employees = new EmployeeRepository(context);
            Departments = new DepartmentRepository(context);
        }
        public IEmployeeRepository Employees { get; private set; }
        public IDepartmentRepository Departments { get; private set; }


        public async Task<int> Complete()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
