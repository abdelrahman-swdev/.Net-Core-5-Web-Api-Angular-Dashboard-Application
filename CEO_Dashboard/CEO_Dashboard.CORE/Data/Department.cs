using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CEO_Dashboard.CORE.Data
{
    public class Department
    {
        public Department()
        {
            Employees = new HashSet<Employee>();
        }
        [Key]
        public int DepId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public virtual IEnumerable<Employee> Employees { get; set; }
    }
}
