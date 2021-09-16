using CEO_Dashboard.CORE.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.CORE.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<Employee> GetEmployeeWithRelatedData(int id);
        Task<IEnumerable<Employee>> GetAllEmployeesWithRelatedData(int? pageIndex, int pageSize = 10);
    }
}
