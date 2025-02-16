import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/department/departments.service';
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
  //Variable to stored the DepartmentId to get the information
  departmentId: any;
  department: any;
  employee: any[] = [];
  //Variable to stored inactiveEmployees using the method created in the backend with JPA
  inactiveEmployees: any[] = [];
  //Variable to stored activeEmployees using the method created in the backend with JPA
  activeEmployees: any[] = [];
  //Columns to be displayed in the component (is required to be all declared in the html)
  displayedColumns: String[] = ['id', 'name', 'date_in', 'date_out', 'state'];
  //Adding information to the Datasource of the Material Table using employee
  dataSource = new MatTableDataSource(this.employee);

  //Variable to wired to the canvas named mychart in the html
  ctx = document.getElementById('myChart');

  //Usage of services
  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentsService,
    private employeeService: EmployeeServiceService
  ) {}

  
  ngAfterViewInit(): void {
    //Method called using the department id and updating the table datasource
        this.employeeService
          .getEmployeesByDepartment(this.departmentId)
          .subscribe((res) => {
            this.employee = res;
            //Update datasource
            this.dataSource.data = this.employee;

            //Graphic created at the moment the method is executed to correct renderization
            this.createChart(); // 📌 Mueve la creación del gráfico aquí
          });
  }

  ngOnInit(): void {
    //Taking the id sent in the URL using the snapshot property and stored in departmentid
    this.departmentId = +this.route.snapshot.paramMap.get('id')!;
    //Getting data using method and variable.
    this.departmentService
      .getDepartmentById(this.departmentId)
      .subscribe((res) => {
        this.department = res;
      });
  }

  //Graphic creation to be executed in the AfterViewInit method
  private createChart(): void {
    //Adding data to variables to create the graphic correctly
    this.inactiveEmployees = this.dataSource.data.filter(
      (employee) => !employee.active
    );

    this.activeEmployees = this.dataSource.data.filter(
      (employee) => employee.active
    );

    //Graphic properties.
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
