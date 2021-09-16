using AutoMapper;
using CEO_Dashboard.API.Helpers;
using CEO_Dashboard.API.ViewModels;
using CEO_Dashboard.CORE;
using CEO_Dashboard.CORE.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEO_Dashboard.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public EmployeesController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await unitOfWork.Employees.GetAllEmployeesWithRelatedData(null);
            if (employees.Count() > 0)
            {
                IEnumerable<EmployeeModel> models = mapper.Map<IEnumerable<EmployeeModel>>(employees);
                return Ok(models);
            }
            else return Ok(false);
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeModel emp)
        {
            Employee employee = mapper.Map<Employee>(emp);
            unitOfWork.Employees.AddItem(employee);
            var check = await unitOfWork.Complete();
            if (check > 0) return Ok(true);
            else return NotFound(false);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee([FromRoute] int id)
        {
            var employee = await unitOfWork.Employees.GetEmployeeWithRelatedData(id);
            if (employee != null) {

                EmployeeModel model = mapper.Map<EmployeeModel>(employee);
                return Ok(model);
            }
            else return NotFound("Error");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] int id)
        {
            unitOfWork.Employees.DeleteItem(id);
            var check = await unitOfWork.Complete();
            if (check > 0) return Ok(true);
            else return NotFound(false);
        }



        [HttpPut("edit")]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeModel model)
        {
            Employee employee = mapper.Map<Employee>(model);
            unitOfWork.Employees.UpdateItem(employee);
            var check = await unitOfWork.Complete();
            if (check > 0) return Ok(model);
            else return NotFound("Error");
        }


        [HttpGet("find")]
        public async Task<IActionResult> FindByCriteria()
        {
            IEnumerable<Employee> matchedRecords = await  unitOfWork.Employees.Find(e => 
            e.DepartmentId == 1, new string[] {"Address"});
            IEnumerable<EmployeeModel> employeeModels = mapper.Map<IEnumerable<EmployeeModel>>(matchedRecords);
            return Ok(employeeModels);
        }

        [HttpGet("count")]
        public IActionResult GetCount()
        {
            return Ok(unitOfWork.Employees.Count());
        }
    }
}
