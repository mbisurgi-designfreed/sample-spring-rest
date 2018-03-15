import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeService } from '../employee.service'
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAll()
      .subscribe((employees) => {
        this.employees = employees.json();
      });

    this.employeeService.employeeEvent
      .subscribe((boolean) => {
        if (boolean) {
          this.employeeService.getAll()
            .subscribe((employees) => {
              this.employees = employees.json();
            });
        }
      });
  }

  onDelete(id: String) {
    this.employeeService.delete(id)
      .subscribe((result) => {
        if (result.status === 200) {
          this.employeeService.employeeEvent.next(true);
          this.router.navigate(['/']);
        }
      });
  }
}