using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CEO_Dashboard.API.ViewModels
{
    public class EmployeeModel
    {

        public int Id { get; set; }
        public string FullName { get; set; }

        [Required]
        public int Age { get; set; }

        [Phone]
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public float Salary { get; set; }

        public int? DepartmentId { get; set; }

        public AddressModel Address { get; set; }

    }
}
