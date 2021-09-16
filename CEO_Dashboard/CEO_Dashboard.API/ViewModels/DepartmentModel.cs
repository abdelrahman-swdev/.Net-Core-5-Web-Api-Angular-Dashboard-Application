using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CEO_Dashboard.API.ViewModels
{
    public class DepartmentModel
    {
        public DepartmentModel()
        {
            Employees = new HashSet<EmployeeModel>();
        }
        public int DepId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public IEnumerable<EmployeeModel> Employees { get; set; }
    }
}
