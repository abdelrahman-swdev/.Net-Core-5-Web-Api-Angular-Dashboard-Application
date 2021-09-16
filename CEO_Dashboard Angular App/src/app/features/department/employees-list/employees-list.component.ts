import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDepartment } from 'src/app/_models/department.model';
import { EmployeeService } from '../../employee/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  departmentWithEmployees!: IDepartment;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    if (this.route.data) {
      this.route.data.forEach((d) => {
        this.departmentWithEmployees = d.department;
      });
    }
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this record')) {
      this.employeeService.delete(id).subscribe(
        (res) => {
          if (res) {
            this.departmentWithEmployees.employees =
              this.departmentWithEmployees.employees.filter((e) => e.id != id);
          }
        },
        (e) => {
          console.error(e);
        }
      );
    }
  }
}
