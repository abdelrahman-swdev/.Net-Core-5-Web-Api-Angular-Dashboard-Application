using CEO_Dashboard.CORE.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.CORE.Interfaces
{
    public interface IDepartmentRepository : IBaseRepository<Department>
    {
        Task<Department> GetDepartmentWithRelatedData(int id);
        Task<IEnumerable<Department>> GetAllDepartmentsWithRelatedData(int? pageIndex, int pageSize = 10);
    }
}
