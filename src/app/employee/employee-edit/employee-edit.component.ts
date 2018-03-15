import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EmployeeService } from '../employee.service'
import { Employee } from '../employee';

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent implements OnInit {
    form: FormGroup;
    id: string = null;

    message: String = null;

    constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = params['id'];

                this.initForm();
            }
        );
    }

    private initForm() {
        let name = '';
        let lastname = '';
        let email = '';

        if (this.id) {
            this.employeeService.getById(this.id)
                .subscribe((employee) => {
                    const emp: Employee = employee.json();

                    this.form.patchValue({
                        name: emp.name,
                        lastname: emp.lastname,
                        email: emp.email,
                    });
                });
        }

        this.form = this.formBuilder.group({
            name: [name, Validators.required],
            lastname: [lastname, Validators.required],
            email: [email, Validators.required]
        })
    }

    onSubmit() {
        if (this.id) {
            const employee: Employee = this.form.value;

            this.employeeService.update(this.id, employee)
                .subscribe((result) => {
                    if (result.status === 200) {
                        this.employeeService.employeeEvent.next(true);
                        this.router.navigate(['/']);
                    }
                });
        } else {
            const employee: Employee = this.form.value;

            this.employeeService.insert(employee)
                .subscribe((result) => {
                    if (result.status === 200) {
                        this.employeeService.employeeEvent.next(true);
                        this.router.navigate(['/']);
                    }
                });
        }
    }
}