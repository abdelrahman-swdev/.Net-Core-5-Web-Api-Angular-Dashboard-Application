using AutoMapper;
using CEO_Dashboard.API.ViewModels;
using CEO_Dashboard.CORE.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CEO_Dashboard.API.AutoMapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<EmployeeModel, Employee>().ReverseMap();
            CreateMap<AddressModel, Address>().ReverseMap();
            CreateMap<DepartmentModel, Department>().ReverseMap();
            CreateMap<RegisterModel, ApplicationUser>().ReverseMap();
            CreateMap<AddDepartmentModel, Department>()
                .ForMember(dest => dest.DepId, src => src.MapFrom( a => a.Id)).ReverseMap();
        }
    }
}
