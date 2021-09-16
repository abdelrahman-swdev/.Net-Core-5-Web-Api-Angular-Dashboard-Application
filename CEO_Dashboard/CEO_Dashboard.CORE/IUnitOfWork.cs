using CEO_Dashboard.CORE.Data;
using CEO_Dashboard.CORE.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.CORE
{
    public interface IUnitOfWork : IDisposable
    {
        public IEmployeeRepository Employees { get;}
        public IDepartmentRepository Departments { get;}

        Task<int> Complete();
    }
}
