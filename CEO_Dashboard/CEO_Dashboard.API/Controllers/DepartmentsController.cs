using AutoMapper;
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
    public class DepartmentsController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public DepartmentsController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await unitOfWork.Departments.GetAll();
            if (departments.Count() > 0)
            {
                IEnumerable<DepartmentModel> models = mapper.Map<IEnumerable<DepartmentModel>>(departments);
                return Ok(models);
            }
            else return Ok(false);
            
        }

        [HttpGet("employees")]
        public async Task<IActionResult> GetAllDepartmentsWithEmployees()
        {
            var departments = await unitOfWork.Departments.GetAllDepartmentsWithRelatedData(null);
            if (departments.Count() > 0)
            {
                IEnumerable<DepartmentModel> models = mapper.Map<IEnumerable<DepartmentModel>>(departments);
                return Ok(models);
            }
            else return Ok(false);
        }

        [HttpPost("new")]
        public async Task<IActionResult> AddDepartment([FromBody] AddDepartmentModel model)
        {
            Department dep = mapper.Map<Department>(model);
            unitOfWork.Departments.AddItem(dep);
            var check = await unitOfWork.Complete();
            if (check > 0)
            {
                return Ok(dep);
            }
            else return BadRequest("item not added");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment([FromRoute] int id)
        {
            var department = await unitOfWork.Departments.GetDepartmentWithRelatedData(id);
            if (department != null)
            {
                DepartmentModel model = mapper.Map<DepartmentModel>(department);
                return Ok(model);
            }
            else return NotFound("Error");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            unitOfWork.Departments.DeleteItem(id);
            var check = await unitOfWork.Complete();
            if (check > 0) {
                return Ok(true); 
            }
            else return NotFound();
        }



        [HttpPut()]
        public async Task<IActionResult> UpdateDepartment([FromBody] AddDepartmentModel model)
        {
            Department department = mapper.Map<Department>(model);
            unitOfWork.Departments.UpdateItem(department);
            var check = await unitOfWork.Complete();
            if (check > 0) return Ok(model);
            else return NotFound();
        }


        [HttpGet("find")]
        public async Task<IActionResult> FindByCriteria()
        {
            IEnumerable<Department> matchedRecords = await unitOfWork.Departments.Find(e =>
                e.Name.Contains("a"), new string[] { "Employees" });
            IEnumerable<DepartmentModel> departmentModels = mapper.Map<IEnumerable<DepartmentModel>>(matchedRecords);
            return Ok(departmentModels);
        }

        [HttpGet("count")]
        public IActionResult GetCount()
        {
            return Ok(unitOfWork.Departments.Count());
        }
    }
}
