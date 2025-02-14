import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentsService } from '../../services/departments.service';
import { EmployeeServiceService } from '../../services/employee/employee-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-department-details',
  imports: [MatTableModule, CommonModule],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css',
})
export class DepartmentDetailsComponent implements OnInit, AfterViewInit {
  departmentId: any;
  department: any;
  employee: any[] = [];
  inactiveEmployees: any[] = [];
  activeEmployees: any[] = [];
  displayedColumns: String[] = ['id', 'name', 'date_in', 'date_out', 'state'];
  dataSource = new MatTableDataSource(this.employee);
  ctx = document.getElementById('myChart');

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentsService,
    private employeeService: EmployeeServiceService
  ) {}
  ngAfterViewInit(): void {
        this.employeeService
          .getEmployeesByDepartment(this.departmentId)
          .subscribe((res) => {
            this.employee = res;
            this.dataSource.data = this.employee;

            this.createChart(); // 📌 Mueve la creación del gráfico aquí
          });
  }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id')!;
    console.log('El valor del compartido es: ' + this.departmentId);
    this.departmentService
      .getDepartmentById(this.departmentId)
      .subscribe((res) => {
        this.department = res;
      });
  }

  private createChart(): void {
    this.inactiveEmployees = this.dataSource.data.filter(
      (employee) => !employee.active
    );

    this.activeEmployees = this.dataSource.data.filter(
      (employee) => employee.active
    );

    new Chart('ctx', {
      type: 'doughnut',
      data: {
        labels: ['Actives', 'Inactives'],
        datasets: [
          {
            label: 'Employees',
            data: [this.activeEmployees.length, this.inactiveEmployees.length], // 📌 Usa `.length` si son arrays
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
            hoverOffset: 5,
          },
        ],
      },
    });
  }

}
