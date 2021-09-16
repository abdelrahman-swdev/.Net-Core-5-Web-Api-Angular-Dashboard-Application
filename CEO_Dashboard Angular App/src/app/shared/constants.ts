// base url
export const apiUrl:string = 'https://localhost:44355/api/';

// login url
export const getTokeUrl:string = 'Auth/token';

// get all departments without related data
export const getAllDepartments:string = 'Departments';

// get all departments with related data
export const getAllDepartmentsWithEmployees:string = 'Departments/employees';

// get department with related data
export const getDepartment:string = 'Departments/';

// create new department
export const addDepartment:string = 'Departments/new';

// delete department
export const deleteDepartment:string = 'Departments/';

// update department
export const updateDepartment:string = 'Departments';

// Departments count
export const DepartmentsCount:string = 'Departments/count';

// get all employees with address and department id
export const getAllEmployees:string = 'Employees';

// add new employee
export const addEmployee:string = 'Employees/new';

// delete employee
export const deleteEmployee:string = 'Employees/';

// get employee by id
export const getEmployee:string = 'Employees/';

// update employee
export const updateEmployee:string = 'Employees/edit';

// employees count
export const employeesCount:string = 'Employees/count';
